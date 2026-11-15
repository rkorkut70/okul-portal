import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import type { UserRole } from '../../types';
import { 
  Building2, 
  LogOut, 
  LogIn, 
  ShieldCheck, 
  ChevronDown, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface HeaderProps {
  onOpenAuth: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAuth, activeTab: _activeTab, setActiveTab: _setActiveTab }) => {
  const { user, isAuthenticated, logout, switchRole } = useAuth();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'cpd_manager':
        return { label: 'CPD Birim Sorumlusu', bg: 'bg-amber-100 text-amber-800 border-amber-300' };
      case 'admin':
        return { label: 'Sistem Yöneticisi', bg: 'bg-rose-100 text-rose-800 border-rose-300' };
      default:
        return { label: 'Öğretim Elemanı', bg: 'bg-blue-100 text-blue-800 border-blue-300' };
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0f2942] text-white shadow-md border-b border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & University Title */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center shadow-lg border border-white/20">
              <Building2 className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-base sm:text-xl tracking-tight text-white">ADÜ AKADEMİK PORTAL</span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Pilot Sürüm v1.0
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium hidden sm:block">
                Aydın Adnan Menderes Üniversitesi • Akademik Birimler ve Belge Merkezi
              </p>
            </div>
          </div>

          {/* Right Action Area */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Quick Google Drive Link */}
            <a
              href="https://drive.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-600 transition"
              title="Kurumsal Ortak Google Drive'ı Yeni Sekmede Aç"
            >
              <span>Ortak Drive</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            {/* User Auth Info & Role Switcher */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                
                {/* Role Switcher (For Demo & Testing) */}
                <div className="relative">
                  <button
                    onClick={() => setShowRoleMenu(!showRoleMenu)}
                    className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/15 text-white border border-white/20 transition cursor-pointer"
                    title="Rol Değiştir (Test İçin)"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden lg:inline">{getRoleLabel(user.role).label}</span>
                    <span className="lg:hidden">{user.role === 'cpd_manager' ? 'CPD Yetkilisi' : 'Hoca'}</span>
                    <ChevronDown className="w-3 h-3 text-slate-300" />
                  </button>

                  {/* Dropdown */}
                  {showRoleMenu && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-200 py-2 z-50 text-slate-800 animate-in fade-in zoom-in-95">
                      <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100 flex items-center justify-between">
                        <span>Rol Seçimi (Demo)</span>
                        <Sparkles className="w-3 h-3 text-amber-500" />
                      </div>
                      <button
                        onClick={() => { switchRole('instructor'); setShowRoleMenu(false); }}
                        className={`w-full text-left px-3 py-2 text-xs flex flex-col hover:bg-slate-50 transition ${user.role === 'instructor' ? 'bg-blue-50 font-semibold text-blue-700' : ''}`}
                      >
                        <span className="font-medium text-slate-900">Öğretim Elemanı</span>
                        <span className="text-[11px] text-slate-500">Tüm belgelere ve araçlara erişir, salt okur.</span>
                      </button>
                      <button
                        onClick={() => { switchRole('cpd_manager'); setShowRoleMenu(false); }}
                        className={`w-full text-left px-3 py-2 text-xs flex flex-col hover:bg-slate-50 transition ${user.role === 'cpd_manager' ? 'bg-amber-50 font-semibold text-amber-800' : ''}`}
                      >
                        <span className="font-medium text-slate-900">CPD Birim Sorumlusu</span>
                        <span className="text-[11px] text-slate-500">Faaliyet ekler, özet girer, Drive linki tanımlar.</span>
                      </button>
                      <button
                        onClick={() => { switchRole('admin'); setShowRoleMenu(false); }}
                        className={`w-full text-left px-3 py-2 text-xs flex flex-col hover:bg-slate-50 transition ${user.role === 'admin' ? 'bg-rose-50 font-semibold text-rose-800' : ''}`}
                      >
                        <span className="font-medium text-slate-900">Sistem Yöneticisi</span>
                        <span className="text-[11px] text-slate-500">Tam yetki ve tüm birimlerin yönetimi.</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Profile Avatar & Name */}
                <div className="flex items-center space-x-2 pl-2 border-l border-white/20">
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs text-white ring-2 ring-white/30">
                    {user.name.charAt(0)}
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-xs font-semibold text-white leading-tight truncate max-w-[130px]">{user.name}</div>
                    <div className="text-[10px] text-slate-300 truncate max-w-[130px]">{user.email}</div>
                  </div>
                  <button
                    onClick={logout}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-rose-400 hover:bg-white/10 transition"
                    title="Çıkış Yap"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>

              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-md transition active:scale-95"
              >
                <LogIn className="w-4 h-4" />
                <span>Giriş Yap (@adu.edu.tr)</span>
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
