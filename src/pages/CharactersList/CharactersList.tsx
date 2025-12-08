import { useCallback, useEffect, useState } from 'react';

import toast, { Toaster } from 'react-hot-toast';

import { useDebounce, useLoadCharacters } from '@/hooks';
import { ErrorBoundary, Loader, MainLogo, PageLayout } from '@/shared/components';
import type { TFilters } from '@/shared/types';
import { CharacterCard, FilterPanel } from '@/widgets';

import './CharactersList.scss';

export const CharactersList = () => {
  const [nameInputValue, setNameInputValue] = useState('');
  const [filters, setFilters] = useState<TFilters>({
    name: '',
    species: '',
    gender: '',
    status: null
  });
  const { characters, isLoading, error } = useLoadCharacters({ filters });

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

  useEffect(() => {
    if (error) {
      showErrorToast(error);
    }
  }, [error]);

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
      <ErrorBoundary>
        <ul className='charactersList'>
          {characters.map((character) => (
            <li className='charactersList__item' key={character.id}>
              <CharacterCard character={character} />
            </li>
          ))}
        </ul>
      </ErrorBoundary>
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
