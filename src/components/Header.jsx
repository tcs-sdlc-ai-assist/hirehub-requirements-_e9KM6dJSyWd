import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuthState, clearAuthState } from '../utils/auth';

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = getAuthState();

  const handleLogout = () => {
    clearAuthState();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="header-logo">
          HireHub
        </Link>
        <nav className="header-nav">
          <Link to="/" className="header-nav-link">
            Home
          </Link>
          <Link to="/apply" className="header-nav-link">
            Apply
          </Link>
          <Link to="/admin" className="header-nav-link">
            Admin
          </Link>
        </nav>
        <div className="header-auth">
          {isAuthenticated ? (
            <button onClick={handleLogout} className="header-auth-button">
              Logout
            </button>
          ) : (
            <Link to="/admin" className="header-auth-button">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;