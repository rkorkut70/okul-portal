import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, 
  GraduationCap, 
  HardDrive, 
  Wrench, 
  User as UserIcon 
} from 'lucide-react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAuth: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  onOpenAuth
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <nav 
      aria-label="Mobil Gezinme Çubuğu"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 px-2 py-1.5 pb-safe shadow-[0_-4px_25px_rgba(15,41,66,0.08)] flex items-center justify-around select-none"
    >
      
      {/* Ana Sayfa */}
      <button
        onClick={() => setActiveTab('home')}
        className={`flex-1 min-h-[48px] flex flex-col items-center justify-center py-1 px-1 rounded-2xl transition-all duration-150 active:scale-90 cursor-pointer ${
          activeTab === 'home' 
            ? 'bg-blue-50/90 text-blue-900 font-bold shadow-2xs' 
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Home className={`w-5 h-5 transition-transform ${activeTab === 'home' ? 'text-blue-900 scale-105 stroke-[2.5]' : 'text-slate-400'}`} />
        <span className="text-[10px] mt-0.5 tracking-tight">Ana Sayfa</span>
      </button>

      {/* CPD Birimi */}
      <button
        onClick={() => setActiveTab('cpd')}
        className={`flex-1 min-h-[48px] flex flex-col items-center justify-center py-1 px-1 rounded-2xl transition-all duration-150 active:scale-90 relative cursor-pointer ${
          activeTab === 'cpd' 
            ? 'bg-blue-50/90 text-blue-900 font-bold shadow-2xs' 
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <div className="relative">
          <GraduationCap className={`w-5 h-5 transition-transform ${activeTab === 'cpd' ? 'text-blue-900 scale-105 stroke-[2.5]' : 'text-slate-400'}`} />
          <span className="absolute -top-1 -right-1.5 w-2 h-2 bg-amber-500 rounded-full ring-2 ring-white animate-pulse" />
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight">CPD</span>
      </button>

      {/* Ortak Drive */}
      <button
        onClick={() => setActiveTab('documents')}
        className={`flex-1 min-h-[48px] flex flex-col items-center justify-center py-1 px-1 rounded-2xl transition-all duration-150 active:scale-90 cursor-pointer ${
          activeTab === 'documents' 
            ? 'bg-blue-50/90 text-blue-900 font-bold shadow-2xs' 
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <HardDrive className={`w-5 h-5 transition-transform ${activeTab === 'documents' ? 'text-blue-900 scale-105 stroke-[2.5]' : 'text-slate-400'}`} />
        <span className="text-[10px] mt-0.5 tracking-tight">Drive</span>
      </button>

      {/* Faydalı Araçlar */}
      <button
        onClick={() => setActiveTab('tools')}
        className={`flex-1 min-h-[48px] flex flex-col items-center justify-center py-1 px-1 rounded-2xl transition-all duration-150 active:scale-90 cursor-pointer ${
          activeTab === 'tools' 
            ? 'bg-blue-50/90 text-blue-900 font-bold shadow-2xs' 
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Wrench className={`w-5 h-5 transition-transform ${activeTab === 'tools' ? 'text-blue-900 scale-105 stroke-[2.5]' : 'text-slate-400'}`} />
        <span className="text-[10px] mt-0.5 tracking-tight">Araçlar</span>
      </button>

      {/* Profil / Giriş */}
      <button
        onClick={onOpenAuth}
        className={`flex-1 min-h-[48px] flex flex-col items-center justify-center py-1 px-1 rounded-2xl transition-all duration-150 active:scale-90 cursor-pointer ${
          isAuthenticated 
            ? 'text-emerald-700 font-bold' 
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <UserIcon className={`w-5 h-5 ${isAuthenticated ? 'text-emerald-600 stroke-[2.5]' : 'text-slate-400'}`} />
        <span className="text-[10px] mt-0.5 tracking-tight">{isAuthenticated ? 'Hesabım' : 'Giriş'}</span>
      </button>

    </nav>
  );
};
