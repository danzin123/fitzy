import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import DashboardShell from './components/layout/DashboardShell';

// Componente simples de proteção
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('@Fitzy:token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Rota Protegida do Dashboard */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <DashboardShell />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;