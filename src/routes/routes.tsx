import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuth } from '../auth/auth'; // Create an auth context for token management
import LoginScreen from '../components/loginScreen';
import Dashboard from '../components/Dashboard'; // Assuming this is the import for your Dashboard component

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const auth = useAuth();

  return auth.isAuthenticated ? (
    <>{element}</>
  ) : (
    <Navigate to="/login" replace={true} />
  );
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/dashboard" element={
          <ProtectedRoute element={<Dashboard />} />
        } />
        {/* Redirect from root to either login or dashboard based on authentication */}
        <Route 
          path="/" 
          element={
            <Navigate to={useAuth().isAuthenticated ? "/dashboard" : "/login"} />
          } 
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
