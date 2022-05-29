import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from './entites/user.entity';
import { RmqModule } from '@app/common';
import { ACCOUNT_SERVICE } from './constants/services';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [User] }),
    RmqModule.register({
      name: ACCOUNT_SERVICE,
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
