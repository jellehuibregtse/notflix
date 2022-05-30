import { v4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { Account } from '../../src/entities/account.entity';

export const createAccount = (data: Partial<Account> = {}): Account => {
  return {
    id: v4(),
    email: faker.internet.email(),
    profiles: [],
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    ...data,
  } as Account;
};

export const createAccounts = (
  accounts: Partial<Account>[] = [],
): Account[] => {
  return accounts.map((movie: Partial<Account>) => createAccount(movie));
};
