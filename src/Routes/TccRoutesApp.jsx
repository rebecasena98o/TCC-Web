import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import AlunoDashboard from '../pages/Aluno/HomeAluno';
import DetalhesTccAluno from '../pages/Tickets/DetalhesTccAluno';

import AdminRoutes from './Admin/AdminRoutes';
import LoginRoutes from './Register/LoginRoutes';
import RegisterRoutes from './Register/RegisterRoutes';
import LibrarianRoutes from './Librarian/LibrarianRoutes';

function TccRoutesApp({ user, setUser }) {
  return (
      <Routes>

        {LoginRoutes({ setUser })}

        {RegisterRoutes()}

        <Route
          path="/HomeAluno" 
          element={user ? <AlunoDashboard user={user} /> : <Navigate to="/login" />} 
        />

        {AdminRoutes()}

        {LibrarianRoutes()}

        <Route path="/detalhes-tcc" element={<DetalhesTccAluno user={user} />} />

        <Route path="/" element={<Navigate to="/login" replace />} /> 
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
  );
}

export default TccRoutesApp;