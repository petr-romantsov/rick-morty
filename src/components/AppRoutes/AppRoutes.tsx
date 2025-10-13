import { Route, Routes } from 'react-router';
import { Character } from '../../pages/Character/Character';
import { CharactersList } from '../../pages/CharactersList/CharactersList';
import { PageLayout } from '../PageLayout/PageLayout';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<PageLayout />} />
      <Route path='character' element={<Character />} />
      <Route path='characters' element={<CharactersList />} />
    </Routes>
  );
};
