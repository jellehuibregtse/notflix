import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Param } from '@nestjs/common';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Implement isEmailTaken endpoint that takes email as a parameter and returns true if email is taken
  @Get('email/:email')
  async isEmailTaken(@Param('email') email: string): Promise<boolean> {
    return await this.userService.isEmailTaken(email);
  }
}
