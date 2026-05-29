import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSubmissions, deleteSubmission } from '../utils/storage';

const SubmissionTable = () => {
  const [submissions, setSubmissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = () => {
    const data = getSubmissions();
    setSubmissions(data);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this submission?')) {
      if (deleteSubmission(id)) {
        loadSubmissions();
      } else {
        alert('Failed to delete submission');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/admin/submissions/edit/${id}`);
  };

  if (submissions.length === 0) {
    return (
      <p style={{
        textAlign: 'center',
        padding: '40px',
        color: 'var(--color-text-muted)'
      }}>
        No submissions found.
      </p>
    );
  }

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse'
  };

  const headerStyle = {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-background)',
    fontWeight: '600'
  };

  const cellStyle = {
    padding: '12px',
    textAlign: 'left',
    borderBottom: '1px solid var(--color-border)'
  };

  const badgeStyle = {
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    padding: '2px 8px',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--font-size-sm)'
  };

  const buttonStyle = {
    backgroundColor: 'var(--color-primary)',
    color: 'white',
    padding: '6px 12px',
    borderRadius: 'var(--radius-md)',
    marginRight: '8px',
    fontSize: 'var(--font-size-sm)',
    cursor: 'pointer'
  };

  const deleteButtonStyle = {
    ...buttonStyle,
    backgroundColor: 'var(--color-error)'
  };

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={headerStyle}>#</th>
          <th style={headerStyle}>Name</th>
          <th style={headerStyle}>Email</th>
          <th style={headerStyle}>Mobile</th>
          <th style={headerStyle}>Department</th>
          <th style={headerStyle}>Date Applied</th>
          <th style={headerStyle}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {submissions.map((submission, index) => (
          <tr key={submission.id}>
            <td style={cellStyle}>{index + 1}</td>
            <td style={cellStyle}>{submission.name}</td>
            <td style={cellStyle}>{submission.email}</td>
            <td style={cellStyle}>{submission.mobile}</td>
            <td style={cellStyle}>
              <span style={badgeStyle}>
                {submission.department}
              </span>
            </td>
            <td style={cellStyle}>
              {new Date(submission.createdAt).toLocaleDateString()}
            </td>
            <td style={cellStyle}>
              <button style={buttonStyle} onClick={() => handleEdit(submission.id)}>
                Edit
              </button>
              <button style={deleteButtonStyle} onClick={() => handleDelete(submission.id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SubmissionTable;