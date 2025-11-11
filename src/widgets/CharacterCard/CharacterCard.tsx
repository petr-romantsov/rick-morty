import { Link } from 'react-router';

import RickImage from '@/assets/img/rick-image.png';
import { useEditCharacterCard } from '@/hooks/useEditCharacterCard';
import { Input, STATUS_OPTIONS, Select, Status } from '@/shared/components';
import { STATUS_LABELS } from '@/shared/constants/StatusLabels';
import type { TCharacter } from '@/shared/types/types';
import { CardButtons } from '@/widgets/CharacterCard/components/CardButtons/CardButtons';

import './CharacterCard.scss';

type TCharachterCardProps = {
  character: TCharacter;
  readonly: boolean;
};

export const CharacterCard = ({ character }: TCharachterCardProps) => {
  const { readonly, setReadonly, statusValue, setStatusValue } = useEditCharacterCard({ character });

  const handleEditButtonClick = () => setReadonly(false);
  const handleCloseButtonClick = () => setReadonly(true);

  return (
    <div className='characterCard'>
      <img src={RickImage} alt='Character image' className='characterCard__img' />
      <div className='characterCard__content'>
        {readonly ? (
          <Link className='characterCard__link' to={`/character/${character.id}`}>
            {character.name}
          </Link>
        ) : (
          <Input value={character.name} onChange={() => undefined} view='underlined' readonly={readonly} />
        )}
        <div className='characterCard__property'>
          <h3 className='characterCard__property-name'>Gender</h3>
          <p className='characterCard__property-value'>{character.gender}</p>
        </div>
        <div className='characterCard__property'>
          <h3 className='characterCard__property-name'>Species</h3>
          <p className='characterCard__property-value'>{character.species}</p>
        </div>
        <div className='characterCard__property'>
          <h3 className='characterCard__property-name'>Location</h3>
          <Input
            value={character.location.name}
            onChange={() => undefined}
            view='underlined'
            size='small'
            readonly={readonly}
          />
        </div>
        <div className='characterCard__property'>
          <h3 className='characterCard__property-name'>Status</h3>
          <div className='characterCard__status'>
            {readonly ? (
              <>
                <span>{STATUS_LABELS[character.status]}</span>
                <Status status={character.status} />
              </>
            ) : (
              <Select
                value={statusValue}
                onChange={setStatusValue}
                options={STATUS_OPTIONS}
                size='small'
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
      </div>
      <CardButtons readonly={readonly} onEdit={handleEditButtonClick} onClose={handleCloseButtonClick} />
    </div>
  );
};
