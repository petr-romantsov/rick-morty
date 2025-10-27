import { GoBackButton, Loader, PageLayout, Select, statusOptions } from '@/shared';

import './Character.scss';

export const Character = () => {
  return (
    <PageLayout>
      <GoBackButton />
      <Loader />
      <Select placeholder='Status' options={statusOptions} size='medium' />
    </PageLayout>
  );
};
