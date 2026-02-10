import { type FormEventHandler, memo, useCallback, useEffect, useRef, useState } from 'react';

import { Link } from 'react-router';

import { Input, STATUS_OPTIONS, Select, Status } from '@/shared/components';
import { STATUS_LABELS } from '@/shared/constants';
import { ROUTES } from '@/shared/constants';
import type { TCharacter } from '@/shared/types';

import { CardButtons } from './components/CardButtons/CardButtons';

import './CharacterCard.scss';

type TCharacterCardProps = {
  character: TCharacter;
  onUpdate: (character: TCharacter) => void;
};

const IMAGE_OBSERVER_THRESHOLD = '100px';

export const CharacterCard = memo(({ character, onUpdate }: TCharacterCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [shouldLoadImage, setShouldLoadImage] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [editedCharacter, setEditedCharacter] = useState(character);
  const [readonly, setReadonly] = useState(true);

  useEffect(() => {
    setEditedCharacter(character);
  }, [character]);

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
        rootMargin: IMAGE_OBSERVER_THRESHOLD
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

  const handleInputChange = (field: keyof TCharacter, value: string | { name: string; url: string }) => {
    setEditedCharacter((prev) => ({ ...prev, [field]: value }));
  };

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
      <div className='characterCard__imgWrapper'>
        {shouldLoadImage && !imageLoaded && !imageError && (
          <span className='characterCard__imgLoading'>Image is loading...</span>
        )}
        {shouldLoadImage && !imageError ? (
          <img
            ref={imgRef}
            src={image}
            alt={`${name} image`}
            className='characterCard__img'
            loading='lazy'
            width={300}
            height={300}
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        ) : imageError ? (
          <span className='characterCard__imgError'>Image is not available :(</span>
        ) : (
          <div ref={imgRef} className='characterCard__imgPlaceholder'></div>
        )}
      </div>
      <div className='characterCard__content'>
        {readonly ? (
          <Link className='characterCard__link' to={ROUTES.CHARACTER_PAGE(character.id.toString())}>
            {name || character.name}
          </Link>
        ) : (
          <Input
            value={name}
            onChange={(value) => handleInputChange('name', value)}
            view='underlined'
            readonly={readonly}
          />
        )}
        <div className='characterCard__property'>
          <h3 className='characterCard__propertyName'>Gender</h3>
          <p className='characterCard__propertyValue'>{gender}</p>
        </div>
        <div className='characterCard__property'>
          <h3 className='characterCard__propertyName'>Species</h3>
          <p className='characterCard__propertyValue'>{species}</p>
        </div>
        <div className='characterCard__property'>
          <h3 className='characterCard__propertyName'>Location</h3>
          <Input
            value={location.name}
            onChange={(value) => handleInputChange('location', { ...location, name: value })}
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
                <span>{STATUS_LABELS[status] || character.status}</span>
                <Status status={status || character.status} />
              </>
            ) : (
              <Select
                value={status}
                onChange={(value) => handleInputChange('status', value)}
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
});
