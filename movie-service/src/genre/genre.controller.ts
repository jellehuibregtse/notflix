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
import { GenreService } from './genre.service';
import { Genre } from './entities/genre.entity';
import { GenreDto } from './dtos/genre.dto';

@ApiTags('genres')
@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  @ApiOperation({ summary: 'Get all genres' })
  @ApiOkResponse()
  async findAll(): Promise<Genre[]> {
    return this.genreService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Genre id' })
  @ApiOperation({ summary: 'Get genre by id' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async findOne(@Param('id') id: string): Promise<Genre> {
    return this.genreService.findOne(id);
  }

  @Post()
  @ApiBody({ type: GenreDto })
  @ApiOperation({ summary: 'Create a genre' })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  async create(@Body() genre: GenreDto): Promise<Genre> {
    return this.genreService.create(genre);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Genre id' })
  @ApiBody({ type: GenreDto })
  @ApiOperation({ summary: 'Update a genre' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async update(
    @Param('id') id: string,
    @Body() genre: GenreDto,
  ): Promise<Genre> {
    return this.genreService.update(id, genre);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Genre id' })
  @ApiOperation({ summary: 'Delete a genre' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async delete(@Param('id') id: string): Promise<void> {
    return this.genreService.delete(id);
  }
}
