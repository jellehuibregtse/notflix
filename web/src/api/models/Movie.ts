import { Base } from './Base';
import { Genre } from './Genre';

export interface Movie extends Base {
  title: string;
  overview: string;
  releaseDate: Date;
  runtime: number;
  posterPath: string;
  genres: Genre[];
}
