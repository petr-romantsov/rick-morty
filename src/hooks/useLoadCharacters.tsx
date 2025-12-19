import { useCallback, useEffect, useRef, useState } from 'react';

import { getCharacters } from '@/api/getCharacters';
import type { TCharacter, TFilters } from '@/shared/types';

type TUseLoadCharactersProps = {
  filters: TFilters;
};

type TRequestType = 'reset' | 'next';

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

  const stateRef = useRef<TStateRef>({
    filters,
    currentPage: 1,
    isLoading: false,
    hasNextPage: false,
    isNextPageLoading: false
  });

  const resetControllerRef = useRef<AbortController | null>(null);
  const nextPageControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    stateRef.current = {
      ...stateRef.current,
      filters,
      currentPage,
      hasNextPage,
      isLoading,
      isNextPageLoading
    };
  }, [filters, currentPage, hasNextPage, isLoading, isNextPageLoading]);

  const loadCharacters = useCallback(async (requestType: TRequestType) => {
    if (requestType === 'reset') {
      resetControllerRef.current?.abort();
      resetControllerRef.current = null;

      nextPageControllerRef.current?.abort();
      nextPageControllerRef.current = null;

      const controller = new AbortController();
      resetControllerRef.current = controller;

      stateRef.current.isLoading = true;
      stateRef.current.hasNextPage = false;
      stateRef.current.isNextPageLoading = false;
      stateRef.current.currentPage = 1;

      setIsNextPageLoading(false);
      setHasNextPage(false);
      setCharacters([]);
      setCurrentPage(1);
      setIsLoading(true);
      setError(null);

      try {
        const data = await getCharacters({
          filters: stateRef.current.filters,
          signal: controller.signal,
          page: 1
        });

        if (resetControllerRef.current !== controller) return;

        setCharacters(data.results);
        stateRef.current.hasNextPage = !!data.info.next;
        setHasNextPage(!!data.info.next);
        setError(null);
      } catch (error) {
        if (isRequestAborted(error)) return;
        const message = error instanceof Error ? error.message : String(error);
        setError(message);
      } finally {
        if (resetControllerRef.current === controller) {
          resetControllerRef.current = null;
          stateRef.current.isLoading = false;
          setIsLoading(false);
        }
      }
    }

    if (requestType === 'next') {
      const { isLoading, hasNextPage, isNextPageLoading, currentPage } = stateRef.current;

      if (isLoading || !hasNextPage || isNextPageLoading) return;

      nextPageControllerRef.current?.abort();
      nextPageControllerRef.current = null;

      const controller = new AbortController();
      nextPageControllerRef.current = controller;

      stateRef.current.isNextPageLoading = true;
      setIsNextPageLoading(true);
      const nextPage = currentPage + 1;

      try {
        const data = await getCharacters({
          filters: stateRef.current.filters,
          signal: controller.signal,
          page: nextPage
        });

        if (nextPageControllerRef.current !== controller) return;

        setCharacters((prev) => [...prev, ...data.results]);
        stateRef.current.hasNextPage = !!data.info.next;
        setHasNextPage(!!data.info.next);
        stateRef.current.currentPage = nextPage;
        setCurrentPage(nextPage);
      } catch (error) {
        if (isRequestAborted(error)) return;
        const message = error instanceof Error ? error.message : String(error);
        setError(message);
      } finally {
        if (nextPageControllerRef.current === controller) {
          nextPageControllerRef.current = null;
          stateRef.current.isNextPageLoading = false;
          setIsNextPageLoading(false);
        }
      }
    }
  }, []);

  useEffect(() => {
    loadCharacters('reset');

    return () => {
      resetControllerRef.current?.abort();
      resetControllerRef.current = null;
      nextPageControllerRef.current?.abort();
      nextPageControllerRef.current = null;
    };
  }, [filters, loadCharacters]);

  const loadNextPage = useCallback(() => loadCharacters('next'), [loadCharacters]);

  return { characters, isLoading, error, hasNextPage, isNextPageLoading, loadNextPage };
};
