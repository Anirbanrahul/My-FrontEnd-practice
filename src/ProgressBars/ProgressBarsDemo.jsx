import React, { useState } from 'react';
import InterviewTips from '../components/InterviewTips';

// 9. Progress Bars Component - Linear, Circular, & Segmented
const ProgressBarsDemo = () => {
  const [progress, setProgress] = useState(65);

  // SVG Circular Constants
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="demo-card">
      <h2 className="demo-title">9. Progress Bars & Indicators</h2>
      <p className="demo-description">Linear bar, SVG Circular progress ring, and Segmented progress indicators with interactive slider control.</p>

      {/* Controller Slider */}
      <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <span style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Progress Value:</span>
        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          style={{ flex: 1, accentColor: 'var(--accent)' }}
        />
        <span style={{ fontSize: '1rem', fontWeight: 'bold', width: '45px' }}>{progress}%</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        {/* 1. Linear Progress Bar */}
        <div style={{ background: 'var(--bg-primary)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <h4 style={{ marginBottom: '0.75rem', fontSize: '0.95rem' }}>1. Linear Progress Bar</h4>
          <div style={{
            height: '16px',
            width: '100%',
            background: 'var(--bg-hover)',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, var(--accent) 0%, #a855f7 100%)',
              borderRadius: '8px',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>

        {/* 2. Circular SVG Progress Ring */}
        <div style={{ background: 'var(--bg-primary)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border)', textAlign: 'center' }}>
          <h4 style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}>2. Circular SVG Ring</h4>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke="var(--bg-hover)"
                strokeWidth="8"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r={radius}
                stroke="var(--accent)"
                strokeWidth="8"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 0.3s ease', transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
              />
            </svg>
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontWeight: 'bold',
              fontSize: '0.9rem'
            }}>
              {progress}%
            </div>
          </div>
        </div>

        {/* 3. Segmented Progress Bar */}
        <div style={{ background: 'var(--bg-primary)', padding: '1.25rem', borderRadius: '8px', border: '1px solid var(--border)' }}>
          <h4 style={{ marginBottom: '0.75rem', fontSize: '0.95rem' }}>3. Segmented Steps (5 Steps)</h4>
          <div style={{ display: 'flex', gap: '6px' }}>
            {[1, 2, 3, 4, 5].map((step) => {
              const stepValue = step * 20;
              const isFilled = progress >= stepValue;
              return (
                <div
                  key={step}
                  style={{
                    flex: 1,
                    height: '12px',
                    borderRadius: '4px',
                    background: isFilled ? 'var(--success)' : 'var(--bg-hover)',
                    transition: 'background 0.3s ease'
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>

      <InterviewTips
        concepts={[
          'SVG strokeDasharray & strokeDashoffset calculation for circular rings',
          'CSS percentage width calculation for linear bars',
          'Segmented threshold evaluation (e.g. progress >= step * 20)'
        ]}
        edgeCases={[
          'Clamping progress between 0% and 100%',
          'Indeterminate / loading spinner mode CSS animation'
        ]}
      />
    </div>
  );
};

export default ProgressBarsDemo;
