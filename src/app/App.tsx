import { Suspense } from 'react';

import { RouterProvider } from 'react-router';

import { router } from '@/app/router/router';
import { ErrorBoundary, Loader } from '@/shared';

import './App.scss';

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader size='large' text='Loading...' />}>
        <RouterProvider router={router} />
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
