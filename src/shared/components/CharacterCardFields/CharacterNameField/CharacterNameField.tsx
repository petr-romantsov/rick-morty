import { Link } from 'react-router';

import { Input } from '@/shared/components';

import './CharacterNameField.scss';

type TCharacterNameField = {
  isReadonly: boolean;
  linkPath: string;
  name: string;
  onchange: (value: string) => void;
};

export const CharacterNameField = ({
  isReadonly,
  linkPath,
  name,
  onchange
}: TCharacterNameField) => {
  return (
    <div className='characterNameLinkField'>
      {isReadonly ? (
        <Link className='characterNameField__link' to={linkPath}>
          {name}
        </Link>
      ) : (
        <Input view='underlined' value={name} readonly={isReadonly} onChange={onchange} />
      )}
    </div>
  );
};
