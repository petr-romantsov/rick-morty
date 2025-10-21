import { GoBackButton } from '@/shared';
import { Loader } from '@/shared';
import { PageLayout } from '@/shared';
import { Selector } from '@/shared';
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
