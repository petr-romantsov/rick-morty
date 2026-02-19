import { useCallback, useEffect, useRef, useState } from 'react';

import { getCharacterInfo } from '@/api/getCharacterInfo';
import { getErrorMessage, isRequestAborted } from '@/shared/helpers';
import { type TCharacter } from '@/shared/types';

type TUseLoadCharacterInfoProps = {
  id: number;
};

export const useLoadCharacterInfo = ({ id }: TUseLoadCharacterInfoProps) => {
  const [character, setCharacter] = useState<TCharacter | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadCharacterInfo = useCallback(async () => {
    if (abortControllerRef.current) abortControllerRef.current.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    setError(null);

    try {
      const data = await getCharacterInfo({ id, signal: controller.signal });
      setCharacter(data);
    } catch (error) {
      if (isRequestAborted(error)) return;

      const message = getErrorMessage(error);
      setError(message);
    } finally {
      if (controller.signal.aborted) return;
      setIsLoading(false);
    }
  }, [id]);

  // запрос инфо о персонаже
  useEffect(() => {
    loadCharacterInfo();

    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [loadCharacterInfo]);

  return {
    character,
    isLoading,
    error
  };
};
