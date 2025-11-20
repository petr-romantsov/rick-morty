import { type FormEventHandler, useEffect, useRef } from 'react';

import { useFilterPanel } from '@/hooks';
import { GENDER_OPTIONS, Input, SPECIES_OPTIONS, STATUS_OPTIONS, Select } from '@/shared/components';

import './FilterPanel.scss';

export const FilterPanel = () => {
  const {
    nameValue,
    setNameValue,
    speciesValue,
    setSpeciesValue,
    genderValue,
    setGenderValue,
    statusValue,
    setStatusValue
  } = useFilterPanel();

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => e.preventDefault();

  return (
    <form className='filterPanel' onSubmit={onSubmit}>
      <Input view='bordered' value={nameValue} placeholder='Filter by name...' onChange={setNameValue} />
      <Select
        value={speciesValue}
        options={SPECIES_OPTIONS}
        placeholder='Species'
        size='medium'
        onChange={setSpeciesValue}
      />
      <Select
        value={genderValue}
        options={GENDER_OPTIONS}
        placeholder='Gender'
        size='medium'
        onChange={setGenderValue}
      />
      <Select
        value={statusValue}
        options={STATUS_OPTIONS}
        placeholder='Status'
        size='medium'
        onChange={setStatusValue}
      />
    </form>
  );
};
