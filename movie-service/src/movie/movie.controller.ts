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
import { Movie } from './entities/movie.entity';
import { MovieDto } from './dtos/movie.dto';

@ApiTags('movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @ApiOperation({ summary: 'Get all movies' })
  @ApiOkResponse()
  async findAll(): Promise<Movie[]> {
    return this.movieService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Movie id' })
  @ApiOperation({ summary: 'Get movie by id' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async findOne(@Param('id') id: string): Promise<Movie> {
    return this.movieService.findOne(id);
  }

  @Post()
  @ApiBody({ type: MovieDto })
  @ApiOperation({ summary: 'Create a movie' })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  async create(@Body() movie: MovieDto): Promise<Movie> {
    return this.movieService.create(movie);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Movie id' })
  @ApiBody({ type: MovieDto })
  @ApiOperation({ summary: 'Update a movie' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async update(
    @Param('id') id: string,
    @Body() movie: MovieDto,
  ): Promise<Movie> {
    return this.movieService.update(id, movie);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Movie id' })
  @ApiOperation({ summary: 'Delete a movie' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async delete(@Param('id') id: string): Promise<void> {
    return this.movieService.delete(id);
  }
}
