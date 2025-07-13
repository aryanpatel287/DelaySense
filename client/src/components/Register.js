import React from 'react';
import { Navigate } from 'react-router-dom';

const Register = () => {
  // Redirect to login page with register mode
  return <Navigate to="/login?mode=register" replace />;
};

export default Register; 