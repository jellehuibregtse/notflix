import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { createMovie, createMovies } from '../test/factories/movie';
import { CreateMovieRequest } from './dtos/create-movie.request';
import { AuthModule } from '@app/common';

const moduleMocker = new ModuleMocker(global);

describe('MoviesController', () => {
  let moviesController: MoviesController;
  const moviesArray = createMovies([{}, {}, {}]);
  const movie = createMovie();

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
      controllers: [MoviesController],
    })
      .useMocker((token) => {
        if (token === MoviesService) {
          return {
            findAll: jest.fn().mockResolvedValue(moviesArray),
            findOne: jest.fn().mockResolvedValue(movie),
            create: jest.fn().mockResolvedValue(movie),
            update: jest.fn().mockResolvedValue(movie),
            delete: jest.fn().mockReturnValue(undefined),
          };
        }
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    moviesController = app.get<MoviesController>(MoviesController);
  });

  it('should be defined', () => {
    expect(moviesController).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a movie', async () => {
      const result = await moviesController.findOne(movie.id);
      expect(result).toEqual(movie);
    });
  });

  describe('create', () => {
    it('should return a movie', async () => {
      const createMovieRequest: CreateMovieRequest = {
        title: movie.title,
        overview: movie.overview,
        releaseDate: movie.releaseDate,
        runtime: movie.runtime,
        posterPath: movie.posterPath,
      };
      const result = await moviesController.create(createMovieRequest);
      expect(result).toEqual(movie);
    });
  });

  describe('update', () => {
    it('should return a movie', async () => {
      const createMovieRequest: CreateMovieRequest = {
        title: movie.title,
        overview: movie.overview,
        releaseDate: movie.releaseDate,
        runtime: movie.runtime,
        posterPath: movie.posterPath,
      };
      const result = await moviesController.update(
        movie.id,
        createMovieRequest,
      );
      expect(result).toEqual(movie);
    });
  });
});
