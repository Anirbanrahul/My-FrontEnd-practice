import React, { useState, useRef } from 'react';
import useOnClickOutside from '../customHooks/useOnClickOutside';
import InterviewTips from '../components/InterviewTips';

const NavbarDemo = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Home');

  // Dismiss dropdown on outside click
  const dropdownRef = useRef(null);
  useOnClickOutside(dropdownRef, () => setIsDropdownOpen(false));

  return (
    <div className="demo-card">
      <h2 className="demo-title">React Navigation Bar</h2>
      <p className="demo-description">Responsive Navbar with dropdown menu, mobile drawer toggle, and outside-click dismissal.</p>

      {/* Navbar Container */}
      <nav style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '0.75rem 1rem',
        position: 'relative'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Brand */}
          <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: 'var(--accent)' }}>
            ⚡ BrandLogo
          </div>

          {/* Desktop Nav Items */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <button
              onClick={() => setActiveTab('Home')}
              style={{ background: 'none', border: 'none', color: activeTab === 'Home' ? 'var(--accent)' : 'var(--text-primary)', cursor: 'pointer' }}
            >
              Home
            </button>

            {/* Dropdown Menu Item */}
            <div ref={dropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
              >
                Services {isDropdownOpen ? '▲' : '▼'}
              </button>

              {/* Dropdown Content */}
              {isDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  left: 0,
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '6px',
                  padding: '0.5rem',
                  minWidth: '150px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  zIndex: 10
                }}>
                  {['Web Development', 'Mobile Apps', 'Cloud Consulting'].map((item) => (
                    <div
                      key={item}
                      onClick={() => { setActiveTab(item); setIsDropdownOpen(false); }}
                      style={{ padding: '0.4rem 0.6rem', fontSize: '0.85rem', cursor: 'pointer', borderRadius: '4px' }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setActiveTab('Contact')}
              style={{ background: 'none', border: 'none', color: activeTab === 'Contact' ? 'var(--accent)' : 'var(--text-primary)', cursor: 'pointer' }}
            >
              Contact
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            style={{
              background: 'var(--bg-hover)',
              border: '1px solid var(--border)',
              color: 'var(--text-primary)',
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {isMobileOpen ? '✖' : '☰'}
          </button>
        </div>

        {/* Mobile Drawer */}
        {isMobileOpen && (
          <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button onClick={() => { setActiveTab('Home'); setIsMobileOpen(false); }} style={{ textAlign: 'left', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>Home</button>
            <button onClick={() => { setActiveTab('Services'); setIsMobileOpen(false); }} style={{ textAlign: 'left', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>Services</button>
            <button onClick={() => { setActiveTab('Contact'); setIsMobileOpen(false); }} style={{ textAlign: 'left', background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}>Contact</button>
          </div>
        )}
      </nav>

      {/* Active Tab Indicator */}
      <div style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
        Active Route: <strong style={{ color: 'var(--accent)' }}>{activeTab}</strong>
      </div>

      <InterviewTips
        concepts={[
          'Mobile Drawer: State variable (isMobileOpen) toggles visibility of stacked navigation links',
          'Outside Click Dismissal: useOnClickOutside hook attached to dropdown ref closes menu on document click',
          'Semantic markup: <nav> container for screen reader accessibility'
        ]}
      />
    </div>
  );
};

export default NavbarDemo;
