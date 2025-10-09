import { HeaderLogo } from '../HeaderLogo/HeaderLogo';
import './Header.css';

export const Header = () => {
  return (
    <header className='header'>
      <div className='container'>
        <HeaderLogo />
      </div>
    </header>
  );
};
