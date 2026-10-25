import React, { useState } from 'react';
import InterviewTips from '../components/InterviewTips';

const STEPS = [
  { id: 1, label: 'Account Info' },
  { id: 2, label: 'Personal Details' },
  { id: 3, label: 'Review & Submit' },
];

// 14. Form Stepper Component
const StepperDemo = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    city: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isStepValid = () => {
    if (currentStep === 1) return formData.username.trim() && formData.email.trim();
    if (currentStep === 2) return formData.fullName.trim() && formData.city.trim();
    return true;
  };

  const handleNext = () => {
    if (isStepValid()) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    } else {
      alert('Please fill out all required fields for this step.');
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="demo-card">
      <h2 className="demo-title">14. Stepper Form Component</h2>
      <p className="demo-description">Multi-step form wizard with progress indicators, field validation, and state preservation.</p>

      {/* Step Indicators */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', position: 'relative' }}>
        {STEPS.map((step) => {
          const isCompleted = currentStep > step.id;
          const isActive = currentStep === step.id;

          return (
            <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, zIndex: 1 }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: isCompleted ? 'var(--success)' : isActive ? 'var(--accent)' : 'var(--bg-hover)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  marginBottom: '0.4rem',
                  fontSize: '0.9rem'
                }}
              >
                {isCompleted ? '✓' : step.id}
              </div>
              <span style={{ fontSize: '0.8rem', color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step Content */}
      <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '1.5rem' }}>
        {currentStep === 1 && (
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Step 1: Account Information</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input
                type="text"
                name="username"
                className="input-field"
                placeholder="Username *"
                value={formData.username}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                className="input-field"
                placeholder="Email Address *"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Step 2: Personal Details</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <input
                type="text"
                name="fullName"
                className="input-field"
                placeholder="Full Name *"
                value={formData.fullName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="city"
                className="input-field"
                placeholder="City *"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h4 style={{ marginBottom: '1rem' }}>Step 3: Review Details</h4>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              <p><strong>Username:</strong> {formData.username}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Full Name:</strong> {formData.fullName}</p>
              <p><strong>City:</strong> {formData.city}</p>
            </div>
          </div>
        )}
      </div>

      {/* Stepper Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button className="btn btn-secondary" disabled={currentStep === 1} onClick={handlePrev}>
          ❮ Back
        </button>
        {currentStep < STEPS.length ? (
          <button className="btn" onClick={handleNext}>
            Next ❯
          </button>
        ) : (
          <button className="btn" style={{ background: 'var(--success)' }} onClick={() => alert('Form Submitted Successfully!')}>
            Submit 🎉
          </button>
        )}
      </div>

      <InterviewTips
        concepts={[
          'State preservation across steps with single formData object',
          'Current step state index management (currentStep)',
          'Step-level field validation before enabling Next transition'
        ]}
        edgeCases={[
          'Preventing skipping forward to incomplete future steps',
          'Preserving entered values when clicking Back'
        ]}
      />
    </div>
  );
};

export default StepperDemo;
