import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuthState } from '../utils/auth';
import { getSubmissions } from '../utils/storage';
import SubmissionTable from './SubmissionTable';
import PropTypes from 'prop-types';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    byDepartment: {}
  });

  useEffect(() => {
    if (!getAuthState()) {
      navigate('/login', { replace: true });
      return;
    }
    const data = getSubmissions();
    setSubmissions(data);
    
    const total = data.length;
    const byDepartment = {};
    data.forEach(sub => {
      const dept = sub.department;
      byDepartment[dept] = (byDepartment[dept] || 0) + 1;
    });
    setStats({ total, byDepartment });
  }, []);

  if (!getAuthState()) {
    return null;
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '24px',
      backgroundColor: 'var(--color-background)'
    }}>
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        paddingBottom: '16px',
        borderBottom: '1px solid var(--color-border)'
      }}>
        <h1 style={{
          margin: 0,
          fontSize: 'var(--font-size-lg)',
          color: 'var(--color-text)'
        }}>Admin Dashboard</h1>
        <div>
          {/* Optional: Add a button to go back to home */}
        </div>
      </header>
      
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '24px'
      }}>
        <div style={{
          backgroundColor: 'var(--color-surface)',
          borderRadius: 'var(--radius-md)',
          padding: '16px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <h2 style={{
            margin: '0 0 8px 0',
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-muted)'
          }}>Total Submissions</h2>
          <p style={{
            fontSize: 'var(--font-size-lg)',
            fontWeight: '600',
            color: 'var(--color-text)',
            margin: 0
          }}>
            {stats.total}
          </p>
        </div>
        {Object.keys(stats.byDepartment).map(dept => (
          <div key={dept} style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h2 style={{
              margin: '0 0 8px 0',
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-muted)'
            }}>
              {dept}
            </h2>
            <p style={{
              fontSize: 'var(--font-size-lg)',
              fontWeight: '600',
              color: 'var(--color-text)',
              margin: 0
            }}>
              {stats.byDepartment[dept]}
            </p>
          </div>
        ))}
      </section>
      
      <section>
        <SubmissionTable />
      </section>
    </div>
  );
};

AdminDashboard.propTypes = {};

export default AdminDashboard;