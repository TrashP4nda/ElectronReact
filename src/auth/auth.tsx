import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AuthContextType {
  token: string | null;
  user: null;
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

// Create the AuthContext with the correct type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a custom hook for accessing the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// AuthProvider component to wrap your app with the context
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [user, setUser] = useState(null);

  
  // Add your authentication logic here, e.g., login, logout, and token management

  const login = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);
  };
  

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };

  // Expose the auth state and functions through the context
  const authContextValue = {
    token,
    user,
    login,
    logout,
    isAuthenticated: !!token,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
