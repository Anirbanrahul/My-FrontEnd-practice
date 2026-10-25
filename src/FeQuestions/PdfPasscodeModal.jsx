import React, { useState } from 'react';
import { exportStyledPrintPdf, exportDirectJsPdf } from './utils/exportPdf';

const PdfPasscodeModal = ({ isOpen, onClose, questions, sections }) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);

  if (!isOpen) return null;

  const handleVerifyPasscode = (e) => {
    e.preventDefault();
    if (passcode.trim() === '70032') {
      setIsUnlocked(true);
      setError('');
    } else {
      setError('❌ Incorrect Passcode! Access Denied.');
      setIsUnlocked(false);
    }
  };

  const handleStyledPdfDownload = () => {
    exportStyledPrintPdf(questions, sections);
    onClose();
  };

  const handleDirectPdfDownload = () => {
    exportDirectJsPdf(questions);
    onClose();
  };

  const handleClose = () => {
    setPasscode('');
    setError('');
    setIsUnlocked(false);
    onClose();
  };

  return (
    <div className="pdf-modal-overlay" onClick={handleClose}>
      <div className="pdf-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="pdf-modal-header">
          <h3>🔒 Passcode Protected PDF Download</h3>
          <button className="pdf-close-btn" onClick={handleClose}>✕</button>
        </div>

        {!isUnlocked ? (
          <form onSubmit={handleVerifyPasscode} className="pdf-modal-body">
            <p className="pdf-instruction">
              Enter the passcode <strong>70032</strong> to unlock the 405 Frontend Questions & Answers PDF compilation.
            </p>

            <div className="pdf-input-group">
              <label htmlFor="passcode-input">Enter Passcode:</label>
              <input
                id="passcode-input"
                type="password"
                className="pdf-passcode-input"
                placeholder="Enter passcode (e.g. 70032)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                autoFocus
              />
            </div>

            {error && <div className="pdf-error-msg">{error}</div>}

            <div className="pdf-modal-footer">
              <button type="button" className="pdf-cancel-btn" onClick={handleClose}>
                Cancel
              </button>
              <button type="submit" className="pdf-unlock-btn">
                🔓 Unlock Download
              </button>
            </div>
          </form>
        ) : (
          <div className="pdf-unlocked-body">
            <div className="pdf-success-badge">
              ✓ Passcode Verified Successfully!
            </div>
            <p className="pdf-unlocked-text">
              Select your preferred PDF export format for all <strong>405 Questions & Answers</strong>:
            </p>

            <div className="pdf-download-options">
              <button className="pdf-download-option-btn primary" onClick={handleStyledPdfDownload}>
                <span className="btn-icon">🖨️</span>
                <div>
                  <div className="btn-title">Print / Save as Styled PDF (Recommended)</div>
                  <div className="btn-sub">Pixel-perfect formatting, code syntax highlighting, colors & page headers</div>
                </div>
              </button>

              <button className="pdf-download-option-btn secondary" onClick={handleDirectPdfDownload}>
                <span className="btn-icon">💾</span>
                <div>
                  <div className="btn-title">Download Direct .PDF File</div>
                  <div className="btn-sub">Generates Frontend_Interview_Bible_405_QA.pdf directly</div>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfPasscodeModal;
