import { Entity, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from '@app/common';

@Entity()
export class User extends BaseEntity {
  @Unique()
  @Property()
  email: string;

  @Property()
  password: string;
}
