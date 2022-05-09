import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Observable } from 'rxjs';
import { Movie } from '@app/movie';

@ApiTags('movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @ApiOperation({ summary: 'Get all movies' })
  @ApiOkResponse()
  async findAll(): Promise<Observable<Movie>> {
    return this.movieService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Movie id' })
  @ApiOperation({ summary: 'Get movie by id' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async findOne(@Param('id') id: string): Promise<Observable<string>> {
    return this.movieService.findOne(id);
  }

  @Post()
  @ApiBody({ type: Movie })
  @ApiOperation({ summary: 'Create a movie' })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  async create(@Body() movie: Movie): Promise<Observable<Movie>> {
    return this.movieService.create(movie);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Movie id' })
  @ApiBody({ type: Movie })
  @ApiOperation({ summary: 'Update a movie' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async update(
    @Param('id') id: string,
    @Body() movie: Movie,
  ): Promise<Observable<Movie>> {
    return this.movieService.update(id, movie);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Movie id' })
  @ApiOperation({ summary: 'Delete a movie' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async delete(@Param('id') id: string): Promise<Observable<void>> {
    return this.movieService.delete(id);
  }
}
