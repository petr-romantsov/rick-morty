import { type FormEventHandler, memo, useCallback, useEffect, useState } from 'react';

import {
  CharacterCardField,
  CharacterCardImage,
  CharacterCardLocationField,
  CharacterNameField,
  CharacterStatusField
} from '@/shared/components';
import { ROUTES } from '@/shared/constants';
import type { TCharacter } from '@/shared/types';

import { CardButtons } from './components/CardButtons/CardButtons';

import './CharacterCard.scss';

type TCharacterCardProps = {
  character: TCharacter;
  onUpdate: (character: TCharacter) => void;
};

export const CharacterCard = memo(({ character, onUpdate }: TCharacterCardProps) => {
  const [editedCharacter, setEditedCharacter] = useState(character);
  const [readonly, setReadonly] = useState(true);

  const handleEditButtonClick = useCallback(() => {
    setReadonly(false);
  }, []);

  const handleCloseButtonClick = useCallback(() => {
    setEditedCharacter(character);
    setReadonly(true);
  }, [character]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    onUpdate(editedCharacter);
    setReadonly(true);
  };

  const handleInputChange = (
    field: keyof TCharacter,
    value: string | { name: string; url: string }
  ) => {
    setEditedCharacter((prev) => ({ ...prev, [field]: value }));
  };

  // синхронизация локального состояния character
  useEffect(() => {
    setEditedCharacter(character);
  }, [character]);

  // обработка нажатия клавиши Esc
  useEffect(() => {
    if (readonly) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        handleCloseButtonClick();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [readonly, handleCloseButtonClick]);

  const { name, gender, species, location, status, image } = editedCharacter;

  return (
    <form className='characterCard' onSubmit={handleSubmit}>
      <CharacterCardImage image={image} alt={`${name} image`} />
      <div className='characterCard__content'>
        <CharacterNameField
          isReadonly={readonly}
          linkPath={ROUTES.CHARACTER_PAGE(character.id.toString())}
          name={name || character.name}
          onchange={(value) => handleInputChange('name', value)}
        />
        <CharacterCardField propertyName='Gender' propertyValue={gender} />
        <CharacterCardField propertyName='Species' propertyValue={species} />

        <CharacterCardLocationField
          isReadonly={readonly}
          location={location.name || 'Unknown'}
          onChange={(value) => handleInputChange('location', value)}
        />
        <CharacterStatusField
          isReadonly={readonly}
          status={status}
          onChange={(value) => handleInputChange('status', value)}
        />
      </div>
      <CardButtons
        readonly={readonly}
        onEdit={handleEditButtonClick}
        onClose={handleCloseButtonClick}
      />
    </form>
  );
});
