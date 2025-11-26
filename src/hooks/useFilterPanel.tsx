import { useState } from 'react';

import type { TFilters } from '@/shared/types';

export const useFilterPanel = () => {
  const [filters, setFilters] = useState<TFilters>({
    name: '',
    species: '',
    gender: '',
    status: null
  });

  const handleNameChange = (value: string) => {
    setFilters((prevFilters) => ({ ...prevFilters, name: value }));
  };
  const handleFilterChange = (filter: keyof TFilters, value: string | null) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filter]: value
    }));
  };

  return { filters, setFilters, handleNameChange, handleFilterChange };
};
