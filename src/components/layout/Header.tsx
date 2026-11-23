import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { GOOGLE_DRIVE_FOLDER_URL } from '../../data/mockData';
import { 
  Building2, 
  LogOut, 
  User as UserIcon,
  ExternalLink
} from 'lucide-react';

interface HeaderProps {
  onOpenAuth: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAuth, activeTab: _activeTab, setActiveTab: _setActiveTab }) => {
  const { user, isAuthenticated, logout } = useAuth();

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
                <span className="font-extrabold text-base sm:text-xl tracking-tight text-white">ADÜ YDYO PORTAL</span>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Pilot Sürüm v1.0
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium hidden sm:block">
                Aydın Adnan Menderes Üniversitesi • Yabancı Diller Yüksekokulu
              </p>
            </div>
          </div>

          {/* Right Action Area */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Quick Google Drive Link */}
            <a
              href={GOOGLE_DRIVE_FOLDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-600 transition"
              title="Kurumsal Ortak Google Drive Paylaşım Klasörünü Yeni Sekmede Aç"
            >
              <span>Ortak Drive</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            {/* User Auth Info */}
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-2 bg-white/10 hover:bg-white/15 px-2.5 sm:px-3 py-1.5 rounded-xl border border-white/20 transition">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-xs text-white shadow-xs flex-shrink-0">
                  {user.name.charAt(0)}
                </div>
                <div className="text-left hidden xs:block sm:block">
                  <div className="text-xs sm:text-sm font-bold text-white leading-tight truncate max-w-[110px] sm:max-w-none">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-slate-300 hidden sm:block">
                    {user.department || 'YDYO'}
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="p-1 rounded-lg text-slate-300 hover:text-rose-300 hover:bg-white/10 transition cursor-pointer"
                  title="Çıkış Yap"
                >
                  <LogOut className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 shadow-md transition active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <UserIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>Giriş</span>
                <span className="hidden sm:inline"> Yap (@adu.edu.tr)</span>
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
