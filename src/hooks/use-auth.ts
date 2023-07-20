import { AuthContext, AuthContextProps } from '@/contexts/auth-context';
import { useContext } from 'react';

export function useAuth(): AuthContextProps {
  const value = useContext(AuthContext);
  return value;
}
