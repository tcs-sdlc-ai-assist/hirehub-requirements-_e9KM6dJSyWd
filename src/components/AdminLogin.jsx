import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setAuthState } from '../utils/auth';
import { validateEmail } from '../utils/validators';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
    setSubmitError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailError = validateEmail(formData.email);
    let passwordError = '';
    if (formData.password.trim() === '') {
      passwordError = 'Password is required';
    } else if (formData.password.length < 6) {
      passwordError = 'Password must be at least 6 characters';
    }

    setErrors({
      email: emailError,
      password: passwordError
    });

    if (emailError === '' && passwordError === '') {
      setIsSubmitting(true);
      if (
        formData.email.trim() === 'admin@hirehub.com' &&
        formData.password === 'admin123'
      ) {
        setAuthState(true);
        navigate('/admin', { replace: true });
      } else {
        setIsSubmitting(false);
        setSubmitError('Invalid credentials');
      }
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: 'var(--radius-md)',
        padding: '24px',
        width: '90%',
        maxWidth: '400px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{
          marginTop: 0,
          marginBottom: '20px',
          color: 'var(--color-text)',
          fontSize: 'var(--font-size-lg)'
        }}>Admin Login</h2>
        {submitError && (
          <div style={{
            backgroundColor: 'var(--color-error)',
            color: 'white',
            padding: '8px 12px',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '16px'
          }}>
            {submitError}
          </div>
        )}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                padding: '8px 12px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--font-size-base)',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
            {errors.email && (
              <span style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-sm)', display: 'block', marginTop: '4px' }}>
                {errors.email}
              </span>
            )}
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={{
                padding: '8px 12px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--font-size-base)',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
            {errors.password && (
              <span style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-sm)', display: 'block', marginTop: '4px' }}>
                {errors.password}
              </span>
            )}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button
              type="button"
              onClick={() => navigate('/')}
              style={{
                backgroundColor: 'var(--color-border)',
                color: 'var(--color-text)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-sm)',
                cursor: 'pointer',
                border: 'none'
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-sm)',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                border: 'none',
                opacity: isSubmitting ? 0.7 : 1
              }}
            >
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;