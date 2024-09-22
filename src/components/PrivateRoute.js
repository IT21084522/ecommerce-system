import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Component, roleRequired, ...rest }) => {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (roleRequired && userRole !== roleRequired) {
    return <Navigate to="/dashboard" />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
