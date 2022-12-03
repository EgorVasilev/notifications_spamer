import {useState} from 'react';
import {authService} from '../services/auth';

export function useAuthToken() {
  const [token, setToken] = useState<string | null>(
    authService.getStoredToken(),
  );

  return {token, setToken};
}
