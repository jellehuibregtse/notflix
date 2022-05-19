import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
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
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { Movie } from './entities/movie.entity';
import { Request, Response } from 'express';
import { PageOptionsDto } from '../dtos/page-options.dto';
import { CreateMovieDto } from './dtos/create-movie-dto';
import { paginate } from '../helpers/pagination.helper';

@ApiTags('movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  @ApiOkResponse()
  @ApiOperation({ summary: 'Get all movies' })
  async findAll(
    @Query() pageOptions?: PageOptionsDto,
    @Res({ passthrough: true }) response?: Response,
    @Req() request?: Request,
  ): Promise<Movie[]> {
    return paginate<Movie>(
      request,
      response,
      await this.movieService.findAll(pageOptions),
      pageOptions,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get movie by id' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async findOne(@Param('id') id: string): Promise<Movie> {
    return this.movieService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a movie' })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiConflictResponse()
  async create(@Body() movie: CreateMovieDto): Promise<Movie> {
    return this.movieService.create(movie);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a movie' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiConflictResponse()
  async update(
    @Param('id') id: string,
    @Body() movie: CreateMovieDto,
  ): Promise<Movie> {
    return this.movieService.update(id, movie);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a movie' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async delete(@Param('id') id: string): Promise<void> {
    return this.movieService.delete(id);
  }
}
