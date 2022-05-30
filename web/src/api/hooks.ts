import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from 'react-query';
import { defaultCreate, defaultFetch, defaultUpdate } from './requests';

export const useFetch = <TResponse>(
  path: string,
  queryParams?: Record<string, any>,
  options?: UseQueryOptions<TResponse, any>,
) => {
  return useQuery<TResponse, any>(
    [path, queryParams],
    async ({ queryKey }: any) => {
      return defaultFetch<TResponse>(queryKey[0], queryKey[1]);
    },
    options,
  );
};

export const useCreate = <TResponse, TRequest>(
  path: string,
  options?: UseMutationOptions<TResponse, any, any>,
) => {
  return useMutation<TResponse, any, TRequest>(
    [path],
    defaultCreate(path),
    options,
  );
};

export const useUpdate = <TResponse, TRequest>(
  path: string,
  options?: UseMutationOptions<TResponse, any, any>,
) => {
  return useMutation<TResponse, any, TRequest>(
    [path],
    defaultUpdate(path),
    options,
  );
};

export {};
