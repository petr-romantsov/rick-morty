import { useEffect, useState } from 'react';

import { getCharacters } from '@/api/getCharacters';
import { Loader, MainLogo, PageLayout } from '@/shared';
import type { TCharacter } from '@/shared/types';
import { CharacterCard, FilterPanel } from '@/widgets';

import './CharactersList.scss';

export const CharactersList = () => {
  const [characters, setCharacters] = useState<TCharacter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getCharacters();
        setCharacters(data);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    loadCharacters();
  }, []);

  if (isLoading) {
    return (
      <PageLayout>
        <MainLogo />
        <Loader size='large' text='Loading characters...' />
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <MainLogo />
        <div style={{ textAlign: 'center', padding: '2rem' }}>
          <p style={{ color: 'red' }}>{error}</p>
        </div>
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
    </PageLayout>
  );
};
