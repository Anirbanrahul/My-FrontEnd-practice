import React, { useState } from 'react';

const CodeViewer = ({ item }) => {
  if (!item || !item.files || item.files.length === 0) {
    return <div className="code-viewer-empty">Select a component to inspect its code.</div>;
  }

  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);
  const [isExpanded, setIsExpanded] = useState(true);

  const activeFile = item.files[activeFileIndex] || item.files[0];
  const rawCode = activeFile.code || '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(rawCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => console.error('Failed to copy code: ', err));
  };

  const lines = rawCode.split('\n');
  const filteredLines = lines.map((line, idx) => ({ line, lineNum: idx + 1 }));

  return (
    <div className="code-viewer-card">
      {/* Code Header Bar */}
      <div className="code-viewer-header">
        <div className="code-file-tabs">
          {item.files.map((file, index) => (
            <button
              key={file.name}
              className={`file-tab-btn ${index === activeFileIndex ? 'active' : ''}`}
              onClick={() => setActiveFileIndex(index)}
            >
              📄 {file.name}
            </button>
          ))}
        </div>

        <div className="code-viewer-actions">
          <input
            type="text"
            className="code-search-input"
            placeholder="🔍 Search lines in code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <button className="copy-code-btn" onClick={copyToClipboard}>
            {copied ? '✓ Copied!' : '📋 Copy Code'}
          </button>

          <button className="expand-code-btn" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? '▲ Collapse' : '▼ Expand'}
          </button>
        </div>
      </div>

      {/* Code Content Area */}
      {isExpanded && (
        <div className="code-viewer-body">
          <pre className="code-pre">
            <code>
              {filteredLines.map(({ line, lineNum }) => {
                const isMatching = searchTerm && line.toLowerCase().includes(searchTerm.toLowerCase());
                return (
                  <div
                    key={lineNum}
                    className={`code-line ${isMatching ? 'highlight-search' : ''}`}
                  >
                    <span className="line-number">{lineNum}</span>
                    <span className="line-content">{line || ' '}</span>
                  </div>
                );
              })}
            </code>
          </pre>
        </div>
      )}

      {/* Technical Highlights / Interview Takeaways */}
      {item.interviewNotes && item.interviewNotes.length > 0 && (
        <div className="interview-notes-box">
          <div className="notes-header">
            <span>💡 Technical Interview Takeaways & Key Concepts</span>
          </div>
          <ul className="notes-list">
            {item.interviewNotes.map((note, idx) => (
              <li key={idx}>🔹 {note}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CodeViewer;
