import { GoBackButton, Loader, PageLayout } from '@/shared';

import './Character.scss';

export const Character = () => {
  return (
    <PageLayout>
      <GoBackButton />
      <Loader size='large' />
    </PageLayout>
  );
};
