import { useEffect, useState } from 'react';

import { getCharacters } from '@/api/getCharacters';
import type { TCharacter, TFilters } from '@/shared/types';

type TUseLoadCharactersProps = {
  filters: TFilters;
};

export const useLoadCharacters = ({ filters }: TUseLoadCharactersProps) => {
  const [characters, setCharacters] = useState<TCharacter[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const loadCharacters = async () => {
      try {
        setIsLoading(true);
        const data = await getCharacters(filters, signal);
        setCharacters(data);
      } catch (error) {
        if (error instanceof Error && (error.message === 'Request aborted' || error.name === 'AbortError')) {
          return;
        }
        const message = error instanceof Error ? error.message : String(error);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    loadCharacters();

    return () => controller.abort();
  }, [filters]);

  return { characters, isLoading, error };
};
