import { Controller } from '@nestjs/common';
import { AccountService } from './account.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateUserRequest } from '../../auth/src/users/dtos/create-user.request';
import { RmqService } from '@app/common';

@Controller()
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly rmqService: RmqService,
  ) {}

  @EventPattern('user_created')
  async handleUserCreated(
    @Payload() data: CreateUserRequest,
    @Ctx() context: RmqContext,
  ) {
    await this.accountService.create(data);
    this.rmqService.ack(context);
  }
}
