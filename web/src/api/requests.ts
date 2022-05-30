export const executeRequest = async <TResponse>(
  path: string,
  requestInit?: RequestInit,
): Promise<TResponse> => {
  const response = await fetch(path, requestInit);
  const json = await response
    .json()
    .then((original) => original)
    .catch(() => {
      const error: { code: number; message: string; errors: any } = {
        code: response.status,
        message: response.statusText,
        errors: {},
      };
      return error;
    });

  if (!response.ok) {
    return Promise.reject(json);
  }

  return json as TResponse;
};

export const defaultFetch = async <TResponse>(
  path: string,
  queryParams?: Record<string, any>,
): Promise<TResponse> => {
  return executeRequest<TResponse>(path, {
    ...queryParams,
    headers: {
      ...queryParams?.headers,
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  });
};

export const defaultCreate = <TRequest, TResponse = TRequest>(path: string) => {
  return async (values: TRequest): Promise<TResponse> => {
    return executeRequest<TResponse>(path, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
  };
};

export const defaultUpdate =
  <TRequest, TResponse = TRequest>(path: string) =>
  async (values: TRequest): Promise<TResponse> => {
    return executeRequest<TResponse>(path, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
  };

export const defaultDelete =
  <TResponse>(path: string) =>
  async (): Promise<TResponse> => {
    return executeRequest<TResponse>(path, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
  };
