'use client';
import { Card } from '@/components/ui/card';
import { authService } from '@/services/perciclando-api/auth';
import axios from 'axios';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Loader2 } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface UserProps {
  id?: string;
}

interface SignInDTO {
  username: string;
  password: string;
}

export interface AuthContextProps {
  user: UserProps | undefined;
  isLogged: boolean;
  signIn: (props: SignInDTO) => Promise<void>;
  signOut: () => Promise<void>;
  isLoading: boolean;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({
  children,
}: AuthContextProviderProps): JSX.Element {
  const [user, setUser] = useState<UserProps | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const validateToken = useCallback((token: string): string => {
    try {
      const decodedToken = jwtDecode<JwtPayload & { id: string }>(token);
      return decodedToken.id;
    } catch (error) {
      throw error;
    }
  }, []);

  const signOut = useCallback(async () => {
    setIsLoading(true);
    localStorage.removeItem('perciclando@accessToken');
    setUser(undefined);
    setIsLogged(false);
    router.replace('/admin/signIn');
    setIsLoading(false);
  }, [router]);

  const signIn = useCallback(
    async ({ username, password }: SignInDTO) => {
      setIsLoading(true);
      const data = await authService.signIn({
        username: username,
        password: password,
      });
      const id = validateToken(data.access_token);
      localStorage.setItem('perciclando@accessToken', data.access_token);
      setUser({
        id: id,
      });
      setIsLogged(true);
      setIsLoading(false);
    },
    [validateToken],
  );

  useEffect(() => {
    try {
      setIsLoading(true);
      const localToken = localStorage.getItem('perciclando@accessToken');
      if (!localToken) {
        throw new Error();
      }
      const id = validateToken(localToken);
      setIsLogged(true);
      setUser({
        id: id,
      });
      setIsLoading(false);
    } catch (error) {
      signOut();
    }
  }, [signOut, validateToken]);

  useEffect(() => {
    if (!isLoading && isLogged) {
      if (['/admin/signIn'].includes(pathname)) {
        router.push('/admin');
      }

      const token = localStorage.getItem('perciclando@accessToken') ?? '';

      console.log(token);

      const authInterceptor = axios.interceptors.response.use(
        (res) => {
          console.log(res);
          return res;
        },
        (err) => {
          console.log(err);
          if (axios.isAxiosError(err)) {
            console.log(err.status);
            console.log(err);
            if (err.status === 401 || err.status == 403) {
              signOut();
              return {};
            }
          }

          console.log(err);

          return err as Error;
        },
      );

      return () => {
        axios.interceptors.response.eject(authInterceptor);
      };
    }
  }, [signOut, isLoading, isLogged, router, pathname]);

  const value = useMemo(
    () => ({
      user,
      isLogged,
      signIn,
      signOut,
      isLoading,
    }),
    [user, isLogged, signIn, signOut, isLoading],
  );

  if (isLoading) {
    return (
      <main className='flex items-center justify-center h-screen'>
        <Card className='max-w-[80%] aspect-video flex flex-col shadow-lg p-8 items-center justify-center gap-4'>
          <Loader2 className='animate-spin' />
          <p>Carregando...</p>
        </Card>
      </main>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
