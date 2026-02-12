import axios from 'axios';

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error) && error.response?.status === 404) {
    return '404';
  }

  if (error instanceof Error) return error.message;

  return String(error);
};
