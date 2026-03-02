import logoPng from '@/assets/img/logo.png';

import './Header.scss';

export const Header = () => {
  return (
    <header className='header'>
      <div className='container'>
        <img src={logoPng} alt='Rick&Morty Logo' className='header__logo' />
      </div>
    </header>
  );
};
