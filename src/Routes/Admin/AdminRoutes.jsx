import React from 'react';
import { Route } from 'react-router-dom';
import Analytics from '../../pages/Admin/Analytics';
import Delegacao from '../../pages/Admin/Delegacao';

const AdminRoutes = () => [
  <Route key="analytics" path="/admin/analytics" element={<Analytics />} />,
  <Route key="delegacao" path="/admin/delegacao" element={<Delegacao />} />,
];

export default AdminRoutes;