import { useCallback, useEffect, useRef, useState } from 'react';

import axios from 'axios';

import { getCharacterInfo } from '@/api/getCharacterInfo';
import { isRequestAborted } from '@/shared/helpers';
import { type TCharacter } from '@/shared/types';

type TUseLoadCharacterInfoProps = {
  id: number;
};

export const useLoadCharacterInfo = ({ id }: TUseLoadCharacterInfoProps) => {
  const [character, setCharacter] = useState<TCharacter | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const loadCharacterInfo = useCallback(async () => {
    if (abortControllerRef.current) abortControllerRef.current.abort();

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setIsLoading(true);
    setIsNotFound(false);
    setError(null);

    try {
      const data = await getCharacterInfo({ id, signal: controller.signal });
      if (controller.signal.aborted) return;
      setCharacter(data);
    } catch (error) {
      if (isRequestAborted(error)) return;

      if (axios.isAxiosError(error) && error.response?.status === 404) {
        setIsNotFound(true);
        return;
      }

      const message = error instanceof Error ? error.message : String(error);
      setError(message);
    } finally {
      if (controller.signal.aborted) return;
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadCharacterInfo();

    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [loadCharacterInfo]);

  return {
    character,
    isLoading,
    error,
    isNotFound
  };
};
