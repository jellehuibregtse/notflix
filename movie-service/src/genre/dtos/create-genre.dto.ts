import { IsNotEmpty } from 'class-validator';

export class CreateGenreDto {
  @IsNotEmpty()
  name: string;

  constructor(data?: Partial<CreateGenreDto>) {
    Object.assign(this, data);
  }
}
