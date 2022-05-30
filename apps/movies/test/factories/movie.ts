import { v4 } from 'uuid';
import { faker } from '@faker-js/faker';
import { Movie } from '../../src/entities/movie.entity';

export const createMovie = (data: Partial<Movie> = {}): Movie => {
  return {
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
};

export const createMovies = (movies: Partial<Movie>[] = []): Movie[] => {
  return movies.map((movie: Partial<Movie>) => createMovie(movie));
};
