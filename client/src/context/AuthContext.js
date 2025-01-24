import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    // Checa o token no localStorage ao carregar a aplicação
    const token = localStorage.getItem('token');
    setIsLoggedIn(token !== null && token !== undefined); // Atualiza o estado com base no token
    setIsAuthReady(true);
  }, []);

  useEffect(() => {
    console.log('isLoggedIn atualizado:', isLoggedIn);
  }, [isLoggedIn]);

  const login = (token) => {
    localStorage.setItem('token', token); // Salva o token no localStorage
    setIsLoggedIn(true); // Atualiza o estado global
  };

  const logout = () => {
    localStorage.removeItem('token'); // Remove o token
    setIsLoggedIn(false); // Atualiza o estado global
  };

  if (!isAuthReady) {
    return <p>Loading...</p>;
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
