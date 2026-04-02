import { Suspense } from 'react';

import { RouterProvider } from 'react-router';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { router } from '@/app/router/router';
import { ErrorBoundary, Loader } from '@/shared';

import './App.scss';

const queryClient = new QueryClient();

function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader size='large' text='Loading...' />}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools
            initialIsOpen={false}
            buttonPosition='bottom-left'
          />
        </QueryClientProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
