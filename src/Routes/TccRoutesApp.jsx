import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/login';
import AdminRoutes from './AdminRoutes';

function TccRoutesApp({ setUser }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        {AdminRoutes()}
        <Route path="*" element={<Login setUser={setUser} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default TccRoutesApp;