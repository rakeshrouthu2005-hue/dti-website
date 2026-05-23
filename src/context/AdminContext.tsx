
import React, { createContext, useContext, useState, useEffect } from 'react';

type AdminContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check if user is already authenticated
    const authStatus = localStorage.getItem('adminAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would validate credentials against a secure backend
    if (email === 'hemanthkumarhk100@gmail.com' && password === 'hemanthkumar5341') {
      localStorage.setItem('adminAuthenticated', 'true');
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('adminAuthenticated');
    setIsAuthenticated(false);
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
