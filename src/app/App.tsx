import { RouterProvider } from 'react-router';

import { router } from '@/app/router/router';
import { ErrorBoundary } from '@/shared';

import './App.scss';

function App() {
  return (
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
}

export default App;
