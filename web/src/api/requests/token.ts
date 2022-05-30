interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export const useRegister = (email: string, password: string) => {
  fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(async (response) => {
    if (response.ok)
      return response.json().then((body: TokenResponse) => {
        window.location.assign('/browse');
        localStorage.setItem('access_token', body.access_token);
      });
  });
};

export const useLogin = (email: string, password: string) => {
  fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(async (response) => {
    if (response.ok)
      return response.json().then((body: TokenResponse) => {
        window.location.assign('/browse');
        localStorage.setItem('access_token', body.access_token);
      });
  });
};

export const useLogout = () => {
  localStorage.removeItem('accessToken');
  window.location.assign('/');
};
