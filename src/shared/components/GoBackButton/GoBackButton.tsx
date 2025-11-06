import { ArrowLeft } from '@/assets/icons';

import './GoBackButton.scss';

export const GoBackButton = () => {
  return (
    <button className='go-back-button'>
      <ArrowLeft />
      GO BACK
    </button>
  );
};
