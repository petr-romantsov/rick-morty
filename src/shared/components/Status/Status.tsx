import { classnames } from '@/shared/helpers/classnames';

import './Status.scss';

export type TStatus = 'alive' | 'dead' | 'unknown';

type TStatusProps = {
  status: TStatus | null;
};

export const Status = ({ status = 'unknown' }: TStatusProps) => {
  const statusValue = status?.toLowerCase();

  return (
    <span
      className={classnames('status', {
        status_alive: statusValue === 'alive',
        status_dead: statusValue === 'dead',
        status_unknown: statusValue === 'unknown'
      })}
    ></span>
  );
};
