import React, { useState, useMemo } from 'react';
import { BRANCH_ADVISORS, MANAGEMENT_BOARD, SCHOOL_BOARD } from '../../data/schoolData';
import { 
  Users, 
  Search, 
  UserCheck, 
  Building, 
  ShieldCheck
} from 'lucide-react';

export const AdvisorDirectoryView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'advisors' | 'boards'>('advisors');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');

  const filteredAdvisors = useMemo(() => {
    return BRANCH_ADVISORS.filter(item => {
      const matchesSearch = 
        item.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.advisor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.obisCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.track.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesLang = 
        selectedLanguage === 'all' || item.language === selectedLanguage;

      return matchesSearch && matchesLang;
    });
  }, [searchQuery, selectedLanguage]);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-blue-800/80 text-[11px] font-bold text-blue-200 border border-blue-700/50">
              <Users className="w-3.5 h-3.5 text-blue-300" />
              <span>Akademik Danışmanlık ve Yönetim</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Şube Danışmanları ve Kurullar
            </h2>
            <p className="text-xs text-blue-200/80 max-w-xl leading-relaxed">
              2026-2027 Akademik Yılı şube danışman hocaları, kur seviyeleri ve YDYO yönetim/yüksekokul kurulu listesi.
            </p>
          </div>

          {/* Subtabs */}
          <div className="flex items-center p-1 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15">
            <button
              onClick={() => setActiveSubTab('advisors')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeSubTab === 'advisors'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Şube Danışmanları ({BRANCH_ADVISORS.length})
            </button>
            <button
              onClick={() => setActiveSubTab('boards')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeSubTab === 'boards'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Yönetim & Kurullar
            </button>
          </div>
        </div>
      </div>

      {activeSubTab === 'advisors' ? (
        <div className="space-y-4">
          {/* Controls */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Şube veya danışman hoca ara..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
            </div>

            <div className="flex items-center space-x-1.5 overflow-x-auto w-full md:w-auto">
              {['all', 'İngilizce', 'Fransızca', 'Almanca'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSelectedLanguage(lang)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                    selectedLanguage === lang
                      ? 'bg-blue-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  {lang === 'all' ? 'Tüm Diller' : lang}
                </button>
              ))}
            </div>
          </div>

          {/* Table / Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAdvisors.map((item, idx) => (
              <div 
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-400 hover:shadow-md transition space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono font-bold text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded-lg border border-slate-200">
                      {item.obisCode}
                    </span>
                    <span className="font-black text-sm text-slate-900">
                      {item.branch}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    item.language === 'İngilizce' 
                      ? 'bg-blue-100 text-blue-800'
                      : item.language === 'Fransızca'
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {item.language}
                  </span>
                </div>

                <div className="text-xs text-slate-500 flex items-center space-x-1.5">
                  <span className="font-semibold text-slate-700">Kur:</span>
                  <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px] font-medium text-slate-600">
                    {item.track || 'Belirtilmemiş'}
                  </span>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0 font-bold">
                    <UserCheck className="w-4 h-4 text-blue-700" />
                  </div>
                  <div className="truncate">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Sınıf Danışmanı</div>
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {item.advisor}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAdvisors.length === 0 && (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-slate-400">
              <Users className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              <p className="text-sm font-semibold">Aranan kritere uygun şube danışmanı bulunamadı.</p>
            </div>
          )}
        </div>
      ) : (
        /* Boards (Yönetim Kurulu & Yüksekokul Kurulu) */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Yönetim Kurulu */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-blue-700" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Yönetim Kurulu</h3>
                <p className="text-xs text-slate-500">Yüksekokul Yönetim Kurulu Üyeleri</p>
              </div>
            </div>

            <div className="space-y-3">
              {MANAGEMENT_BOARD.map((member) => (
                <div key={member.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{member.name}</h4>
                    <p className="text-[11px] text-slate-500">{member.duty}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    member.role === 'Başkan'
                      ? 'bg-amber-100 text-amber-900'
                      : member.role === 'Raportör'
                      ? 'bg-slate-200 text-slate-700'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Yüksekokul Kurulu */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center space-x-3 pb-3 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <Building className="w-5 h-5 text-indigo-700" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">Yüksekokul Kurulu</h3>
                <p className="text-xs text-slate-500">Yüksekokul Akademik Genel Kurulu</p>
              </div>
            </div>

            <div className="space-y-3">
              {SCHOOL_BOARD.map((member) => (
                <div key={member.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{member.name}</h4>
                    <p className="text-[11px] text-slate-500">{member.duty}</p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    member.role === 'Başkan'
                      ? 'bg-amber-100 text-amber-900'
                      : member.role === 'Raportör'
                      ? 'bg-slate-200 text-slate-700'
                      : 'bg-indigo-100 text-indigo-800'
                  }`}>
                    {member.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
