import { GoBackButton } from '../../components/GoBackButton/GoBackButton';
import { Loader } from '../../components/Loader/Loader';
import { PageLayout } from '../../components/PageLayout/PageLayout';
import { Selector } from '../../components/Selector/Selector';
import './Character.scss';

const selectorOptions: string[] = ['Human', 'Alien', 'Humanoid', 'Animal', 'Robot'];

export const Character = () => {
  return (
    <PageLayout>
      <GoBackButton />
      <Loader size='large' />
      <Selector placeholder='Species' options={selectorOptions} size='standart' />
    </PageLayout>
  );
};
