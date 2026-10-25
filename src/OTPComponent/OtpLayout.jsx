import React, { useState } from 'react';
import OTPInput from './OTPInput';
import InterviewTips from '../components/InterviewTips';

// 5. OTP Input Layout - Practice Component
const OtpLayout = () => {
  const [submittedOtp, setSubmittedOtp] = useState('');

  const handleComplete = (otpValue) => {
    setSubmittedOtp(otpValue);
  };

  return (
    <div className="demo-card">
      <h2 className="demo-title">5. OTP Component</h2>
      <p className="demo-description">Multi-box OTP input with auto-focus movement, backspace shift, paste handling, and submit callback.</p>

      <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
        <h3 style={{ marginBottom: '1rem', fontSize: '1rem', color: 'var(--text-secondary)' }}>
          Enter 6-digit Verification Code
        </h3>
        <OTPInput length={6} onComplete={handleComplete} />

        {submittedOtp && (
          <div style={{
            marginTop: '1.5rem',
            padding: '0.75rem',
            background: 'rgba(34, 197, 94, 0.15)',
            border: '1px solid var(--success)',
            borderRadius: '6px',
            color: 'var(--success)',
            fontWeight: 'bold'
          }}>
            ✅ OTP Submitted: {submittedOtp}
          </div>
        )}
      </div>

      <InterviewTips
        concepts={[
          'useRef array storage: inputRefs.current[index] = el',
          'Auto focus shift on input: inputRefs.current[index + 1].focus()',
          'Backspace key handling: focus previous box if current is empty',
          'Paste event: e.clipboardData.getData("text") and slice to length'
        ]}
        edgeCases={[
          'Preventing non-numeric character inputs',
          'Pasting longer/shorter string than length',
          'Focusing first box on initial component mount'
        ]}
      />
    </div>
  );
};

export default OtpLayout;