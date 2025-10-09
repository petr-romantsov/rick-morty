import logo from '../../assets/logo.png';
import { Logo } from '../Logo/Logo';
import './Header.css';

export const Header = () => {
  return (
    <header className='header'>
      <div className='container'>
        <Logo />
      </div>
    </header>
  );
};
