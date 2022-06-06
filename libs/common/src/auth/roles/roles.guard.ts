import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@app/common';
import { ROLES_KEY } from '@app/common';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    let user: any;

    if (context.getType() === 'rpc') {
      user = context.switchToRpc().getData().user;
    } else if (context.getType() === 'http') {
      user = context.switchToHttp().getRequest().user;
    }
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
