import React from 'react';
import { ACADEMIC_UNITS, CPD_ACTIVITIES, CPD_DRIVE_DOCUMENTS } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';
import { 
  GraduationCap, 
  HardDrive, 
  Calendar, 
  Calculator, 
  FileText, 
  Users, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  ExternalLink, 
  Layers, 
  ChevronRight 
} from 'lucide-react';

interface HomeDashboardProps {
  setActiveTab: (tab: string) => void;
  setSelectedTool: (tool: string) => void;
  onOpenAuth: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  setActiveTab,
  setSelectedTool,
  onOpenAuth
}) => {
  const { user, isAuthenticated } = useAuth();

  const recentActivities = CPD_ACTIVITIES.slice(0, 3);
  const pinnedDocs = CPD_DRIVE_DOCUMENTS.filter(d => d.isPinned).slice(0, 3);

  return (
    <div className="space-y-6">

      {/* Hero Welcome Card */}
      <div className="bg-gradient-to-r from-[#0f2942] via-blue-950 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 bottom-0 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950 uppercase tracking-wider">
              Akademik Yönetim & Belge Merkezi
            </span>
            <span className="text-xs text-slate-300">Aydın Adnan Menderes Üniversitesi</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            {isAuthenticated && user ? `Hoş Geldiniz, ${user.title} ${user.name}` : 'ADÜ Akademik Portala Hoş Geldiniz'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
            5 akademik birimimizin kurumsal Google Drive belgelerine, yapılan faaliyet özetlerine ve 
            günlük ders-sınav süreçlerini kolaylaştıran faydalı araçlara tek noktadan ulaşın.
          </p>

          <div className="pt-2 flex flex-wrap gap-2.5">
            <button
              onClick={() => setActiveTab('cpd')}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-md transition active:scale-95 cursor-pointer"
            >
              <GraduationCap className="w-4 h-4" />
              <span>CPD Birimini İncele (Pilot)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => { setActiveTab('tools'); setSelectedTool('forms'); }}
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/20 transition cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-300" />
              <span>Form & Şablonlar</span>
            </button>

            {!isAuthenticated && (
              <button
                onClick={onOpenAuth}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold transition cursor-pointer"
              >
                <span>@adu.edu.tr ile Giriş Yap</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Akademik Birim</span>
            <Layers className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">5</div>
          <div className="text-[11px] text-emerald-700 font-semibold flex items-center">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            <span>1 Aktif Pilot (CPD)</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Drive Belgesi</span>
            <HardDrive className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">24+</div>
          <div className="text-[11px] text-slate-500 font-medium">Hiyerarşik Arşiv</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>CPD Faaliyeti</span>
            <Users className="w-3.5 h-3.5 text-indigo-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">16</div>
          <div className="text-[11px] text-slate-500 font-medium">420+ Katılımcı</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
            <span>Faydalı Araç</span>
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
          </div>
          <div className="text-2xl font-black text-slate-900">4</div>
          <div className="text-[11px] text-slate-500 font-medium">Hocalara Özel</div>
        </div>
      </div>

      {/* Fast Shortcuts: 4 Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Shortcut 1 */}
        <div 
          onClick={() => setActiveTab('cpd')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-400 hover:shadow-md transition cursor-pointer space-y-2 group"
        >
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold group-hover:scale-105 transition">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition">
            CPD Birimi Faaliyetleri
          </h4>
          <p className="text-xs text-slate-500 leading-snug">
            Sürekli mesleki gelişim çalıştayları, eğitim özetleri ve katılım belgeleri.
          </p>
        </div>

        {/* Shortcut 2 */}
        <div 
          onClick={() => setActiveTab('documents')}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-amber-400 hover:shadow-md transition cursor-pointer space-y-2 group"
        >
          <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold group-hover:scale-105 transition">
            <HardDrive className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900 group-hover:text-amber-700 transition">
            Ortak Google Drive Arşivi
          </h4>
          <p className="text-xs text-slate-500 leading-snug">
            Birimlerin hiyerarşik resmi evrakları, yönergeler ve sunum dosyaları.
          </p>
        </div>

        {/* Shortcut 3 */}
        <div 
          onClick={() => { setActiveTab('tools'); setSelectedTool('calendar'); }}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-indigo-400 hover:shadow-md transition cursor-pointer space-y-2 group"
        >
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-800 flex items-center justify-center font-bold group-hover:scale-105 transition">
            <Calendar className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900 group-hover:text-indigo-700 transition">
            2025-2026 Akademik Takvim
          </h4>
          <p className="text-xs text-slate-500 leading-snug">
            Sınav haftaları, son not giriş günleri ve mazeret sınav tarihleri.
          </p>
        </div>

        {/* Shortcut 4 */}
        <div 
          onClick={() => { setActiveTab('tools'); setSelectedTool('grade'); }}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-400 hover:shadow-md transition cursor-pointer space-y-2 group"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold group-hover:scale-105 transition">
            <Calculator className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition">
            Harf Notu & Çan Hesaplayıcı
          </h4>
          <p className="text-xs text-slate-500 leading-snug">
            Vize-final yüzdelerine göre ADÜ bağıl harf notu ve katsayı hesabı.
          </p>
        </div>

      </div>

      {/* Two Column Layout: Academic Units (5) & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left (2 cols): 5 Academic Units */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900">Üniversitemiz Akademik Birimleri (5)</h3>
              <p className="text-xs text-slate-500">İlk aşamada CPD Birimi faaliyettedir, diğer birimler planlama aşamasındadır.</p>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              Modüler Yapı
            </span>
          </div>

          <div className="space-y-3">
            {ACADEMIC_UNITS.map((unit) => {
              const isCpd = unit.id === 'cpd';

              return (
                <div
                  key={unit.id}
                  onClick={() => {
                    if (isCpd) setActiveTab('cpd');
                  }}
                  className={`p-4 rounded-2xl border transition flex items-center justify-between ${
                    isCpd
                      ? 'border-blue-300 bg-blue-50/30 hover:bg-blue-50/60 cursor-pointer shadow-xs'
                      : 'border-slate-200 bg-slate-50/50 opacity-70 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center space-x-3.5 truncate">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold flex-shrink-0 ${
                      isCpd ? 'bg-blue-800 text-white' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {unit.code.split('-')[0]}
                    </div>
                    <div className="truncate">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                          {unit.name}
                        </span>
                        {isCpd && (
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 uppercase">
                            Pilot Modül
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {unit.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0 pl-3">
                    {isCpd ? (
                      <span className="inline-flex items-center text-xs font-bold text-blue-700 group">
                        <span>Görüntüle</span>
                        <ChevronRight className="w-4 h-4 ml-0.5" />
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-lg">
                        Planlama
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right (1 col): Recent Activities & Pinned Documents */}
        <div className="space-y-6">

          {/* Latest CPD Activities */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                Son CPD Faaliyetleri
              </h4>
              <button
                onClick={() => setActiveTab('cpd')}
                className="text-xs text-blue-700 hover:underline font-bold"
              >
                Tümü
              </button>
            </div>

            <div className="space-y-3">
              {recentActivities.map((act) => (
                <div key={act.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-blue-800 bg-blue-100/70 px-2 py-0.2 rounded-full">
                      {act.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {act.date.split(',')[0]}
                    </span>
                  </div>
                  <h5 className="font-bold text-xs text-slate-800 line-clamp-1">
                    {act.title}
                  </h5>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {act.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Pinned Drive Documents */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                Önemli Drive Evrakları
              </h4>
              <button
                onClick={() => setActiveTab('documents')}
                className="text-xs text-blue-700 hover:underline font-bold"
              >
                Depo
              </button>
            </div>

            <div className="space-y-2">
              {pinnedDocs.map((doc) => (
                <a
                  key={doc.id}
                  href={doc.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-slate-200 hover:border-blue-400 bg-white flex items-center justify-between transition group"
                >
                  <div className="flex items-center space-x-2 truncate">
                    <FileText className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-700 truncate">
                      {doc.title}
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-700 flex-shrink-0 ml-2" />
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
