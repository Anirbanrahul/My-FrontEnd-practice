import React, { useState, useEffect, useRef } from 'react';
import InterviewTips from '../components/InterviewTips';

// 3. Countdown Timer Component - Simple Interview Pattern
const CountdownDemo = () => {
  const [secondsLeft, setSecondsLeft] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [customInput, setCustomInput] = useState('60');
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning && secondsLeft > 0) {
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0) {
      setIsRunning(false);
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, secondsLeft]);

  // Format seconds into MM:SS
  const formatTime = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (secondsLeft > 0) setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    const val = parseInt(customInput, 10) || 60;
    setSecondsLeft(val);
  };

  const handleSetTime = (val) => {
    setIsRunning(false);
    setCustomInput(String(val));
    setSecondsLeft(val);
  };

  return (
    <div className="demo-card">
      <h2 className="demo-title">3. Countdown Timer</h2>
      <p className="demo-description">Timer with Start, Pause, Reset, custom duration inputs, and timer completion handling.</p>

      {/* Preset Buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        {[10, 30, 60, 300].map((sec) => (
          <button
            key={sec}
            className="btn btn-secondary"
            onClick={() => handleSetTime(sec)}
          >
            {sec >= 60 ? `${sec / 60}m` : `${sec}s`}
          </button>
        ))}
      </div>

      {/* Timer Display */}
      <div style={{
        fontSize: '3rem',
        fontWeight: 'bold',
        fontFamily: 'monospace',
        textAlign: 'center',
        padding: '1.5rem',
        borderRadius: '8px',
        background: 'var(--bg-primary)',
        color: secondsLeft <= 10 && secondsLeft > 0 ? 'var(--danger)' : 'var(--accent)',
        marginBottom: '1.5rem',
        border: '1px solid var(--border)'
      }}>
        {formatTime(secondsLeft)}
        {secondsLeft === 0 && <div style={{ fontSize: '1rem', color: 'var(--danger)' }}>⏰ Time's Up!</div>}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
        {!isRunning ? (
          <button className="btn" onClick={handleStart} disabled={secondsLeft === 0}>
            Start ▶
          </button>
        ) : (
          <button className="btn btn-secondary" onClick={handlePause}>
            Pause ⏸
          </button>
        )}
        <button className="btn btn-danger" onClick={handleReset}>
          Reset 🔄
        </button>
        <input
          type="number"
          className="input-field"
          style={{ width: '90px' }}
          value={customInput}
          onChange={(e) => setCustomInput(e.target.value)}
          placeholder="Sec"
        />
      </div>

      <InterviewTips
        concepts={[
          'setInterval cleanup inside useEffect return block',
          'useRef to store interval ID reference across renders',
          'String.padStart(2, "0") for time formatting (MM:SS)'
        ]}
        edgeCases={[
          'Handling 0 seconds bound (stop interval immediately)',
          'User clicking Start multiple times (prevent multiple concurrent intervals)',
          'Invalid or negative input parsing'
        ]}
      />
    </div>
  );
};

export default CountdownDemo;
