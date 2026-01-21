import clsx from 'clsx';

import { ArrowLeft } from '@/assets/icons';

import './GoBackButton.scss';

type TGoBackButtonProps = {
  className?: string;
  link: string;
};

export const GoBackButton = ({ link, className }: TGoBackButtonProps) => {
  return (
    <a className={clsx('go-back-button', className)} href={link}>
      <ArrowLeft />
      GO BACK
    </a>
  );
};
