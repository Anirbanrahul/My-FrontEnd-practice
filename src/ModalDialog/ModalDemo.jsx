import React, { useState, useEffect } from 'react';
import InterviewTips from '../components/InterviewTips';

// 2. Modal Dialog Component - Clean & Simple
const ModalDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close modal when pressing ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <div className="demo-card">
      <h2 className="demo-title">2. Modal Dialog Component</h2>
      <p className="demo-description">Accessible modal with backdrop click, ESC key dismissal, and custom actions.</p>

      <button className="btn" onClick={() => setIsOpen(true)}>
        Open Modal Dialog
      </button>

      {/* Modal Overlay & Card */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)} // Close on backdrop click
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(3px)'
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()} // Prevent close when clicking modal content
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              padding: '1.5rem',
              width: '90%',
              maxWidth: '450px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
              color: 'var(--text-primary)'
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem' }}>Confirm Action</h3>
              <button
                onClick={() => setIsOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.2rem' }}
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              Are you sure you want to proceed? This is a clean modal implementation for machine coding interviews.
            </p>

            {/* Footer Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button className="btn btn-secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </button>
              <button className="btn btn-danger" onClick={() => { alert('Action Confirmed!'); setIsOpen(false); }}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      <InterviewTips
        concepts={[
          'State for visibility: useState(false)',
          'Overlay click dismissal via backdrop container',
          'e.stopPropagation() on modal box to prevent backdrop click closing content',
          'Global ESC key listener cleanup in useEffect'
        ]}
        edgeCases={[
          'Preventing background body scroll when modal is open (document.body.style.overflow = "hidden")',
          'Keyboard focus trap inside modal for accessibility'
        ]}
      />
    </div>
  );
};

export default ModalDemo;
