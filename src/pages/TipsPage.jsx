import { cultureTips } from '../data/menuData';
import './TipsPage.css';

const seasonalGuide = [
  { season: '봄 (3~5월)', icon: '🌸', items: ['桜鯛 사쿠라다이 (벚꽃 도미)', 'たけのこ 타케노코 (죽순)', 'はまぐり 하마구리 (대합조개)'] },
  { season: '여름 (6~8월)', icon: '🌊', items: ['はも 하모 (갯장어)', 'あゆ 아유 (은어)', 'うなぎ 우나기 (장어)'] },
  { season: '가을 (9~11월)', icon: '🍂', items: ['さんま 산마 (꽁치)', 'まつたけ 마츠타케 (송이버섯)', '鮭 사케 (연어)'] },
  { season: '겨울 (12~2월)', icon: '❄️', items: ['ぶり 부리 (방어)', 'かに 카니 (게)', 'ふぐ 후구 (복어)'] },
];

const sauceGuide = [
  { name: 'タレ (타레)', desc: '달콤짭짤한 간장 소스. 야키토리의 기본. 진한 맛을 좋아하면 선택.', emoji: '🍯' },
  { name: '塩 (시오)', desc: '소금 구이. 재료 본연의 맛을 느낄 때. 기름진 부위에 잘 어울림.', emoji: '🧂' },
  { name: 'わさび (와사비)', desc: '고추냉이. 생선 사시미·스시에 필수. 빼달라면 "와사비 누키"', emoji: '🟢' },
  { name: 'ポン酢 (폰즈)', desc: '감귤 풍미 간장 소스. 나베·두부에 최적. 상큼한 뒷맛.', emoji: '🍋' },
];

export default function TipsPage() {
  return (
    <div className="tips-page">
      <header className="page-header">
        <h1 className="page-title">💡 팁 & 문화 가이드</h1>
        <p className="page-subtitle">현장에서 당황하지 않기 위한 필수 상식</p>
      </header>

      {/* 이자카야 문화 팁 */}
      <section className="tips-section">
        <h2 className="tips-section-title">🏮 이자카야 문화 & 에티켓</h2>
        <div className="tips-list">
          {cultureTips.map((tip) => (
            <div key={tip.id} className="tip-card">
              <div className="tip-card-icon">{tip.icon}</div>
              <div className="tip-card-body">
                <h3 className="tip-card-title">{tip.title}</h3>
                <p className="tip-card-content">{tip.content}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 소스 가이드 */}
      <section className="tips-section">
        <h2 className="tips-section-title">🍶 소스 & 양념 가이드</h2>
        <div className="sauce-grid">
          {sauceGuide.map((sauce) => (
            <div key={sauce.name} className="sauce-card">
              <span className="sauce-emoji">{sauce.emoji}</span>
              <div>
                <div className="sauce-name">{sauce.name}</div>
                <p className="sauce-desc">{sauce.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 계절 메뉴 */}
      <section className="tips-section">
        <h2 className="tips-section-title">📅 계절별 제철 메뉴</h2>
        <div className="season-grid">
          {seasonalGuide.map((s) => (
            <div key={s.season} className="season-card">
              <div className="season-header">
                <span className="season-icon">{s.icon}</span>
                <span className="season-name">{s.season}</span>
              </div>
              <ul className="season-list">
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 굽기 가이드 */}
      <section className="tips-section">
        <h2 className="tips-section-title">🔥 고기 굽기 (야키니쿠 기준)</h2>
        <div className="doneness-list">
          {[
            { level: 'レア (레아)', ko: '레어', desc: '겉만 살짝. 내부는 붉은색. 고급 와규에서 즐기는 방법.' },
            { level: 'ミディアム (미디엄)', ko: '미디엄', desc: '중간 정도. 분홍빛이 남아있음. 가장 일반적인 굽기.' },
            { level: 'ウェルダン (웰던)', ko: '웰던', desc: '속까지 완전히 익힘. 내장류나 닭고기는 반드시 웰던!' },
          ].map((d) => (
            <div key={d.level} className="doneness-row">
              <div className="doneness-level">
                <span className="doneness-jp">{d.level}</span>
                <span className="doneness-ko">{d.ko}</span>
              </div>
              <p className="doneness-desc">{d.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
