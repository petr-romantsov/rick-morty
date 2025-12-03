import axios from 'axios';

import { type TCharacter, type TFilters } from '@/shared/types';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export const getCharacters = async (filters: TFilters): Promise<TCharacter[]> => {
  const { name, species, gender, status } = filters;
  const queryParams = new URLSearchParams();
  if (name) queryParams.append('name', name);
  if (species) queryParams.append('species', species);
  if (gender) queryParams.append('gender', gender);
  if (status) queryParams.append('status', status);

  const queryString = queryParams.toString();
  const url = queryString ? `${API_URL}?${queryString}` : API_URL;

  try {
    const response = await axios.get(url);
    return response.data.results;
  } catch (error) {
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
