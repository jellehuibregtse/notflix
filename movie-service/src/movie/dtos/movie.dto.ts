import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class MovieDto {
  @ApiProperty()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  overview: string;

  @ApiProperty()
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

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  posterPath: string;

  constructor(data?: Partial<MovieDto>) {
    Object.assign(this, data);
  }
}
