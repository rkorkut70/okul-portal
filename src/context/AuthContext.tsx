import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loginWithPassword: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  startFirstTimeRegister: (email: string) => Promise<{ success: boolean; verificationCode?: string; message?: string }>;
  completeFirstTimeRegister: (email: string, code: string, password: string, name: string, title: string, department: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_USER: User = {
  id: 'usr-1',
  name: 'Doç. Dr. Ahmet Yılmaz',
  email: 'ahmet.yilmaz@adu.edu.tr',
  title: 'Doçent Doktor',
  department: 'Eğitim Fakültesi / Eğitim Bilimleri',
  role: 'cpd_manager'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('adu_portal_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('adu_portal_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('adu_portal_user');
    }
  }, [user]);

  const loginWithPassword = async (email: string, _password: string): Promise<{ success: boolean; message?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail.endsWith('@adu.edu.tr')) {
      return { success: false, message: 'Yalnızca kurumsal "@adu.edu.tr" uzantılı e-posta adresleri kabul edilmektedir.' };
    }

    // Identify user role from email or default
    const isCpdManager = cleanEmail.includes('cpd') || cleanEmail.includes('ahmet.yilmaz');
    const newUser: User = {
      id: 'usr-' + Date.now(),
      name: cleanEmail.split('@')[0].split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' '),
      email: cleanEmail,
      title: isCpdManager ? 'Doçent Doktor (Birim Sorumlusu)' : 'Öğretim Üyesi',
      department: 'Akademik Birim',
      role: isCpdManager ? 'cpd_manager' : 'instructor'
    };

    setUser(newUser);
    return { success: true };
  };

  const startFirstTimeRegister = async (email: string): Promise<{ success: boolean; verificationCode?: string; message?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail.endsWith('@adu.edu.tr')) {
      return { success: false, message: 'Yalnızca kurumsal "@adu.edu.tr" uzantılı e-posta adresleri ile kayıt yapılabilir.' };
    }

    // Generate 6 digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem('pending_verification_code', code);
    sessionStorage.setItem('pending_verification_email', cleanEmail);

    return { 
      success: true, 
      verificationCode: code,
      message: `${cleanEmail} adresine tek kullanımlık doğrulama kodu gönderildi.` 
    };
  };

  const completeFirstTimeRegister = async (
    email: string,
    code: string,
    _password: string,
    name: string,
    title: string,
    department: string
  ): Promise<{ success: boolean; message?: string }> => {
    const savedCode = sessionStorage.getItem('pending_verification_code');
    const savedEmail = sessionStorage.getItem('pending_verification_email');

    if (code !== savedCode || email.toLowerCase() !== savedEmail?.toLowerCase()) {
      return { success: false, message: 'Girilen doğrulama kodu hatalı veya süresi dolmuş.' };
    }

    const newUser: User = {
      id: 'usr-' + Date.now(),
      name: name || email.split('@')[0],
      email: email.toLowerCase(),
      title: title || 'Öğretim Elemanı',
      department: department || 'Akademik Birim',
      role: email.includes('cpd') ? 'cpd_manager' : 'instructor',
      isFirstLogin: false
    };

    setUser(newUser);
    sessionStorage.removeItem('pending_verification_code');
    sessionStorage.removeItem('pending_verification_email');

    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    if (!user) return;
    setUser({
      ...user,
      role
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginWithPassword,
        startFirstTimeRegister,
        completeFirstTimeRegister,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
