import {
  Collection,
  Entity,
  ManyToMany,
  Property,
  Unique,
} from '@mikro-orm/core';
import { BaseEntity } from '../../database/entities/base.entity';
import { Movie } from '../../movie/entities/movie.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Genre extends BaseEntity {
  @Property()
  @ApiProperty()
  @Unique()
  name: string;

  @ManyToMany(() => Movie, (movie) => movie.genres)
  @ApiProperty()
  movies = new Collection<Movie>(this);
}
