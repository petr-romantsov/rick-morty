import logo from '../../assets/logo.png';
import './Logo.css';

export const Logo = () => {
  return (
    <div className='logo'>
      <img src={logo} alt='Rick & Morty logo' className='logo__image' />
    </div>
  );
};
