import React from 'react';
import { Route } from 'react-router-dom';
import Delegacao from '../pages/Delegacao';

const AdminRoutes = () => [
  <Route key="delegacao" path="/admin/delegacao" element={<Delegacao />} />
];

export default AdminRoutes;