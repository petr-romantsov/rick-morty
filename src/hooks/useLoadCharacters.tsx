import { useCallback, useMemo } from 'react';

import {
  type InfiniteData,
  useInfiniteQuery,
  useQueryClient
} from '@tanstack/react-query';

import {
  type TGetCharactersResponse,
  getCharacters
} from '@/api/getCharacters';
import { ONE_HOUR, QUERY_KEYS } from '@/shared/constants';
import type { TCharacter, TFilters } from '@/shared/types';

const INITIAL_PAGE = 1;

type TUseLoadCharactersProps = {
  filters: TFilters;
};

const replaceCharacter = (
  data: InfiniteData<TGetCharactersResponse, number>,
  updatedCharacter: TCharacter
): InfiniteData<TGetCharactersResponse, number> => {
  const patchResults = (results: TCharacter[]) =>
    results.map((character) =>
      character.id === updatedCharacter.id ? updatedCharacter : character
    );

  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      results: patchResults(page.results)
    }))
  };
};

export const useLoadCharacters = ({ filters }: TUseLoadCharactersProps) => {
  const queryClient = useQueryClient();

  const queryKey = useMemo(
    () => [
      QUERY_KEYS.CHARACTERS,
      filters.name ?? '',
      filters.species ?? '',
      filters.gender ?? '',
      filters.status ?? ''
    ],
    [filters.name, filters.species, filters.gender, filters.status]
  );

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    isError
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam, signal }) =>
      getCharacters({ filters, page: pageParam, signal }),
    initialPageParam: INITIAL_PAGE,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.info.next ? allPages.length + 1 : null,
    staleTime: ONE_HOUR
  });

  const updateCharacter = useCallback(
    (updatedCharacter: TCharacter) => {
      queryClient.setQueryData<{
        pages: TGetCharactersResponse[];
        pageParams: number[];
      }>(queryKey, (prev) => {
        if (!prev) return prev;

        return replaceCharacter(prev, updatedCharacter);
      });
    },
    [queryClient, queryKey]
  );

  return {
    characters: data?.pages.flatMap((page) => page.results) || [],
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    updateCharacter
  };
};
