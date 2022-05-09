import { v4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { MikroORM } from '@mikro-orm/core';
import { User } from '@app/user/user.entity';
import { UserDto } from '@app/user/user.dto';

export const createUser = (data: Partial<User> = {}, orm?: MikroORM): User => {
  let user = {
    id: v4(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...data,
  } as User;

  if (!!orm) {
    user = orm.em.create(User, user);
    orm.em.persist(user);
  }

  return user;
};

export const createUsers = (
  users: Partial<User>[] = [],
  orm?: MikroORM,
): User[] => users.map((u: Partial<User>) => createUser(u, orm));

export const createUserDto = (): UserDto => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
});
