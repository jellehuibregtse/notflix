import { v4 } from 'uuid';
import { Test, TestingModule } from '@nestjs/testing';
import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { useDatabaseTestConfig } from '../../test/helpers/database';
import { NotFoundException } from '@nestjs/common';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { Genre } from './entities/genre.entity';
import { createGenres, genre } from '../../test/factories/genre';
import { Request, Response } from 'express';
import { CreateGenreDto } from './dtos/create-genre.dto';
import { PageOptionsDto } from '../dtos/page-options.dto';

describe('GenreController', () => {
  let genreController: GenreController;
  let genreService: GenreService;
  let module: TestingModule;
  let orm: MikroORM;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        useDatabaseTestConfig(),
        MikroOrmModule.forFeature({ entities: [Genre] }),
      ],
      controllers: [GenreController],
      providers: [GenreService],
    }).compile();

    genreController = module.get<GenreController>(GenreController);
    genreService = module.get<GenreService>(GenreService);
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
      'should return an array of genres',
      async (length) => {
        const genres = createGenres(new Array(length).fill({}), orm);

        const result = await genreController.findAll(
          new PageOptionsDto(),
          response as Response,
          request,
        );
        expect(result).toBeInstanceOf(Array);
        expect(result).toHaveLength(length);
        expect(result).toEqual(genres);
      },
    );

    it('should return an empty array if no genres are persisted', async () => {
      const result = await genreController.findAll(
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
    it('should return a genre', async () => {
      const testGenre = genre({}, orm);

      const result = await genreController.findOne(testGenre.id);
      expect(result).toBeInstanceOf(Genre);
      expect(result).toEqual(testGenre);
    });

    it('should return 404 if no genre is found', async () => {
      try {
        await genreController.findOne(v4());
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('should create a genre', async () => {
      const data = {
        name: 'Name',
      };
      const testGenre = new CreateGenreDto(data);

      const result = await genreController.create(testGenre);
      expect(result).toBeInstanceOf(Genre);
    });
  });

  describe('update', () => {
    it('should update a genre', async () => {
      const testGenre = genre({}, orm);

      const data = {
        name: 'Name',
      };
      const testGenreDto = new CreateGenreDto(data);

      const result = await genreController.update(testGenre.id, testGenreDto);
      expect(result).toBeInstanceOf(Genre);
      expect(result).toEqual(testGenre);
    });

    it('should return null if no genre is found', async () => {
      try {
        await genreController.update(v4(), new CreateGenreDto());
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('delete', () => {
    it('should delete a genre', async () => {
      const testGenre = genre({}, orm);

      const result = await genreController.delete(testGenre.id);
      expect(result).toBeUndefined();

      try {
        await genreService.findOne(testGenre.id);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });

    it('should return null if no genre is found', async () => {
      try {
        await genreController.delete(v4());
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
