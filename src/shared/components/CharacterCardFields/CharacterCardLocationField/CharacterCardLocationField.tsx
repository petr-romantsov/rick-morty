import { Input, PropertyLabel } from '@/shared/components';

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
    <div>
      <PropertyLabel>Location</PropertyLabel>
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
