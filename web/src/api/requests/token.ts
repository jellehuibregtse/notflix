interface TokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

export const useRegister = (
  form: any,
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
      return response.json().then((body: TokenResponse) => {
        window.location.assign('/browse');
        localStorage.setItem('access_token', body.access_token);
      });
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
        window.location.assign('/browse');
        localStorage.setItem('access_token', body.access_token);
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
