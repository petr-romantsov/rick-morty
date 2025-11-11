import { useState } from 'react';

import type { TStatus } from '@/shared';
import type { TCharacter } from '@/shared/types/types';

type TuseEditCharacterProps = {
  character: TCharacter;
};

export const useEditCharacterCard = ({ character }: TuseEditCharacterProps) => {
  const [readonly, setReadonly] = useState(true);
  const [statusValue, setStatusValue] = useState<TStatus>(character.status);

  return {
    readonly,
    setReadonly,
    statusValue,
    setStatusValue
  };
};
