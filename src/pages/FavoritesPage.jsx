import { useState } from 'react';
import { categories, menuItems } from '../data/menuData';
import MenuCard from '../components/MenuCard';
import ItemModal from '../components/ItemModal';
import './FavoritesPage.css';

export default function FavoritesPage({ favorites, onToggleFavorite, isFavorite }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const allItems = Object.values(menuItems).flat();
  const favItems = allItems.filter((item) => favorites.includes(item.id));

  return (
    <div className="favorites-page">
      <header className="page-header">
        <h1 className="page-title">⭐ 즐겨찾기</h1>
        <p className="page-subtitle">
          {favItems.length > 0
            ? `${favItems.length}개의 메뉴를 저장했습니다`
            : '마음에 드는 메뉴를 저장해보세요'}
        </p>
      </header>

      {favItems.length === 0 ? (
        <div className="fav-empty">
          <div className="fav-empty-icon">⭐</div>
          <h2>즐겨찾기가 비어있어요</h2>
          <p>메뉴 카드의 ☆ 버튼을 눌러<br />자주 주문하는 메뉴를 저장하세요.</p>
        </div>
      ) : (
        <section className="section">
          <div className="cards-grid">
            {favItems.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
                isFavorite={isFavorite(item.id)}
                onToggleFavorite={onToggleFavorite}
                onClick={setSelectedItem}
              />
            ))}
          </div>
        </section>
      )}

      {selectedItem && (
        <ItemModal
          item={selectedItem}
          categoryColor={
            categories.find((c) =>
              (menuItems[c.id] || []).some((i) => i.id === selectedItem.id)
            )?.color || '#e07b39'
          }
          isFavorite={isFavorite(selectedItem.id)}
          onToggleFavorite={onToggleFavorite}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
}
