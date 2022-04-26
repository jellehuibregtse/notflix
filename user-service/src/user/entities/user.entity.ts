import { BaseEntity } from '../../database/entities/base.entity';
import { Entity, Property, Unique } from '@mikro-orm/core';
import { IsEmail } from 'class-validator';

@Entity()
export class User extends BaseEntity {
  @Property()
  @Unique()
  @IsEmail()
  email: string;

  @Property()
  password: string;
}
