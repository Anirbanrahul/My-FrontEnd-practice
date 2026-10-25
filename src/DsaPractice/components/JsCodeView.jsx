import React, { useState } from 'react';

const JsCodeView = ({ problem }) => {
  const [copied, setCopied] = useState(false);

  if (!problem) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(problem.jsCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="dsa-code-container">
      <div className="dsa-code-header">
        <span>💻 Optimal JavaScript Solution</span>
        <button className="dsa-copy-btn" onClick={handleCopy}>
          {copied ? '✓ Copied!' : '📋 Copy Code'}
        </button>
      </div>

      <pre className="dsa-code-block">
        <code>{problem.jsCode}</code>
      </pre>

      <div className="dsa-complexity-footer">
        <div><strong>Time:</strong> {problem.timeComplexity}</div>
        <div><strong>Space:</strong> {problem.spaceComplexity}</div>
      </div>
    </div>
  );
};

export default JsCodeView;
