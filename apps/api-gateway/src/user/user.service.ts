import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
  ) {}

  isEmailTaken(email: string): Observable<string> {
    return this.userService.send<string>(
      { cmd: 'isEmailTaken' },
      { id: email },
    );
  }
}
