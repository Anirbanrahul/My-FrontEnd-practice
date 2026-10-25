import React, { useState, useEffect } from 'react';
import InterviewTips from '../components/InterviewTips';

// 3x3 Grid pattern with 7 active boxes (empty center & corners if desired)
const GRID_CONFIG = [
  [1, 1, 1],
  [1, 0, 1],
  [1, 1, 1]
];

// 13. Memory Grid Light Component
const Memory = () => {
  const [order, setOrder] = useState([]);
  const [isDeactivating, setIsDeactivating] = useState(false);

  // Total count of clickable boxes in grid configuration
  const totalClickable = GRID_CONFIG.flat().filter(Boolean).length;

  const handleTileClick = (index) => {
    if (order.includes(index) || isDeactivating) return;

    const newOrder = [...order, index];
    setOrder(newOrder);

    // If all tiles clicked, start deactivating in order
    if (newOrder.length === totalClickable) {
      startDeactivation(newOrder);
    }
  };

  const startDeactivation = (orderList) => {
    setIsDeactivating(true);

    const timer = setInterval(() => {
      setOrder((prevOrder) => {
        const updated = [...prevOrder];
        updated.pop(); // Remove last clicked tile
        if (updated.length === 0) {
          clearInterval(timer);
          setIsDeactivating(false);
        }
        return updated;
      });
    }, 300);
  };

  return (
    <div className="demo-card">
      <h2 className="demo-title">13. Memory Grid Light Box</h2>
      <p className="demo-description">Grid matrix where clicked tiles light up in order, then automatically unhighlight sequentially when completed.</p>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', padding: '1rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 80px)',
          gap: '12px',
          background: 'var(--bg-primary)',
          padding: '1.25rem',
          borderRadius: '10px',
          border: '1px solid var(--border)'
        }}>
          {GRID_CONFIG.flat().map((cell, index) => {
            if (cell === 0) return <div key={index} />; // Empty center slot

            const isSelected = order.includes(index);
            return (
              <button
                key={index}
                disabled={isDeactivating}
                onClick={() => handleTileClick(index)}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '8px',
                  border: '1px solid var(--border)',
                  background: isSelected ? 'var(--success)' : 'var(--bg-card)',
                  color: isSelected ? 'white' : 'var(--text-primary)',
                  fontSize: '1.2rem',
                  fontWeight: 'bold',
                  cursor: isDeactivating || isSelected ? 'not-allowed' : 'pointer',
                  transition: 'background 0.25s ease'
                }}
              >
                {isSelected ? order.indexOf(index) + 1 : ''}
              </button>
            );
          })}
        </div>

        <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          {isDeactivating
            ? '⚡ Sequence completing... Auto-unhighlighting tiles!'
            : `Tiles Activated: ${order.length} / ${totalClickable}`}
        </div>
      </div>

      <InterviewTips
        concepts={[
          'Order array tracking: setOrder([...order, index])',
          'Flattening grid array matrix using GRID_CONFIG.flat()',
          'Sequential pop unhighlighting timer using setInterval'
        ]}
        edgeCases={[
          'Preventing clicks during deactivation animation phase',
          'Ignoring clicks on already activated tiles'
        ]}
      />
    </div>
  );
};

export default Memory;