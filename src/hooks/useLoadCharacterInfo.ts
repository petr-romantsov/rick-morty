import { useQuery } from '@tanstack/react-query';

import { getCharacterInfo } from '@/api/getCharacterInfo';
import { QUERY_KEYS } from '@/shared/constants';
import { getErrorMessage, isNotFoundError } from '@/shared/helpers';

type TUseLoadCharacterInfoProps = {
  id: number;
};

export const useLoadCharacterInfo = ({ id }: TUseLoadCharacterInfoProps) => {
  const isValidCharacterId = isFinite(id) && id > 0;
  const {
    data: character,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: [QUERY_KEYS.CHARACTER, id],
    enabled: isValidCharacterId,
    queryFn: ({ signal }) => getCharacterInfo({ id: id, signal }),
    retry: (failureCount, error) => {
      if (isNotFoundError(error)) {
        return false;
      }
      return failureCount < 2;
    },
    staleTime: 1000 * 60 * 60 // 1 час
  });

  const isNotFound = isNotFoundError(error) || !isValidCharacterId;
  const errorMessage = isError ? getErrorMessage(error) : null;

  return {
    character,
    isLoading,
    errorMessage,
    isError,
    isNotFound
  };
};
