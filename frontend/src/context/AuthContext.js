import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { api } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('authToken'));

  // Configurar interceptor de axios y api
  useEffect(() => {
    if (token) {
      const authHeader = `Bearer ${token}`;
      axios.defaults.headers.common['Authorization'] = authHeader;
      api.defaults.headers.common['Authorization'] = authHeader;
    } else {
      delete axios.defaults.headers.common['Authorization'];
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Cargar usuario al iniciar
  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const response = await axios.get('/api/auth/profile');
          setUser(response.data.user);
        } catch (error) {
          localStorage.removeItem('authToken');
          setToken(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  const login = async (email, password) => {
    const response = await axios.post('/api/auth/login', { email, password });
    const { token: newToken, user: userData } = response.data;
    
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
    setUser(userData);
    
    return response.data;
  };

  const register = async (email, username, password, passwordConfirm) => {
    const response = await axios.post('/api/auth/register', {
      email,
      username,
      password,
      passwordConfirm
    });
    
    const { token: newToken, user: userData } = response.data;
    localStorage.setItem('authToken', newToken);
    setToken(newToken);
    setUser(userData);
    
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    setUser(null);
  };

  const updateUserData = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  return (
    <AuthContext.Provider value={{ user, loading, token, login, register, logout, updateUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
