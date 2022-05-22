export function useLoggedIn(): boolean {
  const accessToken = localStorage.getItem('accessToken');

  // TODO verify accessToken

  return !!accessToken;
}
