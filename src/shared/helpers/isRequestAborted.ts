export const isRequestAborted = (error: unknown) =>
  error instanceof Error && (error.message === 'Request aborted' || error.name === 'AbortError');
