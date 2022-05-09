import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../database/entities/base.entity';
import { Genre } from '../../genre/entities/genre.entity';

@Entity()
export class Movie extends BaseEntity {
  @Property()
  title: string;

  @Property()
  overview: string;

  @Property()
  releaseDate: Date;

  @Property()
  runtime: number;

  @Property()
  posterPath: string;

  @ManyToMany(() => Genre)
  genres: Collection<Genre> = new Collection<Genre>(this);
}
