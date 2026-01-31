import { createBrowserRouter } from 'react-router';

import { CharacterInfo, CharactersList, NotFoundPage } from '@/pages';
import { PageLayout } from '@/shared/components/PageLayout/PageLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout />,
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
        path: '404',
        element: <NotFoundPage />
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
]);
