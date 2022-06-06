import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AccountService } from './account.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { JwtAuthGuard, RmqService } from '@app/common';
import { CreateAccountRequest } from './dtos/create-account.request';
import { Account } from './entities/account.entity';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

@Controller('account')
export class AccountController {
  constructor(
    private readonly accountService: AccountService,
    private readonly rmqService: RmqService,
  ) {}

  @Get()
  async findAll() {
    return this.accountService.findAll();
  }

  @Get(':email')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get account by email' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async findOne(@Param('email') email: string): Promise<Account> {
    return this.accountService.findByEmail(email);
  }

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
