import { Entity, Property, types } from '@mikro-orm/core';
import { BaseEntity } from '@app/common';

@Entity()
export class Movie extends BaseEntity {
  @Property()
  title: string;

  @Property({ type: types.text })
  overview: string;

  @Property()
  releaseDate: Date;

  @Property()
  runtime: number;

  @Property()
  posterPath: string;
}
