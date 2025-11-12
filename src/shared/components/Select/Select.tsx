import { useCallback, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';

import { ChevronDown } from '@/assets/icons';

import './Select.scss';

export type TSelectOption<T = string> = {
  id: string;
  value: T;
  label: string;
};

type SelectOptionContentProps<T> = {
  option: TSelectOption<T>;
};

type TSelectorProps<T> = {
  options: TSelectOption<T>[];
  onChange: (value: T) => void;
  value?: T;
  size?: 'medium' | 'small';
  placeholder?: string;
  SelectOptionContentComponent?: React.FC<SelectOptionContentProps<T>>;
};

const DefaultSelectOptionContent = <T,>({ option }: SelectOptionContentProps<T>) => {
  return <>{option.label}</>;
};

export const Select = <T,>({
  value,
  placeholder = '',
  options,
  onChange,
  size = 'medium',
  SelectOptionContentComponent = DefaultSelectOptionContent
}: TSelectorProps<T>) => {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleOptionClick = useCallback(
    (option: TSelectOption<T>) => {
      if (option.value === value) {
        onChange('' as T);
      } else {
        onChange(option.value);
      }
      setIsSelectOpen(false);
    },
    [onChange, value]
  );

  useEffect(() => {
    if (!isSelectOpen) return;

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
        {!!selectedOption ? <SelectOptionContentComponent option={selectedOption} /> : placeholder}
        <ChevronDown className='selector__icon' />
      </button>

      {isSelectOpen && (
        <ul className='selector__options'>
          {options.map((option) => {
            return (
              <li
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
