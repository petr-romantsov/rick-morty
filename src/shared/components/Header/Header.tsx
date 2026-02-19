import logoPng from '@/assets/img/logo.png';

import './Header.scss';

export const Header = () => {
  return (
    <header className='header'>
      <div className='header__container'>
        <img src={logoPng} alt='Rick&Morty Logo' className='header__logo' />
      </div>
    </header>
  );
};
