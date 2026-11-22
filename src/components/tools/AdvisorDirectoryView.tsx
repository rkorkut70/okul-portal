import React, { useState, useMemo } from 'react';
import { ACADEMIC_STAFF, BRANCH_ADVISORS, MANAGEMENT_BOARD, SCHOOL_BOARD, UNIT_DUTIES } from '../../data/schoolData';
import { 
  Users, 
  Search, 
  UserCheck, 
  Building, 
  ShieldCheck,
  Mail,
  ExternalLink,
  GraduationCap,
  MapPin,
  Building2,
  FileText,
  Info,
  Layers
} from 'lucide-react';

export const AdvisorDirectoryView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'staff' | 'advisors' | 'duties' | 'boards'>('staff');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('all');
  const [filterDuty, setFilterDuty] = useState<'all' | 'ydyo' | 'external'>('all');

  // Filter Academic Staff
  const filteredStaff = useMemo(() => {
    return ACADEMIC_STAFF.filter(item => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        item.name.toLowerCase().includes(q) ||
        item.title.toLowerCase().includes(q) ||
        item.dutyPlace.toLowerCase().includes(q) ||
        (item.email && item.email.toLowerCase().includes(q));

      const matchesLang = 
        selectedLanguage === 'all' || item.language === selectedLanguage;

      const isExternal = !item.dutyPlace.includes('YDYO') && item.dutyPlace !== 'Yabancı Diller Yüksekokulu';
      
      const matchesDuty = 
        filterDuty === 'all' || 
        (filterDuty === 'external' && isExternal) ||
        (filterDuty === 'ydyo' && !isExternal);

      return matchesSearch && matchesLang && matchesDuty;
    });
  }, [searchQuery, selectedLanguage, filterDuty]);

  // Filter Advisors
  const filteredAdvisors = useMemo(() => {
    return BRANCH_ADVISORS.filter(item => {
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        item.branch.toLowerCase().includes(q) ||
        item.advisor.toLowerCase().includes(q) ||
        item.obisCode.toLowerCase().includes(q) ||
        item.track.toLowerCase().includes(q);

      const matchesLang = 
        selectedLanguage === 'all' || item.language === selectedLanguage;

      return matchesSearch && matchesLang;
    });
  }, [searchQuery, selectedLanguage]);

  const externalCount = useMemo(() => {
    return ACADEMIC_STAFF.filter(s => !s.dutyPlace.includes('YDYO') && s.dutyPlace !== 'Yabancı Diller Yüksekokulu').length;
  }, []);

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-blue-800/80 text-[11px] font-bold text-blue-200 border border-blue-700/50">
              <Users className="w-3.5 h-3.5 text-blue-300" />
              <span>Akademik Personel ve Rehber</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Akademik Kadro, Danışmanlık ve Kurullar
            </h2>
            <p className="text-xs text-blue-200/80 max-w-xl leading-relaxed">
              Yabancı Diller Yüksekokulu öğretim elemanları, dış birim görevlendirmeleri, birim görev tanımları ve resmi kurullar.
            </p>
          </div>

          {/* Subtabs */}
          <div className="flex items-center p-1 bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 overflow-x-auto">
            <button
              onClick={() => setActiveSubTab('staff')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeSubTab === 'staff'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Akademik Kadro ({ACADEMIC_STAFF.length})
            </button>
            <button
              onClick={() => setActiveSubTab('advisors')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeSubTab === 'advisors'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Danışmanlar ({BRANCH_ADVISORS.length})
            </button>
            <button
              onClick={() => setActiveSubTab('duties')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeSubTab === 'duties'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Birim Görev Tanımları
            </button>
            <button
              onClick={() => setActiveSubTab('boards')}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                activeSubTab === 'boards'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              Kurullar
            </button>
          </div>
        </div>
      </div>

      {/* Subtab 1: Akademik Kadro */}
      {activeSubTab === 'staff' && (
        <div className="space-y-4">
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Öğretim elemanı, e-posta veya görev yeri..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
              <div className="flex items-center p-0.5 bg-slate-100 rounded-xl">
                <button
                  onClick={() => setFilterDuty('all')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                    filterDuty === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Tümü
                </button>
                <button
                  onClick={() => setFilterDuty('ydyo')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                    filterDuty === 'ydyo' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                  }`}
                >
                  YDYO Kadrosu
                </button>
                <button
                  onClick={() => setFilterDuty('external')}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                    filterDuty === 'external' ? 'bg-amber-400 text-slate-950 font-bold shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Dış Görevliler ({externalCount})
                </button>
              </div>

              <div className="flex items-center p-0.5 bg-slate-100 rounded-xl">
                {['all', 'İngilizce', 'Fransızca', 'Almanca'].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                      selectedLanguage === lang
                        ? 'bg-blue-900 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {lang === 'all' ? 'Tüm Diller' : lang}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStaff.map((staff) => {
              const isExternal = !staff.dutyPlace.includes('YDYO') && staff.dutyPlace !== 'Yabancı Diller Yüksekokulu';

              return (
                <div
                  key={staff.id}
                  className={`bg-white p-5 rounded-2xl border shadow-xs hover:shadow-md transition flex flex-col justify-between space-y-4 ${
                    isExternal ? 'border-amber-200/90 hover:border-amber-400' : 'border-slate-200/80 hover:border-blue-400'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                          {staff.title}
                        </span>
                        <h3 className="font-extrabold text-sm sm:text-base text-slate-900 mt-0.5">
                          {staff.name}
                        </h3>
                      </div>

                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        {staff.role && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                            {staff.role}
                          </span>
                        )}
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          staff.language === 'İngilizce' 
                            ? 'bg-blue-100 text-blue-800'
                            : staff.language === 'Fransızca'
                            ? 'bg-indigo-100 text-indigo-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {staff.language}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <div className="flex items-center space-x-1.5 text-xs">
                        {isExternal ? (
                          <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                        ) : (
                          <Building2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        )}
                        <span className="text-slate-400 font-medium">Görev Yeri:</span>
                        <span className={`font-semibold truncate ${
                          isExternal ? 'text-amber-800 bg-amber-50 px-1.5 py-0.2 rounded' : 'text-slate-800'
                        }`}>
                          {staff.dutyPlace}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    {staff.email ? (
                      <a
                        href={`mailto:${staff.email}`}
                        className="inline-flex items-center space-x-1.5 text-blue-700 hover:text-blue-900 font-semibold truncate max-w-[200px]"
                        title={staff.email}
                      >
                        <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                        <span className="truncate">{staff.email}</span>
                      </a>
                    ) : (
                      <span className="text-slate-400 text-[11px] italic">E-posta belirtilmemiş</span>
                    )}

                    {staff.akbisUrl && (
                      <a
                        href={staff.akbisUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-[11px] font-bold text-slate-500 hover:text-blue-700 bg-slate-50 hover:bg-blue-50 px-2 py-1 rounded-lg border border-slate-200 transition"
                      >
                        <span>AKBİS</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filteredStaff.length === 0 && (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-slate-400 space-y-2">
              <GraduationCap className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-sm font-semibold">Aranan kritere uygun öğretim elemanı bulunamadı.</p>
            </div>
          )}
        </div>
      )}

      {/* Subtab 2: Şube Danışmanları */}
      {activeSubTab === 'advisors' && (
        <div className="space-y-4">
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
      )}

      {/* Subtab 3: Birim Görev Tanımları (Kalite El Kitabı Özeti) */}
      {activeSubTab === 'duties' && (
        <div className="space-y-6">
          {/* Official Disclaimer Banner */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 flex items-start space-x-3 text-blue-900">
            <Info className="w-5 h-5 text-blue-700 flex-shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <h4 className="font-bold text-xs">Resmi Görev Tanımları Bilgi Notu</h4>
              <p className="text-xs text-blue-800/90 leading-relaxed">
                Aşağıdaki görev ve sorumluluklar <strong>YDYO Kalite El Kitabı</strong> esas alınarak özetlenmiştir. 
                Süreçlerin eksiksiz işleyişi, yönergeler ve detaylı görev tanımları için lütfen <strong>YDYO Kalite El Kitabı</strong> dokümanına başvurunuz.
              </p>
            </div>
          </div>

          {/* Unit Duties Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {UNIT_DUTIES.map((duty) => (
              <div 
                key={duty.code}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4 hover:border-blue-300 transition"
              >
                <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 font-mono">
                      {duty.code}
                    </span>
                    <h3 className="font-extrabold text-base text-slate-900">
                      {duty.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Birim Sorumlusu: <strong className="text-slate-800">{duty.head}</strong>
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                    <Layers className="w-5 h-5 text-blue-700" />
                  </div>
                </div>

                {/* Misyon & Vizyon */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
                  <div className="space-y-1">
                    <span className="font-bold text-slate-700 block uppercase tracking-wider text-[10px]">
                      Misyon
                    </span>
                    <p className="text-slate-600 leading-snug">
                      {duty.mission}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-slate-700 block uppercase tracking-wider text-[10px]">
                      Vizyon
                    </span>
                    <p className="text-slate-600 leading-snug">
                      {duty.vision}
                    </p>
                  </div>
                </div>

                {/* Özet Görevler */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Özet Görev ve Sorumluluklar:
                  </h4>
                  <div className="text-xs text-slate-600 whitespace-pre-line leading-relaxed bg-white p-3 rounded-xl border border-slate-100 font-sans">
                    {duty.summary}
                  </div>
                </div>

                {/* Footer Note */}
                <div className="pt-2 border-t border-slate-100 flex items-center space-x-1.5 text-[11px] text-amber-800 font-medium">
                  <FileText className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                  <span>{duty.note}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 4: Kurullar */}
      {activeSubTab === 'boards' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Yönetim Kurulu */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-blue-700" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Yüksekokul Yönetim Kurulu</h3>
                  <p className="text-xs text-slate-500">yönetim.docx Tablo 25 Esas Alınmıştır ({MANAGEMENT_BOARD.length} Üye)</p>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              {MANAGEMENT_BOARD.map((member) => (
                <div key={member.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{member.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {member.role} {member.startDate ? `• Başlama: ${member.startDate}` : ''}
                    </p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                    member.role === 'Müdür'
                      ? 'bg-amber-100 text-amber-900 border border-amber-200'
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
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center">
                  <Building className="w-5 h-5 text-indigo-700" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900">Yüksekokul Kurulu</h3>
                  <p className="text-xs text-slate-500">yönetim.docx Tablo 24 Esas Alınmıştır ({SCHOOL_BOARD.length} Üye)</p>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              {SCHOOL_BOARD.map((member) => (
                <div key={member.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-xs text-slate-900">{member.name}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {member.role} {member.startDate ? `• Başlama: ${member.startDate}` : ''}
                    </p>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${
                    member.role === 'Müdür'
                      ? 'bg-amber-100 text-amber-900 border border-amber-200'
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
