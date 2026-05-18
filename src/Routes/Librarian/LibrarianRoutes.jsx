import React from 'react';
import { Route } from 'react-router-dom';
import LibrarianQueue from '../../Pages/Librarian/LibrarianQueue';

const LibrarianRoutes = ({ user, setUser }) => [
  <Route key="librarian-queue" path="/librarian/queue" element={<LibrarianQueue user={user} setUser={setUser} />} />
];

export default LibrarianRoutes;