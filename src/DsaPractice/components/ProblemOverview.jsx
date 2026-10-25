import React from 'react';

const ProblemOverview = ({ problem }) => {
  if (!problem) return null;

  return (
    <div className="dsa-overview-container">
      {/* Memory Trick Box */}
      <div className="dsa-memory-box">
        <h4>{problem.memoryTrick}</h4>
      </div>

      {/* Description Section */}
      <div className="dsa-section-block">
        <h3>📌 Problem Description</h3>
        <p className="dsa-description-text">{problem.description}</p>
      </div>

      {/* Complexity Badges */}
      <div className="dsa-complexity-row">
        <div className="dsa-complexity-card">
          <span className="label">⏱️ Time Complexity:</span>
          <span className="value">{problem.timeComplexity}</span>
        </div>
        <div className="dsa-complexity-card">
          <span className="label">💾 Space Complexity:</span>
          <span className="value">{problem.spaceComplexity}</span>
        </div>
      </div>

      {/* Examples Section */}
      <div className="dsa-section-block">
        <h3>🧪 Examples</h3>
        <div className="dsa-examples-grid">
          {problem.examples.map((ex, idx) => (
            <div key={idx} className="dsa-example-card">
              <div className="ex-header">Example {idx + 1}</div>
              <div className="ex-line"><strong>Input:</strong> <code>{ex.input}</code></div>
              <div className="ex-line"><strong>Output:</strong> <code>{ex.output}</code></div>
              {ex.explanation && (
                <div className="ex-line"><strong>Explanation:</strong> {ex.explanation}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProblemOverview;
