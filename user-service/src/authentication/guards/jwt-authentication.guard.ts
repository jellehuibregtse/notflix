import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * We use this guard to check if a user is authenticated before accessing a route.
 *
 * Use the guard as follows: @UseGuards(JwtAuthenticationGuard)
 */

@Injectable()
export default class JwtAuthenticationGuard extends AuthGuard('jwt') {}
