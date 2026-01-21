import axios from 'axios';

import { type TStatus } from '@/shared/components';

type TGetCharacterInfoParams = {
  id: number;
  signal?: AbortSignal;
};

type TGetCharacterInfoResponse = {
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

export const getCharacterInfo = async ({
  id,
  signal
}: TGetCharacterInfoParams): Promise<TGetCharacterInfoResponse> => {
  const API_URL = `https://rickandmortyapi.com/api/character/${id}`;

  try {
    const response = await axios.get(API_URL, { signal });
    return response.data;
  } catch (error) {
    if (signal?.aborted || (axios.isAxiosError(error) && error.code === 'ERR_CANCELED')) {
      throw new Error('Request aborted');
    }

    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.status
          ? `Failed to load character info: (${error.response.status})`
          : 'Network error while loading character info'
      );
    }
  }

  throw new Error('Unknown error while loading character info');
};
