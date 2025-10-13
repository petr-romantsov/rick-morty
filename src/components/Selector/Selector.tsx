import clsx from 'clsx';

type TSelectorProps = {
  options: string[];
  size: 'standart' | 'small';
  hasStatus?: boolean;
};

export const Selector = ({ options, size = 'standart', hasStatus }: TSelectorProps) => {
  return (
    <div
      className={clsx('selector', {
        selector_size_large: size === 'standart',
        selector_size_small: size === 'small'
      })}
    >
      {options.map((option) => {
        return <option key={option}>{option}</option>;
      })}
    </div>
  );
};
