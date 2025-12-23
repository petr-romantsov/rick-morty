import { useCallback, useEffect, useRef, useState } from 'react';

import { getCharacters } from '@/api/getCharacters';
import type { TCharacter, TFilters } from '@/shared/types';

const INITIAL_PAGE = 1;

type TUseLoadCharactersProps = {
  filters: TFilters;
};

type TStateRef = {
  filters: TFilters;
  currentPage: number;
  isLoading: boolean;
  hasNextPage: boolean;
  isNextPageLoading: boolean;
};

const isRequestAborted = (error: unknown) =>
  error instanceof Error && (error.message === 'Request aborted' || error.name === 'AbortError');

export const useLoadCharacters = ({ filters }: TUseLoadCharactersProps) => {
  const [characters, setCharacters] = useState<TCharacter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadCharacters = useCallback(async () => {
    if (abortControllerRef.current) abortControllerRef.current.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    if (currentPage === INITIAL_PAGE) {
      setIsLoading(true);
    } else {
      setIsNextPageLoading(true);
    }

    try {
      const data = await getCharacters({ filters, signal: controller.signal, page: currentPage });

      if (controller.signal.aborted) return;

      if (currentPage === INITIAL_PAGE) {
        setCharacters(data.results);
      } else {
        setCharacters([...characters, ...data.results]);
      }

      setHasNextPage(!!data.info.next);
    } catch (error) {
      if (isRequestAborted(error)) return;
      const message = error instanceof Error ? error.message : String(error);
      setError(message);
    } finally {
      if (controller.signal.aborted) return;
      setIsLoading(false);
      setIsNextPageLoading(false);
    }
  }, [filters, currentPage]);

  useEffect(() => {
    loadCharacters();

    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [loadCharacters]);

  return { characters, isLoading, error, hasNextPage, isNextPageLoading, setCurrentPage };
};
