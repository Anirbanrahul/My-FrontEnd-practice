import React, { useState, useRef } from 'react';
import useDebounce from './useDebounce';
import useLocalStorage from './useLocalStorage';
import useOnClickOutside from './useOnClickOutside';
import usePrevious from './usePrevious';
import useFetch from './useFetch';
import InterviewTips from '../components/InterviewTips';

const CustomHooksDemo = () => {
  // 1. useDebounce
  const [text, setText] = useState('Type here');
  const debouncedText = useDebounce(text, 500);

  // 2. useLocalStorage
  const [name, setName] = useLocalStorage('user_name', 'Alex');

  // 3. useOnClickOutside
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef(null);
  useOnClickOutside(boxRef, () => setIsOpen(false));

  // 4. usePrevious
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  // 5. useFetch
  const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/todos/1');

  return (
    <div className="demo-card">
      <h2 className="demo-title">Custom Hooks Suite (5 Key Hooks)</h2>
      <p className="demo-description">Simple, easy-to-remember implementations of top custom hooks asked in interviews.</p>

      <div style={{ display: 'grid', gap: '1.25rem' }}>
        {/* 1. useDebounce */}
        <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--accent)' }}>1. useDebounce(value, delay)</h3>
          <input
            type="text"
            className="input-field"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ marginTop: '0.5rem', width: '100%', maxWidth: '300px' }}
          />
          <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
            <span>Input: <strong>{text}</strong></span> | <span>Debounced (500ms): <strong style={{ color: 'var(--success)' }}>{debouncedText}</strong></span>
          </div>
        </div>

        {/* 2. useLocalStorage */}
        <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--accent)' }}>2. useLocalStorage(key, initialValue)</h3>
          <input
            type="text"
            className="input-field"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginTop: '0.5rem', width: '100%', maxWidth: '300px' }}
          />
          <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Value persists across browser refresh: <strong>{name}</strong>
          </div>
        </div>

        {/* 3. useOnClickOutside */}
        <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--accent)' }}>3. useOnClickOutside(ref, handler)</h3>
          <button className="btn" onClick={() => setIsOpen(true)} style={{ marginTop: '0.5rem' }}>
            Open Box
          </button>
          {isOpen && (
            <div ref={boxRef} style={{ marginTop: '0.5rem', padding: '1rem', background: 'var(--bg-card)', border: '2px dashed var(--accent)', borderRadius: '6px' }}>
              Click OUTSIDE this box to dismiss it!
            </div>
          )}
        </div>

        {/* 4. usePrevious */}
        <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--accent)' }}>4. usePrevious(value)</h3>
          <button className="btn" onClick={() => setCount(c => c + 1)} style={{ marginTop: '0.5rem' }}>
            Increment ({count})
          </button>
          <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
            Current: <strong>{count}</strong> | Previous: <strong>{prevCount ?? 'N/A'}</strong>
          </div>
        </div>

        {/* 5. useFetch */}
        <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <h3 style={{ fontSize: '1rem', color: 'var(--accent)' }}>5. useFetch(url)</h3>
          {loading && <div>Loading JSON API...</div>}
          {error && <div style={{ color: 'var(--danger)' }}>Error: {error}</div>}
          {data && (
            <div style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-primary)' }}>
              Fetched Todo Title: <strong>"{data.title}"</strong> (Completed: {data.completed ? 'Yes' : 'No'})
            </div>
          )}
        </div>
      </div>

      <InterviewTips
        concepts={[
          'useDebounce: Uses setTimeout & clearTimeout cleanup inside useEffect',
          'useLocalStorage: Uses lazy initial state function useState(() => JSON.parse(...))',
          'useOnClickOutside: Uses document mousedown listener & ref.current.contains(event.target)',
          'usePrevious: Uses useRef to hold value updated inside useEffect (runs AFTER render return)',
          'useFetch: Uses AbortController for cleanup on unmount/url change'
        ]}
      />
    </div>
  );
};

export default CustomHooksDemo;
