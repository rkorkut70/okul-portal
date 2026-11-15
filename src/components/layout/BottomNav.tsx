import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, 
  GraduationCap, 
  FolderGit2, 
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
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 px-2 py-1 shadow-lg flex items-center justify-around">
      
      {/* Ana Sayfa */}
      <button
        onClick={() => setActiveTab('home')}
        className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-lg transition ${
          activeTab === 'home' ? 'text-blue-900 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Home className={`w-5 h-5 ${activeTab === 'home' ? 'text-blue-900 stroke-[2.5]' : 'text-slate-400'}`} />
        <span className="text-[10px] mt-0.5">Ana Sayfa</span>
      </button>

      {/* CPD Birimi */}
      <button
        onClick={() => setActiveTab('cpd')}
        className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-lg transition relative ${
          activeTab === 'cpd' ? 'text-blue-900 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <GraduationCap className={`w-5 h-5 ${activeTab === 'cpd' ? 'text-blue-900 stroke-[2.5]' : 'text-slate-400'}`} />
        <span className="text-[10px] mt-0.5">CPD Birimi</span>
        <span className="absolute top-1 right-2 w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
      </button>

      {/* Drive Belgeler */}
      <button
        onClick={() => setActiveTab('documents')}
        className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-lg transition ${
          activeTab === 'documents' ? 'text-blue-900 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <FolderGit2 className={`w-5 h-5 ${activeTab === 'documents' ? 'text-blue-900 stroke-[2.5]' : 'text-slate-400'}`} />
        <span className="text-[10px] mt-0.5">Belgeler</span>
      </button>

      {/* Faydalı Araçlar */}
      <button
        onClick={() => setActiveTab('tools')}
        className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-lg transition ${
          activeTab === 'tools' ? 'text-blue-900 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Wrench className={`w-5 h-5 ${activeTab === 'tools' ? 'text-blue-900 stroke-[2.5]' : 'text-slate-400'}`} />
        <span className="text-[10px] mt-0.5">Araçlar</span>
      </button>

      {/* Profil / Giriş */}
      <button
        onClick={onOpenAuth}
        className={`flex flex-col items-center justify-center py-1.5 px-2 rounded-lg transition ${
          isAuthenticated ? 'text-emerald-700' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <UserIcon className="w-5 h-5 text-slate-400" />
        <span className="text-[10px] mt-0.5">{isAuthenticated ? 'Hesabım' : 'Giriş'}</span>
      </button>

    </nav>
  );
};
