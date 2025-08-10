"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { User } from "@/types";
import { StorageManager, STORAGE_KEYS } from "@/lib/storage";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User>) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function useAuthProvider() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const storage = StorageManager.getInstance();

  useEffect(() => {
    // Load user from storage on mount
    const savedUser = storage.getItem<User | null>(STORAGE_KEYS.USER_PROFILE, null);
    setUser(savedUser);
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would be an API call
    if (email === "admin@qamrah.com" && password === "admin123") {
      const adminUser: User = {
        id: "admin-1",
        name: "Admin User",
        email: "admin@qamrah.com",
        phone: "+1-555-0123",
        avatar: "👨‍💼",
        role: "admin",
        joinedAt: new Date().toISOString(),
        totalRentals: 0,
        totalEarnings: 0,
        rating: 5.0,
        verified: true,
        address: {
          street: "123 Admin St",
          city: "San Francisco",
          state: "CA",
          zipCode: "94105",
          country: "USA"
        },
        preferences: {
          notifications: true,
          emailUpdates: true,
          currency: "USD",
          language: "en"
        },
        documents: {
          idVerified: true,
          phoneVerified: true,
          emailVerified: true
        }
      };
      
      setUser(adminUser);
      storage.setItem(STORAGE_KEYS.USER_PROFILE, adminUser);
      setLoading(false);
      return true;
    } else if (email.includes("@") && password.length >= 6) {
      // Regular user login
      const regularUser: User = {
        id: `user-${Date.now()}`,
        name: email.split("@")[0],
        email,
        phone: "",
        avatar: "👤",
        role: "user",
        joinedAt: new Date().toISOString(),
        totalRentals: Math.floor(Math.random() * 10),
        totalEarnings: 0,
        rating: 4.5 + Math.random() * 0.5,
        verified: false,
        address: {
          street: "",
          city: "",
          state: "",
          zipCode: "",
          country: "USA"
        },
        preferences: {
          notifications: true,
          emailUpdates: true,
          currency: "USD",
          language: "en"
        },
        documents: {
          idVerified: false,
          phoneVerified: false,
          emailVerified: true
        }
      };
      
      setUser(regularUser);
      storage.setItem(STORAGE_KEYS.USER_PROFILE, regularUser);
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const register = async (userData: Partial<User>): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name || "",
      email: userData.email || "",
      phone: userData.phone || "",
      avatar: "👤",
      role: "user",
      joinedAt: new Date().toISOString(),
      totalRentals: 0,
      totalEarnings: 0,
      rating: 5.0,
      verified: false,
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "USA"
      },
      preferences: {
        notifications: true,
        emailUpdates: true,
        currency: "USD",
        language: "en"
      },
      documents: {
        idVerified: false,
        phoneVerified: false,
        emailVerified: false
      }
    };
    
    setUser(newUser);
    storage.setItem(STORAGE_KEYS.USER_PROFILE, newUser);
    setLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    storage.removeItem(STORAGE_KEYS.USER_PROFILE);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      storage.setItem(STORAGE_KEYS.USER_PROFILE, updatedUser);
    }
  };

  return {
    user,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateProfile,
    loading
  };
}