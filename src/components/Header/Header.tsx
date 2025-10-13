import logo from '../../assets/img/logo.png';
import './Header.css';

export const Header = () => {
  return (
    <header className='header'>
      <div className='container'>
        <img src={logo} alt='Логотип Рик и Морти' className='header__logo' />
      </div>
    </header>
  );
};
