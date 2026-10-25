import React, { useState } from 'react';
import InterviewTips from '../components/InterviewTips';

// Nested sample data tree
const NESTED_DATA = [
  {
    id: '1',
    title: 'Frontend Development',
    children: [
      {
        id: '1-1',
        title: 'Core Technologies',
        children: [
          { id: '1-1-1', title: 'HTML5 Semantic Elements', content: 'Tags like header, nav, main, article, section, footer.' },
          { id: '1-1-2', title: 'CSS3 Flexbox & Grid', content: 'Modern layout modules for responsive designs.' },
          { id: '1-1-3', title: 'JavaScript ES6+', content: 'Promises, Async/Await, Destructuring, Closures.' },
        ],
      },
      {
        id: '1-2',
        title: 'React Framework',
        children: [
          { id: '1-2-1', title: 'React Hooks', content: 'useState, useEffect, useMemo, useCallback, useRef.' },
          { id: '1-2-2', title: 'State Management', content: 'Context API, Redux Toolkit, Zustand.' },
        ],
      },
    ],
  },
  {
    id: '2',
    title: 'Backend Development',
    children: [
      {
        id: '2-1',
        title: 'Node.js runtime',
        children: [
          { id: '2-1-1', title: 'Express Framework', content: 'Routing, Middleware, Request/Response handling.' },
        ],
      },
    ],
  },
];

// Recursive Accordion Item Component
const AccordionNode = ({ item, depth = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div style={{ marginLeft: `${depth * 14}px`, marginBottom: '0.4rem' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '0.6rem 0.85rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          background: depth === 0 ? 'var(--bg-card)' : 'var(--bg-primary)',
          border: '1px solid var(--border)',
          borderRadius: '6px',
          color: 'var(--text-primary)',
          cursor: 'pointer',
          fontWeight: depth === 0 ? 'bold' : 'normal',
          fontSize: '0.875rem'
        }}
      >
        <span>
          {hasChildren ? (isOpen ? '📂 ' : '📁 ') : '📄 '}
          {item.title}
        </span>
        {hasChildren && <span>{isOpen ? '▲' : '▼'}</span>}
      </button>

      {isOpen && (
        <div style={{ marginTop: '0.35rem' }}>
          {item.content && (
            <div style={{
              padding: '0.65rem 0.85rem',
              background: 'var(--bg-primary)',
              borderRadius: '6px',
              color: 'var(--text-secondary)',
              fontSize: '0.85rem',
              borderLeft: '3px solid var(--accent)'
            }}>
              {item.content}
            </div>
          )}

          {hasChildren &&
            item.children.map((child) => (
              <AccordionNode key={child.id} item={child} depth={depth + 1} />
            ))}
        </div>
      )}
    </div>
  );
};

// 12. Nested Accordion Component
const NestedAccordionDemo = () => {
  return (
    <div className="demo-card">
      <h2 className="demo-title">12. Nested Accordion (Recursive Tree)</h2>
      <p className="demo-description">Multi-level dynamic accordion rendered recursively for arbitrary tree depth.</p>

      <div style={{ padding: '0.5rem', background: 'var(--bg-primary)', borderRadius: '8px', border: '1px solid var(--border)' }}>
        {NESTED_DATA.map((item) => (
          <AccordionNode key={item.id} item={item} depth={0} />
        ))}
      </div>

      <InterviewTips
        concepts={[
          'Recursive Component rendering: component calling itself AccordionNode',
          'Depth props for dynamic indentation styling',
          'Self-contained local state (isOpen) inside each tree node'
        ]}
        edgeCases={[
          'Infinite recursion prevention (base condition checking hasChildren)',
          'Expand all / Collapse all global state trigger'
        ]}
      />
    </div>
  );
};

export default NestedAccordionDemo;
