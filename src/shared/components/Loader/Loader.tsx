import clsx from 'clsx';
import loaderImg from '@/assets/img/loader.png';
import './Loader.scss';

type TLoaderProps = {
  size: 'large' | 'small';
  text?: string;
};

export const Loader = ({ size = 'large', text = '' }) => {
  return (
    <div
      className={clsx('loader', {
        loader_size_small: size === 'small',
        loader_size_large: size === 'large'
      })}
    >
      <img className='loader__img' src={loaderImg} alt='Loading picture' />

      {!!text && <p className='loader__text'>{text}</p>}
    </div>
  );
};
