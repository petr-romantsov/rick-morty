import type { ChangeEvent, ReactNode } from 'react';

import clsx from 'clsx';

import './Input.scss';

type TInputProps = {
  view?: 'bordered' | 'underlined';
  size?: 'medium' | 'small';
  icon?: ReactNode;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
};

export const Input = ({
  view = 'bordered',
  size = 'medium',
  icon,
  value,
  placeholder,
  onChange
}: TInputProps) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div
      className={clsx('customInput', {
        customInput_view_bordered: view === 'bordered',
        customInput_view_underlined: view === 'underlined',
        customInput_size_medium: size === 'medium',
        customInput_size_small: size === 'small'
      })}
    >
      {icon && <span className='customInput__icon'>{icon}</span>}
      <input
        type='text'
        className='customInput__input'
        value={value}
        onChange={onChangeHandler}
        placeholder={placeholder}
      />
    </div>
  );
};
