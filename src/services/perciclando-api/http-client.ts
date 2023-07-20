import axios, { AxiosInstance } from 'axios';

export const httpClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PERCICLANDO_API_URL,
});
