import { useCallback, useEffect, useRef, useState } from 'react';

import { getCharacters } from '@/api/getCharacters';
import type { TCharacter, TFilters } from '@/shared/types';

type TUseLoadCharactersProps = {
  filters: TFilters;
};

export const useLoadCharacters = ({ filters }: TUseLoadCharactersProps) => {
  const [characters, setCharacters] = useState<TCharacter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);
  const loadNextPageControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    setCurrentPage(1);
    setCharacters([]);
    const loadCharacters = async () => {
      try {
        setIsLoading(true);
        const data = await getCharacters({ filters, signal, page: 1 });
        setCharacters(data.results);
        setHasNextPage(data.info.next !== null);
        setError(null);
      } catch (error) {
        if (error instanceof Error && (error.message === 'Request aborted' || error.name === 'AbortError')) {
          return;
        }
        const message = error instanceof Error ? error.message : String(error);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };
    loadCharacters();

    return () => controller.abort();
  }, [filters]);

  const loadNextPage = useCallback(async (): Promise<void> => {
    if (loadNextPageControllerRef.current) {
      loadNextPageControllerRef.current.abort();
    }
    const controller = new AbortController();
    loadNextPageControllerRef.current = controller;
    const signal = controller.signal;

    if (!hasNextPage || isNextPageLoading) {
      loadNextPageControllerRef.current = null;
      return;
    }

    setIsNextPageLoading(true);
    setCurrentPage((prevPage) => prevPage + 1);

    try {
      const nextPage = currentPage + 1;
      const data = await getCharacters({ filters, signal, page: nextPage });
      setCharacters((prev) => [...prev, ...data.results]);
      setHasNextPage(!!data.info.next);
    } catch (error) {
      if (error instanceof Error && (error.message === 'Request aborted' || error.name === 'AbortError')) {
        console.error(error);
        setCurrentPage((prev) => prev - 1);
      }
    } finally {
      setIsNextPageLoading(false);
      if (loadNextPageControllerRef.current === controller) {
        loadNextPageControllerRef.current = null;
      }
    }
  }, [filters, hasNextPage, isNextPageLoading, currentPage]);

  return { characters, isLoading, error, hasNextPage, isNextPageLoading, loadNextPage };
};
