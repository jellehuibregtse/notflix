import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateAccountRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
