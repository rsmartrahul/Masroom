'use client';

import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export type User = {
  id: string;
  email: string;
  name: string;
  role: string;
  phone?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, phone?: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateUserContext: (userData: User) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const STORAGE_KEY = 'business-hub-user';
const TOKEN_KEY = 'business-hub-token';
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') || 'http://localhost:5000';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const userData = JSON.parse(saved) as User;
        setUser(userData);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || data?.error || 'Unable to sign in');
    }

    const userData: User = {
      id: String(data?.data?.user?.id || data?.user?.id || email),
      email: data?.data?.user?.email || data?.user?.email || email,
      name: data?.data?.user?.name || data?.user?.name || email.split('@')[0],
      role: data?.data?.user?.role || data?.user?.role || 'user',
      phone: data?.data?.user?.phoneNumber || data?.data?.user?.phone,
    };

    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    if (data?.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
    }
  };

  const signup = async (email: string, password: string, name: string, phone?: string) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name, phoneNumber: phone }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.message || data?.error || 'Unable to create account');
    }

    const userData: User = {
      id: String(data?.data?.user?.id || data?.user?.id || email),
      email: data?.data?.user?.email || data?.user?.email || email,
      name: data?.data?.user?.name || data?.user?.name || name,
      role: data?.data?.user?.role || data?.user?.role || 'user',
      phone: data?.data?.user?.phoneNumber || data?.user?.user?.phone || phone,
    };

    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    if (data?.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(TOKEN_KEY);
  };

  const updateUserContext = (userData: User) => {
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        signup,
        logout,
        isAuthenticated: user !== null,
        updateUserContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
