import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/login';
import Cadastro from '../pages/cadastro';
import AlunoDashboard from '../Pages/Aluno/HomeAluno';
import LibrarianQueue from '../pages/Librarian/LibrarianQueue';

function TccRoutesApp({ user, setUser }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/cadastro" element={<Cadastro />} />

        <Route 
          path="/AlunoDashboard" 
          element={user ? <AlunoDashboard user={user} /> : <Navigate to="/login" />} 
        />

        <Route path="/LibrarianQueue" element={<LibrarianQueue />} />

        <Route path="/" element={<Navigate to="/login" replace />} /> 
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default TccRoutesApp;