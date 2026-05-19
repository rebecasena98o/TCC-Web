import React from 'react';
import { Route } from 'react-router-dom';
import Analytics from '../../pages/Admin/Analytics';
import Delegacao from '../../pages/Admin/Delegacao';

const AdminRoutes = ({ user, setUser } = {}) => [
  <Route key="analytics" path="/admin/analytics" element={<Analytics user={user} setUser={setUser} />} />,
  <Route key="delegacao" path="/admin/delegacao" element={<Delegacao user={user} setUser={setUser} />} />,
];

export default AdminRoutes;