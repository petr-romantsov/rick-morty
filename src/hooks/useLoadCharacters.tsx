import { useCallback, useMemo } from 'react';

import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

import {
  type TGetCharactersResponse,
  getCharacters
} from '@/api/getCharacters';
import { QUERY_KEYS } from '@/shared/constants';
import type { TCharacter, TFilters } from '@/shared/types';

const INITIAL_PAGE = 1;

type TUseLoadCharactersProps = {
  filters: TFilters;
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
    staleTime: 1000 * 60 * 60 // 1 час
  });

  const updateCharacter = useCallback(
    (updatedCharacter: TCharacter) => {
      queryClient.setQueryData<{
        pages: TGetCharactersResponse[];
        pageParams: number[];
      }>(queryKey, (prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          pages: prev.pages.map((page) => {
            return {
              ...page,
              results: page.results.map((character) => {
                return character.id === updatedCharacter.id
                  ? updatedCharacter
                  : character;
              })
            };
          })
        };
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
