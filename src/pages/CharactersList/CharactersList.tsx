import { useCallback, useEffect } from 'react';

import toast, { Toaster } from 'react-hot-toast';

import { useLoadCharacters } from '@/hooks/useLoadCharacters';
import { Loader, MainLogo, PageLayout } from '@/shared/components';
import { CharacterCard, FilterPanel } from '@/widgets';

import './CharactersList.scss';

export const CharactersList = () => {
  const { characters, isLoading, error } = useLoadCharacters();

  const showErrorToast = useCallback((message: string): void => {
    toast.error(message);
  }, []);

  useEffect(() => {
    if (error) {
      showErrorToast(error);
    }
  }, [error]);

  if (isLoading) {
    return (
      <PageLayout>
        <MainLogo />
        <Loader size='large' text='Loading characters...' />
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <MainLogo />
      <FilterPanel />
      <ul className='charactersList'>
        {characters.map((character) => (
          <li className='charactersList__item' key={character.id}>
            <CharacterCard character={character} />
          </li>
        ))}
      </ul>
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
