"use client"

import React, { createContext, useEffect, useState, ReactNode } from 'react';
import auth from '@/app/lib/firebase';
import { User, getAuth } from 'firebase/auth';

interface AuthContextInterface {
  user: User | null;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged(setUser);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};