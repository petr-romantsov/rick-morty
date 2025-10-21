import { Loader } from '@/shared';
import { MainLogo } from '@/shared';
import { PageLayout } from '@/shared';
import './CharactersList.scss';

export const CharactersList = () => {
  return (
    <PageLayout>
      <MainLogo />
      <Loader size='large' text='Loading characters...' />
    </PageLayout>
  );
};
