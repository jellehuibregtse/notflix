import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
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
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { Genre } from './entities/genre.entity';
import { Express, Request, Response } from 'express';
import { PageOptionsDto } from '../dtos/page-options.dto';
import { paginate } from '../helpers/pagination.helper';
import { CreateGenreDto } from './dtos/create-genre.dto';

@ApiTags('genres')
@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  @ApiOperation({ summary: 'Get all genres' })
  @ApiOkResponse()
  async findAll(
    @Query() pageOptions?: PageOptionsDto,
    @Res({ passthrough: true }) response?: Response,
    @Req() request?: Request,
  ): Promise<Genre[]> {
    return paginate<Genre>(
      request,
      response,
      await this.genreService.findAll(pageOptions),
      pageOptions,
    );
  }

  @Get(':id')
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async findOne(@Param('id') id: string): Promise<Genre> {
    return this.genreService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  @ApiConflictResponse()
  async create(@Body() genre: CreateGenreDto): Promise<Genre> {
    return this.genreService.create(genre);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a genre' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async update(
    @Param('id') id: string,
    @Body() genre: CreateGenreDto,
  ): Promise<Genre> {
    return this.genreService.update(id, genre);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a genre' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async delete(@Param('id') id: string): Promise<void> {
    return this.genreService.delete(id);
  }
}
