import { ApplicationContainer } from './components/container/ApplicationContainer';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Login } from './pages/login/Login';
import { Browse } from './pages/browse/Browse';
import { useLoggedIn } from './hooks/useLoggedIn';
import { VideoPlayer } from './pages/player/VideoPlayer';

export default function App(): JSX.Element {
  const loggedIn = useLoggedIn();

  return (
    <ApplicationContainer>
      <Routes>
        {!loggedIn ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </>
        ) : (
          <>
            <Route path="/browse" element={<Browse />} />
            <Route path="/play" element={<VideoPlayer />} />
          </>
        )}
      </Routes>
    </ApplicationContainer>
  );
}
