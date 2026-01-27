import type { TStatus } from '../components';

export type TLocationInfo = {
  name: string;
  url: string;
};

export type TCharacter = {
  id: number;
  name: string;
  status: TStatus;
  species: string;
  type: string;
  gender: string;
  origin: TLocationInfo;
  location: TLocationInfo;
  image: string;
  episode: string[];
  url: string;
  created: string;
};

export type TFilters = {
  name: string;
  species: string;
  gender: string;
  status: TStatus | null;
};
