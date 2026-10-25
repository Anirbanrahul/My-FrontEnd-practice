import React, { useState, useEffect } from 'react';
import InterviewTips from '../components/InterviewTips';

// 18. Digital Clock Component
const DigitalClockDemo = () => {
  const [time, setTime] = useState(new Date());
  const [is12Hour, setIs12Hour] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    let hours = time.getHours();
    const minutes = String(time.getMinutes()).padStart(2, '0');
    const seconds = String(time.getSeconds()).padStart(2, '0');
    let ampm = '';

    if (is12Hour) {
      ampm = hours >= 12 ? ' PM' : ' AM';
      hours = hours % 12 || 12;
    }

    const formattedHours = String(hours).padStart(2, '0');
    return `${formattedHours}:${minutes}:${seconds}${ampm}`;
  };

  const formatDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return time.toLocaleDateString(undefined, options);
  };

  return (
    <div className="demo-card">
      <h2 className="demo-title">18. Digital Clock</h2>
      <p className="demo-description">Real-time live digital clock with 12/24-hour format toggle and localized date formatting.</p>

      {/* Clock Display Card */}
      <div style={{
        background: 'var(--bg-primary)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '2rem',
        textAlign: 'center',
        maxWidth: '450px',
        margin: '0 auto 1.5rem',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
      }}>
        <div style={{
          fontSize: '3.2rem',
          fontWeight: 'bold',
          fontFamily: 'monospace',
          color: 'var(--accent)',
          letterSpacing: '2px',
          marginBottom: '0.5rem'
        }}>
          {formatTime()}
        </div>

        <div style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>
          📅 {formatDate()}
        </div>
      </div>

      {/* Format Toggler */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
        <button
          className={`btn ${is12Hour ? '' : 'btn-secondary'}`}
          onClick={() => setIs12Hour(true)}
        >
          12-Hour Format (AM/PM)
        </button>
        <button
          className={`btn ${!is12Hour ? '' : 'btn-secondary'}`}
          onClick={() => setIs12Hour(false)}
        >
          24-Hour Format
        </button>
      </div>

      <InterviewTips
        concepts={[
          'setInterval 1000ms loop for updating Date object in state',
          'String.padStart(2, "0") formatting for 2-digit minutes/seconds',
          '12h vs 24h mathematical conversion: hours % 12 || 12'
        ]}
        edgeCases={[
          'Cleaning up interval in useEffect return block to prevent memory leaks',
          'Formatting midnight (0 hours) as 12 AM in 12h mode'
        ]}
      />
    </div>
  );
};

export default DigitalClockDemo;
