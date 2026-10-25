import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const COMPONENT_LIST = [
  // UI & Internal Code Hub
  { path: '/ui-internal-view', name: 'UI & Internal Code View', category: 'UI Code Hub', tag: 'Dual View' },

  // FE Questions Bible & DSA
  { path: '/fe-questions', name: 'Front End Questions Practice', category: 'FE Bible', tag: '450+ Q&A' },
  { path: '/quiz', name: 'Frontend Speed Quiz', category: 'FE Bible', tag: '30s Timer/20Q' },
  { path: '/dsa-practice', name: 'DSA Visualizer Hub', category: 'DSA Practice', tag: '43 Problems' },
  { path: '/study-nudge', name: 'Study & SMS Nudge', category: 'DSA Practice', tag: 'Daily Reminder' },

  // UI Components
  { path: '/tabs', name: 'Tabs', category: 'UI Components', tag: 'Basic' },
  { path: '/navbar-demo', name: 'Navigation Bar', category: 'UI Components', tag: 'Nav / Menu' },
  { path: '/modal', name: 'Modal Dialog', category: 'UI Components', tag: 'DOM / Portal' },
  { path: '/countdown', name: 'Countdown Timer', category: 'UI Components', tag: 'Timer' },
  { path: '/autocomplete', name: 'Autocomplete', category: 'UI Components', tag: 'Search' },
  { path: '/otp', name: 'OTP Input', category: 'UI Components', tag: 'Focus/Refs' },
  { path: '/carousel', name: 'Image Carousel', category: 'UI Components', tag: 'Slider' },
  { path: '/accordion', name: 'Accordion', category: 'UI Components', tag: 'Collapse' },
  { path: '/star-rating', name: 'Star Rating', category: 'UI Components', tag: 'State' },
  { path: '/progress-bars', name: 'Progress Bars', category: 'UI Components', tag: 'Visual' },

  // Data & Forms
  { path: '/nested-comments', name: 'Nested Comments', category: 'Data & Forms', tag: 'Tree/Recursion' },
  { path: '/crud-list', name: 'CRUD List Operations', category: 'Data & Forms', tag: 'CRUD/Sort' },
  { path: '/pagination', name: 'Pagination (JS Truncate)', category: 'Data & Forms', tag: 'Algo' },
  { path: '/infinite-scroll', name: 'Infinite Scroll', category: 'Data & Forms', tag: 'Observer' },
  { path: '/nested-accordion', name: 'Nested Accordion', category: 'Data & Forms', tag: 'Recursion' },
  { path: '/stepper', name: 'Form Stepper', category: 'Data & Forms', tag: 'Wizard' },
  { path: '/form-validation', name: 'Form Validation', category: 'Data & Forms', tag: 'Validation' },
  { path: '/data-table', name: 'Data Table', category: 'Data & Forms', tag: 'Filter/Sort' },
  { path: '/file-explorer', name: 'File Explorer', category: 'Data & Forms', tag: 'Tree/Recursion' },

  // Custom Hooks & Performance
  { path: '/custom-hooks', name: 'Custom Hooks Suite', category: 'Custom Hooks', tag: 'Hooks Rules' },
  { path: '/search', name: 'Debounce & Throttle', category: 'Performance', tag: 'Optimization' },

  // Games & Mini Apps
  { path: '/memory', name: 'Memory Grid Light', category: 'Apps & Games', tag: 'Matrix' },
  { path: '/traffic-light', name: 'Traffic Light', category: 'Apps & Games', tag: 'State Machine' },
  { path: '/digital-clock', name: 'Digital Clock', category: 'Apps & Games', tag: 'Timer' },
  { path: '/stopwatch', name: 'Stopwatch', category: 'Apps & Games', tag: 'Timer' },
  { path: '/todo', name: 'Todo List', category: 'Apps & Games', tag: 'CRUD' },
  { path: '/kanban', name: 'Kanban Board', category: 'Apps & Games', tag: 'State/DnD' },
];

const Sidebar = ({ isCollapsed, toggleCollapse, isMobileOpen, onMobileClose }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredComponents = COMPONENT_LIST.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ['UI Code Hub', 'FE Bible', 'DSA Practice', 'UI Components', 'Data & Forms', 'Custom Hooks', 'Performance', 'Apps & Games'];

  const handleNavClick = () => {
    if (onMobileClose) {
      onMobileClose();
    }
  };

  if (isCollapsed) {
    return (
      <aside className={`sidebar collapsed ${isMobileOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-header-collapsed">
          <button className="sidebar-toggle-btn" onClick={toggleCollapse} title="Expand Sidebar">
            ▶
          </button>
        </div>
        <div className="collapsed-nav-icons">
          {COMPONENT_LIST.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-link-collapsed ${isActive ? 'active' : ''}`}
              title={`${item.name} (${item.category})`}
              onClick={handleNavClick}
            >
              <span className="collapsed-icon">{item.name.charAt(0)}</span>
            </NavLink>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-header-title-row">
          <h2>⚡ Machine Coding Hub</h2>
          <div className="sidebar-header-actions">
            <button className="sidebar-toggle-btn" onClick={toggleCollapse} title="Collapse Sidebar">
              ◀
            </button>
            <button className="sidebar-close-mobile-btn" onClick={onMobileClose} title="Close Menu">
              ✕
            </button>
          </div>
        </div>
        <input
          type="text"
          className="search-box"
          placeholder={`Search ${COMPONENT_LIST.length} components...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div style={{ flex: 1, paddingBottom: '1rem' }}>
        {categories.map((cat) => {
          const items = filteredComponents.filter(c => c.category === cat);
          if (items.length === 0) return null;

          return (
            <div key={cat} className="category-group">
              <div className="category-title">{cat} ({items.length})</div>
              {items.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  onClick={handleNavClick}
                >
                  <span>{item.name}</span>
                  <span className="badge">{item.tag}</span>
                </NavLink>
              ))}
            </div>
          );
        })}
      </div>

      <div className="sidebar-footer">
        <div className="copyright-text">© Built by Anirban Sarkar</div>
        <span style={{ fontSize: '0.8rem', color: '#fff' }}>I Created this while preparing for my interview. If it helps you land a job, please ping me for a referral, yaar 😭😂 I’ll happily join you in the company too — employee referral + future colleague, full package! 🤝</span>        <a
          href="https://anirban-sarkar-portfolio-react.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="portfolio-btn"
        >
          My Portfolio Website
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;

