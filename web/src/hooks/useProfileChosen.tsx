export function useProfileChosen(): boolean {
  return !!localStorage.getItem('profile_chosen');
}
