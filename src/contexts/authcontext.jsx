import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) return;

      try {
        const response = await fetch('https://finalprojectbreackbackend.onrender.com/user/user-info', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response?.ok) {
          if(response.status === 401) {
            logout();
          }
          const errorText = await response.text();
          throw new Error(`Error al obtener los datos del usuario: ${errorText}`);
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchUserData();
  }, [token]);

  useEffect(() => {
    const loadStorage = async () => {
      setLoading(false);
    };
    loadStorage();
  }, [token]);

  useEffect(() => {
    if (token) {
      setUser({ token });
    } else {
      setUser(null);
    }
  }, [token]);

  const login = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    setUser({ token });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
};

  const register = async (name, email, phone, password) => {
    try {
      const response = await fetch('https://finalprojectbreackbackend.onrender.com/user/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, password })
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token);
        return true;
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error de registro:', error);
      throw error;
    }
  };

  const loginUser = async (email, password) => {
    try {
        const response = await fetch('https://finalprojectbreackbackend.onrender.com/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!!response?.ok) {
            const data = await response.json();
            login(data.token); 
            return true;
        } else {
            const data = await response.json();
            throw new Error(data.error || 'Error en el inicio de sesión');
        }
    } catch (error) {
        console.error('Error de inicio de sesión:', error);
        throw error;
    }
};

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, register, loginUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
