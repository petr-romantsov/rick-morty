import { AppRoutes, ErrorBoundary } from '@/shared';

import './App.scss';

function App() {
  return (
    <ErrorBoundary>
      <AppRoutes />
    </ErrorBoundary>
  );
}

export default App;
