'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Role } from '@/lib/roles';

type AuthContextValue = {
  role: Role;
  setRole: (r: Role) => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function CurrentUserProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<Role>('Recepcion');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('pharmaflow:role') as Role | null;
      if (stored) setRoleState(stored);
    } catch (e) {
      // ignore
    }
  }, []);

  const setRole = (r: Role) => {
    setRoleState(r);
    try {
      localStorage.setItem('pharmaflow:role', r);
    } catch (e) {}
  };

  return <AuthContext.Provider value={{ role, setRole }}>{children}</AuthContext.Provider>;
}

export function useCurrentUser() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useCurrentUser must be used within CurrentUserProvider');
  return ctx;
}
