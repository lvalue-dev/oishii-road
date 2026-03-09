import { useState } from 'react';
import { menuItems, categories, orderPhrases } from '../data/menuData';
import './QuickOrderPage.css';

const allItems = Object.entries(menuItems).flatMap(([catId, list]) =>
  list.map((item) => ({ ...item, catId }))
);

export default function QuickOrderPage() {
  const [selectedCat, setSelectedCat] = useState('all');
  const [cardIndex, setCardIndex] = useState(0);
  const [mode, setMode] = useState('cards'); // 'cards' | 'phrases'

  const filtered =
    selectedCat === 'all'
      ? allItems
      : allItems.filter((i) => i.catId === selectedCat);

  const current = filtered[cardIndex] || filtered[0];
  const total = filtered.length;

  const catColor =
    categories.find((c) => c.id === current?.catId)?.color || '#e07b39';

  const speak = (text, lang = 'ja-JP') => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(text);
      utter.lang = lang;
      utter.rate = 0.75;
      window.speechSynthesis.speak(utter);
    }
  };

  const prev = () => setCardIndex((i) => (i - 1 + total) % total);
  const next = () => setCardIndex((i) => (i + 1) % total);

  return (
    <div className="qo-page">
      <header className="qo-header">
        <div className="qo-title-row">
          <h1 className="qo-title">📋 이거 주세요!</h1>
          <div className="qo-mode-toggle">
            <button
              className={mode === 'cards' ? 'active' : ''}
              onClick={() => setMode('cards')}
            >
              메뉴 카드
            </button>
            <button
              className={mode === 'phrases' ? 'active' : ''}
              onClick={() => setMode('phrases')}
            >
              필수 문장
            </button>
          </div>
        </div>
        <p className="qo-desc">화면을 직접 보여주며 주문하세요</p>
      </header>

      {mode === 'cards' && (
        <>
          {/* 카테고리 필터 */}
          <div className="qo-filter">
            <button
              className={`filter-chip ${selectedCat === 'all' ? 'active' : ''}`}
              onClick={() => { setSelectedCat('all'); setCardIndex(0); }}
            >
              전체
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                className={`filter-chip ${selectedCat === cat.id ? 'active' : ''}`}
                onClick={() => { setSelectedCat(cat.id); setCardIndex(0); }}
              >
                {cat.emoji} {cat.name}
              </button>
            ))}
          </div>

          {/* 메인 주문 카드 */}
          {current && (
            <div className="qo-main">
              <div className="qo-card" style={{ borderColor: catColor }}>
                <div className="qo-card-top" style={{ background: catColor }}>
                  <span className="qo-cat-label">
                    {categories.find((c) => c.id === current.catId)?.emoji}{' '}
                    {categories.find((c) => c.id === current.catId)?.name}
                  </span>
                  <span className="qo-counter">{cardIndex + 1} / {total}</span>
                </div>

                <div className="qo-card-body">
                  <div className="qo-kanji">{current.kanji}</div>
                  <div className="qo-kana">{current.kana}</div>
                  <button
                    className="qo-speak-btn"
                    onClick={() => speak(current.kana || current.kanji)}
                  >
                    🔊 발음 듣기
                  </button>
                </div>

                <div className="qo-card-info">
                  <div className="qo-pronunciation">발음: {current.pronunciation}</div>
                  <div className="qo-korean">{current.korean}</div>
                </div>
              </div>

              <div className="qo-nav">
                <button className="qo-nav-btn" onClick={prev}>← 이전</button>
                <button className="qo-nav-btn primary" onClick={next}>다음 →</button>
              </div>

              <div className="qo-tip-bar">
                <span>💡</span>
                <p>{current.tip}</p>
              </div>
            </div>
          )}
        </>
      )}

      {mode === 'phrases' && (
        <div className="phrases-grid">
          {orderPhrases.map((phrase, i) => (
            <div key={i} className="phrase-card">
              <div className="phrase-jp">{phrase.japanese}</div>
              <div className="phrase-kana">{phrase.kana}</div>
              <div className="phrase-pron">발음: {phrase.pronunciation}</div>
              <div className="phrase-kr">{phrase.korean}</div>
              <button
                className="phrase-speak"
                onClick={() => speak(phrase.japanese)}
              >
                🔊
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
