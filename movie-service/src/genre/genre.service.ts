import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { Genre } from './entities/genre.entity';
import { ENTITY_NOT_FOUND } from '../exceptions';
import { PageOptionsDto } from '../dtos/page-options.dto';
import { PaginatedResult } from '../helpers/pagination.helper';
import { CreateGenreDto } from './dtos/create-genre.dto';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: EntityRepository<Genre>,
  ) {}

  /**
   * Retrieve all genres from the database.
   * @param pageOptions - Pagination options.
   * @returns A promise of a list of genres.
   */
  async findAll(pageOptions: PageOptionsDto): Promise<PaginatedResult<Genre>> {
    return await this.genreRepository.findAndCount(
      {},
      {
        limit: pageOptions.limit,
        offset: pageOptions.offset,
      },
    );
  }

  /**
   * Retrieve a genre from the database by its id.
   * @param id The id of the genre to retrieve.
   * @returns A promise of the genre.
   */
  async findOne(id: string): Promise<Genre> {
    const genre = await this.genreRepository.findOne(id);
    if (!genre) ENTITY_NOT_FOUND('Genre', id);
    return genre;
  }

  /**
   * Create a new genre in the database.
   * @param genreData A DTO containing the data of the genre to create.
   * @returns A promise of the created genre.
   */
  async create(genreData: CreateGenreDto): Promise<Genre> {
    const genre: Genre = this.genreRepository.create({
      ...genreData,
    });
    await this.genreRepository.persistAndFlush(genre);
    return genre;
  }

  /**
   * Update an existing genre in the database.
   * @param id The id of the genre to update.
   * @param genreData A DTO containing the data of the genre to update.
   * @returns A promise of the updated genre.
   */
  async update(id: string, genreData: CreateGenreDto): Promise<Genre> {
    const genre = await this.genreRepository.findOne(id);
    if (!genre) ENTITY_NOT_FOUND('Genre', id);

    wrap(genre).assign(genreData);
    await this.genreRepository.flush();
    return genre;
  }

  /**
   * Delete an existing genre from the database.
   * @param id The id of the genre to delete.
   * @returns A promise of the deleted genre.
   */
  async delete(id: string): Promise<void> {
    const genre = await this.genreRepository.findOne(id);
    if (!genre) ENTITY_NOT_FOUND('Genre', id);

    await this.genreRepository.removeAndFlush(genre);
    return;
  }
}
