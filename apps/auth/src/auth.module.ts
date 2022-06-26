import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RmqModule, Role } from '@app/common';
import * as Joi from 'joi';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from './users/users.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './users/entites/user.entity';
import { asyncConfig } from './mikro-orm.config';
import { MikroORM } from '@mikro-orm/core';
import { ACCOUNT_SERVICE } from './users/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Module({
  imports: [
    MikroOrmModule.forRootAsync(asyncConfig),
    MikroOrmModule.forFeature([User]),
    UsersModule,
    RmqModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        PORT: Joi.number().default(3001),
        DB_HOST: Joi.string().default('localhost'),
        DB_PORT: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
      }),
      envFilePath: './apps/auth/.env',
    }),
    RmqModule.register({
      name: ACCOUNT_SERVICE,
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION')}s`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule implements OnModuleInit {
  constructor(
    @Inject(ACCOUNT_SERVICE) private readonly accountClient: ClientProxy,
    private readonly orm: MikroORM,
  ) {}

  async onModuleInit() {
    const migrator = this.orm.getMigrator();
    const migrations = await migrator.getPendingMigrations();

    if (migrations && migrations.length > 0) {
      await migrator.up();
    }

    let admin = await this.orm.em.findOne(User, { email: 'admin@mail.com' });

    if (!admin) {
      // Start a transaction.
      await this.orm.em.begin();
      try {
        admin = this.orm.em.create(User, {
          email: 'admin@mail.com',
          password: await bcrypt.hash('admin', 10),
          roles: [Role.Admin],
        });
        this.orm.em.persist(admin);
        await lastValueFrom(
          this.accountClient.emit('user_created', {
            name: 'Admin',
            email: 'admin@mail.com',
            password: 'admin',
          }),
        );
        await this.orm.em.commit();
      } catch (error) {
        // If an error occurred, rollback the transaction.
        await this.orm.em.rollback();
        throw error;
      }
    }
  }
}
