import React, { useState, useMemo } from 'react';
import type { ActivityItem } from '../../types';
import { useAuth } from '../../context/AuthContext';
import {
  Calendar,
  Users,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Clock,
  Plus,
  Search,
  Sparkles,
  FileText,
  Building2,
  Globe,
  UserCheck,
  ChevronDown,
  GraduationCap
} from 'lucide-react';

interface ActivityTimelineProps {
  activities: ActivityItem[];
  onOpenAddModal: () => void;
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities, onOpenAddModal }) => {
  const { user } = useAuth();
  const isCpdManager = user?.role === 'cpd_manager' || user?.role === 'admin';

  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [scopeFilter, setScopeFilter] = useState<'all' | 'Kurum İçi' | 'Kurum Dışı'>('all');
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [openYears, setOpenYears] = useState<Record<string, boolean>>({});

  // Dynamic academic years sorted descending (e.g. 2026-2027, 2025-2026, ...)
  const academicYears = useMemo(() => {
    const years = Array.from(new Set(activities.map(a => a.academicYear || '2026-2027')));
    return years.sort((a, b) => b.localeCompare(a));
  }, [activities]);

  // Dynamic categories list
  const categories = useMemo(() => {
    const cats = Array.from(new Set(activities.map(a => a.category).filter(Boolean)));
    return ['all', ...cats];
  }, [activities]);

  // Calculate statistics
  const totalCompleted = activities.filter(a => a.status === 'completed').length;
  const totalUpcoming = activities.filter(a => a.status === 'upcoming').length;
  const totalParticipants = activities.reduce((acc, a) => acc + (a.participantCount || 0), 0);
  const externalCount = activities.filter(a => a.scope === 'Kurum Dışı').length;

  // İsimleri kayıtlı olan etkinliklerden tekil (farklı) öğretim elemanı sayısını hesapla
  const uniqueParticipantsCount = useMemo(() => {
    const nameSet = new Set<string>();
    activities.forEach(act => {
      if (!act.participants) return;
      const raw = act.participants;
      if (/tüm akademik|tüm öğretim|müdür yardımcıları|ev sahipliği/i.test(raw)) {
        return;
      }
      raw.split(',').forEach(part => {
        const clean = part
          .replace(/Öğr\.\s*Gör\.\s*(Dr\.\s*)?/gi, '')
          .replace(/Prof\.\s*Dr\.\s*/gi, '')
          .replace(/Dr\.\s*/gi, '')
          .trim()
          .toLocaleLowerCase('tr')
          .replace(/^m\.\s+/, '');
        if (clean && clean.length > 3) {
          nameSet.add(clean);
        }
      });
    });
    return nameSet.size;
  }, [activities]);

  // Filter and sort:
  // Order: 1. Durum (Planlandı / Tamamlandı), 2. Etkinlik Tarihi (Yeni -> Eski), 3. Kategori, 4. Etkinlik Yeri
  const filteredActivities = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    return activities
      .filter((act) => {
        const matchesYear = yearFilter === 'all' || (act.academicYear || '2026-2027') === yearFilter;
        const matchesStatus = statusFilter === 'all' || act.status === statusFilter;
        const matchesScope = scopeFilter === 'all' || (act.scope || 'Kurum İçi') === scopeFilter;
        const matchesCategory = categoryFilter === 'all' || act.category === categoryFilter;
        const matchesSearch =
          !q ||
          act.title.toLowerCase().includes(q) ||
          act.summary.toLowerCase().includes(q) ||
          (act.trainers && act.trainers.toLowerCase().includes(q)) ||
          (act.participants && act.participants.toLowerCase().includes(q)) ||
          (act.location && act.location.toLowerCase().includes(q)) ||
          act.targetAudience.toLowerCase().includes(q);

        return matchesYear && matchesStatus && matchesScope && matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        // 1. Durum (upcoming first, then completed)
        if (a.status !== b.status) {
          return a.status === 'upcoming' ? -1 : 1;
        }
        // 2. Etkinlik tarihi (descending by sortDate)
        const dateA = a.sortDate || '';
        const dateB = b.sortDate || '';
        if (dateA !== dateB) {
          return dateB.localeCompare(dateA);
        }
        // 3. Kategori
        if (a.category !== b.category) {
          return a.category.localeCompare(b.category, 'tr');
        }
        // 4. Etkinlik yeri (Kurum İçi / Kurum Dışı)
        return (a.scope || 'Kurum İçi').localeCompare(b.scope || 'Kurum İçi', 'tr');
      });
  }, [activities, yearFilter, statusFilter, scopeFilter, categoryFilter, searchTerm]);

  // Group filtered activities by academic year
  const groupedByYear = useMemo(() => {
    const groups: Record<string, ActivityItem[]> = {};
    filteredActivities.forEach(act => {
      const y = act.academicYear || '2026-2027';
      if (!groups[y]) groups[y] = [];
      groups[y].push(act);
    });
    return Object.keys(groups)
      .sort((a, b) => b.localeCompare(a))
      .map(year => ({
        year,
        items: groups[year],
        completedCount: groups[year].filter(i => i.status === 'completed').length,
        upcomingCount: groups[year].filter(i => i.status === 'upcoming').length,
        participantSum: groups[year].reduce((acc, i) => acc + (i.participantCount || 0), 0),
      }));
  }, [filteredActivities]);

  const toggleYear = (year: string) => {
    setOpenYears(prev => ({ ...prev, [year]: !prev[year] }));
  };

  return (
    <div className="space-y-6">

      {/* Metric Cards Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold flex-shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-extrabold text-slate-900">{totalCompleted}</div>
            <div className="text-[11px] text-slate-500 font-medium">Tamamlanan Faaliyet</div>
          </div>
        </div>

        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold flex-shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg sm:text-xl font-extrabold text-slate-900">{totalUpcoming}</div>
            <div className="text-[11px] text-slate-500 font-medium">Planlanan Etkinlik</div>
          </div>
        </div>

        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold flex-shrink-0">
            <Users className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-lg sm:text-xl font-extrabold text-slate-900">{totalParticipants}</div>
            <div className="text-[11px] text-slate-600 font-semibold">Toplam Katılım</div>
            <div className="text-[10px] text-slate-400 truncate">Tekrarlı katılımlar dâhil</div>
          </div>
        </div>

        <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold flex-shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div className="text-lg sm:text-xl font-extrabold text-slate-900">{externalCount}</div>
            <div className="text-[11px] text-slate-600 font-semibold">Kurum Dışı Etkinlik</div>
            <div className="text-[10px] text-purple-700 font-semibold truncate">{uniqueParticipantsCount} farklı hoca</div>
          </div>
        </div>
      </div>

      {/* Toolbar & Filter Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          
          {/* Status Tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl text-xs font-semibold overflow-x-auto no-scrollbar">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition whitespace-nowrap cursor-pointer active:scale-95 ${
                statusFilter === 'all' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tümü ({activities.length})
            </button>
            <button
              onClick={() => setStatusFilter('upcoming')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5 whitespace-nowrap cursor-pointer active:scale-95 ${
                statusFilter === 'upcoming' ? 'bg-amber-500 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Planlandı</span>
              <span className="text-[10px] bg-black/10 px-1.5 py-0.2 rounded-full">{totalUpcoming}</span>
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5 whitespace-nowrap cursor-pointer active:scale-95 ${
                statusFilter === 'completed' ? 'bg-emerald-700 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Tamamlandı</span>
              <span className="text-[10px] bg-black/10 px-1.5 py-0.2 rounded-full">{totalCompleted}</span>
            </button>
          </div>

          {/* Scope (Kurum İçi / Kurum Dışı) & Year Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-semibold">
              {(['all', 'Kurum İçi', 'Kurum Dışı'] as const).map((sc) => (
                <button
                  key={sc}
                  onClick={() => setScopeFilter(sc)}
                  className={`px-2.5 py-1.5 rounded-lg transition whitespace-nowrap cursor-pointer active:scale-95 ${
                    scopeFilter === sc
                      ? 'bg-blue-900 text-white shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {sc === 'all' ? 'Tüm Yerler' : sc}
                </button>
              ))}
            </div>

            {isCpdManager ? (
              <button
                onClick={onOpenAddModal}
                className="inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-[#0f2942] hover:bg-blue-900 text-white text-xs font-bold shadow-md transition active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4 text-amber-300" />
                <span>Yeni Faaliyet Ekle</span>
              </button>
            ) : (
              <div className="text-[11px] text-slate-400 hidden xl:flex items-center space-x-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Veriler Excel arşivinden otomatik güncellenir.</span>
              </div>
            )}
          </div>
        </div>

        {/* Year Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 flex-shrink-0">
            Akademik Yıl:
          </span>
          <button
            onClick={() => setYearFilter('all')}
            className={`text-xs px-3 py-1 rounded-full transition whitespace-nowrap font-semibold cursor-pointer active:scale-95 ${
              yearFilter === 'all'
                ? 'bg-blue-800 text-white shadow-2xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Tüm Yıllar ({activities.length})
          </button>
          {academicYears.map((yr) => (
            <button
              key={yr}
              onClick={() => setYearFilter(yr)}
              className={`text-xs px-3 py-1 rounded-full transition whitespace-nowrap font-semibold cursor-pointer active:scale-95 ${
                yearFilter === yr
                  ? 'bg-blue-800 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {yr}
            </button>
          ))}
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-100">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Başlık, eğitmen, katılımcı ismi, yer veya özet ara..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`text-[11px] px-2.5 py-1.5 rounded-lg transition whitespace-nowrap font-medium cursor-pointer active:scale-95 ${
                  categoryFilter === cat
                    ? 'bg-slate-800 text-white font-bold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'Tüm Kategoriler' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grouped by Academic Year */}
      <div className="space-y-5">
        {groupedByYear.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2">
            <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
            <h4 className="font-semibold text-sm text-slate-700">Seçili kriterde kayıtlı faaliyet bulunamadı</h4>
            <p className="text-xs text-slate-400">Lütfen filtreleri sıfırlayın veya farklı bir arama yapın.</p>
          </div>
        ) : (
          groupedByYear.map(({ year, items, completedCount, upcomingCount, participantSum }) => {
            const isOpen = openYears[year] ?? (yearFilter !== 'all' || searchTerm.trim() !== '');
            const isCollapsed = !isOpen;

            return (
              <div key={year} className="space-y-3">
                {/* Year Group Header */}
                <button
                  onClick={() => toggleYear(year)}
                  className="w-full bg-gradient-to-r from-slate-900 to-blue-950 text-white px-4 sm:px-5 py-3.5 rounded-2xl shadow-sm flex items-center justify-between gap-3 cursor-pointer hover:from-slate-800 hover:to-blue-900 transition active:scale-[0.99]"
                >
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-left">
                    <span className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-black text-xs sm:text-sm">
                      {year}
                    </span>
                    <span className="font-bold text-xs sm:text-sm text-white">
                      Akademik Yılı Faaliyetleri ({items.length})
                    </span>
                    <div className="flex items-center gap-1.5 text-[10px]">
                      {upcomingCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30 font-semibold">
                          {upcomingCount} Planlandı
                        </span>
                      )}
                      {completedCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 font-semibold">
                          {completedCount} Tamamlandı
                        </span>
                      )}
                      {participantSum > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-white/10 text-blue-100 border border-white/15 font-semibold hidden sm:inline-block">
                          {participantSum} Katılım
                        </span>
                      )}
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-300 transition-transform flex-shrink-0 ${
                      isCollapsed ? '' : 'rotate-180'
                    }`}
                  />
                </button>

                {/* Activities in Year */}
                {!isCollapsed && (
                  <div className="space-y-3 pl-0 sm:pl-2">
                    {items.map((act) => {
                      const isUpcoming = act.status === 'upcoming';
                      const isExternal = act.scope === 'Kurum Dışı';

                      return (
                        <div
                          key={act.id}
                          className={`bg-white rounded-2xl border p-4 sm:p-5 shadow-xs transition hover:shadow-md ${
                            isUpcoming
                              ? 'border-amber-300/80 bg-gradient-to-r from-amber-50/30 to-white'
                              : isExternal
                              ? 'border-purple-200/80'
                              : 'border-slate-200'
                          }`}
                        >
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                            
                            {/* Left Column: Details */}
                            <div className="space-y-2.5 flex-1">
                              
                              {/* 1. Durum, 2. Etkinlik Yeri (Kurum İçi/Dışı), 3. Kategori, 4. Katılımcı Sayısı */}
                              <div className="flex items-center flex-wrap gap-1.5 sm:gap-2">
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                  isUpcoming
                                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                                    : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                }`}>
                                  {isUpcoming ? 'Planlandı' : 'Tamamlandı'}
                                </span>

                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center space-x-1 ${
                                  isExternal
                                    ? 'bg-purple-100 text-purple-900 border border-purple-200'
                                    : 'bg-sky-50 text-sky-800 border border-sky-200'
                                }`}>
                                  {isExternal ? (
                                    <Globe className="w-3 h-3 mr-1" />
                                  ) : (
                                    <Building2 className="w-3 h-3 mr-1" />
                                  )}
                                  <span>{act.scope || 'Kurum İçi'}</span>
                                </span>

                                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                                  {act.category}
                                </span>

                                {act.participantCount ? (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 inline-flex items-center">
                                    <Users className="w-3 h-3 text-slate-500 mr-1" />
                                    <span>{act.participantCount} Katılımcı</span>
                                  </span>
                                ) : null}
                              </div>

                              {/* Title */}
                              <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                                {act.title}
                              </h4>

                              {/* Metadata: Date, Location, Trainers */}
                              <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs text-slate-600">
                                <div className="flex items-center space-x-1.5 font-semibold text-slate-800">
                                  <Calendar className="w-3.5 h-3.5 text-blue-700 flex-shrink-0" />
                                  <span>{act.date}</span>
                                </div>
                                {act.location && (
                                  <div className="flex items-center space-x-1.5">
                                    <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                                    <span>{act.location}</span>
                                  </div>
                                )}
                                {act.trainers && (
                                  <div className="flex items-center space-x-1.5">
                                    <GraduationCap className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
                                    <span>Eğitmen: <strong className="text-slate-800">{act.trainers}</strong></span>
                                  </div>
                                )}
                              </div>

                              {/* Participant Names (Especially for External Events) */}
                              {act.participants && (
                                <div className={`text-xs px-3 py-2 rounded-xl border flex items-start space-x-2 ${
                                  isExternal
                                    ? 'bg-purple-50/70 border-purple-200/80 text-purple-950'
                                    : 'bg-slate-50 border-slate-200/70 text-slate-700'
                                }`}>
                                  <UserCheck className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${
                                    isExternal ? 'text-purple-700' : 'text-slate-500'
                                  }`} />
                                  <div>
                                    <span className="font-bold">Katılanlar: </span>
                                    <span>{act.participants}</span>
                                  </div>
                                </div>
                              )}

                              {/* Summary Paragraph */}
                              {act.summary && (
                                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                                  {act.summary}
                                </p>
                              )}
                            </div>

                            {/* Right Column: Attached Document Link */}
                            {act.driveDocUrl && (
                              <div className="md:w-64 flex-shrink-0 pt-2 md:pt-0">
                                <div className="bg-blue-50/80 p-3 rounded-xl border border-blue-100 space-y-2">
                                  <div className="text-[10px] font-bold text-blue-900 uppercase tracking-wider flex items-center space-x-1">
                                    <FileText className="w-3 h-3 text-blue-700" />
                                    <span>Etkinlik Belgeleri</span>
                                  </div>
                                  <p className="text-xs font-semibold text-slate-800 line-clamp-2 leading-tight">
                                    {act.driveDocTitle || 'Faaliyet Raporu & Belgeleri'}
                                  </p>
                                  <a
                                    href={act.driveDocUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 hover:underline pt-1"
                                  >
                                    <span>Ortak Drive'da Aç</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                              </div>
                            )}

                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
