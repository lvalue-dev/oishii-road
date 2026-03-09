import './TabBar.css';

const tabs = [
  { id: 'home', label: '홈', icon: '🏠' },
  { id: 'favorites', label: '즐겨찾기', icon: '⭐' },
  { id: 'quickorder', label: '주문하기', icon: '📋' },
  { id: 'tips', label: '팁·문화', icon: '💡' },
];

export default function TabBar({ current, onChange }) {
  return (
    <nav className="tab-bar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`tab-item ${current === tab.id ? 'active' : ''}`}
          onClick={() => onChange(tab.id)}
          aria-label={tab.label}
        >
          <span className="tab-icon">{tab.icon}</span>
          <span className="tab-label">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}
