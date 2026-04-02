import axios from 'axios';

import { API_URL } from '@/shared/constants';
import { type TCharacter } from '@/shared/types';

type TGetCharacterInfoParams = {
  id: number;
  signal?: AbortSignal;
};

export const getCharacterInfo = async ({
  id,
  signal
}: TGetCharacterInfoParams): Promise<TCharacter> => {
  const response = await axios.get(`${API_URL}/${id}`, { signal });
  return response.data;
};
