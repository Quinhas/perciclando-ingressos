import ApplicationException from '@/errors/application-exception';
import axios from 'axios';
import { getAccessToken } from '../get-access-token';
import { httpClient } from '../http-client';

declare interface APIError {
  error: {
    message: string;
  };
}

interface TicketAPI {
  id: string;
  name: string;
  number: number;
  createdBy: Date;
  createdAt: Date;
}

type TicketGetAllAPIResponse = TicketAPI[];

interface TicketCreateAPIResponse {
  id: string;
  name: string;
  number: number;
  createdBy: Date;
  createdAt: Date;
}

export interface Ticket {
  id: string;
  name: string;
  number: number;
  createdByUser?: {
    id: string;
    username: string;
  };
  validatedAt?: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export const ticketsService = {
  async getAll(): Promise<Ticket[]> {
    try {
      const { data } = await httpClient.get<TicketGetAllAPIResponse>(
        `/tickets`,
        {
          headers: { Authorization: `Bearer ${getAccessToken()}` },
        },
      );

      return data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const { data } = error.response as { data: APIError };
        throw new ApplicationException(data.error.message);
      }

      throw new ApplicationException(
        'Could not continue. Contact an administrator.',
      );
    }
  },
  async getById({ id }: { id: string }) {
    try {
      const { data } = await httpClient.get<TicketCreateAPIResponse>(
        `/tickets/${id}`,
        {
          headers: { Authorization: `Bearer ${getAccessToken()}` },
        },
      );

      return {
        ...data,
      };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const { data } = error.response as { data: APIError };
        throw new ApplicationException(data.error.message);
      }

      throw new ApplicationException(
        'Could not continue. Contact an administrator.',
      );
    }
  },

  async create({
    name,
    number,
  }: {
    name: string;
    number: number;
  }): Promise<Ticket> {
    try {
      const { data } = await httpClient.post<TicketCreateAPIResponse>(
        '/tickets',
        {
          name,
          number,
        },
        {
          headers: { Authorization: `Bearer ${getAccessToken()}` },
        },
      );
      return {
        ...data,
      };
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const { data } = error.response as { data: APIError };
        throw new ApplicationException(data.error.message);
      }

      throw new ApplicationException(
        'Could not continue. Contact an administrator.',
      );
    }
  },

  async validate({ id }: { id: string }): Promise<void> {
    try {
      await httpClient.post(
        '/tickets/validate',
        {
          id,
        },
        {
          headers: { Authorization: `Bearer ${getAccessToken()}` },
        },
      );
      return;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const { data } = error.response as { data: APIError };
        throw new ApplicationException(data.error.message);
      }

      throw new ApplicationException(
        'Could not continue. Contact an administrator.',
      );
    }
  },
};
