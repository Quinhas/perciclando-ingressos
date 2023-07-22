import ApplicationException from '@/errors/application-exception';
import axios from 'axios';
import { httpClient } from '../http-client';

declare interface APIError {
  message?: string;
  error?: {
    message: string;
  };
}

interface AuthResponse {
  access_token: string;
}

export const authService = {
  async signIn({
    username,
    password,
  }: {
    username: string;
    password: string;
  }): Promise<AuthResponse> {
    try {
      const { data } = await httpClient.post<AuthResponse>('/auth/signin', {
        username,
        password,
      });
      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const { data } = error.response as { data: APIError };
        throw new ApplicationException(
          data.message ??
            data.error?.message ??
            'Could not continue. Contact an administrator.',
        );
      }

      throw new ApplicationException(
        'Could not continue. Contact an administrator.',
      );
    }
  },
};
