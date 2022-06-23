export function useLoggedIn(): boolean {
  return !!localStorage.getItem('access_token');
}
