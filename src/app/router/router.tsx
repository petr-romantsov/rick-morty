import { createHashRouter } from 'react-router';

import { CharacterInfo, CharactersList, NotFoundPage } from '@/pages';
import { PageLayout } from '@/shared/components/PageLayout/PageLayout';

export const router = createHashRouter([
  {
    path: '/',
    element: <PageLayout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <CharactersList />
      },
      {
        path: 'character/:id',
        element: <CharacterInfo />
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
]);
