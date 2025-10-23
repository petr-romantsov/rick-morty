import clsx from 'clsx';
import './Status.scss';

type TStatusProps = {
  status: 'Alive' | 'Dead' | 'Unknown';
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
