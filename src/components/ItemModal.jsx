import { useEffect } from 'react';
import './ItemModal.css';

export default function ItemModal({ item, categoryColor, isFavorite, onToggleFavorite, onClose }) {
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const speak = () => {
    if ('speechSynthesis' in window) {
      const utter = new SpeechSynthesisUtterance(item.kana || item.kanji);
      utter.lang = 'ja-JP';
      utter.rate = 0.8;
      window.speechSynthesis.speak(utter);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-sheet"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={item.korean}
      >
        <div className="modal-handle" />

        <div className="modal-accent-bar" style={{ background: categoryColor }} />

        <div className="modal-content">
          {/* Step 1: 표기 */}
          <section className="learn-step">
            <div className="step-badge" style={{ background: categoryColor }}>표기 1</div>
            <div className="step-writing">
              <span className="modal-kanji">{item.kanji}</span>
              <span className="modal-kana">{item.kana}</span>
            </div>
            <p className="step-hint">한자 + 히라가나/가타카나</p>
          </section>

          {/* Step 2: 읽기 */}
          <section className="learn-step">
            <div className="step-badge" style={{ background: categoryColor }}>발음 2</div>
            <div className="step-pronunciation">
              <span className="modal-pronunciation">{item.pronunciation}</span>
              <button className="speak-btn" onClick={speak} title="발음 듣기" aria-label="발음 듣기">
                🔊
              </button>
            </div>
            <p className="step-hint">한국어 발음 표기 · 버튼을 눌러 들어보세요</p>
          </section>

          {/* Step 3: 의미 */}
          <section className="learn-step">
            <div className="step-badge" style={{ background: categoryColor }}>의미 3</div>
            <p className="modal-korean">{item.korean}</p>
            <p className="modal-taste">{item.taste}</p>
          </section>

          {/* 팁 */}
          {item.tip && (
            <div className="modal-tip">
              <span className="tip-icon">💡</span>
              <p>{item.tip}</p>
            </div>
          )}

          {/* 액션 버튼 */}
          <div className="modal-actions">
            <button
              className={`action-btn fav-action ${isFavorite ? 'active' : ''}`}
              onClick={() => onToggleFavorite(item.id)}
            >
              {isFavorite ? '⭐ 즐겨찾기 해제' : '☆ 즐겨찾기 추가'}
            </button>
            <button className="action-btn close-action" onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
