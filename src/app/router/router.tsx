import { lazy } from 'react';

import { createHashRouter } from 'react-router';

import { PageLayout } from '@/shared/components/PageLayout/PageLayout';

const CharactersList = lazy(() => import('@/pages/CharactersList/CharactersList'));
const CharacterInfo = lazy(() => import('@/pages/CharacterInfo/CharacterInfo'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage/NotFoundPage'));

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
