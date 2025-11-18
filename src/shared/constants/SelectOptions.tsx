import { type TSelectOption, type TStatus } from '@/shared';

export const SPECIES_OPTIONS: TSelectOption[] = [
  { id: 'species-1', value: 'human', label: 'Human' },
  { id: 'species-2', value: 'alien', label: 'Alien' },
  { id: 'species-3', value: 'humanoid', label: 'Humanoid' },
  { id: 'species-4', value: 'animal', label: 'Animal' },
  { id: 'species-5', value: 'robot', label: 'Robot' },
  { id: 'species-6', value: 'robot', label: 'Cronenberg' },
  { id: 'species-7', value: 'robot', label: 'Mythology' },
  { id: 'species-8', value: 'robot', label: 'Disease' },
  { id: 'species-9', value: 'robot', label: 'Unknown' }
];

export const STATUS_OPTIONS: TSelectOption<TStatus>[] = [
  { id: 'status-1', value: 'alive', label: 'Alive' },
  { id: 'status-2', value: 'dead', label: 'Dead' },
  { id: 'status-3', value: 'unknown', label: 'Unknown' }
];

export const GENDER_OPTIONS: TSelectOption[] = [
  { id: 'gender-1', value: 'female', label: 'Female' },
  { id: 'gender-2', value: 'male', label: 'Male' },
  { id: 'gender-3', value: 'genderless', label: 'Genderless' },
  { id: 'gender-4', value: 'unknown', label: 'Unknown' }
];
