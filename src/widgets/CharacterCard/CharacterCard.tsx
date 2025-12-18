import { type FormEventHandler, useCallback, useEffect, useRef, useState } from 'react';

import { Link } from 'react-router';

import { useEditCharacterCard } from '@/hooks';
import { Input, STATUS_OPTIONS, Select, Status } from '@/shared/components';
import { STATUS_LABELS } from '@/shared/constants';
import type { TCharacter } from '@/shared/types';

import { CardButtons } from './components/CardButtons/CardButtons';

import './CharacterCard.scss';

type TCharacterCardProps = {
  character: TCharacter;
};

export const CharacterCard = ({ character }: TCharacterCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [shouldLoadImage, setShouldLoadImage] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const {
    readonly,
    setReadonly,
    statusValue,
    setStatusValue,
    nameValue,
    setNameValue,
    locationValue,
    setLocationValue
  } = useEditCharacterCard({ character });

  useEffect(() => {
    if (!imgRef.current || shouldLoadImage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShouldLoadImage(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '100px'
      }
    );

    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [shouldLoadImage]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(false);
  };

  const handleEditButtonClick = () => {
    setReadonly(false);
  };

  const handleCloseButtonClick = useCallback(() => {
    setNameValue(character.name);
    setLocationValue(character.location.name);
    setStatusValue(character.status);
    setReadonly(true);
  }, [character.name, character.location.name, character.status]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    character.name = nameValue;
    character.location.name = locationValue;
    character.status = statusValue;

    setReadonly(true);
  };

  const handleNameChange = (value: string) => setNameValue(value);
  const handleLocationChange = (value: string) => setLocationValue(value);

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

  return (
    <form className='characterCard' onSubmit={handleSubmit}>
      <div className='characterCard__imgWrapper'>
        {shouldLoadImage && !imageLoaded && !imageError && (
          <span className='characterCard__imgLoading'>Image is loading...</span>
        )}
        {shouldLoadImage && !imageError ? (
          <img
            ref={imgRef}
            src={character.image}
            alt={`${character.name} image`}
            className='characterCard__img'
            loading='lazy'
            width={300}
            height={300}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        ) : imageError ? (
          <span className='characterCard__imgError'>Image not availible :(</span>
        ) : (
          <div ref={imgRef} className='characterCard__imgPlaceholder'></div>
        )}
      </div>
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
      <CardButtons readonly={readonly} onEdit={handleEditButtonClick} onClose={handleCloseButtonClick} />
    </form>
  );
};
