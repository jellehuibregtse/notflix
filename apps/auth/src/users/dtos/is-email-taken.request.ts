import { Type } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class IsEmailTakenRequest {
  @Type(
    /* istanbul ignore next */
    () => String,
  )
  @IsString()
  @IsEmail()
  email: string;

  constructor(email: string) {
    this.email = email;
  }
}
