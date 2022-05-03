import { v4 } from 'uuid';
import { Test, TestingModule } from '@nestjs/testing';
import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { useDatabaseTestConfig } from '../../test/helpers/database';
import { User } from './entities/user.entity';
import { createUser } from '../../test/factories/user';
import { faker } from '@faker-js/faker';
import { UserService } from './user.service';
import { NotFoundException } from '@nestjs/common';

describe('UserService', () => {
  let userService: UserService;
  let module: TestingModule;
  let orm: MikroORM;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        useDatabaseTestConfig(),
        MikroOrmModule.forFeature({ entities: [User] }),
      ],
      providers: [UserService],
    }).compile();

    userService = module.get<UserService>(UserService);
    orm = module.get<MikroORM>(MikroORM);
  });

  beforeEach(async () => {
    await orm.getSchemaGenerator().refreshDatabase();
  });

  afterAll(async () => {
    await module.close();
    await orm.close();
  });

  describe('getByEmail', () => {
    it('should return user by email', async () => {
      const user = await createUser({}, orm);

      const result = await userService.getByEmail(user.email);

      expect(result).toBeDefined();
      expect(result).toBe(user);
    });

    it('should return undefined if user not found', async () => {
      await expect(
        userService.getByEmail(faker.internet.email()),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('getById', () => {
    it('should return user by id', async () => {
      const user = await createUser({}, orm);

      const result = await userService.getById(user.id);

      expect(result).toBeDefined();
      expect(result).toBe(user);
    });

    it('should return undefined if user not found', async () => {
      await expect(userService.getById(v4())).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
