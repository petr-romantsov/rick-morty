import { type FormEventHandler, memo, useContext } from 'react';

import { SearchIcon } from '@/assets';
import {
  GENDER_OPTIONS,
  Input,
  SPECIES_OPTIONS,
  STATUS_OPTIONS,
  Select
} from '@/shared/components';
import { CharactersFiltersContext } from '@/stores';

import './FilterPanel.scss';

const selects = [
  { key: 'species', options: SPECIES_OPTIONS, placeholder: 'Species' },
  { key: 'gender', options: GENDER_OPTIONS, placeholder: 'Gender' },
  { key: 'status', options: STATUS_OPTIONS, placeholder: 'Status' }
] as const;

export const FilterPanel = memo(() => {
  const { nameInputValue, filters, handleFilterChange, handleNameChange } =
    useContext(CharactersFiltersContext);

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
