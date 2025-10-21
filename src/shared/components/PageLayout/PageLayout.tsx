import type { PropsWithChildren } from 'react';
import { Footer } from '@/shared';
import { Header } from '@/shared';

export const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className='container'>{children}</main>
      <Footer />
    </>
  );
};
