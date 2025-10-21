import './GoBackButton.scss';
import Arrow from '@/assets/img/svg/arrow.svg?react';

export const GoBackButton = () => {
  return (
    <button className='go-back-button'>
      <Arrow />
      GO BACK
    </button>
  );
};
