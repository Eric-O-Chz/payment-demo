"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import api from "@/app/lib/api";

type User = { _id: string; name: string; email: string } | null;
interface AuthContextType {
  user: User;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) {
      api.get("/auth/me", { headers: { Authorization: `Bearer ${stored}` } })
        .then(res => setUser(res.data)).catch(() => setUser(null)).finally(() => setLoading(false));
    } else { setLoading(false); }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      return true;
    } catch {
      return false;
    }
  };
  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await api.post("/auth/register", { name, email, password });
      localStorage.setItem("token", res.data.token);
      setUser(res.data.user);
      return true;
    } catch {
      return false;
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, loading, login, register, logout }}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
