import { Route, Routes } from 'react-router';

import { Character } from '@/pages';
import { CharactersList } from '@/pages';
import { PageLayout } from '@/shared';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<PageLayout />} />
      <Route path='character' element={<Character />} />
      <Route path='characters' element={<CharactersList />} />
    </Routes>
  );
};
