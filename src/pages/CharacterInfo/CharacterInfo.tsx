import { useEffect, useMemo } from 'react';

import { Link, useNavigate, useParams } from 'react-router';

import { ArrowLeft } from '@/assets';
import { useLoadCharacterInfo } from '@/hooks';
import { Loader } from '@/shared/components';
import { ROUTES } from '@/shared/constants';
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

const CharacterInfo = () => {
  const { id } = useParams();
  const { character, isLoading, error } = useLoadCharacterInfo({ id: Number(id) });
  const navigate = useNavigate();

  // обработка ошибок
  useEffect(() => {
    if (error && error === 'Not found') {
      navigate(ROUTES.NOT_FOUND, { replace: true });
    } else if (error) {
      showErrorToast(error);
    }
  }, [error, navigate]);

  const characterInfoFields = useMemo(() => getCharacterInfoFields(character), [character]);

  return (
    <>
      <section className='character-info'>
        <Link to={ROUTES.HOME} className='character-info__back'>
          <ArrowLeft />
          GO BACK
        </Link>

        {isLoading && <Loader size='large' />}
        {!isLoading && !character && (
          <div className='character-info__not-found'>Something went wrong:(</div>
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
                  <h3 className='character-info__item-title'>{title}</h3>
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
