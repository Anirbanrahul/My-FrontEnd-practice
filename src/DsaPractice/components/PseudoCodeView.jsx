import React from 'react';

const PseudoCodeView = ({ problem }) => {
  if (!problem) return null;

  return (
    <div className="dsa-code-container">
      <div className="dsa-code-header">
        <span>📝 Step-by-Step Logic Pseudocode</span>
        <span className="dsa-code-tag">Intuition Blueprint</span>
      </div>
      <pre className="dsa-code-block">
        <code>{problem.pseudocode}</code>
      </pre>
    </div>
  );
};

export default PseudoCodeView;
