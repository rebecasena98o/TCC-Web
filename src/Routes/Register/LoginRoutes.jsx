import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../../Pages/Register/Login';

const LoginRoutes = ({ setUser }) => [
  <Route key="login" path="/login" element={<Login setUser={setUser} />} />
];

export default LoginRoutes;