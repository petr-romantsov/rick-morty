import clsx from 'clsx';
import ChevronDown from '@/assets/img/svg/chevron-down.svg?react';
import './Selector.scss';
import { useState } from 'react';

export type TSelectorOption = {
  id: string;
  option: string;
};

type TSelectorProps = {
  placeholder: string;
  options: TSelectorOption[];
  size: 'medium' | 'small';
  hasStatus?: boolean;
};

export const Selector = ({ placeholder, options, size = 'medium', hasStatus }: TSelectorProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');
  const [selectedOptionId, setSelectedOptionId] = useState<string>('');

  const OptionsList = () => {
    return (
      <ul className='selector__options'>
        {options.map((option) => {
          return (
            <li
              id={option.id}
              key={option.id}
              className={clsx('selector__option', {
                selector__option_selected: selectedOptionId === option.id
              })}
              onClick={(e) => handleOptionClick(e)}
            >
              {option.option}
            </li>
          );
        })}
      </ul>
    );
  };

  const selectOption = (option: TSelectorOption) => {
    setValue(option.option);
    setSelectedOptionId(option.id);
  };

  const clearSelectedOption = () => {
    setValue(placeholder);
    setSelectedOptionId('');
  };

  const handleOptionClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const targetOption = event.target as HTMLElement;

    const selected = options.find((option) => option.id === targetOption.id);
    if (selected) {
      value === selected.option ? clearSelectedOption() : selectOption(selected);
    }
    setIsSelectOpen(false);
  };

  return (
    <div
      className={clsx('selector', {
        selector_size_medium: size === 'medium',
        selector_size_small: size === 'small',
        selector_opened: isSelectOpen
      })}
    >
      <button className='selector__button' onClick={() => setIsSelectOpen((open) => !open)}>
        {value ? value : placeholder}
        <ChevronDown className='selector__icon' />
      </button>
      {isSelectOpen && <OptionsList />}
    </div>
  );
};
