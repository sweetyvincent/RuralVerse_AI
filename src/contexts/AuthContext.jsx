import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (email, password, role = 'student') => {
    // Simulated login
    const mockUsers = {
      student: { id: 's1', name: 'Aarav Sharma', email, role: 'student', avatar: 'AS', grade: 7, language: 'en', village: 'Rampura' },
      teacher: { id: 't1', name: 'Dr. Meera Krishnan', email, role: 'teacher', avatar: 'MK', subject: 'Science & Mathematics' },
      parent: { id: 'p1', name: 'Rajesh Sharma', email, role: 'parent', avatar: 'RS', childId: 's1' },
      admin: { id: 'a1', name: 'System Admin', email, role: 'admin', avatar: 'SA' },
    };
    
    setUser(mockUsers[role] || mockUsers.student);
    setIsAuthenticated(true);
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
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateLanguage = (lang) => {
    if (user) {
      setUser({ ...user, language: lang });
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
