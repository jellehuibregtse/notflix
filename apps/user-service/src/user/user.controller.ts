import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly userService: UserController) {}

  @MessagePattern({ cmd: 'isEmailTaken' })
  isEmailTaken(email: string): Promise<boolean> {
    return this.userService.isEmailTaken(email);
  }
}
