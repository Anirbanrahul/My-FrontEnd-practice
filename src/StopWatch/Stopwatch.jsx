import React, { useState, useEffect, useRef } from 'react';
import InterviewTips from '../components/InterviewTips';

// 19. Stopwatch Component with Laps
function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0); // time in 10ms increments (centiseconds)
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 10);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const formatTime = (centiseconds) => {
    const mins = Math.floor(centiseconds / 6000);
    const secs = Math.floor((centiseconds % 6000) / 100);
    const cs = centiseconds % 100;

    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}.${String(cs).padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps([time, ...laps]);
    }
  };

  return (
    <div className="demo-card">
      <h2 className="demo-title">19. Stopwatch</h2>
      <p className="demo-description">Millisecond precision timer with Start/Pause/Reset controls and Lap time history.</p>

      {/* Stopwatch Display */}
      <div style={{
        fontSize: '3.2rem',
        fontWeight: 'bold',
        fontFamily: 'monospace',
        textAlign: 'center',
        padding: '1.5rem',
        borderRadius: '8px',
        background: 'var(--bg-primary)',
        color: 'var(--accent)',
        marginBottom: '1.5rem',
        border: '1px solid var(--border)'
      }}>
        {formatTime(time)}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginBottom: '1.5rem' }}>
        <button
          className={`btn ${isRunning ? 'btn-secondary' : ''}`}
          style={{ width: '100px' }}
          onClick={handleStartPause}
        >
          {isRunning ? 'Pause ⏸' : 'Start ▶'}
        </button>
        <button
          className="btn btn-secondary"
          style={{ width: '100px' }}
          onClick={handleLap}
          disabled={!isRunning}
        >
          Lap 🚩
        </button>
        <button
          className="btn btn-danger"
          style={{ width: '100px' }}
          onClick={handleReset}
        >
          Reset 🔄
        </button>
      </div>

      {/* Laps Table */}
      {laps.length > 0 && (
        <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <h4 style={{ marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Lap History</h4>
          <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
            {laps.map((lapTime, index) => (
              <div
                key={index}
                style={{
                  display: 'flex',
                  justify: 'space-between',
                  padding: '0.4rem 0.75rem',
                  borderBottom: '1px solid var(--border)',
                  fontSize: '0.875rem',
                  fontFamily: 'monospace'
                }}
              >
                <span>Lap #{laps.length - index}</span>
                <span>{formatTime(lapTime)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <InterviewTips
        concepts={[
          'Centiseconds state tracking: 10ms setInterval frequency',
          'Formatting time components: minutes, seconds, centiseconds',
          'Lap list array prepend: setLaps([time, ...laps])'
        ]}
        edgeCases={[
          'High frequency timer re-renders optimization',
          'Clearing interval when unmounting or pausing'
        ]}
      />
    </div>
  );
};

export default Stopwatch;