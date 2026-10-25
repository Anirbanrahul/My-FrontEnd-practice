import React, { useState } from 'react';
import InterviewTips from '../components/InterviewTips';

// 8. Star Rating Component - Clean & Intuitive
const StarRating = ({ totalStars = 5 }) => {
  const [rating, setRating] = useState(3);
  const [hover, setHover] = useState(0);

  return (
    <div className="demo-card">
      <h2 className="demo-title">8. Star Rating Component</h2>
      <p className="demo-description">Interactive rating control with real-time hover feedback, click selection, and status display.</p>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '1rem' }}>
        {/* Stars Row */}
        <div style={{ display: 'flex', gap: '8px' }}>
          {[...Array(totalStars)].map((_, index) => {
            const starValue = index + 1;
            const isFilled = starValue <= (hover || rating);

            return (
              <span
                key={index}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(0)}
                style={{
                  fontSize: '2.5rem',
                  cursor: 'pointer',
                  color: isFilled ? '#f59e0b' : '#475569',
                  transition: 'color 0.15s ease, transform 0.15s ease',
                  transform: isFilled ? 'scale(1.15)' : 'scale(1)'
                }}
              >
                ★
              </span>
            );
          })}
        </div>

        {/* Rating Value Text & Reset */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>
            Current Rating: <span style={{ color: '#f59e0b' }}>{rating} / {totalStars}</span>
            {hover > 0 && <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginLeft: '0.5rem' }}>(Hovering: {hover})</span>}
          </span>
          <button className="btn btn-secondary" onClick={() => { setRating(0); setHover(0); }}>
            Reset
          </button>
        </div>
      </div>

      <InterviewTips
        concepts={[
          'Two state variables: rating (selected) and hover (active hover index)',
          'Derived active state: isFilled = starValue <= (hover || rating)',
          'Event handlers: onClick, onMouseEnter, onMouseLeave'
        ]}
        edgeCases={[
          'Clearing selection back to 0 stars',
          'Read-only mode prop (disable click/hover handlers)',
          'Supporting half-star ratings using mouse position offsets'
        ]}
      />
    </div>
  );
};

export default StarRating;