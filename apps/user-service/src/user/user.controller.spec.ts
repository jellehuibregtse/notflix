import { Test, TestingModule } from '@nestjs/testing';
import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { useDatabaseTestConfig } from '../../test/helpers/database';
import { User } from '@app/user/user.entity';
import { createUser } from '../../test/factories/user';
import { faker } from '@faker-js/faker';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserController', () => {
  let userController: UserController;
  let module: TestingModule;
  let orm: MikroORM;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        useDatabaseTestConfig(),
        MikroOrmModule.forFeature({ entities: [User] }),
      ],
      controllers: [UserController],
      providers: [UserService],
    }).compile();

    userController = module.get<UserController>(UserController);
    orm = module.get<MikroORM>(MikroORM);
  });

  beforeEach(async () => {
    await orm.getSchemaGenerator().refreshDatabase();
  });

  afterAll(async () => {
    await module.close();
    await orm.close();
  });

  describe('isEmailTaken', () => {
    it('should return true if the email is taken', async () => {
      const user = createUser({}, orm);
      const email = user.email;

      expect(await userController.isEmailTaken(email)).toBe(true);
    });

    it('should return false if the email is not taken', async () => {
      expect(await userController.isEmailTaken(faker.internet.email())).toBe(
        false,
      );
    });
  });
});
