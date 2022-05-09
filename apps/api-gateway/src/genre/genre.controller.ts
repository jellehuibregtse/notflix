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
import { Observable } from 'rxjs';
import { Genre } from '@app/genre';

@ApiTags('genres')
@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  @ApiOperation({ summary: 'Get all genres' })
  @ApiOkResponse()
  async findAll(): Promise<Observable<Genre[]>> {
    return this.genreService.findAll();
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'Genre id' })
  @ApiOperation({ summary: 'Get genre by id' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async findOne(@Param('id') id: string): Promise<Observable<string>> {
    return this.genreService.findOne(id);
  }

  @Post()
  @ApiBody({ type: Genre })
  @ApiOperation({ summary: 'Create a genre' })
  @ApiCreatedResponse()
  @ApiBadRequestResponse()
  async create(@Body() genre: Genre): Promise<Observable<Genre>> {
    return this.genreService.create(genre);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'Genre id' })
  @ApiBody({ type: Genre })
  @ApiOperation({ summary: 'Update a genre' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async update(
    @Param('id') id: string,
    @Body() genre: Genre,
  ): Promise<Observable<Genre>> {
    return this.genreService.update(id, genre);
  }

  @Delete(':id')
  @ApiParam({ name: 'id', description: 'Genre id' })
  @ApiOperation({ summary: 'Delete a genre' })
  @ApiOkResponse()
  @ApiNotFoundResponse()
  async delete(@Param('id') id: string): Promise<Observable<void>> {
    return this.genreService.delete(id);
  }
}
