import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountRequest {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
