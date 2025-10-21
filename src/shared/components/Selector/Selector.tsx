import clsx from 'clsx';
import ChevronDown from '@/assets/img/svg/chevron-down.svg?react';
import './Selector.scss';
import { useState } from 'react';

type TSelectorProps = {
  placeholder: string;
  options: string[];
  size: 'standart' | 'small';
  hasStatus?: boolean;
};

export const Selector = ({ placeholder, options, size = 'standart', hasStatus }: TSelectorProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  return (
    <div
      className={clsx('selector', {
        selector_size_large: size === 'standart',
        selector_size_small: size === 'small'
      })}
    >
      <button
        className={clsx('selector__button', {
          selector__button_opened: isSelectOpen
        })}
        onClick={() => setIsSelectOpen((open) => !open)}
      >
        {placeholder}
        <ChevronDown className='selector__icon' />
      </button>
      <ul
        className={clsx('selector__options', {
          selector__options_size_standart: size === 'standart',
          selector__options_size_small: size === 'small',
          selector__options_opened: isSelectOpen
        })}
      >
        {options.map((option) => {
          return (
            <li key={option} className='selector__option'>
              {option}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
