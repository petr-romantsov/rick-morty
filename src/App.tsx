import './App.css';
import { GoBackButton } from './components/GoBackButton/GoBackButton';
import { MainLogo } from './components/MainLogo/MainLogo';
import { PageLayout } from './components/PageLayout/PageLayout';

function App() {
  return (
    <PageLayout>
      <MainLogo />
      <GoBackButton />
    </PageLayout>
  );
}

export default App;
