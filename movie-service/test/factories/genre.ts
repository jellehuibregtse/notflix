import { v4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { MikroORM } from '@mikro-orm/core';
import { Genre } from '../../src/genre/entities/genre.entity';

export const genre = (data: Partial<Genre> = {}, orm?: MikroORM): Genre => {
  let genre = {
    id: v4(),
    name: faker.lorem.sentence(),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent(),
    ...data,
  } as Genre;

  if (!!orm) {
    genre = orm.em.create(Genre, genre);
    orm.em.persist(genre);
  }

  return genre;
};

export const createGenres = (
  genres: Partial<Genre>[] = [],
  orm?: MikroORM,
): Genre[] => genres.map((g: Partial<Genre>) => genre(g, orm));
