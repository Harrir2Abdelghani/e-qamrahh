
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { dataService } from '@/lib/dataService';
import { StorageManager, STORAGE_KEYS } from '@/lib/storage';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: {
    email: string;
    password: string;
    full_name: string;
    phone?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const storage = StorageManager.getInstance();

  useEffect(() => {
    // Initialize sample data
    dataService.initializeSampleData();
    
    // Check for existing session
    const savedUser = storage.getItem<User | null>(STORAGE_KEYS.CURRENT_USER, null);
    if (savedUser) {
      setUser(savedUser);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simple authentication - in real app, you'd verify password
      const foundUser = dataService.getUserByEmail(email);
      
      if (!foundUser) {
        return { success: false, error: 'User not found' };
      }

      // For demo purposes, accept any password for existing users
      // Admin credentials: admin@qamrah.com / admin
      // User credentials: user@example.com / user
      if ((email === 'admin@qamrah.com' && password === 'admin') ||
          (email === 'user@example.com' && password === 'user') ||
          password === 'demo') {
        
        setUser(foundUser);
        storage.setItem(STORAGE_KEYS.CURRENT_USER, foundUser);
        return { success: true };
      }
      
      return { success: false, error: 'Invalid credentials' };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: {
    email: string;
    password: string;
    full_name: string;
    phone?: string;
  }) => {
    try {
      setIsLoading(true);
      
      // Check if user already exists
      const existingUser = dataService.getUserByEmail(userData.email);
      if (existingUser) {
        return { success: false, error: 'User already exists' };
      }

      // Create new user
      const newUser = dataService.createUser({
        email: userData.email,
        full_name: userData.full_name,
        phone: userData.phone,
        role: 'user',
        rating: 0,
        verified: false
      });

      setUser(newUser);
      storage.setItem(STORAGE_KEYS.CURRENT_USER, newUser);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    storage.removeItem(STORAGE_KEYS.CURRENT_USER);
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      if (!user) return { success: false, error: 'Not authenticated' };
      
      const updatedUser = dataService.updateUser(user.id, updates);
      if (!updatedUser) {
        return { success: false, error: 'Failed to update profile' };
      }
      
      setUser(updatedUser);
      storage.setItem(STORAGE_KEYS.CURRENT_USER, updatedUser);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Profile update failed' };
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
