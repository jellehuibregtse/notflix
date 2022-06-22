import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Account } from './entities/account.entity';
import { EntityRepository } from '@mikro-orm/core';
import { CreateAccountRequest } from './dtos/create-account.request';
import { Profile } from './entities/profile.entity';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: EntityRepository<Account>,
    @InjectRepository(Profile)
    private readonly profileRepository: EntityRepository<Profile>,
  ) {}

  async findAll() {
    return this.accountRepository.findAll({ populate: ['profiles'] });
  }

  async findByEmail(email: string): Promise<Account> {
    const account = await this.accountRepository.findOne(
      { email },
      { populate: ['profiles'] },
    );
    if (account) return account;
    throw new NotFoundException(`Account with email ${email} not found.`);
  }

  async create(request: CreateAccountRequest): Promise<Account> {
    const account = this.accountRepository.create(request);
    const profile = this.profileRepository.create({
      name: account.name,
      account,
    });
    account.profiles.add(profile);
    await this.accountRepository.persistAndFlush(account);
    return account;
  }
}
