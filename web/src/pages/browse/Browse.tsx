import { ChooseProfile } from '../../components/profile/ChooseProfile';
import { useLoggedIn } from '../../hooks/useLoggedIn';
import { Slider } from '../../components/browse/Slider';

export function Browse() {
  const loggedIn = useLoggedIn(true);

  if (!loggedIn) {
    return <ChooseProfile />;
  }

  return <Slider />;
}
