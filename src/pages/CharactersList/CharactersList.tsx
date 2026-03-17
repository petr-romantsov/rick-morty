import { useCallback, useContext, useEffect } from 'react';

import { useLoadCharacters } from '@/hooks';
import { InfinityScroll, CharacterCardSkeleton, Loader, MainLogo } from '@/shared/components';
import { showErrorToast } from '@/shared/helpers';
import { CharactersFiltersContext } from '@/stores';
import { CharacterCard, FilterPanel } from '@/widgets';

import './CharacterList.scss';

const CharactersList = () => {
  const { filters } = useContext(CharactersFiltersContext);

  const {
    characters,
    isLoading,
    error,
    hasNextPage,
    isNextPageLoading,
    setCurrentPage,
    updateCharacter
  } = useLoadCharacters({
    filters
  });

  const SmallLoader = <Loader size='small' />;
  const DEFAULT_CARDS_SKELETONS_COUNT = 10;

  const loadNextPage = useCallback(() => {
    if (!isLoading && hasNextPage && !isNextPageLoading) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [isLoading, hasNextPage, isNextPageLoading]);

  useEffect(() => {
    if (error && error !== 'Not found') {
      showErrorToast(error);
    }
  }, [error]);

  const renderPageContent = () => {
    if (error === 'Not found') {
      return (
        <div className='characterList__notFoundMessage'>
          No characters with these parameters were found
        </div>
      );
    }

    return (
      <InfinityScroll
        loader={SmallLoader}
        hasNextPage={hasNextPage}
        isNextPageLoading={isNextPageLoading}
        loadNextPage={loadNextPage}
      >
        <ul className='characterList'>
          {isLoading && characters.length === 0
            ? Array.from({ length: DEFAULT_CARDS_SKELETONS_COUNT }).map((_, index) => (
                <li key={index}>
                  <CharacterCardSkeleton />
                </li>
              ))
            : characters.map((character) => (
                <li key={character.id}>
                  <CharacterCard character={character} onUpdate={updateCharacter} />
                </li>
              ))}
        </ul>
      </InfinityScroll>
    );
  };

  return (
    <>
      <MainLogo />
      <FilterPanel />
      {renderPageContent()}
    </>
  );
};

export default CharactersList;
