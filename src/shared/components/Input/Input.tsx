import type { ChangeEvent, ReactNode } from 'react';

import clsx from 'clsx';

import './Input.scss';

type TInputProps = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  view?: 'bordered' | 'underlined';
  size?: 'medium' | 'small';
  icon?: ReactNode;
  readonly?: boolean;
};

export const Input = ({
  value,
  placeholder,
  onChange,
  view = 'bordered',
  size = 'medium',
  icon,
  readonly
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
        customInput_size_small: size === 'small',
        customInput_readonly: readonly
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
