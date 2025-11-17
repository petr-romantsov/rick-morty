import { useCallback, useEffect } from 'react';

import { Link } from 'react-router';

import RickImage from '@/assets/img/rick-image.png';
import { useEditCharacterCard } from '@/hooks';
import { Input, STATUS_OPTIONS, Select, Status } from '@/shared/components';
import { STATUS_LABELS } from '@/shared/constants';
import type { TCharacter } from '@/shared/types';

import { CardButtons } from './components/CardButtons/CardButtons';

import './CharacterCard.scss';

type TCharachterCardProps = {
  character: TCharacter;
  readonly: boolean;
};

export const CharacterCard = ({ character }: TCharachterCardProps) => {
  const {
    readonly,
    setReadonly,
    statusValue,
    setStatusValue,
    nameValue,
    setNameValue,
    locationValue,
    setLocationValue,
    savedCharacterRef
  } = useEditCharacterCard({ character });

  const handleEditButtonClick = () => setReadonly(false);
  const handleCloseButtonClick = () => {
    const savedCharacter = savedCharacterRef.current;
    setNameValue(savedCharacter.name);
    setLocationValue(savedCharacter.location.name);
    setStatusValue(savedCharacter.status);
    setReadonly(true);
  };

  const handleSaveButtonClick = useCallback(() => {
    character.name = nameValue;
    character.location.name = locationValue;
    character.status = statusValue;

    savedCharacterRef.current = { ...character };

    setReadonly(true);
  }, [character, nameValue, locationValue, statusValue, savedCharacterRef]);

  const handleNameChange = (value: string) => setNameValue(value);
  const handleLocationChange = (value: string) => setLocationValue(value);

  useEffect(() => {
    if (readonly) return;

    const handleEnterKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        handleSaveButtonClick();
      }
    };

    document.addEventListener('keydown', handleEnterKeyPress);

    return () => document.removeEventListener('keydown', handleEnterKeyPress);
  }, [readonly, handleSaveButtonClick]);

  return (
    <div className='characterCard'>
      <img src={RickImage} alt='Character image' className='characterCard__img' />
      <div className='characterCard__content'>
        {readonly ? (
          <Link className='characterCard__link' to={`/character/${character.id}`}>
            {nameValue || character.name}
          </Link>
        ) : (
          <Input value={nameValue} onChange={handleNameChange} view='underlined' readonly={readonly} />
        )}
        <div className='characterCard__property'>
          <h3 className='characterCard__propertyName'>Gender</h3>
          <p className='characterCard__propertyValue'>{character.gender}</p>
        </div>
        <div className='characterCard__property'>
          <h3 className='characterCard__propertyName'>Species</h3>
          <p className='characterCard__propertyValue'>{character.species}</p>
        </div>
        <div className='characterCard__property'>
          <h3 className='characterCard__propertyName'>Location</h3>
          <Input
            value={locationValue}
            onChange={handleLocationChange}
            view='underlined'
            size='small'
            readonly={readonly}
          />
        </div>
        <div className='characterCard__property'>
          <h3 className='characterCard__propertyName'>Status</h3>
          <div className='characterCard__status'>
            {readonly ? (
              <>
                <span>{STATUS_LABELS[statusValue || character.status]}</span>
                <Status status={statusValue || character.status} />
              </>
            ) : (
              <Select
                value={statusValue}
                onChange={setStatusValue}
                options={STATUS_OPTIONS}
                size='small'
                placeholder='Status'
                SelectOptionContentComponent={({ option }) => (
                  <>
                    {option.label}
                    <Status status={option.value} />
                  </>
                )}
              />
            )}
          </div>
        </div>
      </div>
      <CardButtons
        readonly={readonly}
        onEdit={handleEditButtonClick}
        onClose={handleCloseButtonClick}
        onSave={handleSaveButtonClick}
      />
    </div>
  );
};
