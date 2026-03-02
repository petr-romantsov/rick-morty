import { Link } from 'react-router';

import { Input } from '@/shared/components';

import './CharacterNameField.scss';

type TCharacterNameField = {
  isReadonly: boolean;
  linkPath: string;
  name: string;
  onChange: (value: string) => void;
};

export const CharacterNameField = ({
  isReadonly,
  linkPath,
  name,
  onChange
}: TCharacterNameField) => {
  return (
    <div className='characterNameLinkField'>
      {isReadonly ? (
        <Link className='characterNameField__link' to={linkPath}>
          {name}
        </Link>
      ) : (
        <Input view='underlined' value={name} readonly={isReadonly} onChange={onChange} />
      )}
    </div>
  );
};
