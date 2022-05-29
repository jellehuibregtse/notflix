import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Account } from './entities/account.entity';
import { EntityRepository } from '@mikro-orm/core';
import { CreateAccountRequest } from './dtos/create-account.request';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: EntityRepository<Account>,
  ) {}

  async create(request: CreateAccountRequest) {
    this.accountRepository.create(request);
  }
}
