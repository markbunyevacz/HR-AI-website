import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      // Optionally, you could verify the token here by making a request to the backend
    }
  }, []);

  const register = async (firstName, lastName, email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/auth/register', {
        firstName,
        lastName,
        email,
        password,
      });

      if (response.data.success) {
        const { data } = response.data;
        setToken(data.token);
        setUser(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        return response.data;
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        const { data } = response.data;
        setToken(data.token);
        setUser(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data));
        return response.data;
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      throw new Error(message);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, error, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
