import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, UserRole } from '../types';
import { ACADEMIC_STAFF, ADMINISTRATIVE_STAFF } from '../data/schoolData';
import { upsertRegisteredUser, getStoredUserRole, addAuditLog } from '../utils/auditLog';

const USER_STORAGE_KEY = 'adu_portal_user_v2';
const CREDENTIALS_STORAGE_KEY = 'adu_portal_credentials_v1';

export interface StaffMatch {
  name: string;
  title: string;
  department: string;
  role: UserRole;
  isDirectoryMember: boolean;
}

export function findStaffByEmail(email: string): StaffMatch | null {
  const cleanEmail = email.trim().toLowerCase();
  if (!cleanEmail) return null;

  const academic = ACADEMIC_STAFF.find(
    (s) => s.email && s.email.trim().toLowerCase() === cleanEmail
  );
  if (academic) {
    const roleText = (academic.role || '').toLowerCase();
    let role: UserRole = 'instructor';
    if (roleText.includes('müdür') || cleanEmail === 'rkorkut@adu.edu.tr') {
      role = 'admin';
    } else if (
      roleText.includes('cpd') ||
      roleText.includes('sürekli mesleki') ||
      cleanEmail === 'pinar.ugur@adu.edu.tr'
    ) {
      role = 'cpd_manager';
    }

    return {
      name: academic.name,
      title: academic.title || 'Öğr. Gör.',
      department: academic.dutyPlace || 'Yabancı Diller Yüksekokulu',
      role,
      isDirectoryMember: true,
    };
  }

  const adminStaff = ADMINISTRATIVE_STAFF.find(
    (s) => s.email && s.email.trim().toLowerCase() === cleanEmail
  );
  if (adminStaff) {
    const roleText = (adminStaff.role || '').toLowerCase();
    return {
      name: adminStaff.name,
      title: adminStaff.role || 'İdari Personel',
      department: 'Yabancı Diller Yüksekokulu İdari Birim',
      role: roleText.includes('sekreter') ? 'admin' : 'instructor',
      isDirectoryMember: true,
    };
  }

  return null;
}

function encodeCredential(password: string): string {
  return btoa(unescape(encodeURIComponent(password)));
}

function getStoredCredentials(): Record<string, string> {
  try {
    const raw = localStorage.getItem(CREDENTIALS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveCredential(email: string, password: string): void {
  const creds = getStoredCredentials();
  creds[email.trim().toLowerCase()] = encodeCredential(password);
  localStorage.setItem(CREDENTIALS_STORAGE_KEY, JSON.stringify(creds));
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loginWithPassword: (email: string, password: string) => Promise<{ success: boolean; needsSetup?: boolean; message?: string }>;
  startFirstTimeRegister: (email: string) => Promise<{ success: boolean; verificationCode?: string; message?: string }>;
  completeFirstTimeRegister: (email: string, code: string, password: string, name: string, title: string, department: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    localStorage.removeItem('adu_portal_user');
    const saved = localStorage.getItem(USER_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved) as User;
      } catch {
        return null;
      }
    }
    return null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      upsertRegisteredUser(user);
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  const loginWithPassword = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; needsSetup?: boolean; message?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail.endsWith('@adu.edu.tr')) {
      return { success: false, message: 'Yalnızca kurumsal "@adu.edu.tr" uzantılı e-posta adresleri kabul edilmektedir.' };
    }

    if (!password) {
      return { success: false, message: 'Lütfen şifrenizi girin.' };
    }

    const creds = getStoredCredentials();
    const expected = creds[cleanEmail];
    if (!expected) {
      return {
        success: false,
        needsSetup: true,
        message: 'Bu hesap için henüz şifre oluşturulmamış. "İlk Kez Giriş / Şifre Belirle" sekmesinden şifrenizi tanımlayın.'
      };
    }

    if (expected !== encodeCredential(password)) {
      return {
        success: false,
        message: 'E-posta adresi veya şifre hatalı. Şifrenizi yenilemek için "İlk Kez Giriş / Şifre Belirle" sekmesini kullanabilirsiniz.'
      };
    }

    const staff = findStaffByEmail(cleanEmail);
    const fallbackName = cleanEmail
      .split('@')[0]
      .split('.')
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(' ');
    const isCpdManager = cleanEmail.includes('cpd') || cleanEmail === 'pinar.ugur@adu.edu.tr';
    const storedRole = getStoredUserRole(cleanEmail);

    const newUser: User = {
      id: 'usr-' + Date.now(),
      name: staff?.name || fallbackName,
      email: cleanEmail,
      title: staff?.title || 'Öğr. Gör.',
      department: staff?.department || 'Yabancı Diller Yüksekokulu',
      role: storedRole || staff?.role || (isCpdManager ? 'cpd_manager' : 'instructor'),
      isFirstLogin: false
    };

    upsertRegisteredUser(newUser, { isLogin: true });
    addAuditLog({
      userEmail: newUser.email,
      userName: newUser.name,
      userRole: newUser.role,
      action: 'login',
      description: 'Portala giriş yapıldı',
    });

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
    password: string,
    name: string,
    title: string,
    department: string
  ): Promise<{ success: boolean; message?: string }> => {
    const cleanEmail = email.trim().toLowerCase();
    const savedCode = sessionStorage.getItem('pending_verification_code');
    const savedEmail = sessionStorage.getItem('pending_verification_email');

    if (code !== savedCode || cleanEmail !== savedEmail?.toLowerCase()) {
      return { success: false, message: 'Girilen doğrulama kodu hatalı veya süresi dolmuş.' };
    }

    if (!password || password.length < 6) {
      return { success: false, message: 'Şifreniz en az 6 karakter uzunluğunda olmalıdır.' };
    }

    saveCredential(cleanEmail, password);

    const staff = findStaffByEmail(cleanEmail);
    const isCpdManager = cleanEmail.includes('cpd') || cleanEmail === 'pinar.ugur@adu.edu.tr';
    const storedRole = getStoredUserRole(cleanEmail);

    const newUser: User = {
      id: 'usr-' + Date.now(),
      name: name.trim() || staff?.name || cleanEmail.split('@')[0],
      email: cleanEmail,
      title: title.trim() || staff?.title || 'Öğr. Gör.',
      department: department.trim() || staff?.department || 'Yabancı Diller Yüksekokulu',
      role: storedRole || staff?.role || (isCpdManager ? 'cpd_manager' : 'instructor'),
      isFirstLogin: false
    };

    upsertRegisteredUser(newUser, { isRegister: true, isLogin: true });
    addAuditLog({
      userEmail: newUser.email,
      userName: newUser.name,
      userRole: newUser.role,
      action: 'register',
      description: 'İlk kez şifre oluşturuldu ve portala giriş yapıldı',
    });

    setUser(newUser);
    sessionStorage.removeItem('pending_verification_code');
    sessionStorage.removeItem('pending_verification_email');

    return { success: true };
  };

  const logout = () => {
    if (user) {
      addAuditLog({
        userEmail: user.email,
        userName: user.name,
        userRole: user.role,
        action: 'logout',
        description: 'Portaldan çıkış yapıldı',
      });
    }
    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    if (!user) return;
    addAuditLog({
      userEmail: user.email,
      userName: user.name,
      userRole: role,
      action: 'role_change',
      description: `Kullanıcı rolü değiştirildi: ${role}`,
    });
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
