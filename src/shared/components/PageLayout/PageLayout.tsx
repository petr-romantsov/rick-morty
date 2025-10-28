import type { PropsWithChildren } from 'react';

import { Footer, SPECIES_OPTIONS, STATUS_OPTIONS, Select } from '@/shared';
import { Header } from '@/shared';

import './PageLayout.scss';

export const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className='container'>
        <div className='temp-select-wrapper'>
          <Select placeholder='Status' options={SPECIES_OPTIONS} size='medium' />

          <Select placeholder='Status' options={STATUS_OPTIONS} size='small' />
        </div>
        {children}
      </main>
      <Footer />
    </>
  );
};
