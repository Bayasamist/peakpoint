import React from 'react';
import { Navigate } from 'react-router-dom';
import { isTokenValid } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  const isValid = isTokenValid();

  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
