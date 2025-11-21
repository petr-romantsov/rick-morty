import { useState } from 'react';

import type { TStatus } from '@/shared';
import type { TCharacter } from '@/shared/types';

type TUseEditCharacterProps = {
  character: TCharacter;
};

export const useEditCharacterCard = ({ character }: TUseEditCharacterProps) => {
  const [readonly, setReadonly] = useState(true);

  const [statusValue, setStatusValue] = useState<TStatus>(character.status);
  const [nameValue, setNameValue] = useState(character.name);
  const [locationValue, setLocationValue] = useState(character.location.name);

  return {
    readonly,
    setReadonly,
    statusValue,
    setStatusValue,
    nameValue,
    setNameValue,
    locationValue,
    setLocationValue
  };
};
