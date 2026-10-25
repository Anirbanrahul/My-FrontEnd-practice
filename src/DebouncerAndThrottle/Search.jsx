import React, { useState, useEffect, useRef } from 'react';
import InterviewTips from '../components/InterviewTips';

// 16. Debounce & Throttle Comparison Playground
const Search = () => {
  const [text, setText] = useState('');
  const [debouncedText, setDebouncedText] = useState('');
  const [throttledText, setThrottledText] = useState('');

  // Execution Counters
  const [rawCount, setRawCount] = useState(0);
  const [debounceCount, setDebounceCount] = useState(0);
  const [throttleCount, setThrottleCount] = useState(0);

  const throttleRef = useRef(false);

  // Debounce Effect: Wait 500ms after last keystroke
  useEffect(() => {
    if (!text) {
      setDebouncedText('');
      return;
    }
    const timer = setTimeout(() => {
      setDebouncedText(text);
      setDebounceCount((c) => c + 1);
    }, 500);

    return () => clearTimeout(timer);
  }, [text]);

  // Throttle Handler: Execute at most once every 500ms
  const handleInputChange = (e) => {
    const val = e.target.value;
    setText(val);
    setRawCount((c) => c + 1);

    if (!throttleRef.current) {
      setThrottledText(val);
      setThrottleCount((c) => c + 1);
      throttleRef.current = true;

      setTimeout(() => {
        throttleRef.current = false;
      }, 500);
    }
  };

  const handleReset = () => {
    setText('');
    setDebouncedText('');
    setThrottledText('');
    setRawCount(0);
    setDebounceCount(0);
    setThrottleCount(0);
  };

  return (
    <div className="demo-card">
      <h2 className="demo-title">16. Debounce & Throttle Visualizer</h2>
      <p className="demo-description">Side-by-side real-time event counter demonstrating the core difference between Debouncing and Throttling.</p>

      {/* Input Field */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <input
          type="text"
          className="input-field"
          style={{ flex: 1 }}
          placeholder="Type continuously to test Debounce vs Throttle..."
          value={text}
          onChange={handleInputChange}
        />
        <button className="btn btn-secondary" onClick={handleReset}>
          Reset Counters
        </button>
      </div>

      {/* Comparison Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        {/* Raw Input */}
        <div style={{ background: 'var(--bg-primary)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <h4 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>1. Raw Input Events</h4>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{rawCount}</div>
          <p style={{ fontSize: '0.85rem', marginTop: '0.4rem', color: 'var(--text-secondary)' }}>
            Triggers on <strong>every single keystroke</strong>.
          </p>
        </div>

        {/* Debounced */}
        <div style={{ background: 'var(--bg-primary)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--accent)' }}>
          <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>2. Debounced (500ms)</h4>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--accent)' }}>{debounceCount}</div>
          <p style={{ fontSize: '0.85rem', marginTop: '0.4rem', color: 'var(--text-secondary)' }}>
            Value: <strong>"{debouncedText}"</strong>
          </p>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Triggers only after 500ms of user <strong>inactivity/pause</strong>.
          </span>
        </div>

        {/* Throttled */}
        <div style={{ background: 'var(--bg-primary)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--warning)' }}>
          <h4 style={{ color: 'var(--warning)', marginBottom: '0.5rem' }}>3. Throttled (500ms)</h4>
          <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: 'var(--warning)' }}>{throttleCount}</div>
          <p style={{ fontSize: '0.85rem', marginTop: '0.4rem', color: 'var(--text-secondary)' }}>
            Value: <strong>"{throttledText}"</strong>
          </p>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            Triggers at most <strong>once every 500ms interval</strong>.
          </span>
        </div>
      </div>

      <InterviewTips
        concepts={[
          'Debounce: Delays execution until user stops typing for N milliseconds (clears timer on each keystroke)',
          'Throttle: Limits execution frequency to once per N milliseconds using boolean flag ref',
          'useRef usage for throttle lock boolean flag to avoid re-renders'
        ]}
        edgeCases={[
          'Flushing last trailing call in throttle',
          'Canceling pending debounce timeouts on unmount'
        ]}
      />
    </div>
  );
};

export default Search;