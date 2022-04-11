import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Genre } from './dtos/genre.dto';

@Injectable()
export class GenreService {
  constructor(
    @Inject('MOVIE_SERVICE') private readonly movieService: ClientProxy,
  ) {}

  findAll() {
    return this.movieService.send({ cmd: 'getAllGenres' }, {});
  }

  findOne(id: string) {
    return this.movieService.send<string>({ cmd: 'getGenreById' }, { id });
  }

  create(genre: Genre) {
    return this.movieService.send<Genre>({ cmd: 'createGenre' }, genre);
  }

  update(id: string, genre: Genre) {
    const genreDto = { id, ...genre };

    return this.movieService.send<Genre>({ cmd: 'updateGenre' }, genreDto);
  }

  delete(id: string) {
    return this.movieService.send<void, string>({ cmd: 'deleteGenre' }, id);
  }
}
