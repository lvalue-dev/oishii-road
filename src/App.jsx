import { useState } from 'react';
import { useTheme } from './hooks/useTheme';
import { useFavorites } from './hooks/useFavorites';
import TabBar from './components/TabBar';
import HomePage from './pages/HomePage';
import FavoritesPage from './pages/FavoritesPage';
import QuickOrderPage from './pages/QuickOrderPage';
import TipsPage from './pages/TipsPage';
import './App.css';

export default function App() {
  const [tab, setTab] = useState('home');
  const { dark, toggle } = useTheme();
  const { favorites, toggle: toggleFavorite, isFavorite } = useFavorites();

  const renderPage = () => {
    switch (tab) {
      case 'home':
        return (
          <HomePage
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        );
      case 'favorites':
        return (
          <FavoritesPage
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        );
      case 'quickorder':
        return <QuickOrderPage />;
      case 'tips':
        return <TipsPage />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <TabBar current={tab} onChange={setTab} />
      <main className="app-main">{renderPage()}</main>
      <button
        className="theme-toggle"
        onClick={toggle}
        aria-label="다크모드 전환"
        title={dark ? '라이트 모드' : '다크 모드'}
      >
        {dark ? '☀️' : '🌙'}
      </button>
    </div>
  );
}
