import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, Observable, tap } from 'rxjs';
import { AUTH_SERVICE } from './services';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const authorization = JwtAuthGuard.getAuthorization(context);
    // Using the request/response messaging pattern.
    return this.authClient
      .send('validate_user', {
        Authorization: authorization,
      })
      .pipe(
        tap((res) => {
          JwtAuthGuard.addUser(res, context);
        }),
        catchError(() => {
          throw new UnauthorizedException(
            'Could not validate user with auth provider.',
          );
        }),
      );
  }

  private static getAuthorization(context: ExecutionContext) {
    let authorization: string;
    if (context.getType() === 'rpc') {
      authorization = context.switchToRpc().getData().Authorization;
    } else if (context.getType() === 'http') {
      const headers = context.switchToHttp().getRequest().headers;
      authorization = headers.Authorization || headers.authorization;
    }
    if (!authorization) {
      throw new UnauthorizedException('Authorization value was not present.');
    }
    return authorization;
  }

  private static addUser(user: any, context: ExecutionContext) {
    if (context.getType() === 'rpc') {
      context.switchToRpc().getData().user = user;
    } else if (context.getType() === 'http') {
      context.switchToHttp().getRequest().user = user;
    }
  }
}
