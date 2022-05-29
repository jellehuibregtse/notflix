import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieRequest {
  @ApiProperty({
    default: 'Star Wars',
  })
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    default:
      'Princess Leia is captured and held hostage by the evil Imperial forces in their effort to take over the galactic Empire. Venturesome Luke Skywalker and dashing captain Han Solo team together with the loveable robot duo R2-D2 and C-3PO to rescue the beautiful princess and restore peace and justice in the Empire.',
  })
  @IsNotEmpty()
  overview: string;

  @ApiProperty({
    default: new Date('1977-12-15').toISOString(),
  })
  @IsNotEmpty()
  @Type(
    /* istanbul ignore next */
    () => Date,
  )
  @IsDate()
  releaseDate: Date;

  @ApiProperty({
    description: 'The runtime in minutes',
    minimum: 1,
    default: 121,
  })
  @IsNotEmpty()
  @IsPositive()
  @IsNumber()
  runtime: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  posterPath: string;

  constructor(data?: Partial<CreateMovieRequest>) {
    Object.assign(this, data);
  }
}
