import { Fragment } from 'react/jsx-runtime';

import './CharacterCardSkeleton.scss';

const SKELETONS_LINES_COUNT = 3;

export const CharacterCardSkeleton = () => {
  return (
    <div className='characterCardSkeleton'>
      <div className='characterCardSkeleton__image'></div>
      <div className='characterCardSkeleton__content'>
        <div className='characterCardSkeleton__title'></div>
        {Array.from({ length: SKELETONS_LINES_COUNT }).map((_, index) => (
          <Fragment key={`skeleton-line-${index}`}>
            <div className='characterCardSkeleton__line'></div>
            <div className='characterCardSkeleton__line short'></div>
          </Fragment>
        ))}
      </div>
    </div>
  );
};
