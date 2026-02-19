import { Select, Status, type TStatus } from '@/shared/components';
import { STATUS_OPTIONS } from '@/shared/constants';

import './CharacterStatusField.scss';

type TCharacterStatusFieldProps = {
  isReadonly: boolean;
  status: TStatus;
  onChange: (value: string) => void;
};

export const CharacterStatusField = ({
  isReadonly,
  status,
  onChange
}: TCharacterStatusFieldProps) => {
  return (
    <div className='characterStatusField'>
      <h3 className='characterStatusField__propertyName'>Status</h3>
      <div className='characterStatusField__status'>
        {isReadonly ? (
          <>
            <span>{status}</span>
            <Status status={status} />
          </>
        ) : (
          <Select
            size='small'
            value={status}
            options={STATUS_OPTIONS}
            onChange={onChange}
            SelectOptionContentComponent={({ option }) => (
              <>
                {option.label}
                <Status status={option.value} />
              </>
            )}
          />
        )}
      </div>
    </div>
  );
};
