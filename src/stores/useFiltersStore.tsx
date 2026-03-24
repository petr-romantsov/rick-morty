<<<<<<< HEAD
import { type StateCreator, create } from 'zustand';
=======
import { memo } from 'react';

import { type StateCreator, create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
>>>>>>> ebb643fd5dee3dcef4b7bebc452561b93be43376

import type { TFilters } from '@/shared/types';

const initialFilters: TFilters = {
  name: '',
  species: '',
  gender: '',
  status: null
};

let nameDebounceTimer: ReturnType<typeof setTimeout> | null = null;
const NAME_DEBOUNCE_DELAY = 1000;

type TFiltersStoreState = {
  filters: TFilters;
  nameInputValue: string;
};

type TFiltersStoreActions = {
  setFilters: (filter: keyof TFilters, value: string | null) => void;
  setNameInputValue: (value: string) => void;
};

type TFiltersStore = TFiltersStoreState & TFiltersStoreActions;

const filtersStore: StateCreator<TFiltersStore> = (set) => ({
  filters: initialFilters,
  nameInputValue: '',

  setFilters: (filter, value) =>
    set((state) => ({ filters: { ...state.filters, [filter]: value } })),

  setNameInputValue: (value) => {
    set({ nameInputValue: value });

    if (nameDebounceTimer !== null) clearTimeout(nameDebounceTimer);

    nameDebounceTimer = setTimeout(() => {
      set((state) => ({ filters: { ...state.filters, name: value } }));
      nameDebounceTimer = null;
    }, NAME_DEBOUNCE_DELAY);
  }
});

export const useFiltersStore = create<TFiltersStore>(filtersStore);

export const useFilters = () => useFiltersStore((state) => state.filters);
