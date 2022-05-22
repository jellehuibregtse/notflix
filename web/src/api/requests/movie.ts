import { useFetch } from '../hooks';
import { Movie } from '../models/Movie';
import { UseQueryOptions } from 'react-query';

export const useGetMovies = (options: UseQueryOptions<Movie> = {}) => {
  return useFetch<Movie>('/api/movies', {}, options);
};

export const useGetMovie = (
  id: string,
  options: UseQueryOptions<Movie> = {},
) => {
  return useFetch<Movie>(`/api/movies/${id}`, {}, options);
};
