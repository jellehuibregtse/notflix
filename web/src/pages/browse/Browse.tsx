import { Slider } from '../../components/browse/Slider';
import { ChooseProfile } from '../../components/profile/ChooseProfile';
import { useProfileChosen } from '../../hooks/useProfileChosen';
import { AuthProvider } from '../../providers/AuthProvider';

export function Browse() {
  const profileChosen = useProfileChosen();

  return (
    <AuthProvider>
      {profileChosen ? <Slider /> : <ChooseProfile />}
    </AuthProvider>
  );
}
