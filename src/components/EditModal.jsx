import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { updateSubmission } from '../utils/storage';
import { validateName, validateEmail, validateMobile, validateDepartment } from '../utils/validators';

const EditModal = ({ isOpen, onClose, submission, onSave }) => {
  const [formData, setFormData] = useState({
    name: submission.name || '',
    email: submission.email || '',
    mobile: submission.mobile || '',
    department: submission.department || ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    mobile: '',
    department: ''
  });
  const [isSaving, setIsSaving] = useState(false);
  const [submitError, setSubmitError] = useState('');

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

  const validateForm = () {
    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      mobile: validateMobile(formData.mobile),
      department: validateDepartment(formData.department)
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSaving(true);
    try {
      const success = updateSubmission(submission.id, formData);
      if (success) {
        setIsSaving(false);
        onClose();
        if (onSave) onSave();
      } else {
        throw new Error('Update failed');
      }
    } catch (err) {
      setIsSaving(false);
      setSubmitError('Failed to save changes. Please try again.');
    }
  };

  if (!isOpen) return null;

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
        maxWidth: '500px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h2 style={{
          marginTop: 0,
          marginBottom: '20px',
          color: 'var(--color-text)',
          fontSize: 'var(--font-size-lg)'
        }}>Edit Submission</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
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
            {errors.name && <span style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-sm)', display: 'block', marginTop: '4px' }}>{errors.name}</span>}
          </div>
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
            {errors.email && <span style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-sm)', display: 'block', marginTop: '4px' }}>{errors.email}</span>}
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>Mobile</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
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
            {errors.mobile && <span style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-sm)', display: 'block', marginTop: '4px' }}>{errors.mobile}</span>}
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '4px', fontWeight: '600' }}>Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              style={{
                padding: '8px 12px',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-sm)',
                fontSize: 'var(--font-size-base)',
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              <option value="">Select Department</option>
              <option value="Engineering">Engineering</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
              <option value="Human Resources">Human Resources</option>
              <option value="Finance">Finance</option>
              <option value="Operations">Operations</option>
              <option value="Sales">Sales</option>
              <option value="Data Science">Data Science</option>
            </select>
            {errors.department && <span style={{ color: 'var(--color-error)', fontSize: 'var(--font-size-sm)', display: 'block', marginTop: '4px' }}>{errors.department}</span>}
          </div>
          {submitError && <div style={{ backgroundColor: 'var(--color-error)', color: 'white', padding: '8px 12px', borderRadius: 'var(--radius-sm)', marginBottom: '16px' }}>{submitError}</div>}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <button
              type="button"
              onClick={onClose}
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
              disabled={isSaving}
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                padding: '6px 12px',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--font-size-sm)',
                cursor: isSaving ? 'not-allowed' : 'pointer',
                border: 'none',
                opacity: isSaving ? 0.7 : 1
              }}
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  submission: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    mobile: PropTypes.string,
    department: PropTypes.string
  }).isRequired,
  onSave: PropTypes.func
};

export default EditModal;