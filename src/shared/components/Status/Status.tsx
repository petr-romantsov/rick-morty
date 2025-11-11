import { classnames } from '@/shared/helpers/classnames';

import './Status.scss';

export type TStatus = 'alive' | 'dead' | 'unknown';

type TStatusProps = {
  status: TStatus;
};

export const Status = ({ status = 'unknown' }: TStatusProps) => {
  return (
    <span
      className={classnames('status', {
        status_alive: status === 'alive',
        status_dead: status === 'dead',
        status_unknown: status === 'unknown'
      })}
    ></span>
  );
};
