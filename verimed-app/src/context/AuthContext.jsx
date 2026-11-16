import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext(null);

const API_URL = import.meta.env.VITE_API_URL || '';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const clearSession = () => {
    localStorage.removeItem('verimed_access_token');
    localStorage.removeItem('verimed_refresh_token');
    setUser(null);
  };

  const refreshAccessToken = useCallback(async () => {
    const refreshToken = localStorage.getItem('verimed_refresh_token');
    if (!refreshToken) return false;

    try {
      const res = await fetch(`${API_URL}/api/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!res.ok) {
        clearSession();
        return false;
      }

      const data = await res.json();
      localStorage.setItem('verimed_access_token', data.accessToken);
      localStorage.setItem('verimed_refresh_token', data.refreshToken);
      return true;
    } catch {
      clearSession();
      return false;
    }
  }, []);

  const loadUser = useCallback(async () => {
    let token = localStorage.getItem('verimed_access_token');
    if (!token) {
      setLoading(false);
      return;
    }

    let res = await fetch(`${API_URL}/api/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) {
      const refreshed = await refreshAccessToken();
      if (!refreshed) {
        setLoading(false);
        return;
      }
      token = localStorage.getItem('verimed_access_token');
      res = await fetch(`${API_URL}/api/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    if (res.ok) {
      const data = await res.json();
      setUser({
        email: data.user.email,
        name: data.user.name,
        role: data.user.role,
      });
    } else {
      clearSession();
    }

    setLoading(false);
  }, [refreshAccessToken]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = async (email, password) => {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Error al iniciar sesión');
    }

    localStorage.setItem('verimed_access_token', data.accessToken);
    localStorage.setItem('verimed_refresh_token', data.refreshToken);
    setUser(data.user);
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem('verimed_refresh_token');
    if (refreshToken) {
      try {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        });
      } catch {}
    }
    clearSession();
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    refreshAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
