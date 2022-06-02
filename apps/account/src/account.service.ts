import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll() {
    return this.accountRepository.findAll();
  }

  async findByEmail(email: string): Promise<Account> {
    const account = await this.accountRepository.findOne({ email });
    if (account) return account;
    throw new NotFoundException(`Account with email ${email} not found.`);
  }

  async create(request: CreateAccountRequest): Promise<Account> {
    const account = this.accountRepository.create(request);
    await this.accountRepository.persistAndFlush(account);
    return account;
  }
}
