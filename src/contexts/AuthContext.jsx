import React, { createContext, useState, useContext, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { getRefreshToken } from '../services/ApiClientService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuthStatus = async () => {
    const accessToken = sessionStorage.getItem('accessToken');
    const refreshToken = sessionStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      const accessTokenDecoded = jwtDecode(accessToken);
      const accessTokenExpTimestamp = accessTokenDecoded.exp * 1000;

      if (Date.now() >= accessTokenExpTimestamp) {
        const refreshTokenDecoded = jwtDecode(refreshToken);
        const refreshTokenExpTimestamp = refreshTokenDecoded.exp * 1000;

        if (Date.now() >= refreshTokenExpTimestamp) {
          setIsAuthenticated(false);
          logout();
        } else {
          await getRefreshToken(accessTokenDecoded.UserTempID, { Authorization: refreshToken });
        }
      } else {
        setIsAuthenticated(true);
      }
    } else {
      setIsAuthenticated(false);
      logout();
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = (accessToken, refreshToken) => {
    sessionStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
