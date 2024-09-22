import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, roleRequired }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  // If no token is present, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If the role is required and doesn't match, redirect to the dashboard
  if (roleRequired && userRole !== roleRequired) {
    return <Navigate to="/dashboard" />;
  }

  // If authorized, render the children (the protected route component)
  return children;
};

export default PrivateRoute;
