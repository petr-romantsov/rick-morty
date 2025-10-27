import clsx from 'clsx';
import './Status.scss';

export type TStatus = 'Alive' | 'Dead' | 'Unknown';

type TStatusProps = {
  status: TStatus;
};

export const Status = ({ status }: TStatusProps) => {
  return (
    <span
      className={clsx('status', {
        status_alive: status === 'Alive',
        status_dead: status === 'Dead',
        status_unknown: status === 'Unknown'
      })}
    ></span>
  );
};
