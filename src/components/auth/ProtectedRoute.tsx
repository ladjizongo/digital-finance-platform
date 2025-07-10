import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { isSessionValid } from '@/utils/security';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const ProtectedRoute = ({ children, redirectTo = "/" }: ProtectedRouteProps) => {
  const { isAuthenticated } = useUser();
  
  // Check both context state and session validity
  if (!isAuthenticated || !isSessionValid()) {
    return <Navigate to={redirectTo} replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;