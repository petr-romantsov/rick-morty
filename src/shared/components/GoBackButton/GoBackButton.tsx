import Arrow from '@/assets/img/svg/arrow.svg?react';

import './GoBackButton.scss';

export const GoBackButton = () => {
  return (
    <button className='go-back-button'>
      <Arrow />
      GO BACK
    </button>
  );
};
