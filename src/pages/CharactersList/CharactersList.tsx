import { Loader, MainLogo, PageLayout } from '@/shared';

import './CharactersList.scss';

export const CharactersList = () => {
  return (
    <PageLayout>
      <MainLogo />
      <Loader size='large' text='Loading characters...' />
    </PageLayout>
  );
};
