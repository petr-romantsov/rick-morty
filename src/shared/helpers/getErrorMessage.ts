import axios, { HttpStatusCode } from 'axios';

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === HttpStatusCode.NotFound) {
      return 'Not found';
    } else if (
      axios.isAxiosError(error) &&
      error.response?.status === HttpStatusCode.InternalServerError
    ) {
      return 'Internal server error';
    } else if (axios.isAxiosError(error) && error.response?.status === HttpStatusCode.BadRequest) {
      return 'Bad request';
    }
    return `Something went wrong: ${error.message}`;
  } else if (error instanceof Error) {
    return `Something went wrong: ${error.message}`;
  }

  return `Something went wrong: ${String(error)}`;
};
