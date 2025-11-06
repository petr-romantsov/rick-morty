import { useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import { ChevronDown } from '@/assets/icons';

import './Select.scss';

export type TSelectOption = {
  id: string;
  value: string;
  label: string;
};

type SelectOptionContentProps = {
  option: TSelectOption;
};

type TSelectorProps = {
  placeholder: string;
  options: TSelectOption[];
  size: 'medium' | 'small';
  SelectOptionContentComponent?: React.FC<SelectOptionContentProps>;
};

const DefaultSelectOptionContent = ({ option }: SelectOptionContentProps) => {
  return <>{option.value}</>;
};

export const Select = ({
  placeholder,
  options,
  size = 'medium',
  SelectOptionContentComponent = DefaultSelectOptionContent
}: TSelectorProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<TSelectOption | null>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectOption = (option: TSelectOption) => {
    setSelectedOption(option);
  };

  const clearSelectedOption = () => {
    setSelectedOption(null);
  };

  const handleOptionClick = (option: TSelectOption) => {
    const selected = options.find((optionsItem) => optionsItem.id === option.id);
    if (selected) {
      selectedOption && selectedOption.id === selected.id ? clearSelectedOption() : selectOption(selected);
    }
    setIsSelectOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsSelectOpen(false);
      }
    };

    if (isSelectOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [isSelectOpen]);

  return (
    <div
      className={clsx('selector', {
        selector_size_medium: size === 'medium',
        selector_size_small: size === 'small',
        selector_opened: isSelectOpen
      })}
      ref={selectRef}
    >
      <button className='selector__button' onClick={() => setIsSelectOpen((open) => !open)}>
        {selectedOption ? <SelectOptionContentComponent option={selectedOption} /> : placeholder}

        <ChevronDown className='selector__icon' />
      </button>

      {isSelectOpen && (
        <ul className='selector__options'>
          {options.map((option) => {
            return (
              <li
                id={option.id}
                key={option.id}
                className={clsx('selector__option', {
                  selector__option_selected: selectedOption?.id === option.id
                })}
                onClick={() => handleOptionClick(option)}
              >
                <SelectOptionContentComponent option={option} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
