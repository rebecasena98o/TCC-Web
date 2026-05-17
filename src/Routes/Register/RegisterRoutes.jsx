import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Cadastro from '../../Pages/Register/Cadastro';

const RegisterRoutes = () => [
  <Route key="cadastro" path="/cadastro" element={<Cadastro />} />
];

export default RegisterRoutes;