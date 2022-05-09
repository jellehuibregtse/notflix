import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Check if an email is taken' })
  @ApiOkResponse()
  async isEmailTaken(@Param('email') email: string): Promise<boolean> {
    return !!this.userService.isEmailTaken(email);
  }
}
