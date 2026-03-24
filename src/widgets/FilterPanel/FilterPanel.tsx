import { type FormEventHandler, memo } from 'react';

import { useShallow } from 'zustand/react/shallow';

import { useShallow } from 'zustand/react/shallow';

import { SearchIcon } from '@/assets';
import {
  GENDER_OPTIONS,
  Input,
  SPECIES_OPTIONS,
  STATUS_OPTIONS,
  Select
} from '@/shared/components';
import { useFiltersStore } from '@/stores';

import './FilterPanel.scss';

const selects = [
  { key: 'species', options: SPECIES_OPTIONS, placeholder: 'Species' },
  { key: 'gender', options: GENDER_OPTIONS, placeholder: 'Gender' },
  { key: 'status', options: STATUS_OPTIONS, placeholder: 'Status' }
] as const;

export const FilterPanel = memo(() => {
  const { filters, nameInputValue, handleFilterChange, handleNameChange } =
    useFiltersStore(
      useShallow((state) => ({
        filters: state.filters,
        nameInputValue: state.nameInputValue,
        handleFilterChange: state.setFilters,
        handleNameChange: state.setNameInputValue
      }))
    );

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => e.preventDefault();

  return (
    <form className='filterPanel' onSubmit={onSubmit}>
      <Input
        view='bordered'
        placeholder='Filter by name...'
        value={nameInputValue}
        icon={<SearchIcon />}
        onChange={handleNameChange}
      />
      {selects.map(({ key, options, placeholder }) => (
        <Select
          size='medium'
          key={key}
          value={filters[key]}
          options={options}
          placeholder={placeholder}
          onChange={(value) => handleFilterChange(key, value)}
        />
      ))}
    </form>
  );
});
