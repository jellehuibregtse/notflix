import { Base } from './Base';
import { Profile } from './Profile';

export interface Account extends Base {
  name: string;
  email: string;
  profiles: Profile[];
}
