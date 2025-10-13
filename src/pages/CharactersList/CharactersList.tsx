import { Loader } from '../../components/Loader/Loader';
import { MainLogo } from '../../components/MainLogo/MainLogo';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import './CharactersList.css';

export const CharactersList = () => {
  return (
    <PageLayout>
      <MainLogo />
      <Loader size='large' text='Loading characters...' />
    </PageLayout>
  );
};
