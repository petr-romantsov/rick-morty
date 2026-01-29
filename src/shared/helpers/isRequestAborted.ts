import axios from 'axios';

export const isRequestAborted = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return error.code === 'ERR_CANCELED' || error.name === 'CanceledError';
  }

  if (error instanceof DOMException) {
    return error.name === 'AbortError';
  }

  return error instanceof Error && (error.name === 'AbortError' || error.message === 'Request aborted');
};
