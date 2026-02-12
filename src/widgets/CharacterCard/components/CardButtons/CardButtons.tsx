import { CheckIcon, CloseIcon, EditIcon } from '@/assets';

import './CardButtons.scss';

type TCardButtonsProps = {
  readonly: boolean;
  onEdit: () => void;
  onClose: () => void;
};

export const CardButtons = ({ readonly, onClose, onEdit }: TCardButtonsProps) => {
  return (
    <div className='cardButtons'>
      {readonly ? (
        <button className='cardButtons__btn cardButtons__btn_edit' onClick={onEdit} type='button'>
          <EditIcon />
        </button>
      ) : (
        <>
          <button className='cardButtons__btn' onClick={onClose} type='button'>
            <CloseIcon />
          </button>
          <button className='cardButtons__btn' type='submit'>
            <CheckIcon />
          </button>
        </>
      )}
    </div>
  );
};
