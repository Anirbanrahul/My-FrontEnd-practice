import React, { useState } from 'react';

const CopyButton = ({ code }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button className="copy-code-btn" onClick={handleCopy}>
      {copied ? '✓ Copied' : '📋 Copy'}
    </button>
  );
};

// Inline formatter for **bold** and `code`
const renderInlineText = (text) => {
  if (!text) return null;

  // Split by inline code `` `code` `` first
  const codeParts = text.split(/(`[^`]+`)/g);

  return codeParts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
      const codeContent = part.slice(1, -1);
      return (
        <code key={i} className="formatted-inline-code">
          {codeContent}
        </code>
      );
    }

    // Split part by **bold**
    const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((bPart, j) => {
      if (bPart.startsWith('**') && bPart.endsWith('**') && bPart.length > 4) {
        const boldContent = bPart.slice(2, -2);
        return (
          <strong key={`${i}-${j}`} className="formatted-bold">
            {boldContent}
          </strong>
        );
      }
      return bPart;
    });
  });
};

const FormattedAnswer = ({ text }) => {
  if (!text) return null;

  // Check if answer contains code blocks using triple backticks
  const codeBlockRegex = /```(?:[a-z]+)?\n?([\s\S]*?)```/g;
  const blocks = [];
  let lastIndex = 0;
  let match;

  while ((match = codeBlockRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      blocks.push({ type: 'text', content: text.slice(lastIndex, match.index) });
    }
    blocks.push({ type: 'code', content: match[1].trim() });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    blocks.push({ type: 'text', content: text.slice(lastIndex) });
  }

  return (
    <div className="formatted-answer-container">
      {blocks.map((block, idx) => {
        if (block.type === 'code') {
          return (
            <div key={idx} className="formatted-code-block">
              <div className="code-block-header">
                <span className="code-block-lang">JavaScript / Code Snippet</span>
                <CopyButton code={block.content} />
              </div>
              <pre className="code-block-content">
                <code>{block.content}</code>
              </pre>
            </div>
          );
        }

        // Process text lines
        const lines = block.content.split('\n');
        const elements = [];
        let tableRows = [];

        const renderTable = (rows, tableIdx) => {
          if (rows.length < 3) return null;
          
          const processRow = (r) => {
             const cells = r.split('|');
             if (cells.length > 0 && cells[0].trim() === '') cells.shift();
             if (cells.length > 0 && cells[cells.length - 1].trim() === '') cells.pop();
             return cells.map(c => c.trim());
          };
          
          const headerCells = processRow(rows[0]);
          const bodyRows = rows.slice(2).map(processRow);
          
          return (
            <div key={`table-${tableIdx}`} className="formatted-table-container">
              <table className="formatted-table">
                <thead>
                  <tr>
                    {headerCells.map((h, i) => <th key={i}>{renderInlineText(h)}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {bodyRows.map((row, rI) => (
                    <tr key={rI}>
                      {row.map((cell, cI) => <td key={cI}>{renderInlineText(cell)}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        };

        lines.forEach((line, lIdx) => {
          const trimmed = line.trim();
          
          if (trimmed.startsWith('|') && trimmed.endsWith('|') && trimmed.length > 1) {
             tableRows.push(trimmed);
             return;
          } else {
             if (tableRows.length > 0) {
               elements.push(renderTable(tableRows, lIdx));
               tableRows = [];
             }
          }

          if (!trimmed) {
             elements.push(<div key={lIdx} className="formatted-spacer" />);
             return;
          }

          if (
            trimmed.toLowerCase().includes('interview tip:') ||
            trimmed.toLowerCase().includes('👉 interview tip')
          ) {
            elements.push(
              <div key={lIdx} className="formatted-callout tip">
                <span className="callout-icon">💡</span>
                <div className="callout-text">{renderInlineText(trimmed)}</div>
              </div>
            );
            return;
          }

          if (
            trimmed.toLowerCase().startsWith('note:') ||
            trimmed.toLowerCase().startsWith('important:')
          ) {
            elements.push(
              <div key={lIdx} className="formatted-callout note">
                <span className="callout-icon">📌</span>
                <div className="callout-text">{renderInlineText(trimmed)}</div>
              </div>
            );
            return;
          }

          if (trimmed.toLowerCase().startsWith('output:')) {
            elements.push(
              <div key={lIdx} className="formatted-callout output">
                <span className="callout-icon">⚡</span>
                <div className="callout-text">{renderInlineText(trimmed)}</div>
              </div>
            );
            return;
          }

          if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('• ')) {
            const bulletContent = trimmed.substring(2);
            elements.push(
              <div key={lIdx} className="formatted-bullet-item">
                <span className="bullet-dot">•</span>
                <span>{renderInlineText(bulletContent)}</span>
              </div>
            );
            return;
          }

          const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
          if (numMatch) {
            elements.push(
              <div key={lIdx} className="formatted-number-item">
                <span className="number-badge">{numMatch[1]}</span>
                <span>{renderInlineText(numMatch[2])}</span>
              </div>
            );
            return;
          }

          elements.push(
            <p key={lIdx} className="formatted-paragraph">
              {renderInlineText(trimmed)}
            </p>
          );
        });

        if (tableRows.length > 0) {
           elements.push(renderTable(tableRows, lines.length));
        }

        return (
          <div key={idx} className="formatted-text-block">
            {elements}
          </div>
        );
      })}
    </div>
  );
};

export default FormattedAnswer;
