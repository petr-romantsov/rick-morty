import clsx from 'clsx';
import loaderImg from '../../assets/img/loader.png';
import './Loader.css';

type TLoaderProps = {
  size?: 'large' | 'small';
  text?: string;
};

export const Loader = ({ size = 'large', text = '' }: TLoaderProps) => {
  return (
    <div className={clsx('loader', size && `loader_size_${size}`)}>
      <img className='loader__img' src={loaderImg} alt='иллюстрация загрузки' />

      {text && <p className='loader__text'>{text}</p>}
    </div>
  );
};
