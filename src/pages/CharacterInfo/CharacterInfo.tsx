import { useEffect, useMemo } from 'react';

import { Link, useParams } from 'react-router';

import { ArrowLeft } from '@/assets/icons';
import { useLoadCharacterInfo } from '@/hooks';
import { Loader } from '@/shared/components';
import { showErrorToast } from '@/shared/helpers';
import type { TCharacter } from '@/shared/types';

import './CharacterInfo.scss';

type TCharacterInfoField = {
  title: string;
  value: string;
};

const getCharacterInfoFields = (character: TCharacter | null): TCharacterInfoField[] => {
  if (!character) return [];
  return [
    {
      title: 'Gender',
      value: character.gender
    },
    {
      title: 'Status',
      value: character.status
    },
    {
      title: 'Species',
      value: character.species
    },
    {
      title: 'Origin',
      value:
        character.origin.name === '' || character.origin.name === 'unknown'
          ? 'Unknown'
          : character.origin.name
    },
    {
      title: 'Type',
      value: character.type === '' ? 'Unknown' : character.type
    },
    {
      title: 'Location',
      value: character.location.name
    }
  ];
};

export const CharacterInfo = () => {
  const { id } = useParams();
  const { character, isLoading, error } = useLoadCharacterInfo({ id: Number(id) });

  useEffect(() => {
    if (error) {
      showErrorToast(error);
    }
  }, [error]);

  const characterInfoFields = useMemo(() => getCharacterInfoFields(character), [character]);

  if (!character) {
    return (
      <>
        <Link to='/' className='character-info__back'>
          <ArrowLeft />
          GO BACK
        </Link>
        <div className='character-info__not-found'>Character is not found :(</div>
      </>
    );
  }

  if (isLoading) {
    return <Loader size='large' />;
  }

  return (
    <>
      <section className='character-info'>
        <Link to='/' className='character-info__back'>
          <ArrowLeft />
          GO BACK
        </Link>
        <div className='character-info__img'>
          <img src={character.image} alt={`${character.name} image`} />
        </div>
        <h1 className='character-info__title'>{character.name}</h1>
        <h2 className='character-info__subtitle'>Information</h2>
        <ul className='character-info__list'>
          {characterInfoFields.map(({ title, value }) => (
            <li key={title} className='character-info__list-item'>
              <h3 className='character-info__item-title'>{title}</h3>
              <p className='character-info__item-text'>{value}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
