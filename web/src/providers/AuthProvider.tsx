import { createContext, ReactNode, useEffect, useState } from 'react';
import { CustomLoader } from '../components/loader/CustomLoader';
import { useLoggedIn } from '../hooks/useLoggedIn';

const AuthContext = createContext<string | null>(null);

interface AuthState {
  token: string | null;
  loading: boolean;
}

const AuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const loggedIn = useLoggedIn();
  const [authState, setState] = useState<AuthState>({
    token: null,
    loading: true,
  });

  useEffect(() => {
    if (!loggedIn) {
      window.location.assign('/login');
      setState({
        token: null,
        loading: false,
      });
    } else {
      setState({
        token: localStorage.getItem('accessToken'),
        loading: false,
      });
    }
  }, []);

  if (authState?.loading) return <CustomLoader />;

  return (
    <AuthContext.Provider value={authState.token}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
