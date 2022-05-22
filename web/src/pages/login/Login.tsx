import { AuthenticationForm } from '../../components/authentication/AuthenticationForm';
import { useLoggedIn } from '../../hooks/useLoggedIn';

export function Login(): JSX.Element {
  const loggedIn = useLoggedIn();

  if (loggedIn) {
    window.location.assign('/browse ');
    return <></>;
  }

  return <AuthenticationForm />;
}
