import { Test, TestingModule } from '@nestjs/testing';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { useDatabaseTestConfig } from '../../test/helpers/database';
import { User } from '@app/user/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';

describe('UserModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        useDatabaseTestConfig(),
        MikroOrmModule.forFeature({ entities: [User] }),
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();
  });

  afterAll(async () => {
    await module.close();
  });

  it('should compile the module', async () => {
    expect(module).toBeDefined();
    expect(module.get(UserController)).toBeInstanceOf(UserController);
    expect(module.get(UserService)).toBeInstanceOf(UserService);
  });
});
