import { Collection, Entity, ManyToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../database/entities/base.entity';
import { Genre } from '../../genre/entities/genre.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Movie extends BaseEntity {
  @Property()
  @ApiProperty()
  title: string;

  @Property()
  @ApiProperty()
  overview: string;

  @Property()
  @ApiProperty()
  releaseDate: Date;

  @Property()
  @ApiProperty()
  runtime: number;

  @Property()
  @ApiProperty()
  posterPath: string;

  @ManyToMany(() => Genre)
  @ApiProperty()
  genres: Collection<Genre> = new Collection<Genre>(this);
}
