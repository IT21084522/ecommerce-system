import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, roleRequired, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      const token = localStorage.getItem('token');
      const userRole = localStorage.getItem('role');
      
      if (!token) {
        return <Redirect to="/login" />;
      }
      
      if (roleRequired && userRole !== roleRequired) {
        return <Redirect to="/dashboard" />;
      }

      return <Component {...props} />;
    }}
  />
);

export default PrivateRoute;
