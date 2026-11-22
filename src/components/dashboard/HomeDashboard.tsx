import React from 'react';
import { ACADEMIC_UNITS, CPD_ACTIVITIES, CPD_DRIVE_DOCUMENTS } from '../../data/mockData';
import { USEFUL_LINKS } from '../../data/schoolData';
import { 
  GraduationCap, 
  HardDrive, 
  Calendar, 
  Calculator, 
  FileText, 
  Clock,
  ExternalLink, 
  ChevronRight,
  Globe
} from 'lucide-react';

interface HomeDashboardProps {
  setActiveTab: (tab: string) => void;
  setSelectedTool: (tool: string) => void;
  onOpenAuth: () => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  setActiveTab,
  setSelectedTool,
}) => {
  const recentActivities = CPD_ACTIVITIES.slice(0, 3);
  const pinnedDocs = CPD_DRIVE_DOCUMENTS.filter(d => d.isPinned).slice(0, 3);

  return (
    <div className="space-y-6">

      {/* Fast Shortcuts: 4 Pillars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Shortcut 1 - CPD */}
        <div 
          onClick={() => setActiveTab('cpd')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-400 hover:shadow-md transition cursor-pointer space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center font-bold group-hover:scale-105 transition">
            <GraduationCap className="w-5 h-5 text-blue-700" />
          </div>
          <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition">
            CPD Birimi Faaliyetleri
          </h4>
          <p className="text-xs text-slate-500 leading-snug">
            Sürekli mesleki gelişim çalıştayları, eğitim özetleri ve katılım belgeleri.
          </p>
        </div>

        {/* Shortcut 2 - Drive */}
        <div 
          onClick={() => setActiveTab('documents')}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-amber-400 hover:shadow-md transition cursor-pointer space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center font-bold group-hover:scale-105 transition">
            <HardDrive className="w-5 h-5 text-amber-700" />
          </div>
          <h4 className="font-bold text-sm text-slate-900 group-hover:text-amber-700 transition">
            Ortak Google Drive Arşivi
          </h4>
          <p className="text-xs text-slate-500 leading-snug">
            Birimlerin hiyerarşik resmi evrakları, yönergeler ve sunum dosyaları.
          </p>
        </div>

        {/* Shortcut 3 - Ders Programı */}
        <div 
          onClick={() => { setActiveTab('tools'); setSelectedTool('schedule'); }}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-teal-400 hover:shadow-md transition cursor-pointer space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-800 flex items-center justify-center font-bold group-hover:scale-105 transition">
            <Clock className="w-5 h-5 text-teal-700" />
          </div>
          <h4 className="font-bold text-sm text-slate-900 group-hover:text-teal-700 transition">
            Ders Programı Sorgu
          </h4>
          <p className="text-xs text-slate-500 leading-snug">
            Hoca, şube ve derslik bazlı anlık canlı ders saatleri ve durum sorgusu.
          </p>
        </div>

        {/* Shortcut 4 - Not Hesaplayıcı */}
        <div 
          onClick={() => { setActiveTab('tools'); setSelectedTool('grade'); }}
          className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-400 hover:shadow-md transition cursor-pointer space-y-2 group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center font-bold group-hover:scale-105 transition">
            <Calculator className="w-5 h-5 text-emerald-700" />
          </div>
          <h4 className="font-bold text-sm text-slate-900 group-hover:text-emerald-700 transition">
            Harf Notu & Çan Hesaplama
          </h4>
          <p className="text-xs text-slate-500 leading-snug">
            Vize-final yüzdelerine göre ADÜ bağıl harf notu ve katsayı hesabı.
          </p>
        </div>

      </div>

      {/* Two Column Layout: Academic Units & Recent Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left (2 cols): 5 Academic Units */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-base text-slate-900">Yüksekokulumuz Akademik Birimleri</h3>
              <p className="text-xs text-slate-500">Birimlerimizin faaliyetleri, komisyon kararları ve Drive arşivleri.</p>
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
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                Son Faaliyetler
              </h4>
              <button
                onClick={() => setActiveTab('cpd')}
                className="text-xs text-blue-700 hover:underline font-bold cursor-pointer"
              >
                Tümü
              </button>
            </div>

            <div className="space-y-3">
              {recentActivities.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400 space-y-1">
                  <Calendar className="w-6 h-6 mx-auto text-slate-300" />
                  <p>Henüz kayıtlı faaliyet bulunmuyor.</p>
                </div>
              ) : (
                recentActivities.map((act) => (
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
                ))
              )}
            </div>
          </div>

          {/* Pinned Drive Documents */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
                Önemli Drive Evrakları
              </h4>
              <button
                onClick={() => setActiveTab('documents')}
                className="text-xs text-blue-700 hover:underline font-bold cursor-pointer"
              >
                Depo
              </button>
            </div>

            <div className="space-y-2">
              {pinnedDocs.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400 space-y-1">
                  <FileText className="w-6 h-6 mx-auto text-slate-300" />
                  <p>Henüz sabitlenmiş evrak bulunmuyor.</p>
                </div>
              ) : (
                pinnedDocs.map((doc) => (
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
                ))
              )}
            </div>
          </div>

          {/* Sık Kullanılan Hızlı Portallar */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-blue-700" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-700">
                  Hızlı Portallar & Linkler
                </h4>
              </div>
              <button
                onClick={() => { setActiveTab('tools'); setSelectedTool('links'); }}
                className="text-xs text-blue-700 hover:underline font-bold cursor-pointer"
              >
                Tümü ({USEFUL_LINKS.length})
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {USEFUL_LINKS.slice(0, 6).map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 transition group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold text-blue-800 bg-blue-100/70 px-1.5 py-0.2 rounded">
                      {item.title.split(' - ')[0]}
                    </span>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-700" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-800 group-hover:text-blue-700 truncate">
                    {item.title.split(' - ')[1] || item.title}
                  </span>
                </a>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
