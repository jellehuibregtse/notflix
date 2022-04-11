import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Entity } from '../../dtos/entity.dto';

export class Movie extends Entity {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  overview: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  releaseDate: Date;

  @ApiProperty({
    description: 'The runtime of the movie in minutes',
    minimum: 0,
  })
  @IsNotEmpty()
  @IsNumber()
  runtime: number;

  @IsNotEmpty()
  @IsString()
  posterPath: string;
}
