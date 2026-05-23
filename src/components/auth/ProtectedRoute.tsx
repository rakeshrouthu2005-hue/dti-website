
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { toast } = useToast();
  const location = useLocation();
  const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
  
  useEffect(() => {
    if (!isAuthenticated) {
      toast({
        title: 'Authentication required',
        description: 'Please login with admin credentials to access this page',
        variant: 'destructive',
      });
    }
  }, [isAuthenticated, toast]);
  
  if (!isAuthenticated) {
    // Redirect to login page and save the location they were trying to access
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
