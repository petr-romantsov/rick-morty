import clsx from 'clsx';
import ChevronDown from '@/assets/img/svg/chevron-down.svg?react';
import './Selector.scss';
import { useState } from 'react';

type TSelectorProps = {
  placeholder: string;
  options: string[];
  size: 'medium' | 'small';
  hasStatus?: boolean;
};

export const Selector = ({ placeholder, options, size = 'medium', hasStatus }: TSelectorProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  return (
    <div
      className={clsx('selector', {
        selector_size_medium: size === 'medium',
        selector_size_small: size === 'small',
        selector_opened: isSelectOpen
      })}
    >
      <button className='selector__button' onClick={() => setIsSelectOpen((open) => !open)}>
        {placeholder}
        <ChevronDown className='selector__icon' />
      </button>
      <ul className='selector__options'>
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
