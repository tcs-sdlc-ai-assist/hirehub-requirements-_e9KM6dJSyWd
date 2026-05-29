import React, { useState } from 'react';
import { validateName, validateEmail, validateMobile, validateDepartment } from '../utils/validators';
import { getSubmissions, addSubmission, isEmailDuplicate } from '../utils/storage';

const InterestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    department: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    mobile: '',
    department: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
  };

  const validateForm = () => {
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

    if (isEmailDuplicate(formData.email)) {
      setErrors(prev => ({
        ...prev,
        email: 'This email has already been submitted.'
      }));
      return;
    }

    setIsSubmitting(true);
    try {
      const id = Math.random().toString(36).substr(2, 9);
      const submission = {
        id,
        fullName: formData.name.trim(),
        email: formData.email.trim(),
        mobile: formData.mobile.trim(),
        department: formData.department.trim(),
        submittedAt: new Date().toISOString()
      };

      const success = addSubmission(submission);
      if (success) {
        setShowSuccess(true);
        setFormData({
          name: '',
          email: '',
          mobile: '',
          department: ''
        });
        setErrors({
          name: '',
          email: '',
          mobile: '',
          department: ''
        });
        setTimeout(() => {
          setShowSuccess(false);
        }, 4000);
      } else {
        throw new Error('Failed to save submission');
      }
    } catch (err) {
      alert('Unable to save submission. Please try again later.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="interest-form">
      <div className="form-container">
        {showSuccess && (
          <div className="success-banner">
            <span role="img" aria-label="success">✓</span>
            <span>Thank you for your interest! We will be in touch soon.</span>
          </div>
        )}
        <h2 className="form-title">Join Our Team</h2>
        <p className="form-description">
          Please fill out the form below to express your interest in working with us.
        </p>
        <form onSubmit={handleSubmit} className="interest-form-inner">
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input"
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="mobile" className="form-label">
              Mobile Number
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              className="form-input"
            />
            {errors.mobile && <span className="form-error">{errors.mobile}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="department" className="form-label">
              Department of Interest
            </label>
            <select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="form-select"
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
            {errors.department && <span className="form-error">{errors.department}</span>}
          </div>
          <div className="form-actions">
            <button
              type="submit"
              disabled={isSubmitting}
              className="submit-button"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Interest'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default InterestForm;
```