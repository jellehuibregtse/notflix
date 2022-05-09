import { Request } from 'express';
import { User } from '@app/user/user.entity';

export interface RequestWithUser extends Request {
  user: User;
}
