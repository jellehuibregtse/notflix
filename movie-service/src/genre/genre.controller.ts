import { Controller } from '@nestjs/common';
import { GenreService } from './genre.service';
import { Genre } from './entities/genre.entity';
import { GenreDto } from './dtos/genre.dto';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @MessagePattern({ cmd: 'getAllGenres' })
  findAll(): Promise<Genre[]> {
    return this.genreService.findAll();
  }

  @MessagePattern({ cmd: 'getGenreById' })
  findOne(id: string): Promise<Genre> {
    return this.genreService.findOne(id);
  }

  @MessagePattern({ cmd: 'createGenre' })
  create(genre: GenreDto): Promise<Genre> {
    return this.genreService.create(genre);
  }

  @MessagePattern({ cmd: 'updateGenre' })
  update(id: string, genre: GenreDto): Promise<Genre> {
    return this.genreService.update(id, genre);
  }

  @MessagePattern({ cmd: 'deleteGenre' })
  delete(id: string): Promise<void> {
    return this.genreService.delete(id);
  }
}
