import React from 'react';
import { Route } from 'react-router-dom';
import ForgotPassword from '../../Pages/Register/ForgotPassword';

const ForgotPasswordRoutes = () => [
  <Route key="forgot-password" path="/forgot-password" element={<ForgotPassword />} />
];

export default ForgotPasswordRoutes;