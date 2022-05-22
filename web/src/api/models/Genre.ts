import { Base } from './Base';
import { Movie } from './Movie';

export interface Genre extends Base {
  name: string;
  movies: Movie[];
}
