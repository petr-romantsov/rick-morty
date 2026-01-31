import { Link } from 'react-router';

import { Error404Img } from '@/assets';

import './NotFoundPage.scss';

export const NotFoundPage = () => {
  return (
    <section className='error-404'>
      <img src={Error404Img} alt='Error 404' className='error-404__img' />

      <Link to='/' className='error-404__link'>
        Go to main page
      </Link>
    </section>
  );
};
