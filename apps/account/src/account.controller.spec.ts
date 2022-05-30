import { Test, TestingModule } from '@nestjs/testing';
import { AccountController } from './account.controller';
import { AccountService } from './account.service';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { createAccount } from '../test/factories/account';
import { CreateAccountRequest } from './dtos/create-account.request';
import { RmqContext } from '@nestjs/microservices';

const moduleMocker = new ModuleMocker(global);

describe('AccountController', () => {
  let accountController: AccountController;
  const account = createAccount();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AccountController],
    })
      .useMocker((token) => {
        if (token === AccountService) {
          return {
            create: jest.fn().mockResolvedValue(account),
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    accountController = app.get<AccountController>(AccountController);
  });

  it('should be defined', () => {
    expect(accountController).toBeDefined();
  });

  describe('create', () => {
    it('should return an account', async () => {
      const createAccountRequest: CreateAccountRequest = {
        email: account.email,
      };
      const result = await accountController.handleUserCreated(
        createAccountRequest,
        {} as RmqContext,
      );
      expect(result).toEqual(account);
    });
  });
});
