export function useLoggedIn(): boolean {
  const accessToken = localStorage.getItem('access_token');

  // TODO verify accessToken

  return !!accessToken;
}
