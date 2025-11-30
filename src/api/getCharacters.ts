import axios from 'axios';

import { type TCharacter } from '@/shared/types';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export const getCharacters = (): Promise<TCharacter[]> => {
  return axios
    .get(API_URL)
    .then((response) => response.data.results)
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.status
            ? `Ошибка загрузки данных: ${error.response.status}`
            : 'Ошибка сети при загрузке персонажей'
        );
      }
      throw new Error('Неизвестная ошибка при загрузке персонажей');
    });
};
