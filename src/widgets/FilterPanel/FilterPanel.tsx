import { type FormEventHandler, memo } from 'react';

import { SearchIcon } from '@/assets';
import { GENDER_OPTIONS, Input, SPECIES_OPTIONS, STATUS_OPTIONS, Select } from '@/shared/components';
import type { TFilters } from '@/shared/types';

import './FilterPanel.scss';

type TFilterPanelProps = {
  nameValue: string;
  filters: TFilters;
  handleFilterChange: (filter: keyof TFilters, value: string | null) => void;
  handleNameChange: (value: string) => void;
};

const selects = [
  { key: 'species', options: SPECIES_OPTIONS, placeholder: 'Species' },
  { key: 'gender', options: GENDER_OPTIONS, placeholder: 'Gender' },
  { key: 'status', options: STATUS_OPTIONS, placeholder: 'Status' }
] as const;

export const FilterPanel = memo(
  ({ nameValue, filters, handleFilterChange, handleNameChange }: TFilterPanelProps) => {
    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => e.preventDefault();

    return (
      <form className='filterPanel' onSubmit={onSubmit}>
        <Input
          view='bordered'
          value={nameValue}
          placeholder='Filter by name...'
          onChange={handleNameChange}
          icon={<SearchIcon />}
        />
        {selects.map(({ key, options, placeholder }) => (
          <Select
            key={key}
            value={filters[key]}
            options={options}
            placeholder={placeholder}
            size='medium'
            onChange={(value) => handleFilterChange(key, value)}
          />
        ))}
      </form>
    );
  }
);
