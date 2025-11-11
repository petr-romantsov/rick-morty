import type { TStatus } from '../components';

export type TCharacter = {
  id: number;
  name: string;
  status: TStatus;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
  url: string;
  created: string;
};
