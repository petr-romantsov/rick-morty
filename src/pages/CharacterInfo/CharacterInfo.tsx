import { useEffect, useMemo } from 'react';

import { Link, useNavigate, useParams } from 'react-router';

import { useQuery } from '@tanstack/react-query';
import axios, { HttpStatusCode } from 'axios';

import { getCharacterInfo } from '@/api/getCharacterInfo';
import { ArrowLeft } from '@/assets';
import { useLoadCharacterInfo } from '@/hooks';
import { Loader, PropertyLabel } from '@/shared/components';
import { QUERY_KEYS, ROUTES } from '@/shared/constants';
import { getErrorMessage, showErrorToast } from '@/shared/helpers';
import type { TCharacter } from '@/shared/types';

import './CharacterInfo.scss';

type TCharacterInfoField = {
  title: string;
  value: string;
};

const getCharacterInfoFields = (
  character: TCharacter | undefined
): TCharacterInfoField[] => {
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

const CharacterInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const characterId = Number(id);
  const { character, isLoading, errorMessage, isError, isNotFound } =
    useLoadCharacterInfo({ id: characterId });

  useEffect(() => {
    if (isNotFound) {
      navigate(ROUTES.NOT_FOUND, { replace: true });
    }

    if (isError && errorMessage) {
      showErrorToast(errorMessage);
    }
  }, [errorMessage, isNotFound, isError, navigate]);

  const characterInfoFields = useMemo(
    () => getCharacterInfoFields(character),
    [character]
  );

  return (
    <>
      <section className='character-info'>
        <Link to={ROUTES.HOME} className='character-info__back'>
          <ArrowLeft />
          GO BACK
        </Link>

        {isLoading && <Loader size='large' />}
        {!isLoading && !character && (
          <div className='character-info__not-found'>
            Something went wrong:(
          </div>
        )}

        {character && (
          <>
            <div className='character-info__img'>
              <img src={character.image} alt={`${character.name} image`} />
            </div>
            <h1 className='character-info__title'>{character.name}</h1>
            <h2 className='character-info__subtitle'>Information</h2>
            <ul className='character-info__list'>
              {characterInfoFields.map(({ title, value }) => (
                <li key={title} className='character-info__list-item'>
                  <PropertyLabel className='character-info__item-title'>
                    {title}
                  </PropertyLabel>
                  <p className='character-info__item-text'>{value}</p>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </>
  );
};
export default CharacterInfo;
