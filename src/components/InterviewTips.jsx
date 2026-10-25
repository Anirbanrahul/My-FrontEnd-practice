import React from 'react';

const InterviewTips = ({ concepts = [], edgeCases = [] }) => {
  return (
    <div className="tips-card">
      <div className="tips-header">
        💡 Interviewer Evaluation Checklist & Key Concepts
      </div>
      {concepts.length > 0 && (
        <div style={{ marginBottom: '0.75rem' }}>
          <strong style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Core Concepts Tested:</strong>
          <ul className="tips-list">
            {concepts.map((concept, idx) => (
              <li key={idx}>{concept}</li>
            ))}
          </ul>
        </div>
      )}
      {edgeCases.length > 0 && (
        <div>
          <strong style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Edge Cases to Mention in Interview:</strong>
          <ul className="tips-list">
            {edgeCases.map((edge, idx) => (
              <li key={idx}>{edge}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default InterviewTips;
