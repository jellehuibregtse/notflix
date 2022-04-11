import { Controller } from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './entities/movie.entity';
import { MovieDto } from './dtos/movie.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @MessagePattern({ cmd: 'getAllMovies' })
  findAll(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  @MessagePattern({ cmd: 'getMovieById' })
  findOne(id: string): Promise<Movie> {
    return this.movieService.findOne(id);
  }

  @MessagePattern({ cmd: 'createMovie' })
  create(movie: MovieDto): Promise<Movie> {
    return this.movieService.create(movie);
  }

  @MessagePattern({ cmd: 'updateMovie' })
  update(id: string, movie: MovieDto): Promise<Movie> {
    return this.movieService.update(id, movie);
  }

  @MessagePattern({ cmd: 'deleteMovie' })
  delete(id: string): Promise<void> {
    return this.movieService.delete(id);
  }
}
