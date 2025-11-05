import React, { createContext, useState, useEffect, useContext } from "react";
import { checkAuthStatus, logoutUser } from "../api/api";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const userData = await checkAuthStatus();
      if (userData) {
        setUser(userData);
        setIsAuthenticated(true);
      }
      setLoading(false);
    };

    checkUser();
  }, []);

  const logout = async () => {
    await logoutUser();
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
