import type { MouseEventHandler } from 'react';

import clsx from 'clsx';

import { Status, type TStatus } from '@/shared';

export type TSelectOption = {
  id: string;
  name: string;
  status?: TStatus;
};

type TOptionProps = {
  option: TSelectOption;
  onClick: MouseEventHandler;
  status?: TStatus;
  selected?: boolean;
};

export const Option = ({ option, onClick, status, selected }: TOptionProps) => {
  return (
    <li
      id={option.id}
      key={option.id}
      className={clsx('selector__option', {
        selector__option_selected: selected
      })}
      onClick={onClick}
    >
      {option.name}
      {!!status && <Status status={status} />}
    </li>
  );
};
