import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { Movie } from '@app/movie/movie.entity';
import { Injectable } from '@nestjs/common';
import { MovieDto } from '@app/movie/movie.dto';
import { ENTITY_NOT_FOUND } from '../exceptions';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: EntityRepository<Movie>,
  ) {}

  /**
   * Retrieve all movies from the database.
   * @returns A promise of a list of movies.
   */
  async findAll(): Promise<Movie[]> {
    return await this.movieRepository.findAll();
  }

  /**
   * Retrieve a movie from the database by its id.
   * @param id The id of the movie to retrieve.
   * @returns A promise of the movie.
   */
  async findOne(id: string): Promise<Movie> {
    const movie = await this.movieRepository.findOne(id);
    if (!movie) ENTITY_NOT_FOUND('Movie', id);
    return movie;
  }

  /**
   * Create a new movie in the database.
   * @param movieData A DTO containing the data of the movie to create.
   * @returns A promise of the created movie.
   */
  async create(movieData: MovieDto): Promise<Movie> {
    const movie: Movie = this.movieRepository.create({
      ...movieData,
    });
    await this.movieRepository.persistAndFlush(movie);
    return movie;
  }

  /**
   * Update an existing movie in the database.
   * @param id The id of the movie to update.
   * @param movieData A DTO containing the data of the movie to update.
   * @returns A promise of the updated movie.
   */
  async update(id: string, movieData: MovieDto): Promise<Movie> {
    const movie = await this.movieRepository.findOne(id);
    if (!movie) ENTITY_NOT_FOUND('Movie', id);

    wrap(movie).assign(movieData);
    await this.movieRepository.flush();
    return movie;
  }

  /**
   * Delete an existing movie from the database.
   * @param id The id of the movie to delete.
   * @returns A promise of the deleted movie.
   */
  async delete(id: string): Promise<void> {
    const movie = await this.movieRepository.findOne(id);
    if (!movie) ENTITY_NOT_FOUND('Movie', id);

    await this.movieRepository.removeAndFlush(movie);
    return;
  }
}
