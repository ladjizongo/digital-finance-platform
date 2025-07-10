
import React, { createContext, useContext, useState, useEffect } from 'react';
import { isSessionValid, getAuthSession, clearAuthSession } from '@/utils/security';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Director' | 'Executive' | 'User';
}

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for valid session on app load
    if (isSessionValid()) {
      const session = getAuthSession();
      if (session) {
        // Set user from session - in production this would fetch from secure backend
        setCurrentUser({
          id: session.userId,
          name: 'Demo User',
          email: 'demo@company.com',
          role: 'Manager'
        });
        setIsAuthenticated(true);
      }
    } else {
      // Clear invalid session
      clearAuthSession();
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  const logout = () => {
    clearAuthSession();
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider value={{ 
      currentUser, 
      setCurrentUser: (user) => {
        setCurrentUser(user);
        setIsAuthenticated(!!user);
      }, 
      logout,
      isAuthenticated 
    }}>
      {children}
    </UserContext.Provider>
  );
};
