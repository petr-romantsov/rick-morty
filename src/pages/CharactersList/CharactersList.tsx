import { useCallback, useEffect, useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';

import { useDebounce, useLoadCharacters } from '@/hooks';
import { InfinityScroll, Loader, MainLogo, PageLayout } from '@/shared/components';
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
  const { characters, isLoading, error, loadNextPage, hasNextPage, isNextPageLoading } = useLoadCharacters({
    filters
  });

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

  const showErrorToast = useCallback((message: string): void => {
    toast.error(message);
  }, []);

  const renderCharacter = useCallback((character: TCharacter) => {
    return <CharacterCard character={character} />;
  }, []);

  useEffect(() => {
    if (error) {
      showErrorToast(error);
    }
  }, [error, showErrorToast]);

  if (isLoading) {
    return (
      <PageLayout>
        <MainLogo />
        <Loader size='large' text='Loading characters...' />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
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
        getItemKey={(character: TCharacter) => character.id}
        loadNextPage={loadNextPage}
        hasNextPage={hasNextPage}
        isNextPageLoading={isNextPageLoading}
        loader={<Loader size='small' />}
      />
      <Toaster
        position='bottom-right'
        toastOptions={{
          style: {
            backgroundColor: '#fff5f3',
            border: '1px solid #f4b0a1',
            borderRadius: '12px',
            background: '#fff5f3'
          }
        }}
      />
    </PageLayout>
  );
};
