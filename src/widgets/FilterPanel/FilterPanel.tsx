import { type FormEventHandler } from 'react';

import { useFilterPanel } from '@/hooks';
import { GENDER_OPTIONS, Input, SPECIES_OPTIONS, STATUS_OPTIONS, Select } from '@/shared/components';

import './FilterPanel.scss';

export const FilterPanel = () => {
  const { filters, handleFilterChange, handleNameChange } = useFilterPanel();

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => e.preventDefault();

  return (
    <form className='filterPanel' onSubmit={onSubmit}>
      <Input
        view='bordered'
        value={filters.name}
        placeholder='Filter by name...'
        onChange={handleNameChange}
      />
      <Select
        value={filters.species}
        options={SPECIES_OPTIONS}
        placeholder='Species'
        size='medium'
        onChange={(value) => handleFilterChange('species', value)}
      />
      <Select
        value={filters.gender}
        options={GENDER_OPTIONS}
        placeholder='Gender'
        size='medium'
        onChange={(value) => handleFilterChange('gender', value)}
      />
      <Select
        value={filters.status}
        options={STATUS_OPTIONS}
        placeholder='Status'
        size='medium'
        onChange={(value) => handleFilterChange('status', value)}
      />
    </form>
  );
};
