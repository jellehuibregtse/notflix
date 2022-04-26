import { IsNotEmpty } from 'class-validator';

export class GenreDto {
  @IsNotEmpty()
  name: string;

  constructor(data?: Partial<GenreDto>) {
    Object.assign(this, data);
  }
}
