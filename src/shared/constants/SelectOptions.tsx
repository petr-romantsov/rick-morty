import { type TSelectOption } from '@/shared';

export const speciesOptions: TSelectOption[] = [
  { id: 'species-1', name: 'Human' },
  { id: 'species-2', name: 'Alien' },
  { id: 'species-3', name: 'Humanoid' },
  { id: 'species-4', name: 'Animal' },
  { id: 'species-5', name: 'Robot' }
];

export const statusOptions: TSelectOption[] = [
  { id: 'status-1', name: 'Alive', status: 'Alive' },
  { id: 'status-2', name: 'Dead', status: 'Dead' },
  { id: 'status-3', name: 'Uknown', status: 'Unknown' }
];
