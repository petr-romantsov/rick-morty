import axios, { HttpStatusCode } from 'axios';

export const isNotFoundError = (error: unknown): boolean => {
  return (
    axios.isAxiosError(error) &&
    error.response?.status === HttpStatusCode.NotFound
  );
};
