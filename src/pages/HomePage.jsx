import { useState } from 'react';
import { categories, menuItems } from '../data/menuData';
import MenuCard from '../components/MenuCard';
import ItemModal from '../components/ItemModal';
import './HomePage.css';

export default function HomePage({ favorites, onToggleFavorite, isFavorite }) {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState('');

  const currentCategory = categories.find((c) => c.id === selectedCategory);
  const items = selectedCategory ? (menuItems[selectedCategory] || []) : [];

  const filteredItems = search
    ? Object.entries(menuItems).flatMap(([, list]) =>
        list.filter(
          (item) =>
            item.kanji.includes(search) ||
            item.kana.includes(search) ||
            item.korean.includes(search) ||
            item.pronunciation.includes(search)
        )
      )
    : items;

  return (
    <div className="home-page">
      {/* 헤더 */}
      <header className="home-header">
        <div className="logo-area">
          <span className="logo-emoji">🍜</span>
          <div>
            <h1 className="app-title">오이시이 로드</h1>
            <p className="app-subtitle">일본 메뉴판 완전 정복</p>
          </div>
        </div>
        <div className="search-wrap">
          <input
            type="search"
            className="search-input"
            placeholder="메뉴 검색 (한국어, 일본어...)"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              if (e.target.value) setSelectedCategory(null);
            }}
          />
        </div>
      </header>

      {/* 검색 결과 */}
      {search ? (
        <section className="section">
          <h2 className="section-title">검색 결과 ({filteredItems.length})</h2>
          {filteredItems.length === 0 ? (
            <div className="empty-state">
              <p>검색 결과가 없습니다.</p>
              <p className="empty-hint">일본어나 한국어로 검색해보세요</p>
            </div>
          ) : (
            <div className="cards-grid">
              {filteredItems.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                  isFavorite={isFavorite(item.id)}
                  onToggleFavorite={onToggleFavorite}
                  onClick={setSelectedItem}
                />
              ))}
            </div>
          )}
        </section>
      ) : (
        <>
          {/* 카테고리 */}
          <section className="section">
            <h2 className="section-title">카테고리</h2>
            <div className="category-grid">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  className={`category-card ${selectedCategory === cat.id ? 'active' : ''}`}
                  style={{ '--cat-color': cat.color }}
                  onClick={() =>
                    setSelectedCategory(selectedCategory === cat.id ? null : cat.id)
                  }
                >
                  <span className="cat-emoji">{cat.emoji}</span>
                  <div className="cat-info">
                    <span className="cat-name">{cat.name}</span>
                    <span className="cat-name-jp">{cat.nameJp}</span>
                  </div>
                  <span className="cat-desc">{cat.description}</span>
                </button>
              ))}
            </div>
          </section>

          {/* 선택된 카테고리 메뉴 */}
          {selectedCategory && (
            <section className="section">
              <h2 className="section-title">
                <span style={{ color: currentCategory?.color }}>{currentCategory?.emoji}</span>{' '}
                {currentCategory?.name} 메뉴
                <span className="count-badge">{items.length}</span>
              </h2>
              <div className="cards-grid">
                {items.map((item) => (
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

          {/* 선택 안 됐을 때: 인기 메뉴 */}
          {!selectedCategory && (
            <section className="section">
              <h2 className="section-title">⭐ 인기 메뉴</h2>
              <div className="cards-grid">
                {Object.entries(menuItems)
                  .flatMap(([, list]) => list.filter((i) => i.popular))
                  .slice(0, 6)
                  .map((item) => (
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
        </>
      )}

      {/* 모달 */}
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
