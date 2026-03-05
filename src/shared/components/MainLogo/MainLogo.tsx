import { mainLogoAvif, mainLogoWebp } from '@/assets';

import './MainLogo.scss';

export const MainLogo = () => {
  return (
    <div className='main-logo'>
      <picture>
        <source srcSet={mainLogoAvif} type='image/avif' />
        <img
          src={mainLogoWebp}
          alt='Rick&Morty logo'
          className='main-logo__img'
          fetchPriority='high'
          decoding='async'
        />
      </picture>
    </div>
  );
};
