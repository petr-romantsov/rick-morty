import type { PropsWithChildren } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

export const PageLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className='container'>{children}</main>
      <Footer />
    </>
  );
};
