import { Test, TestingModule } from '@nestjs/testing';
import { useDatabaseTestConfig } from '../../test/helpers/database';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authenitcation.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserService } from '../user/user.service';

describe('AuthenticationModule', () => {
  let module: TestingModule;

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
      providers: [AuthenticationService, LocalStrategy, JwtStrategy],
    }).compile();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should compile the module', async () => {
    expect(module).toBeDefined();
    expect(module.get(AuthenticationController)).toBeInstanceOf(
      AuthenticationController,
    );
    expect(module.get(AuthenticationService)).toBeInstanceOf(
      AuthenticationService,
    );
    expect(module.get(UserService)).toBeInstanceOf(UserService);
    expect(module.get(LocalStrategy)).toBeInstanceOf(LocalStrategy);
    expect(module.get(JwtStrategy)).toBeInstanceOf(JwtStrategy);
  });
});
