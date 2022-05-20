import { Slider } from '../../components/browse/Slider';
import { AuthProvider } from '../../providers/AuthProvider';

export function Browse() {
  return (
    <AuthProvider>
      <Slider />
    </AuthProvider>
  );
}
