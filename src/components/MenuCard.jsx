import './MenuCard.css';

const difficultyColor = {
  '쉬움': 'easy',
  '보통': 'medium',
  '어려움': 'hard',
};

export default function MenuCard({ item, isFavorite, onToggleFavorite, onClick }) {
  return (
    <article
      className="menu-card"
      onClick={() => onClick(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(item)}
    >
      <div className="card-header">
        <div className="card-title-group">
          <span className="card-kanji">{item.kanji}</span>
          <span className="card-kana">{item.kana}</span>
        </div>
        <button
          className={`fav-btn ${isFavorite ? 'active' : ''}`}
          onClick={(e) => { e.stopPropagation(); onToggleFavorite(item.id); }}
          aria-label={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}
        >
          {isFavorite ? '⭐' : '☆'}
        </button>
      </div>

      <div className="card-body">
        <p className="card-pronunciation">🔊 {item.pronunciation}</p>
        <p className="card-korean">{item.korean}</p>
        <p className="card-taste">{item.taste}</p>
      </div>

      <div className="card-footer">
        {item.popular && <span className="badge popular">인기</span>}
        <span className={`badge difficulty ${difficultyColor[item.difficulty]}`}>
          {item.difficulty}
        </span>
        <span className="card-hint">탭하여 상세보기 →</span>
      </div>
    </article>
  );
}
