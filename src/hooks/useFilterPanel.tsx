import { useState } from 'react';

import type { TStatus } from '@/shared';

export const useFilterPanel = () => {
  const [nameValue, setNameValue] = useState('');
  const [speciesValue, setSpeciesValue] = useState('');
  const [genderValue, setGenderValue] = useState('');
  const [statusValue, setStatusValue] = useState<TStatus | null>(null);

  return {
    nameValue,
    setNameValue,
    speciesValue,
    setSpeciesValue,
    genderValue,
    setGenderValue,
    statusValue,
    setStatusValue
  };
};
