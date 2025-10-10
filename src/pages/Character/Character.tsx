import { GoBackButton } from '../../components/GoBackButton/GoBackButton';
import { Loader } from '../../components/Loader/Loader';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import './Character.css';

export const Character = () => {
  return (
    <PageLayout>
      <GoBackButton />
      <Loader size='large' text='some loading text' />
    </PageLayout>
  );
};
