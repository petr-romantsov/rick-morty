import { GoBackButton, Loader, PageLayout, Selector, speciesOptions } from '@/shared';

import './Character.scss';

export const Character = () => {
  return (
    <PageLayout>
      <GoBackButton />
      <Loader />
      <Selector placeholder='Species' options={speciesOptions} size='small' />
    </PageLayout>
  );
};
