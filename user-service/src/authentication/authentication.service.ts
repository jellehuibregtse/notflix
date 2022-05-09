import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { UserDto } from '../user/dtos/user.dto';
import { PostgresErrorCode } from '../database/postgres-error-codes.enum';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(registrationData: UserDto): Promise<Partial<User>> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(
      registrationData.password,
      saltOrRounds,
    );
    try {
      const createdUser = await this.userService.create({
        ...registrationData,
        password: hashedPassword,
      });
      // Make sure we don't send the password back.
      delete createdUser.password;
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new ConflictException('A user with that email already exists.');
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async getAuthenticatedUser(email: string, hashedPassword: string) {
    const user = await this.userService.getByEmail(email);
    // Verify the password.
    if (!(await bcrypt.compare(hashedPassword, user.password))) {
      throw new BadRequestException('Invalid credentials');
    }
    delete user.password;
    return user;
  }

  public getCookieWithJwt(userId: string) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
      'JWT_EXPIRATION_TIME',
    )}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
