import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':email')
  async isEmailTaken(email: string) {
    return await this.userService.isEmailTaken(email);
  }
}
