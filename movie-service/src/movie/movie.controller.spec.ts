import { v4 } from 'uuid';
import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { useDatabaseTestConfig } from '../../test/helpers/database';
import { MovieService } from './movie.service';
import { Movie } from './entities/movie.entity';
import { createMovies, movie } from '../../test/factories/movie';
import { NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dtos/create-movie-dto';
import { PageOptionsDto } from '../dtos/page-options.dto';
import { Request, Response } from 'express';

describe('MovieController', () => {
  let movieController: MovieController;
  let movieService: MovieService;
  let module: TestingModule;
  let orm: MikroORM;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        useDatabaseTestConfig(),
        MikroOrmModule.forFeature({ entities: [Movie] }),
      ],
      controllers: [MovieController],
      providers: [MovieService],
    }).compile();

    movieController = module.get<MovieController>(MovieController);
    movieService = module.get<MovieService>(MovieService);
    orm = module.get<MikroORM>(MikroORM);
  });

  beforeEach(async () => {
    await orm.getSchemaGenerator().refreshDatabase();
  });

  afterAll(async () => {
    await module.close();
    await orm.close();
  });

  describe('findAll', () => {
    let request, response: Partial<Response>;

    beforeEach(() => {
      request = {} as Request;
      response = {
        setHeader: jest.fn().mockImplementation(),
      };
    });

    it.each([...Array(10).keys()])(
      'should return an array of movies',
      async (length) => {
        const movies = createMovies(new Array(length).fill({}), orm);

        const result = await movieController.findAll(
          new PageOptionsDto(),
          response as Response,
          request,
        );
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveLength(length);
        expect(result).toEqual(movies);
      },
    );

    it('should return an empty array if no movies are persisted', async () => {
      const result = await movieController.findAll(
        new PageOptionsDto(),
        response as Response,
        request,
      );
      expect(result).toBeInstanceOf(Array);
      expect(result).toHaveLength(0);
      expect(result).toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return a movie', async () => {
      const testMovie = movie({}, orm);

      const result = await movieController.findOne(testMovie.id);
      expect(result).toBeInstanceOf(Movie);
      expect(result).toEqual(testMovie);
    });

    it('should return 404 if no movie is found', async () => {
      try {
        await movieController.findOne(v4());
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a movie', async () => {
      const data = {
        title: 'Title',
        overview: 'This is a test overview',
        releaseDate: new Date(),
        runtime: 90,
        posterPath: 'test/path',
      };
      const testMovie = new CreateMovieDto(data);

      const result = await movieController.create(testMovie);
      expect(result).toBeInstanceOf(Movie);
    });
  });

  describe('update', () => {
    it('should update a movie', async () => {
      const testMovie = movie({}, orm);

      const data = {
        title: 'Title',
        overview: 'This is a test overview',
        releaseDate: new Date(),
        runtime: 90,
        posterPath: 'test/path',
      };
      const testMovieDto = new CreateMovieDto(data);

      const result = await movieController.update(testMovie.id, testMovieDto);
      expect(result).toBeInstanceOf(Movie);
      expect(result).toEqual(testMovie);
    });

    it('should return null if no movie is found', async () => {
      try {
        await movieController.update(v4(), new CreateMovieDto({}));
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('delete', () => {
    it('should delete a movie', async () => {
      const testMovie = movie({}, orm);

      const result = await movieController.delete(testMovie.id);
      expect(result).toBeUndefined();

      try {
        await movieService.findOne(testMovie.id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });

    it('should return null if no movie is found', async () => {
      try {
        await movieController.delete(v4());
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
