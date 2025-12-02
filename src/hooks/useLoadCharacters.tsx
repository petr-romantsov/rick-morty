import { useEffect, useState } from 'react';

import { getCharacters } from '@/api/getCharacters';
import type { TCharacter } from '@/shared/types';

export const useLoadCharacters = () => {
  const [characters, setCharacters] = useState<TCharacter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setIsLoading(true);
        const data = await getCharacters();
        setCharacters(data);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    loadCharacters();
  }, []);

  return { characters, isLoading, error };
};
