import logo from '@/assets/img/logo.png';

import './Header.scss';

export const Header = () => {
  return (
    <header className='header'>
      <img src={logo} alt='Rick&Morty Logo' className='header__logo' />
    </header>
  );
};
