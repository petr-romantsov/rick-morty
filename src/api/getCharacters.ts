import axios from 'axios';

import { type TCharacter } from '@/shared/types';

const API_URL = 'https://rickandmortyapi.com/api/character/';

export const getCharacters = async (): Promise<TCharacter[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data.results;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.status
          ? `Не удалось загрузить список персонажей: (${error.response.status})`
          : 'Ошибка сети при загрузке персонажей'
      );
    }
    throw new Error('Неизвестная ошибка при загрузке персонажей');
  }
};
