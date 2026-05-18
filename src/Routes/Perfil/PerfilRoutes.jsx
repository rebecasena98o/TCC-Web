import React from 'react';
import { Route } from 'react-router-dom';
import Perfil from '../../Components/Perfil'; 

const PerfilRoutes = ({ user, setUser }) => [
  <Route 
    key="perfil-usuario" 
    path="/perfil" 
    element={<Perfil user={user} setUser={setUser} />} 
  />,
];

export default PerfilRoutes;