"use client";

import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { createBrowserClient } from "@/lib/supabase";

interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'owner';
  avatar?: string;
  verified: boolean;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simple mock authentication for now
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setLoading(true);
      // Mock login - replace with real Supabase auth when connected
      if (email && password) {
        const mockUser: AuthUser = {
          id: '1',
          email,
          name: 'Test User',
          role: 'user',
          verified: true
        };
        setUser(mockUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    try {
      setLoading(true);
      // Mock registration - replace with real Supabase auth when connected
      if (data.email && data.password && data.name) {
        const mockUser: AuthUser = {
          id: '1',
          email: data.email,
          name: data.name,
          role: 'user',
          verified: false
        };
        setUser(mockUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}