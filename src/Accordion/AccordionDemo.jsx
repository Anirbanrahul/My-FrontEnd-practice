import React, { useState } from 'react';
import InterviewTips from '../components/InterviewTips';

const ACCORDION_DATA = [
  { id: 1, title: 'What is React state?', content: 'React state is a plain JavaScript object used to record and react to user events, input, or UI changes.' },
  { id: 2, title: 'Why is key prop needed in lists?', content: 'The key prop helps React identify which items have changed, been added, or removed, optimizing rendering performance.' },
  { id: 3, title: 'What is the Virtual DOM?', content: 'The Virtual DOM is a lightweight copy of the real DOM kept in memory, synced with the real DOM via reconciliation.' },
  { id: 4, title: 'What is component lifecycle?', content: 'The lifecycle comprises Mount, Update, and Unmount phases managed via useEffect hooks in functional components.' },
];

// 7. Accordion Component - Single & Multi Expand Modes
const AccordionDemo = () => {
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [openItems, setOpenItems] = useState([1]); // Array of active IDs

  const toggleItem = (id) => {
    if (allowMultiple) {
      if (openItems.includes(id)) {
        setOpenItems(openItems.filter((i) => i !== id));
      } else {
        setOpenItems([...openItems, id]);
      }
    } else {
      setOpenItems(openItems.includes(id) ? [] : [id]);
    }
  };

  return (
    <div className="demo-card">
      <h2 className="demo-title">7. Accordion Component</h2>
      <p className="demo-description">Collapsible accordion panel supporting Single-expand and Multi-expand modes.</p>

      {/* Mode Switcher */}
      <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <label style={{ fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input
            type="checkbox"
            checked={allowMultiple}
            onChange={(e) => {
              setAllowMultiple(e.target.checked);
              setOpenItems([]); // reset open items when switching mode
            }}
          />
          Allow Multiple Expanded Panels Simultaneously
        </label>
      </div>

      {/* Accordion Panels */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {ACCORDION_DATA.map((item) => {
          const isOpen = openItems.includes(item.id);
          return (
            <div
              key={item.id}
              style={{
                border: '1px solid var(--border)',
                borderRadius: '8px',
                overflow: 'hidden',
                background: 'var(--bg-primary)'
              }}
            >
              {/* Header */}
              <button
                onClick={() => toggleItem(item.id)}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: isOpen ? 'var(--bg-hover)' : 'transparent',
                  color: 'var(--text-primary)',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '600',
                  textAlign: 'left',
                  fontSize: '0.95rem'
                }}
              >
                <span>{item.title}</span>
                <span style={{ fontSize: '1rem', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  ▼
                </span>
              </button>

              {/* Body */}
              {isOpen && (
                <div style={{
                  padding: '1rem',
                  background: 'var(--bg-card)',
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem',
                  borderTop: '1px solid var(--border)'
                }}>
                  {item.content}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <InterviewTips
        concepts={[
          'State structure for single vs multi expand: Array/Set vs single ID or null',
          'Toggle logic: checking array inclusion vs setting single value',
          'CSS rotation indicator for chevron icon'
        ]}
        edgeCases={[
          'Closing an open panel by clicking it again',
          'Clearing open items when switching between single and multi expand modes'
        ]}
      />
    </div>
  );
};

export default AccordionDemo;
