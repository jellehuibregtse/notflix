import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Movie } from './entities/movie.entity';
import { EntityRepository } from '@mikro-orm/postgresql';
import {
  ENTITY_NOT_FOUND,
  PageOptionRequest,
  PaginatedResult,
} from '@app/common';
import { CreateMovieRequest } from './dtos/create-movie.request';
import { wrap } from '@mikro-orm/core';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: EntityRepository<Movie>,
  ) {}

  /**
   * Retrieve all movies from the database.
   * @param pageOptions - Pagination options.
   * @returns A promise of a list of movies.
   */
  async findAll(
    pageOptions: PageOptionRequest,
  ): Promise<PaginatedResult<Movie>> {
    return await this.moviesRepository.findAndCount(
      {},
      { limit: pageOptions.limit, offset: pageOptions.offset },
    );
  }

  /**
   * Retrieve a movie from the database by its id.
   * @param id The id of the movie to retrieve.
   * @returns A promise of the movie.
   */
  async findOne(id: string): Promise<Movie> {
    return await this.moviesRepository.findOneOrFail(id, {
      failHandler: ENTITY_NOT_FOUND('Movie', id),
    });
  }

  /**
   * Create a new movie in the database.
   * @param movieData A DTO containing the data of the movie to create.
   * @returns A promise of the created movie.
   */
  async create(movieData: CreateMovieRequest): Promise<Movie> {
    const movie: Movie = this.moviesRepository.create({
      ...movieData,
    });
    await this.moviesRepository.persistAndFlush(movie);
    return movie;
  }

  /**
   * Update an existing movie in the database.
   * @param id The id of the movie to update.
   * @param movieData A DTO containing the data of the movie to update.
   * @returns A promise of the updated movie.
   */
  async update(id: string, movieData: CreateMovieRequest): Promise<Movie> {
    const movie = await this.moviesRepository.findOne(id);
    wrap(movie).assign(movieData);
    await this.moviesRepository.flush();
    return movie;
  }

  /**
   * Delete an existing movie from the database.
   * @param id The id of the movie to delete.
   * @returns A promise of the deleted movie.
   */
  async delete(id: string): Promise<void> {
    const movie = await this.moviesRepository.findOne(id);
    await this.moviesRepository.removeAndFlush(movie);
    return;
  }
}
