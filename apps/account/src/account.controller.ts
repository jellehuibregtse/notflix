import { Controller, Logger } from '@nestjs/common';
import { AccountService } from './account.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RmqService } from '@app/common';
import { CreateAccountRequest } from './dtos/create-account.request';
import { Account } from './entities/account.entity';

@Controller()
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern('user_created')
  async handleUserCreated(
    @Payload() data: CreateAccountRequest,
    @Ctx() context: RmqContext,
  ): Promise<Account> {
    const account = await this.accountService.create(data);
    this.rmqService.ack(context);
    return account;
  }
}
