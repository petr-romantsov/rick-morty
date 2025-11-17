import { useEffect, useRef, useState } from 'react';

import type { TStatus } from '@/shared';
import type { TCharacter } from '@/shared/types/types';

type TUseEditCharacterProps = {
  character: TCharacter;
};

export const useEditCharacterCard = ({ character }: TUseEditCharacterProps) => {
  const [readonly, setReadonly] = useState(true);

  const savedCharacterRef = useRef<TCharacter>(character);

  const [statusValue, setStatusValue] = useState<TStatus>(character.status);
  const [nameValue, setNameValue] = useState(character.name);
  const [locationValue, setLocationValue] = useState(character.location.name);

  useEffect(() => {
    savedCharacterRef.current = character;
    setStatusValue(character.status);
    setNameValue(character.name);
    setLocationValue(character.location.name);
  }, [character]);

  return {
    readonly,
    setReadonly,
    statusValue,
    setStatusValue,
    nameValue,
    setNameValue,
    locationValue,
    setLocationValue,
    savedCharacterRef
  };
};
