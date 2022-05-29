import {
  Collection,
  Entity,
  OneToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { BaseEntity } from '@app/common';
import { Profile } from './profile.entity';

@Entity()
export class Account extends BaseEntity {
  @Unique()
  @Property()
  email: string;

  @OneToMany(() => Profile, (profile) => profile.account)
  profiles = new Collection<Profile>(this);
}
