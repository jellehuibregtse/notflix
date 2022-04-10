import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Movie } from './movie.controller';

@Injectable()
export class MovieService {
  constructor(
    @Inject('MOVIE_SERVICE') private readonly movieService: ClientProxy,
  ) {}

  findAll() {
    return this.movieService.send({ cmd: 'getAllMovies' }, {});
  }

  findOne(id: string) {
    return this.movieService.send<string>({ cmd: 'getMovieById' }, { id });
  }

  create(movie: Movie) {
    return this.movieService.send<Movie>({ cmd: 'createMovie' }, movie);
  }

  update(id: string, movie: Movie) {
    const movieDto = { id, ...movie };

    return this.movieService.send<Movie>({ cmd: 'updateMovie' }, movieDto);
  }

  delete(id: string) {
    return this.movieService.send<void, string>({ cmd: 'deleteMovie' }, id);
  }
}
