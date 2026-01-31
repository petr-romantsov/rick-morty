import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router';

import { Footer, Header } from '@/shared';

export const PageLayout = () => {
  return (
    <>
      <Header />
      <main className='container'>
        <Outlet />
      </main>
      <Toaster
        position='bottom-right'
        toastOptions={{
          style: {
            backgroundColor: '#fff5f3',
            border: '1px solid #f4b0a1',
            borderRadius: '12px',
            background: '#fff5f3'
          }
        }}
      />
      <Footer />
    </>
  );
};
