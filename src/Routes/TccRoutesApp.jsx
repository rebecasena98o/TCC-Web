import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';


import DetalhesTccAluno from '../pages/Tickets/DetalhesTccAluno';

import AdminRoutes from './Admin/AdminRoutes';
import LoginRoutes from './Register/LoginRoutes';
import RegisterRoutes from './Register/RegisterRoutes';
import LibrarianRoutes from './Librarian/LibrarianRoutes';
import AlunoRoutes from './Aluno/AlunoRoutes';
import PerfilRoutes from './Perfil/PerfilRoutes';
import ForgotPasswordRoutes from './Register/ForgotPasswordRoutes';

function TccRoutesApp({ user, setUser }) {
  return (
      <Routes>

        {LoginRoutes({ setUser })}

        {RegisterRoutes()}

        {ForgotPasswordRoutes()}

        {PerfilRoutes({ user, setUser })}

        {AlunoRoutes({ user })}

        {AdminRoutes({ user })}

        {LibrarianRoutes({ user, setUser })}

        <Route path="/detalhes-tcc" element={<DetalhesTccAluno user={user} />} />

        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" />} />

      </Routes>
  );
}

export default TccRoutesApp;