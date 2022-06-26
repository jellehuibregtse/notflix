import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Account } from '../models/Account';

export const useGetAccount = () => {
  const [account, setAccount] = useState<Account | null>(null);
  const accessToken = localStorage.getItem('access_token');
  if (!accessToken) return;

  const payload: { sub: string; email: string; iat: number; exp: number } =
    jwt_decode(accessToken);
  const { email } = payload;

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/account/${email}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setAccount(await response.json());
    })();
  }, []);

  return account;
};
