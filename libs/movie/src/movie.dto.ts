import { IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class MovieDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  overview: string;

  @IsNotEmpty()
  @Type(
    /* istanbul ignore next */
    () => Date,
  )
  @IsDate()
  releaseDate: Date;

  @IsNotEmpty()
  @IsNumber()
  runtime: number;

  @IsNotEmpty()
  @IsString()
  posterPath: string;

  constructor(data?: Partial<MovieDto>) {
    Object.assign(this, data);
  }
}
