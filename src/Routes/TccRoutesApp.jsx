import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Importamos apenas o Login para o teste
import Login from '../pages/login';

function TccRoutesApp({ setUser }) {
  return (
    <BrowserRouter>
      <Routes>
        {/* Qualquer caminho agora vai renderizar o Login */}
        <Route path="*" element={<Login setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default TccRoutesApp;