import { ApplicationContainer } from './components/container/ApplicationContainer';
import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/home/Home';
import { Login } from './pages/login/Login';
import { Browse } from './pages/browse/Browse';

export default function App() {
  return (
    <ApplicationContainer>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </ApplicationContainer>
  );
}
