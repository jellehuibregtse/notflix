import { v4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { MikroORM } from '@mikro-orm/core';
import { Movie } from '../../src/movie/entities/movie.entity';

export const movie = (data: Partial<Movie> = {}, orm?: MikroORM): Movie => {
  let movie = {
    id: v4(),
    title: faker.lorem.word(),
    overview: faker.lorem.sentence(),
    releaseDate: faker.date.past(),
    runtime: faker.datatype.number(),
    createdAt: faker.date.recent(),
    posterPath: faker.system.filePath(),
    genres: [],
    updatedAt: faker.date.recent(),
    ...data,
  } as Movie;

  if (!!orm) {
    movie = orm.em.create(Movie, movie);
    orm.em.persist(movie);
  }

  return movie;
};

export const createMovies = (
  movies: Partial<Movie>[] = [],
  orm?: MikroORM,
): Movie[] => {
  const result = movies.map((m: Partial<Movie>) => movie(m, orm));

  if (!!orm) {
    result.forEach((m: Movie) => orm.em.persist(m));
  }

  return result;
};
