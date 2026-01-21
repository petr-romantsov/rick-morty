import { useCallback, useEffect, useMemo } from 'react';

import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router';

import { useLoadCharacterInfo } from '@/hooks';
import { GoBackButton, Loader, PageLayout } from '@/shared';

import './CharacterInfo.scss';

export const CharacterInfo = () => {
  let { id } = useParams<{ id: string }>();
  const { character, isLoading, error } = useLoadCharacterInfo({ id: Number(id) });

  const showErrorToast = useCallback((message: string): void => {
    toast.error(message);
  }, []);

  useEffect(() => {
    if (error) {
      showErrorToast(error);
    }
  }, [error, showErrorToast]);

  const characterInfoFields = useMemo(() => {
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
        value: character.origin.name
      },
      {
        title: 'Type',
        value: character.type
      },
      {
        title: 'Location',
        value: character.location.name
      }
    ];
  }, [character]);

  // if (!character) return <div>Character not found</div>;

  if (isLoading) {
    return (
      <PageLayout>
        <Loader size='large' />
      </PageLayout>
    );
  }

  if (!character) {
    return (
      <PageLayout>
        <GoBackButton className='character-info__back' link='/' />
        <div className='character-info__not-found'>Character is not found :(</div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <section className='character-info'>
        <GoBackButton className='character-info__back' link='/' />
        <div className='character-info__img'>
          <img src={character.image} alt={`${character.name} image`} />
        </div>
        <h1 className='character-info__title'>{character.name}</h1>
        <h2 className='character-info__subtitle'>Information</h2>
        <ul className='character-info__list'>
          {characterInfoFields.map(({ title, value }) => (
            <li key={title} className='character-info__item'>
              <h3 className='character-info__item-title'>{title}</h3>
              <p className='character-info__item-text'>{value}</p>
            </li>
          ))}
        </ul>
      </section>
      <Toaster
        position='bottom-right'
        toastOptions={{
          style: {
            backgroundColor: '#fff5f3',
            border: '1px solid #f4b0a1',
            borderRadius: '12px',
            background: '#fff5f3'
          }
        }}
      />
    </PageLayout>
  );
};
