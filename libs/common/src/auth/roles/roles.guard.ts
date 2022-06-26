import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AUTH_SERVICE, JwtAuthGuard, Role } from '@app/common';
import { ROLES_KEY } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, lastValueFrom, tap } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    @Inject(AUTH_SERVICE) private authClient: ClientProxy,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    let user: any;

    await lastValueFrom(
      this.authClient
        .send('validate_user', {
          Authorization: JwtAuthGuard.getAuthorization(context),
        })
        .pipe(
          tap((res) => {
            user = res;
          }),
          catchError(() => {
            throw new UnauthorizedException(
              'Could not validate user with auth provider.',
            );
          }),
        ),
    );
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
