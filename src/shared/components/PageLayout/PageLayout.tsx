import { type PropsWithChildren, useState } from 'react';

import { SearchIcon } from '@/assets/icons';
import { Footer, Input, STATUS_OPTIONS, Select, Status, type TStatus } from '@/shared';
import { Header } from '@/shared';
import type { TCharacter } from '@/shared/types/types';
import { CharacterCard } from '@/widgets/CharacterCard/CharacterCard';

import './PageLayout.scss';

export const PageLayout = ({ children }: PropsWithChildren) => {
  const [inpValue, setInputValue] = useState('');
  const [statusValue, setStatusValue] = useState<TStatus | undefined>(undefined);

  const mockCharacter: TCharacter = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'alive',
    species: 'Human',
    type: '',
    gender: 'Male',
    origin: {
      name: '',
      url: ''
    },
    location: {
      name: 'Earth',
      url: ''
    },
    image: '',
    episode: [],
    url: '',
    created: ''
  };

  return (
    <>
      <Header />
      <main className='container'>
        <div className='temp-select-wrapper'>
          <Select
            value={statusValue}
            onChange={setStatusValue}
            placeholder='Status'
            options={STATUS_OPTIONS}
            size='medium'
            SelectOptionContentComponent={({ option }) => (
              <>
                {option.label}
                <Status status={option.value} />
              </>
            )}
          />
          <Input
            value={inpValue}
            onChange={setInputValue}
            placeholder='Filter by name'
            icon={<SearchIcon />}
          />
          <Input
            value={inpValue}
            onChange={setInputValue}
            placeholder='Male'
            view='underlined'
            size='small'
            readonly={true}
          />
          <CharacterCard character={mockCharacter} readonly={true} />
        </div>
        {children}
      </main>
      <Footer />
    </>
  );
};
