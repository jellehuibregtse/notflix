import { Module } from '@nestjs/common';
import { RmqModule } from '@app/common';
import { AUTH_SERVICE } from '@app/common/auth/services';

@Module({
  imports: [RmqModule.register({ name: AUTH_SERVICE })],
  exports: [RmqModule],
})
export class AuthModule {}
