import { Loader, MainLogo, PageLayout } from '@/shared';
import type { TCharacter } from '@/shared/types';
import { CharacterCard, FilterPanel } from '@/widgets';

import './CharactersList.scss';

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

export const CharactersList = () => {
  return (
    <PageLayout>
      <MainLogo />
      <FilterPanel />
      <CharacterCard character={mockCharacter} readonly={true} />
    </PageLayout>
  );
};
