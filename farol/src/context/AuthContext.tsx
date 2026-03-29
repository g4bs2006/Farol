import React, { createContext, useContext, useState } from 'react';
import { authStateMock } from '../data/mock';

interface AuthContextType {
  isVerified: boolean;
  userName: string;
  initials: string;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isVerified, setIsVerified] = useState(authStateMock.isVerified);
  const [userName]  = useState(authStateMock.userName);
  const [initials]  = useState(authStateMock.initials);

  const login  = () => setIsVerified(true);
  const logout = () => setIsVerified(false);

  return (
    <AuthContext.Provider value={{ isVerified, userName, initials, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
