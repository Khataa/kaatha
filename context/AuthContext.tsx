'use client'
import React, {createContext, useEffect, useState } from "react";
import Cookie from "js-cookie";
interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  userType: "shop" | "customer" | null;
  login: (token : string, userType : 'shop' | 'customer') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [userType, setUserType] = useState<"shop" | "customer" | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserType = localStorage.getItem("userType");
    if (storedToken && storedUserType) {
      setIsAuthenticated(true);
      setToken(storedToken);
      setUserType(storedUserType as "shop" | "customer");
    }
  }, []);
  function login(token : string, userType : 'shop' | 'customer') {
    setIsAuthenticated(true);
    setToken(token);
    setUserType(userType);
    localStorage.setItem("token", token);
    localStorage.setItem("userType", userType);
  }
  function logout() {
    setIsAuthenticated(false);
    setToken(null);
    setUserType(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
  }
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, userType, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = ()=>{
    const context = React.useContext(AuthContext);
    if (!context) {
      throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}