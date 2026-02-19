import './CharacterCardSkeleton.scss';

export const CharacterCardSkeleton = () => {
  return (
    <div className='characterCardSkeleton'>
      <div className='characterCardSkeleton__image'></div>
      <div className='characterCardSkeleton__content'>
        <div className='characterCardSkeleton__title'></div>
        <div className='characterCardSkeleton__line'></div>
        <div className='characterCardSkeleton__line short'></div>
        <div className='characterCardSkeleton__line'></div>
        <div className='characterCardSkeleton__line short'></div>
        <div className='characterCardSkeleton__line'></div>
        <div className='characterCardSkeleton__line short'></div>
      </div>
    </div>
  );
};
