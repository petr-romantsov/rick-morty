import mainLogo from '../../assets/img/rick&morty_logo.png';
import './MainLogo.scss';

export const MainLogo = () => {
  return (
    <div className='main-logo'>
      <img src={mainLogo} alt='логотип Рик и Морти' className='main-logo__img' />
    </div>
  );
};
