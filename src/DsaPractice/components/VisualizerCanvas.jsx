import React, { useState, useEffect, useRef } from 'react';

const VisualizerCanvas = ({ problem }) => {
  const [customInputText, setCustomInputText] = useState('');
  const [inputError, setInputError] = useState('');
  const [steps, setSteps] = useState([]);
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000); // ms per step

  const timerRef = useRef(null);

  // Initialize steps whenever problem changes
  useEffect(() => {
    if (problem) {
      const defaultStr = JSON.stringify(problem.defaultInput);
      setCustomInputText(defaultStr);
      setInputError('');
      try {
        const generated = problem.stepGenerator(problem.defaultInput);
        setSteps(generated);
        setCurrentStepIdx(0);
        setIsPlaying(false);
      } catch (err) {
        console.error('Error generating steps:', err);
      }
    }
  }, [problem]);

  // Handle auto-playback loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIdx((prevIdx) => {
          if (prevIdx < steps.length - 1) {
            return prevIdx + 1;
          } else {
            setIsPlaying(false);
            return prevIdx;
          }
        });
      }, speed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, steps.length]);

  const handleApplyCustomInput = () => {
    try {
      const parsed = JSON.parse(customInputText);
      setInputError('');
      const generated = problem.stepGenerator(parsed);
      setSteps(generated);
      setCurrentStepIdx(0);
      setIsPlaying(false);
    } catch (err) {
      setInputError('Invalid JSON input format! Please check syntax.');
    }
  };

  const handleResetInput = () => {
    const defaultStr = JSON.stringify(problem.defaultInput);
    setCustomInputText(defaultStr);
    setInputError('');
    const generated = problem.stepGenerator(problem.defaultInput);
    setSteps(generated);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  if (!problem || !steps.length) {
    return <div className="dsa-empty-state">Loading visualizer...</div>;
  }

  const currentFrame = steps[currentStepIdx] || steps[0];

  return (
    <div className="dsa-visualizer-container">
      {/* Visualizer Top Bar: Controls */}
      <div className="dsa-vis-controls">
        <div className="dsa-btn-group">
          <button
            className="dsa-ctrl-btn"
            disabled={currentStepIdx === 0}
            onClick={() => { setCurrentStepIdx(0); setIsPlaying(false); }}
            title="Reset to Start"
          >
            ⏮️ Reset
          </button>
          <button
            className="dsa-ctrl-btn"
            disabled={currentStepIdx === 0}
            onClick={() => { setCurrentStepIdx((p) => Math.max(0, p - 1)); setIsPlaying(false); }}
            title="Previous Step"
          >
            ◀ Prev
          </button>

          <button
            className={`dsa-ctrl-btn play-btn ${isPlaying ? 'pause' : ''}`}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? '⏸️ Pause' : '▶️ Play'}
          </button>

          <button
            className="dsa-ctrl-btn"
            disabled={currentStepIdx === steps.length - 1}
            onClick={() => { setCurrentStepIdx((p) => Math.min(steps.length - 1, p + 1)); setIsPlaying(false); }}
            title="Next Step"
          >
            Next ▶
          </button>
        </div>

        <div className="dsa-speed-control">
          <label>Speed:</label>
          <input
            type="range"
            min="200"
            max="2000"
            step="100"
            value={2200 - speed}
            onChange={(e) => setSpeed(2200 - Number(e.target.value))}
          />
          <span>{((2200 - speed) / 1000).toFixed(1)}x</span>
        </div>

        <div className="dsa-step-badge">
          Step {currentStepIdx + 1} / {steps.length}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="dsa-progress-bar-bg">
        <div
          className="dsa-progress-bar-fill"
          style={{ width: `${((currentStepIdx + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Narration Box */}
      <div className="dsa-narrative-card">
        <div className="narrative-icon">💡</div>
        <div className="narrative-text">{currentFrame.description}</div>
      </div>

      {/* Main Visual Canvas */}
      <div className="dsa-canvas-area">
        {/* Primary Data Array Render */}
        {currentFrame.array && currentFrame.array.length > 0 && (
          <div className="dsa-visual-block">
            <div className="block-title">Array State:</div>
            <div className="dsa-array-container">
              {currentFrame.array.map((item, idx) => {
                // Find matching pointer labels pointing to this index
                const pointerNames = Object.entries(currentFrame.pointers || {})
                  .filter(([_, pos]) => pos === idx)
                  .map(([pName]) => pName);

                return (
                  <div key={idx} className="dsa-array-item-wrapper">
                    {/* Pointer Arrows */}
                    <div className="dsa-pointer-tags">
                      {pointerNames.map((pName) => (
                        <span key={pName} className={`dsa-pointer-pill ptr-${pName.toLowerCase()}`}>
                          {pName} ↓
                        </span>
                      ))}
                    </div>

                    {/* Array Cell */}
                    <div className={`dsa-array-box status-${item.status}`}>
                      <span className="box-val">{item.value}</span>
                    </div>

                    {/* Index Label */}
                    <div className="box-idx">[{idx}]</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Secondary Data Array Render (e.g. for Merged Arrays or Prefix/Suffix products) */}
        {currentFrame.secondaryArray && currentFrame.secondaryArray.length > 0 && (
          <div className="dsa-visual-block">
            <div className="block-title">Result / Secondary Array:</div>
            <div className="dsa-array-container">
              {currentFrame.secondaryArray.map((item, idx) => (
                <div key={idx} className="dsa-array-item-wrapper">
                  <div className={`dsa-array-box status-${item.status}`}>
                    <span className="box-val">{item.value}</span>
                  </div>
                  <div className="box-idx">[{idx}]</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Dynamic Memory Grid: Hash Map & Hash Set Visualizer */}
        <div className="dsa-memory-grid">
          {currentFrame.hashMap && currentFrame.hashMap.length > 0 && (
            <div className="dsa-memory-card">
              <div className="mem-title">🗺️ Hash Map Memory State:</div>
              <div className="dsa-map-grid">
                {currentFrame.hashMap.map((kv, i) => (
                  <div key={i} className={`map-kv-pair status-${kv.status}`}>
                    <span className="kv-key">{kv.key}</span>
                    <span className="kv-arrow">➔</span>
                    <span className="kv-val">{kv.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentFrame.hashSet && currentFrame.hashSet.length > 0 && (
            <div className="dsa-memory-card">
              <div className="mem-title">⚡ Hash Set Memory State:</div>
              <div className="dsa-set-pills">
                {currentFrame.hashSet.map((val, i) => (
                  <span key={i} className="set-pill">{val}</span>
                ))}
              </div>
            </div>
          )}

          {/* Variables Monitor */}
          {currentFrame.variables && Object.keys(currentFrame.variables).length > 0 && (
            <div className="dsa-memory-card">
              <div className="mem-title">🔍 Execution Variables:</div>
              <div className="dsa-vars-table">
                {Object.entries(currentFrame.variables).map(([k, v]) => (
                  <div key={k} className="var-row">
                    <span className="var-key">{k}:</span>
                    <span className="var-val">{String(v)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Custom Input Customizer Bar */}
      <div className="dsa-custom-input-bar">
        <div className="input-bar-top">
          <label>🛠️ Custom Input Tester (JSON):</label>
          <button className="dsa-link-btn" onClick={handleResetInput}>Default Input</button>
        </div>
        <div className="input-bar-row">
          <input
            type="text"
            className="dsa-input-field"
            value={customInputText}
            onChange={(e) => setCustomInputText(e.target.value)}
            placeholder='e.g. {"nums": [2,7,11,15], "target": 9}'
          />
          <button className="dsa-apply-btn" onClick={handleApplyCustomInput}>
            Run Custom Visualizer
          </button>
        </div>
        {inputError && <div className="dsa-input-error">{inputError}</div>}
      </div>
    </div>
  );
};

export default VisualizerCanvas;
