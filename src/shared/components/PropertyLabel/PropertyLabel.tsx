import { type PropsWithChildren } from 'react';

import clsx from 'clsx';

import './PropertyLabel.scss';

type TPropertyLabelProps = {
  className?: string;
};

export const PropertyLabel = ({ children, className }: PropsWithChildren<TPropertyLabelProps>) => {
  return <h3 className={clsx('characterCardPropertyName', className)}>{children}</h3>;
};
