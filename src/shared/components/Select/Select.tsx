import { useState } from 'react';

import clsx from 'clsx';

import { ChevronDown } from '@/assets/icons';
import type { TSelectOption } from '@/shared';
import { Option, Status } from '@/shared';

import './Select.scss';

type TSelectorProps = {
  placeholder: string;
  options: TSelectOption[];
  size: 'medium' | 'small';
};

type TOptionsListProps = {
  options: TSelectOption[];
};

export const Select = ({ placeholder, options, size = 'medium' }: TSelectorProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<TSelectOption | null>(null);

  const selectOption = (option: TSelectOption) => {
    setSelectedOption(option);
  };

  const clearSelectedOption = () => {
    setSelectedOption(null);
  };

  const handleOptionClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const targetOption = event.target as HTMLElement;

    const selected = options.find((option) => option.id === targetOption.id);
    if (selected) {
      selectedOption && selectedOption.id === selected.id ? clearSelectedOption() : selectOption(selected);
    }
    setIsSelectOpen(false);
  };

  const OptionsList = ({ options }: TOptionsListProps) => {
    return (
      <ul className='selector__options'>
        {options.map((option) => {
          return (
            <Option
              option={option}
              onClick={handleOptionClick}
              selected={selectedOption?.id === option.id}
              status={option.status}
            />
          );
        })}
      </ul>
    );
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
        {selectedOption ? (
          <>
            {selectedOption.name}
            {selectedOption.status && <Status status={selectedOption.status} />}
          </>
        ) : (
          placeholder
        )}

        <ChevronDown className='selector__icon' />
      </button>
      {isSelectOpen && <OptionsList options={options} />}
    </div>
  );
};
