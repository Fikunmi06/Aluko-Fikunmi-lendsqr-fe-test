import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Users from './pages/Users';
import UserDetails from './pages/UserDetails';

// Create a basic theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#39CDCC',
    },
    secondary: {
      main: '#213F7D',
    },
    background: {
      default: '#FBFCFD',
    },
  },
  typography: {
    fontFamily: '"Work Sans", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '24px',
      fontWeight: 500,
      color: '#213F7D',
    },
    h4: {
      fontSize: '22px',
      fontWeight: 500,
      color: '#213F7D',
    },
    h5: {
      fontSize: '18px',
      fontWeight: 500,
      color: '#213F7D',
    },
    h6: {
      fontSize: '16px',
      fontWeight: 500,
      color: '#213F7D',
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserDetails />} />
          <Route path="*" element={<Navigate to="/users" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}