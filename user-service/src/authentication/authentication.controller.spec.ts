import { Test, TestingModule } from '@nestjs/testing';
import { useDatabaseTestConfig } from '../../test/helpers/database';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authenitcation.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { createUser, createUserDto } from '../../test/factories/user';
import { MikroORM } from '@mikro-orm/core';
import { ConflictException } from '@nestjs/common';

describe('AuthenticationModule', () => {
  let authenticationController: AuthenticationController;
  let module: TestingModule;
  let orm: MikroORM;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        useDatabaseTestConfig(),
        ConfigModule.forRoot({ isGlobal: true }),
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
          inject: [ConfigService],
          useFactory: async (configService: ConfigService) => ({
            secret: configService.get('JWT_SECRET'),
            signOptions: {
              expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}s`,
            },
          }),
        }),
      ],
      controllers: [AuthenticationController],
      providers: [AuthenticationService],
    }).compile();

    authenticationController = module.get<AuthenticationController>(
      AuthenticationController,
    );
    orm = module.get<MikroORM>(MikroORM);
  });

  beforeEach(async () => {
    await orm.getSchemaGenerator().refreshDatabase();
  });

  afterAll(async () => {
    await module.close();
    await orm.close();
  });

  describe('register', () => {
    it('should correctly register a user', async () => {
      const dto = createUserDto();

      expect(await authenticationController.register(dto)).toStrictEqual(
        expect.any(String),
      );
    });

    it('should not register a user if the email is already taken', async () => {
      const dto = createUserDto();
      createUser({ email: dto.email }, orm);
      await expect(authenticationController.register(dto)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
