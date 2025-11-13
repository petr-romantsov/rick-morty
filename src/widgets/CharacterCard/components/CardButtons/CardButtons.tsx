import { CheckIcon, CloseIcon, EditIcon } from '@/assets/icons';

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
        <button className='cardButtons__btn cardButtons__btn_edit' onClick={onEdit}>
          <EditIcon />
        </button>
      ) : (
        <>
          <button className='cardButtons__btn' onClick={onClose}>
            <CloseIcon />
          </button>
          <button className='cardButtons__btn' onClick={() => null}>
            <CheckIcon />
          </button>
        </>
      )}
    </div>
  );
};
