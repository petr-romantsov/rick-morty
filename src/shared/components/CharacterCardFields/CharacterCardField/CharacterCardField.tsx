import './CharacterCardField.scss';

type TCharacterCardFieldProps = {
  propertyName: string;
  propertyValue: string;
};

export const CharacterCardField = ({ propertyName, propertyValue }: TCharacterCardFieldProps) => {
  return (
    <div className='characterCardField'>
      <h3 className='characterCardField__propertyName'>{propertyName}</h3>
      <p className='characterCardField__propertyValue'>{propertyValue}</p>
    </div>
  );
};
