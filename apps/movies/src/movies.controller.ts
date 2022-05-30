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
import { Movie } from './entities/movie.entity';
import { Request, Response } from 'express';
import { MoviesService } from './movies.service';
import { PageOptionRequest, paginate } from '@app/common';
import { CreateMovieRequest } from './dtos/create-movie.request';

@ApiTags('movies')
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  @ApiOkResponse()
  @ApiOperation({ summary: 'Get all movies' })
  async findAll(
    @Query() pageOptions?: PageOptionRequest,
    @Res({ passthrough: true }) response?: Response,
    @Req() request?: Request,
  ): Promise<Movie[]> {
    return paginate<Movie>(
      request,
      response,
      await this.moviesService.findAll(pageOptions),
      pageOptions,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get movie by id' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async findOne(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a movie' })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiConflictResponse()
  async create(@Body() movie: CreateMovieRequest): Promise<Movie> {
    return this.moviesService.create(movie);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a movie' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiConflictResponse()
  async update(
    @Param('id') id: string,
    @Body() movie: CreateMovieRequest,
  ): Promise<Movie> {
    return this.moviesService.update(id, movie);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a movie' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async delete(@Param('id') id: string): Promise<void> {
    return this.moviesService.delete(id);
  }
}
