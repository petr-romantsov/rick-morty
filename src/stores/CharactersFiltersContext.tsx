import { type PropsWithChildren, createContext, useCallback, useMemo, useState } from 'react';

import { useDebounce } from '@/hooks';
import type { TFilters } from '@/shared/types';

export type TCharactersFiltersContext = {
  filters: TFilters;
  nameInputValue: string;
  handleFilterChange: (filter: keyof TFilters, value: string | null) => void;
  handleNameChange: (value: string) => void;
};
export const CharactersFiltersContext = createContext<TCharactersFiltersContext>({
  filters: {
    name: '',
    species: '',
    gender: '',
    status: null
  },
  nameInputValue: '',
  handleFilterChange: () => {},
  handleNameChange: () => {}
});

export const CharactersFiltersProvider = ({ children }: PropsWithChildren) => {
  const [nameInputValue, setNameInputValue] = useState('');

  const [filters, setFilters] = useState<TFilters>({
    name: '',
    species: '',
    gender: '',
    status: null
  });

  const updateFiltersName = useCallback((value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, name: value }));
  }, []);

  const debouncedUpdateFiltersName = useDebounce({
    cb: updateFiltersName,
    delay: 1000
  });

  const handleNameChange = useCallback((value: string) => {
    setNameInputValue(value);
    debouncedUpdateFiltersName(value);
  }, []);

  const handleFilterChange = useCallback((filter: keyof TFilters, value: string | null) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: value
    }));
  }, []);

  const contextValue = useMemo(
    () => ({ filters, nameInputValue, handleFilterChange, handleNameChange }),
    [filters, nameInputValue, handleFilterChange, handleNameChange]
  );

  return (
    <CharactersFiltersContext.Provider value={contextValue}>
      {children}
    </CharactersFiltersContext.Provider>
  );
};
