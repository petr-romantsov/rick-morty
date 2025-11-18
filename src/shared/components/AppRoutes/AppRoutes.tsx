import { Route, Routes } from 'react-router';

import { Character, CharactersList } from '@/pages';
import { PageLayout } from '@/shared';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<PageLayout />} />
      <Route index element={<CharactersList />} />
      <Route path='characters' element={<Character />} />
    </Routes>
  );
};
