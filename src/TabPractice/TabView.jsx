import React, { useState } from 'react';
import InterviewTips from '../components/InterviewTips';

// 1. Tab Component - Simple & Clean for Interview
const TabView = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [orientation, setOrientation] = useState('horizontal');

  const tabsData = [
    { label: 'Profile', badge: 'New', content: '👤 User Profile Details & Settings' },
    { label: 'Preferences', content: '⚙️ Notification & Theme Preferences' },
    { label: 'Security', badge: 'Alert', content: '🔒 Password & 2FA Security Settings' },
    { label: 'Disabled', disabled: true, content: 'Cannot click me' },
  ];

  return (
    <div className="demo-card">
      <h2 className="demo-title">1. Tabs Component</h2>
      <p className="demo-description">Dynamic tabs with horizontal/vertical switching, badge counts, and disabled state.</p>

      {/* Orientation Switcher */}
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem' }}>Layout:</span>
        <button
          className={`btn ${orientation === 'horizontal' ? '' : 'btn-secondary'}`}
          onClick={() => setOrientation('horizontal')}
        >
          Horizontal
        </button>
        <button
          className={`btn ${orientation === 'vertical' ? '' : 'btn-secondary'}`}
          onClick={() => setOrientation('vertical')}
        >
          Vertical
        </button>
      </div>

      {/* Tabs Container */}
      <div style={{
        display: 'flex',
        flexDirection: orientation === 'vertical' ? 'row' : 'column',
        gap: '1rem',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '1rem',
        background: 'var(--bg-primary)'
      }}>
        {/* Tab Headers */}
        <div style={{
          display: 'flex',
          flexDirection: orientation === 'vertical' ? 'column' : 'row',
          gap: '0.5rem',
          borderBottom: orientation === 'horizontal' ? '2px solid var(--border)' : 'none',
          borderRight: orientation === 'vertical' ? '2px solid var(--border)' : 'none',
          paddingBottom: orientation === 'horizontal' ? '0.5rem' : 0,
          paddingRight: orientation === 'vertical' ? '0.5rem' : 0,
          minWidth: orientation === 'vertical' ? '140px' : 'auto'
        }}>
          {tabsData.map((tab, index) => (
            <button
              key={index}
              disabled={tab.disabled}
              onClick={() => setActiveTab(index)}
              style={{
                padding: '0.5rem 1rem',
                border: 'none',
                background: activeTab === index ? 'var(--accent)' : 'transparent',
                color: tab.disabled ? 'var(--text-secondary)' : activeTab === index ? '#fff' : 'var(--text-primary)',
                borderRadius: '6px',
                cursor: tab.disabled ? 'not-allowed' : 'pointer',
                opacity: tab.disabled ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                gap: '0.5rem',
                fontWeight: activeTab === index ? 'bold' : 'normal',
                textAlign: 'left'
              }}
            >
              <span>{tab.label}</span>
              {tab.badge && (
                <span style={{
                  fontSize: '0.7rem',
                  background: activeTab === index ? 'rgba(255,255,255,0.3)' : 'var(--accent)',
                  color: '#fff',
                  padding: '2px 6px',
                  borderRadius: '10px'
                }}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div style={{ padding: '1rem', flex: 1, background: 'var(--bg-card)', borderRadius: '6px' }}>
          {tabsData[activeTab]?.content}
        </div>
      </div>

      <InterviewTips
        concepts={[
          'State management for active tab index: useState(0)',
          'Conditional styling for active and disabled states',
          'Dynamic rendering of tab headers and active panel'
        ]}
        edgeCases={[
          'Handling disabled tabs (prevent click handlers)',
          'Out-of-bounds tab index fallback',
          'Responsive layout (Horizontal vs Vertical)'
        ]}
      />
    </div>
  );
};

export default TabView;
