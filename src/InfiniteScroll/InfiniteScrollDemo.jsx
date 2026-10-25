import React, { useState, useEffect, useRef } from 'react';
import InterviewTips from '../components/InterviewTips';

// 11. Infinite Scroll Component using IntersectionObserver
const InfiniteScrollDemo = () => {
  const [items, setItems] = useState(Array.from({ length: 15 }, (_, i) => `Post Card #${i + 1}`));
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef(null);

  // Load more items simulation
  const fetchMoreItems = () => {
    setLoading(true);
    setTimeout(() => {
      setItems((prev) => [
        ...prev,
        ...Array.from({ length: 10 }, (_, i) => `Post Card #${prev.length + i + 1}`)
      ]);
      setLoading(false);
    }, 800);
  };

  useEffect(() => {
    const target = observerTarget.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          fetchMoreItems();
        }
      },
      { threshold: 0.8 }
    );

    observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [loading]);

  return (
    <div className="demo-card">
      <h2 className="demo-title">11. Infinite Scroll Component</h2>
      <p className="demo-description">Infinite data loader utilizing the browser Intersection Observer API to detect bottom scroll target.</p>

      <div style={{
        height: '350px',
        overflowY: 'auto',
        border: '1px solid var(--border)',
        borderRadius: '8px',
        padding: '1rem',
        background: 'var(--bg-primary)'
      }}>
        {/* List Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {items.map((item, index) => (
            <div
              key={index}
              style={{
                padding: '1rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '0.9rem'
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>📜</span>
              <div>
                <strong>{item}</strong>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0 }}>
                  Infinite scroll list item populated automatically on scroll.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Observer Sentinel Element */}
        <div
          ref={observerTarget}
          style={{
            padding: '1.5rem',
            textAlign: 'center',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem',
            fontWeight: 'bold'
          }}
        >
          {loading ? '⏳ Loading more cards...' : 'Scroll further down to trigger loading...'}
        </div>
      </div>

      <InterviewTips
        concepts={[
          'IntersectionObserver API initialization and callback logic',
          'Attaching target sentinel element via useRef',
          'Disconnecting/unobserving target in useEffect cleanup'
        ]}
        edgeCases={[
          'Preventing duplicate API calls using loading boolean guard flag',
          'Reaching end of available list data (stopping observer)'
        ]}
      />
    </div>
  );
};

export default InfiniteScrollDemo;
