import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { IsEmailTakenRequest } from './dtos/is-email-taken.request';
import { CreateUserRequest } from './dtos/create-user.request';
import { User } from './entites/user.entity';

@ApiTags('auth')
@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('email')
  @HttpCode(200)
  @ApiOkResponse()
  @ApiBadRequestResponse()
  async isEmailTaken(@Body() data: IsEmailTakenRequest): Promise<boolean> {
    return this.usersService.isEmailTaken(data.email);
  }

  @Post('register')
  async create(@Body() request: CreateUserRequest): Promise<User> {
    return this.usersService.create(request);
  }
}
