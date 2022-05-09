import {
  Collection,
  Entity,
  ManyToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { BaseEntity } from '@app/database';
import { Movie } from '@app/movie/movie.entity';

@Entity()
export class Genre extends BaseEntity {
  @Property()
  @Unique()
  name: string;

  @ManyToMany(() => Movie, (movie) => movie.genres)
  movies = new Collection<Movie>(this);
}
