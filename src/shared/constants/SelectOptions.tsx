import { type TSelectOption, type TStatus } from '@/shared';

export const SPECIES_OPTIONS: TSelectOption[] = [
  { id: 'species-1', value: 'human', label: 'Human' },
  { id: 'species-2', value: 'alien', label: 'Alien' },
  { id: 'species-3', value: 'humanoid', label: 'Humanoid' },
  { id: 'species-4', value: 'animal', label: 'Animal' },
  { id: 'species-5', value: 'robot', label: 'Robot' }
];

export const STATUS_OPTIONS: TSelectOption<TStatus>[] = [
  { id: 'status-1', value: 'alive', label: 'Alive' },
  { id: 'status-2', value: 'dead', label: 'Dead' },
  { id: 'status-3', value: 'unknown', label: 'Unknown' }
];
