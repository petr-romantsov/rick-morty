import { useCallback, useEffect, useState } from 'react';

import { useDebounce, useLoadCharacters } from '@/hooks';
import { InfinityScroll, Loader, MainLogo } from '@/shared/components';
import { CharacterCardSkeleton } from '@/shared/components';
import { showErrorToast } from '@/shared/helpers';
import type { TFilters } from '@/shared/types';
import { CharacterCard, FilterPanel } from '@/widgets';

import './CharacterList.scss';

const CharactersList = () => {
  const [nameInputValue, setNameInputValue] = useState('');
  const [filters, setFilters] = useState<TFilters>({
    name: '',
    species: '',
    gender: '',
    status: null
  });
  const {
    characters,
    isLoading,
    error,
    hasNextPage,
    isNextPageLoading,
    setCurrentPage,
    updateCharacter
  } = useLoadCharacters({
    filters
  });

  const SmallLoader = <Loader size='small' />;
  const DEFAULT_CARDS_SKELETONS_COUNT = 10;

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

  const loadNextPage = useCallback(() => {
    if (!isLoading && hasNextPage && !isNextPageLoading) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [isLoading, hasNextPage, isNextPageLoading]);

  useEffect(() => {
    if (error && error !== '404') {
      showErrorToast(error);
    }
  }, [error]);

  const renderPageContent = () => {
    if (error === '404') {
      return (
        <div className='characterList__notFoundMessage'>
          No characters with these parameters were found
        </div>
      );
    }

    return (
      <InfinityScroll
        loader={SmallLoader}
        hasNextPage={hasNextPage}
        isNextPageLoading={isNextPageLoading}
        loadNextPage={loadNextPage}
      >
        <ul className='characterList'>
          {isLoading && characters.length === 0
            ? Array.from({ length: DEFAULT_CARDS_SKELETONS_COUNT }).map((_, index) => (
                <li key={index}>
                  <CharacterCardSkeleton />
                </li>
              ))
            : characters.map((character) => (
                <li key={character.id}>
                  <CharacterCard character={character} onUpdate={updateCharacter} />
                </li>
              ))}
        </ul>
      </InfinityScroll>
    );
  };

  return (
    <>
      <MainLogo />
      <FilterPanel
        nameValue={nameInputValue}
        filters={filters}
        handleFilterChange={handleFilterChange}
        handleNameChange={handleNameChange}
      />
      {renderPageContent()}
    </>
  );
};

export default CharactersList;
