import axios from 'axios';

import { type TCharacter, type TFilters } from '@/shared/types';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export const getCharacters = async (filters: TFilters, signal?: AbortSignal): Promise<TCharacter[]> => {
  const { name, species, gender, status } = filters;
  const params = { name, species, gender, status };

  try {
    const response = await axios.get(API_URL, { params, signal });
    return response.data.results;
  } catch (error) {
    if (signal?.aborted || (axios.isAxiosError(error) && error.code === 'ERR_CANCELED')) {
      throw new Error('Request aborted');
    }

    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.status
          ? `Failed to load characters list: (${error.response.status})`
          : 'Network error while loading characters'
      );
    }
    throw new Error('Unknown error while loading characters');
  }
};
