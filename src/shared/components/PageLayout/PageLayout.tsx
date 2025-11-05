import type { PropsWithChildren } from 'react';

import { Footer, SPECIES_OPTIONS, STATUS_OPTIONS, Select, Status } from '@/shared';
import { Header } from '@/shared';

import './PageLayout.scss';

export const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className='container'>
        <div className='temp-select-wrapper'>
          <Select
            placeholder='Species'
            options={SPECIES_OPTIONS}
            size='medium'
            SelectOptionContentComponent={({ option }) => <>{option.label}</>}
          />

          <Select
            placeholder='Status'
            options={STATUS_OPTIONS}
            size='small'
            SelectOptionContentComponent={({ option }) => (
              <>
                {option.label}
                <Status status={option.value} />
              </>
            )}
          />
        </div>
        {children}
      </main>
      <Footer />
    </>
  );
};
