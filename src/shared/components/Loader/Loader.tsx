import clsx from 'clsx';
import loaderImg from '@/assets/img/loader.png';
import './Loader.scss';

type TLoaderProps = {
  size?: 'large' | 'small';
  text?: string;
};

export const Loader = ({ size = 'large', text = '' }: TLoaderProps) => {
  return (
    <div
      className={clsx('loader', {
        loader_size_small: size === 'small',
        loasder_size_small: size === 'large'
      })}
    >
      <img className='loader__img' src={loaderImg} alt='иллюстрация загрузки' />

      {text && <p className='loader__text'>{text}</p>}
    </div>
  );
};
