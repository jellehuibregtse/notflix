export const useRegister = (email: string, password: string) => {
  fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(async (response) => {
    if (response.ok)
      return response.json().then((body: { accessToken: string }) => {
        window.location.assign('/login');
        localStorage.setItem('accessToken', body.accessToken);
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
      return response.json().then((body: { accessToken: string }) => {
        window.location.assign('/login');
        localStorage.setItem('accessToken', body.accessToken);
      });
  });
};

export const useLogout = () => {
  localStorage.removeItem('accessToken');
  window.location.assign('/');
};
