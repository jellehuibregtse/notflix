import { UserService } from './user.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { IsEmailTakenDto } from './dtos/is-email-taken.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('email')
  @HttpCode(200)
  @ApiOkResponse()
  @ApiBadRequestResponse()
  async isEmailTaken(@Body() data: IsEmailTakenDto): Promise<boolean> {
    return await this.userService.isEmailTaken(data.email);
  }
}
