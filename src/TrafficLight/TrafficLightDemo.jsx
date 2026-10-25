import React, { useState, useEffect } from 'react';
import InterviewTips from '../components/InterviewTips';

const LIGHTS = {
  red: { name: 'RED', duration: 4000, next: 'yellow', color: '#ef4444' },
  yellow: { name: 'YELLOW', duration: 1500, next: 'green', color: '#f59e0b' },
  green: { name: 'GREEN', duration: 3000, next: 'red', color: '#22c55e' }
};

// 17. Traffic Light Component
const TrafficLightDemo = () => {
  const [currentColor, setCurrentColor] = useState('red');
  const [isManual, setIsManual] = useState(false);

  useEffect(() => {
    if (isManual) return;

    const currentConfig = LIGHTS[currentColor];
    const timer = setTimeout(() => {
      setCurrentColor(currentConfig.next);
    }, currentConfig.duration);

    return () => clearTimeout(timer);
  }, [currentColor, isManual]);

  return (
    <div className="demo-card">
      <h2 className="demo-title">17. Traffic Light Signal</h2>
      <p className="demo-description">Automated state machine cycling Red (4s) ➔ Yellow (1.5s) ➔ Green (3s) with manual override.</p>

      <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', justifyContent: 'center', padding: '1.5rem 0' }}>
        {/* Signal Housing */}
        <div style={{
          width: '90px',
          background: '#0f172a',
          padding: '12px',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          border: '3px solid #334155',
          boxShadow: '0 8px 20px rgba(0,0,0,0.4)'
        }}>
          {Object.keys(LIGHTS).map((key) => {
            const isActive = currentColor === key;
            return (
              <div
                key={key}
                style={{
                  width: '66px',
                  height: '66px',
                  borderRadius: '50%',
                  background: isActive ? LIGHTS[key].color : '#1e293b',
                  boxShadow: isActive ? `0 0 25px ${LIGHTS[key].color}` : 'none',
                  border: '2px solid rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease'
                }}
              />
            );
          })}
        </div>

        {/* Mode Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div>
            <strong>Current Signal: </strong>
            <span style={{ color: LIGHTS[currentColor].color, fontWeight: 'bold', fontSize: '1.1rem' }}>
              {LIGHTS[currentColor].name}
            </span>
          </div>

          <button
            className={`btn ${isManual ? '' : 'btn-secondary'}`}
            onClick={() => setIsManual(!isManual)}
          >
            {isManual ? '▶ Resume Auto Cycle' : '⏸ Pause Auto Cycle'}
          </button>

          {/* Manual Switch Buttons */}
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
            {Object.keys(LIGHTS).map((key) => (
              <button
                key={key}
                className="btn btn-secondary"
                style={{ fontSize: '0.8rem', padding: '0.35rem 0.65rem' }}
                onClick={() => {
                  setCurrentColor(key);
                  setIsManual(true);
                }}
              >
                Force {key.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <InterviewTips
        concepts={[
          'State machine representation object with next transition & duration properties',
          'useEffect dependency on currentColor to schedule next setTimeout',
          'Timer cleanup return function to prevent race conditions when state changes'
        ]}
        edgeCases={[
          'Manual override pausing automatic setTimeout loop',
          'Dynamic configurable duration per light state'
        ]}
      />
    </div>
  );
};

export default TrafficLightDemo;
