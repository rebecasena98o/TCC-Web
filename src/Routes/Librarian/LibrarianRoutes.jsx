import React from 'react';
import { Route } from 'react-router-dom';
import LibrarianQueue from '../../Pages/Librarian/LibrarianQueue';

const LibrarianRoutes = () => [
  <Route key="librarian-queue" path="/librarian/queue" element={<LibrarianQueue />} />
];

export default LibrarianRoutes;