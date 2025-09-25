import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';

export default function App() {
  return (
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );
}
