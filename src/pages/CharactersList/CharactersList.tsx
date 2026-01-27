import { useCallback, useEffect, useState } from 'react';

import { useDebounce, useLoadCharacters } from '@/hooks';
import { InfinityScroll, Loader, MainLogo } from '@/shared/components';
import { showErrorToast } from '@/shared/helpers';
import type { TCharacter, TFilters } from '@/shared/types';
import { CharacterCard, FilterPanel } from '@/widgets';

export const CharactersList = () => {
  const [nameInputValue, setNameInputValue] = useState('');
  const [filters, setFilters] = useState<TFilters>({
    name: '',
    species: '',
    gender: '',
    status: null
  });
  const { characters, isLoading, error, hasNextPage, isNextPageLoading, setCurrentPage, updateCharacter } =
    useLoadCharacters({
      filters
    });

  const SmallLoader = <Loader size='small' />;

  const updateFiltersName = useCallback((value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, name: value }));
  }, []);

  const debouncedUpdateFiltersName = useDebounce({
    cb: updateFiltersName,
    delay: 1000
  });

  const handleNameChange = useCallback(
    (value: string) => {
      setNameInputValue(value);
      debouncedUpdateFiltersName(value);
    },
    [debouncedUpdateFiltersName]
  );

  const handleFilterChange = useCallback((filter: keyof TFilters, value: string | null) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: value
    }));
  }, []);

  const renderCharacter = useCallback((character: TCharacter) => {
    return <CharacterCard character={character} onUpdate={updateCharacter} />;
  }, []);

  const getCharacterKey = useCallback((character: TCharacter) => character.id, []);

  const loadNextPage = useCallback(() => {
    if (!isLoading && hasNextPage && !isNextPageLoading) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [isLoading, hasNextPage, isNextPageLoading]);

  useEffect(() => {
    if (error) {
      showErrorToast(error);
    }
  }, [error]);

  if (isLoading) {
    return (
      <>
        <MainLogo />
        <Loader size='large' text='Loading characters...' />
      </>
    );
  }

  return (
    <>
      <MainLogo />
      <FilterPanel
        nameValue={nameInputValue}
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleNameChange={handleNameChange}
      />
      <InfinityScroll
        items={characters}
        renderItem={renderCharacter}
        getItemKey={getCharacterKey}
        loadNextPage={loadNextPage}
        hasNextPage={hasNextPage}
        isNextPageLoading={isNextPageLoading}
        loader={SmallLoader}
      />
    </>
  );
};
