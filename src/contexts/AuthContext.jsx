import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const defaultGuestUser = { 
  id: 's1', 
  name: 'Aarav Sharma', 
  email: 'aarav@ruralverse.ai', 
  role: 'student', 
  avatar: 'AS', 
  grade: 7, 
  language: 'en', 
  village: 'Rampura' 
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('ruralverse_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return defaultGuestUser;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('ruralverse_auth');
    if (savedAuth !== null) {
      return savedAuth === 'true';
    }
    // Default to true so users can open all feature pages directly
    return true;
  });

  const login = (email, password, role = 'student') => {
    const mockUsers = {
      student: { id: 's1', name: 'Aarav Sharma', email: email || 'aarav@ruralverse.ai', role: 'student', avatar: 'AS', grade: 7, language: 'en', village: 'Rampura' },
      teacher: { id: 't1', name: 'Dr. Meera Krishnan', email: email || 'meera@ruralverse.ai', role: 'teacher', avatar: 'MK', subject: 'Science & Mathematics' },
      parent: { id: 'p1', name: 'Rajesh Sharma', email: email || 'rajesh@ruralverse.ai', role: 'parent', avatar: 'RS', childId: 's1' },
      admin: { id: 'a1', name: 'System Admin', email: email || 'admin@ruralverse.ai', role: 'admin', avatar: 'SA' },
    };
    
    const loggedUser = mockUsers[role] || mockUsers.student;
    setUser(loggedUser);
    setIsAuthenticated(true);
    localStorage.setItem('ruralverse_user', JSON.stringify(loggedUser));
    localStorage.setItem('ruralverse_auth', 'true');
    return true;
  };

  const register = (data) => {
    const newUser = {
      id: 'u_' + Date.now(),
      name: data.name,
      email: data.email,
      role: data.role || 'student',
      avatar: data.name.split(' ').map(n => n[0]).join('').toUpperCase(),
      grade: data.grade || 7,
      language: data.language || 'en',
      village: data.village || '',
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('ruralverse_user', JSON.stringify(newUser));
    localStorage.setItem('ruralverse_auth', 'true');
    return true;
  };

  const logout = () => {
    setUser(defaultGuestUser);
    setIsAuthenticated(true); // Keep guest access open for features
    localStorage.removeItem('ruralverse_user');
    localStorage.setItem('ruralverse_auth', 'true');
  };

  const updateLanguage = (lang) => {
    if (user) {
      const updated = { ...user, language: lang };
      setUser(updated);
      localStorage.setItem('ruralverse_user', JSON.stringify(updated));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, updateLanguage }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
