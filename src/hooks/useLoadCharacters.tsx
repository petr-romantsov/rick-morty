import { useCallback, useEffect, useRef, useState } from 'react';

import { getCharacters } from '@/api/getCharacters';
import { getErrorMessage, isRequestAborted } from '@/shared/helpers';
import type { TCharacter, TFilters } from '@/shared/types';

const INITIAL_PAGE = 1;

type TUseLoadCharactersProps = {
  filters: TFilters;
};

export const useLoadCharacters = ({ filters }: TUseLoadCharactersProps) => {
  const [characters, setCharacters] = useState<TCharacter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(INITIAL_PAGE);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [isNextPageLoading, setIsNextPageLoading] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setCurrentPage(INITIAL_PAGE);
    setCharacters([]);
    setError(null);
  }, [filters]);

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

      if (currentPage === INITIAL_PAGE) {
        setCharacters(data.results);
      } else {
        setCharacters((prevCharacters) => [...prevCharacters, ...data.results]);
      }

      setHasNextPage(!!data.info.next);
    } catch (error) {
      if (isRequestAborted(error)) return;
      setHasNextPage(false);
      const message = getErrorMessage(error);
      setError(message);
    } finally {
      if (controller.signal.aborted) return;
      setIsLoading(false);
      setIsNextPageLoading(false);
    }
  }, [filters, currentPage]);

  // загрузка списка персонажей
  useEffect(() => {
    loadCharacters();

    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [loadCharacters]);

  const updateCharacter = useCallback((character: TCharacter) => {
    setCharacters((prev) =>
      prev.map((prevCharacter) => (prevCharacter.id === character.id ? character : prevCharacter))
    );
  }, []);

  return {
    characters,
    isLoading,
    error,
    hasNextPage,
    isNextPageLoading,
    setCurrentPage,
    updateCharacter
  };
};
