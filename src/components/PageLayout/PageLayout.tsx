import type { FC, PropsWithChildren } from 'react';
import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';

export const PageLayout: FC = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};
