import { useCallback, useEffect } from 'react';

import { useLoadCharacters } from '@/hooks';
import {
  InfinityScroll,
  CharacterCardSkeleton,
  Loader,
  MainLogo
} from '@/shared/components';
import {
  getErrorMessage,
  isNotFoundError,
  showErrorToast
} from '@/shared/helpers';
import { useFilters } from '@/stores';
import { CharacterCard, FilterPanel } from '@/widgets';

import './CharacterList.scss';

const CharactersList = () => {
  const filters = useFilters();

  const {
    characters,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    updateCharacter
  } = useLoadCharacters({
    filters
  });

  const SmallLoader = <Loader size='small' />;
  const DEFAULT_CARDS_SKELETONS_COUNT = 10;

  const loadNextPage = useCallback(() => {
    if (!isLoading && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isLoading, hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    if (error && !isNotFoundError(error)) {
      showErrorToast(getErrorMessage(error));
    }
  }, [error]);

  const renderPageContent = () => {
    if (error && isNotFoundError(error)) {
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
        isNextPageLoading={isFetchingNextPage}
        loadNextPage={loadNextPage}
      >
        <ul className='characterList'>
          {isLoading && characters.length === 0
            ? Array.from({ length: DEFAULT_CARDS_SKELETONS_COUNT }).map(
                (_, index) => (
                  <li key={index}>
                    <CharacterCardSkeleton />
                  </li>
                )
              )
            : characters.map((character) => (
                <li key={character.id}>
                  <CharacterCard
                    character={character}
                    onUpdate={updateCharacter}
                  />
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
