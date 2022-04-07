import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class GenreDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  constructor(data?: Partial<GenreDto>) {
    Object.assign(this, data);
  }
}
