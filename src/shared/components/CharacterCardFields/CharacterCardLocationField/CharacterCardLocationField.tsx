import { Input } from '@/shared/components';

import './CharacterCardLocationField.scss';

type TCharacterLocationFieldProps = {
  isReadonly: boolean;
  location: string;
  onChange: (value: string) => void;
};

export const CharacterCardLocationField = ({
  isReadonly,
  location,
  onChange
}: TCharacterLocationFieldProps) => {
  return (
    <div className='characterLocationField'>
      <h3 className='characterLocationField__propertyName'>Location</h3>
      <Input
        size='small'
        view='underlined'
        value={location}
        readonly={isReadonly}
        onChange={onChange}
      />
    </div>
  );
};
