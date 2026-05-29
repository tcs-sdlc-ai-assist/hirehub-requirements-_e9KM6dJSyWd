import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthState } from '../utils/auth';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  if (!getAuthState()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
</output>