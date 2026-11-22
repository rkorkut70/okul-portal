import React from 'react';
import { ACADEMIC_UNITS } from '../../data/mockData';
import { 
  Home, 
  GraduationCap, 
  Wrench, 
  FileText, 
  Calendar, 
  Calculator, 
  ExternalLink, 
  HardDrive,
  Sparkles,
  Layers,
  Clock,
  Globe,
  Users
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  selectedTool: _selectedTool,
  setSelectedTool
}) => {
  return (
    <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex md:flex-col justify-between h-[calc(100vh-5rem)] sticky top-20 select-none overflow-y-auto">
      <div className="p-4 space-y-6">
        
        {/* Main Navigation */}
        <div>
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">
            Ana Menü
          </div>
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'home'
                  ? 'bg-blue-50 text-blue-800 font-bold border border-blue-200/60'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Home className={`w-4 h-4 ${activeTab === 'home' ? 'text-blue-700' : 'text-slate-400'}`} />
              <span>Genel Bakış & Pano</span>
            </button>

            <button
              onClick={() => setActiveTab('cpd')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'cpd'
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center space-x-3 truncate">
                <GraduationCap className={`w-4 h-4 ${activeTab === 'cpd' ? 'text-amber-300' : 'text-blue-600'}`} />
                <span className="truncate">CPD Birimi (Pilot)</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                activeTab === 'cpd' ? 'bg-amber-400 text-slate-900' : 'bg-emerald-100 text-emerald-800'
              }`}>
                Aktif
              </span>
            </button>
          </div>
        </div>

        {/* 5 Academic Units */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">
            <span>Akademik Birimler (5)</span>
            <Layers className="w-3 h-3 text-slate-400" />
          </div>
          <div className="space-y-1">
            {ACADEMIC_UNITS.map((unit) => {
              const isCpd = unit.id === 'cpd';
              const isSelected = activeTab === 'cpd' && isCpd;

              return (
                <button
                  key={unit.id}
                  onClick={() => {
                    if (isCpd) {
                      setActiveTab('cpd');
                    } else {
                      alert(`${unit.name} biriminin modülü şu anda planlama aşamasındadır. İlk aşamada CPD Birimi prototipi üzerinde çalışıyoruz.`);
                    }
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition text-left ${
                    isSelected
                      ? 'bg-blue-50 text-blue-800 font-semibold border-l-4 border-blue-700'
                      : isCpd
                      ? 'text-slate-700 hover:bg-slate-100'
                      : 'text-slate-400 hover:bg-slate-50 cursor-pointer opacity-75'
                  }`}
                >
                  <div className="truncate pr-2">
                    <div className="font-medium truncate">{unit.shortName}</div>
                    <div className="text-[10px] text-slate-400 truncate">{unit.code}</div>
                  </div>
                  {isCpd ? (
                    <span className="text-[10px] text-blue-600 font-bold bg-blue-100 px-1.5 py-0.5 rounded">
                      Canlı
                    </span>
                  ) : (
                    <span className="text-[9px] text-slate-400 bg-slate-100 px-1 py-0.5 rounded">
                      Planlanan
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Faydalı Araçlar (Tools Section) */}
        <div>
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 px-3">
            <span>Faydalı Araçlar</span>
            <Wrench className="w-3 h-3 text-slate-400" />
          </div>
          <div className="space-y-1">
            <button
              onClick={() => { setActiveTab('tools'); setSelectedTool('links'); }}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs transition ${
                activeTab === 'tools' && _selectedTool === 'links'
                  ? 'bg-amber-50 text-amber-900 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>Faydalı Linkler</span>
            </button>

            <button
              onClick={() => { setActiveTab('tools'); setSelectedTool('schedule'); }}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs transition ${
                activeTab === 'tools' && _selectedTool === 'schedule'
                  ? 'bg-amber-50 text-amber-900 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span>Ders Programı</span>
            </button>

            <button
              onClick={() => { setActiveTab('tools'); setSelectedTool('advisors'); }}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs transition ${
                activeTab === 'tools' && _selectedTool === 'advisors'
                  ? 'bg-amber-50 text-amber-900 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-purple-600" />
              <span>Kadro & Danışmanlar</span>
            </button>

            <button
              onClick={() => { setActiveTab('tools'); setSelectedTool('calendar'); }}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs transition ${
                activeTab === 'tools' && _selectedTool === 'calendar'
                  ? 'bg-amber-50 text-amber-900 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-3.5 h-3.5 text-indigo-600" />
              <span>Akademik Takvim</span>
            </button>

            <button
              onClick={() => { setActiveTab('tools'); setSelectedTool('forms'); }}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs transition ${
                activeTab === 'tools' && _selectedTool === 'forms'
                  ? 'bg-amber-50 text-amber-900 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-amber-600" />
              <span>Form & Şablonlar</span>
            </button>

            <button
              onClick={() => { setActiveTab('tools'); setSelectedTool('grade'); }}
              className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs transition ${
                activeTab === 'tools' && _selectedTool === 'grade'
                  ? 'bg-amber-50 text-amber-900 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-600" />
              <span>Not Hesaplama</span>
            </button>

            <button
              onClick={() => { setActiveTab('tools'); setSelectedTool('assignment'); }}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition ${
                activeTab === 'tools' && _selectedTool === 'assignment'
                  ? 'bg-amber-50 text-amber-900 font-semibold'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <ExternalLink className="w-3.5 h-3.5 text-rose-600" />
                <span className="truncate">Ödev Takip Portalı</span>
              </div>
              <Sparkles className="w-3 h-3 text-amber-500 flex-shrink-0" />
            </button>
          </div>
        </div>

      </div>

      {/* Footer Info Box */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/70">
        <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs shadow-xs space-y-2">
          <div className="flex items-center space-x-2 text-slate-800 font-semibold">
            <HardDrive className="w-3.5 h-3.5 text-blue-700" />
            <span>Kurumsal Google Drive</span>
          </div>
          <p className="text-[11px] text-slate-500 leading-snug">
            Belgeler ortak Drive dizininde arşivlenir. Tüm YDYO personeli anlık erişebilir.
          </p>
        </div>
      </div>

    </aside>
  );
};
