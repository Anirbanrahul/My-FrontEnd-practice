import React, { useState } from 'react';
import InterviewTips from '../components/InterviewTips';

// 15. Form Validation Component
const FormValidationDemo = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Real-time Validation Rules
  const validate = (name, value, allData = formData) => {
    let error = '';
    if (name === 'email') {
      if (!value) error = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(value)) error = 'Invalid email format';
    } else if (name === 'password') {
      if (!value) error = 'Password is required';
      else if (value.length < 6) error = 'Password must be at least 6 characters';
    } else if (name === 'confirmPassword') {
      if (!value) error = 'Confirm Password is required';
      else if (value !== allData.password) error = 'Passwords do not match';
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    const fieldError = validate(name, value, updatedData);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const err = validate(key, formData[key]);
      if (err) newErrors[key] = err;
    });

    setErrors(newErrors);
    setTouched({ email: true, password: true, confirmPassword: true });

    if (Object.keys(newErrors).length === 0) {
      alert('Form validated & submitted successfully!');
    }
  };

  // Password strength gauge
  const getPasswordStrength = () => {
    const p = formData.password;
    if (!p) return { label: 'None', width: '0%', color: 'var(--border)' };
    if (p.length < 6) return { label: 'Weak', width: '33%', color: 'var(--danger)' };
    if (/\d/.test(p) && /[A-Z]/.test(p)) return { label: 'Strong', width: '100%', color: 'var(--success)' };
    return { label: 'Medium', width: '66%', color: 'var(--warning)' };
  };

  const strength = getPasswordStrength();

  return (
    <div className="demo-card">
      <h2 className="demo-title">15. Form Validation Component</h2>
      <p className="demo-description">Real-time input validation, error messaging on blur, password strength gauge, and submit control.</p>

      <form onSubmit={handleSubmit} style={{ maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {/* Email Field */}
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Email Address</label>
          <input
            type="email"
            name="email"
            className="input-field"
            style={{ width: '100%', marginTop: '0.25rem' }}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="user@example.com"
          />
          {touched.email && errors.email && (
            <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.2rem', display: 'block' }}>
              ⚠️ {errors.email}
            </span>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Password</label>
          <input
            type="password"
            name="password"
            className="input-field"
            style={{ width: '100%', marginTop: '0.25rem' }}
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="At least 6 chars..."
          />
          {touched.password && errors.password && (
            <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.2rem', display: 'block' }}>
              ⚠️ {errors.password}
            </span>
          )}

          {/* Strength Bar */}
          <div style={{ marginTop: '0.4rem' }}>
            <div style={{ height: '6px', width: '100%', background: 'var(--bg-hover)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: strength.width, background: strength.color, transition: 'all 0.3s' }} />
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Strength: {strength.label}</span>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div>
          <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            className="input-field"
            style={{ width: '100%', marginTop: '0.25rem' }}
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Repeat password..."
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <span style={{ color: 'var(--danger)', fontSize: '0.8rem', marginTop: '0.2rem', display: 'block' }}>
              ⚠️ {errors.confirmPassword}
            </span>
          )}
        </div>

        <button type="submit" className="btn" style={{ marginTop: '0.5rem' }}>
          Submit Form
        </button>
      </form>

      <InterviewTips
        concepts={[
          'Managing errors and touched states separately for clean UX',
          'Validating on change vs on blur',
          'Password strength evaluation helper function'
        ]}
        edgeCases={[
          'Re-validating confirm password when original password changes',
          'Blocking form submit if Object.keys(errors).length > 0'
        ]}
      />
    </div>
  );
};

export default FormValidationDemo;
