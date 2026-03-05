import { PropertyLabel } from '@/shared/components';

import './CharacterCardField.scss';

type TCharacterCardFieldProps = {
  propertyName: string;
  propertyValue: string;
};

export const CharacterCardField = ({ propertyName, propertyValue }: TCharacterCardFieldProps) => {
  return (
    <div className='characterCardField'>
      <PropertyLabel>{propertyName}</PropertyLabel>
      <p className='characterCardField__propertyValue'>{propertyValue}</p>
    </div>
  );
};
