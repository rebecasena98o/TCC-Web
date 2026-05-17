import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import HomeAluno from '../../pages/Aluno/HomeAluno';

const AlunoRoutes = ({ user }) => [
  <Route key="aluno-home" path="/aluno/homealuno" element={user ? <HomeAluno user={user} /> : <Navigate to="/login" replace />} />
];

export default AlunoRoutes;