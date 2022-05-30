import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from './users/entites/user.entity';

export interface TokenPayload {
  sub: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User) {
    const tokenPayload: TokenPayload = {
      sub: user.id,
      email: user.email,
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    return {
      access_token: this.jwtService.sign(tokenPayload),
      token_type: 'Bearer',
      expires_in: this.configService.get('JWT_EXPIRATION'),
    };
  }
}
