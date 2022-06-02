import { Module } from '@nestjs/common';
import { RmqModule, RolesGuard } from '@app/common';
import { AUTH_SERVICE } from '@app/common/auth/services';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [RmqModule.register({ name: AUTH_SERVICE })],
  // providers: [
  //   {
  //     provide: APP_GUARD,
  //     useClass: RolesGuard,
  //   },
  // ],
  exports: [RmqModule],
})
export class AuthModule {}
