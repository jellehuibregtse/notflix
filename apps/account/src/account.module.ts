import { Module, OnModuleInit } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { RmqModule } from '@app/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { MikroORM } from '@mikro-orm/core';
import { Account } from './entities/account.entity';
import { Profile } from './entities/profile.entity';
import { asyncConfig } from '../mikro-orm.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().default(3002),
        DB_HOST: Joi.string().default('localhost'),
        DB_PORT: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_USER: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_ACCOUNT_QUEUE: Joi.string().required(),
      }),
    }),
    RmqModule,
    MikroOrmModule.forRootAsync(asyncConfig),
    MikroOrmModule.forFeature([Account, Profile]),
  ],
  controllers: [AccountController],
  providers: [AccountService],
})
export class AccountModule implements OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit() {
    await this.orm.getSchemaGenerator().updateSchema();
  }
}
