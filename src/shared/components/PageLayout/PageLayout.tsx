import { type PropsWithChildren, useState } from 'react';

import { SearchIcon } from '@/assets/icons';
import { Footer, Input, STATUS_OPTIONS, Select, Status } from '@/shared';
import { Header } from '@/shared';

import './PageLayout.scss';

export const PageLayout = ({ children }: PropsWithChildren) => {
  const [inpValue, setInputValue] = useState('');

  return (
    <>
      <Header />
      <main className='container'>
        <div className='temp-select-wrapper'>
          <Select
            placeholder='Status'
            options={STATUS_OPTIONS}
            size='medium'
            SelectOptionContentComponent={({ option }) => (
              <>
                {option.label}
                <Status status={option.value} />
              </>
            )}
          />
          <Input
            value={inpValue}
            onChange={setInputValue}
            placeholder='Filter by name'
            icon={<SearchIcon />}
          />
          <Input
            value={inpValue}
            onChange={setInputValue}
            placeholder='Male'
            view='underlined'
            size='small'
          />
        </div>
        {children}
      </main>
      <Footer />
    </>
  );
};
