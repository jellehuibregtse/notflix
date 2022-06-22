interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export const useRegister = (
  form: any,
  toggle: any,
  name: string,
  email: string,
  password: string,
) => {
  fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  }).then(async (response) => {
    if (response.ok) {
      window.location.assign('/login');
    }
    const responseBody = await response.json();
    return form.setErrors({ email: responseBody.message });
  });
};

export const useLogin = (form: any, email: string, password: string) => {
  fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(async (response) => {
    if (response.ok) {
      return response.json().then((body: TokenResponse) => {
        if (!body.access_token) return;

        localStorage.setItem('access_token', body.access_token);
        window.location.assign('/browse');
      });
    }
    const responseBody = await response.json();
    return form.setErrors({ email: responseBody.message });
  });
};

export const useLogout = () => {
  localStorage.removeItem('access_token');
  window.location.assign('/');
};
