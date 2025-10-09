import mainLogo from '../../assets/img/rick&morty_logo.png';
import './MainLogo.css';

export const MainLogo = () => {
  return (
    <div className='main-logo'>
      <div className='main-logo__wrap'>
        <img src={mainLogo} alt='Rick&Morty logo' className='main-logo__img' />
      </div>
    </div>
  );
};
