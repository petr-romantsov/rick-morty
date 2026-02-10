import axios from 'axios';

import { API_URL } from '@/shared/constants';
import { type TCharacter, type TFilters } from '@/shared/types';

type TGetCharactersParams = {
  filters: TFilters;
  signal?: AbortSignal;
  page?: number;
};

type TGetCharactersResponse = {
  info: {
    count: number;
    pages: number;
    next: string | null;
    prev: string | null;
  };
  results: TCharacter[];
};

export const getCharacters = async ({
  filters,
  signal,
  page
}: TGetCharactersParams): Promise<TGetCharactersResponse> => {
  const { name, species, gender, status } = filters;

  const params = Object.fromEntries(
    Object.entries({ name, species, gender, status, page }).filter(([_, value]) => !!value)
  );

  const response = await axios.get(API_URL, { params, signal });
  return response.data;
};
