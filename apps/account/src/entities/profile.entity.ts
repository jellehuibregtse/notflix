import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '@app/common';
import { Account } from './account.entity';

@Entity()
export class Profile extends BaseEntity {
  @Property()
  name: string;

  @ManyToOne(() => Account)
  account: Account;
}
