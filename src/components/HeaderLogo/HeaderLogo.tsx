import logo from '../../assets/logo.png';
import './HeaderLogo.css';

export const HeaderLogo = () => {
  return (
    <div className='logo'>
      <img src={logo} alt='Rick & Morty logo' className='logo__image' />
    </div>
  );
};
