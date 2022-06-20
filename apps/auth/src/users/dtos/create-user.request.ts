import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsValidPassword } from '../decorators/is-valid-password.decorator';

export class CreateUserRequest {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsValidPassword()
  password: string;
}
