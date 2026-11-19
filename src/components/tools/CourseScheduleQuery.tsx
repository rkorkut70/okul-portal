import React, { useState, useEffect, useMemo } from 'react';
import {
  SCHEDULE_RECORDS,
  INSTRUCTORS,
  SCHEDULE_DAYS,
  SCHEDULE_LANGUAGES,
  START_HOURS,
  END_HOURS,
  type ScheduleRecord,
} from '../../data/scheduleData';
import {
  CalendarDays,
  Search,
  User,
  Users,
  MapPin,
  Clock,
  ChevronDown,
  BookOpen,
  Filter,
  X
} from 'lucide-react';

const normalize = (s: string) =>
  String(s)
    .toLocaleLowerCase('tr')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ı/g, 'i');

const mins = (t: string) => +t.slice(0, 2) * 60 + +t.slice(3);

const extractRoom = (b: ScheduleRecord) => (/^D\d+$|SALON/i.test(b[7]) ? b[7] : '');

const getKey = (b: ScheduleRecord, mode: number) => {
  if (mode === 0) return b[1]; // Hoca
  if (mode === 1) return b[5]; // Şube
  return extractRoom(b);       // Derslik
};

const getDisplayText = (b: ScheduleRecord, mode: number) => {
  if (mode === 0) return [b[5], b[6], b[7]].filter(Boolean).join(' · ');
  if (mode === 1) return [b[1], b[6], b[7]].filter(Boolean).join(' · ');
  return [b[1], b[5], b[6]].filter(Boolean).join(' · ');
};

const getTimeSpan = (b: ScheduleRecord) =>
  `${START_HOURS[b[3] - 1]} – ${END_HOURS[b[4] - 1]}`;

interface GroupData {
  langIndex: number;
  records: ScheduleRecord[];
}

export const CourseScheduleQuery: React.FC = () => {
  const [mode, setMode] = useState<number>(0); // 0: Hoca, 1: Şube, 2: Derslik
  const [langFilter, setLangFilter] = useState<number>(-1); // -1: Tüm diller
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [currentTime, setCurrentTime] = useState<{ g: number; m: number }>(() => {
    const d = new Date();
    return { g: d.getDay() - 1, m: d.getHours() * 60 + d.getMinutes() };
  });

  // Update clock every minute
  useEffect(() => {
    const update = () => {
      const d = new Date();
      setCurrentTime({ g: d.getDay() - 1, m: d.getHours() * 60 + d.getMinutes() });
    };
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  const placeholders = [
    'Hoca adı yazın (Örn: Rıdvan Korkut, Beyhan Sezer...)',
    'Şube kodu yazın (Örn: İHS 107, AHS 101, FHS 103...)',
    'Derslik adı yazın (Örn: D12, D6, D18, SEMİNER SALONU...)'
  ];

  // Helper to determine whether a class is occurring right now
  const isClassOngoing = (b: ScheduleRecord) =>
    b[2] === currentTime.g &&
    mins(START_HOURS[b[3] - 1]) <= currentTime.m &&
    currentTime.m <= mins(END_HOURS[b[4] - 1]);

  // Compute status for a group
  const getGroupStatus = (records: ScheduleRecord[]) => {
    const ongoing = records.find(isClassOngoing);
    if (ongoing) {
      return {
        label: `Şu an Derste: ${getDisplayText(ongoing, mode)}`,
        sub: `Bitiş: ${END_HOURS[ongoing[4] - 1]}`,
        isOngoing: true,
        currentRecord: ongoing,
      };
    }

    const next = records
      .filter((b) => b[2] > currentTime.g || (b[2] === currentTime.g && mins(START_HOURS[b[3] - 1]) > currentTime.m))
      .sort((a, b) => a[2] - b[2] || a[3] - b[3])[0];

    if (next) {
      const dayLabel = next[2] === currentTime.g ? 'Bugün' : SCHEDULE_DAYS[next[2]];
      return {
        label: `Şu an Boş · Sıradaki: ${dayLabel} ${START_HOURS[next[3] - 1]}`,
        sub: getDisplayText(next, mode),
        isOngoing: false,
        currentRecord: null,
      };
    }

    return {
      label: 'Şu an boş (Bu hafta kalan ders yok)',
      sub: '',
      isOngoing: false,
      currentRecord: null,
    };
  };

  // Group and filter records
  const groupedData = useMemo(() => {
    const groups: Record<string, GroupData> = {};

    // In instructor mode, populate all registered names even if no class assigned
    if (mode === 0) {
      INSTRUCTORS.forEach(([d, name]) => {
        if (langFilter < 0 || langFilter === d) {
          groups[name] = { langIndex: d, records: [] };
        }
      });
    }

    SCHEDULE_RECORDS.forEach((b) => {
      if (langFilter >= 0 && b[0] !== langFilter) return;
      const k = getKey(b, mode);
      if (!k) return;
      if (!groups[k]) {
        groups[k] = { langIndex: b[0], records: [] };
      }
      groups[k].records.push(b);
    });

    const words = normalize(searchQuery.trim()).split(/\s+/).filter(Boolean);

    const keys = Object.keys(groups)
      .filter((k) => words.every((w) => normalize(k).includes(w)))
      .sort((a, b) => a.localeCompare(b, 'tr'));

    return { groups, keys };
  }, [mode, langFilter, searchQuery]);

  // Keep groups open if few results
  useEffect(() => {
    if (groupedData.keys.length <= 3) {
      const allOpen: Record<string, boolean> = {};
      groupedData.keys.forEach((k) => { allOpen[k] = true; });
      setOpenItems(allOpen);
    }
  }, [groupedData.keys]);

  const toggleGroup = (keyName: string) => {
    setOpenItems((prev) => ({ ...prev, [keyName]: !prev[keyName] }));
  };

  const isWeekend = currentTime.g < 0 || currentTime.g > 4;
  const currentDayName = isWeekend ? 'Hafta Sonu' : `Bugün ${SCHEDULE_DAYS[currentTime.g]}`;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-800 flex items-center justify-center font-bold border border-teal-500/20">
            <CalendarDays className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Ders Programı Sorgulama
              </h2>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-teal-50 text-teal-700 border border-teal-200">
                2026-27 Güz
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Hoca, şube veya derslik bazlı anlık ders saatleri ve durum sorgusu.
            </p>
          </div>
        </div>

        {/* Live Clock Badge */}
        <div className="flex items-center space-x-2 px-3.5 py-2 rounded-2xl bg-slate-50 border border-slate-200 text-slate-700 text-xs font-medium self-start md:self-auto">
          <Clock className="w-4 h-4 text-teal-600 animate-pulse" />
          <span>{currentDayName}</span>
          <span className="text-slate-300">|</span>
          <span className="font-semibold text-slate-900">
            {new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Control Panel: Mode Selector, Language Chips & Search */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        {/* Mode Selector Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center p-1 bg-slate-100 rounded-2xl">
            <button
              onClick={() => { setMode(0); setSearchQuery(''); }}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                mode === 0
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <User className="w-3.5 h-3.5 text-teal-600" />
              <span>Hoca Bazlı</span>
            </button>

            <button
              onClick={() => { setMode(1); setSearchQuery(''); }}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                mode === 1
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-indigo-600" />
              <span>Şube Bazlı</span>
            </button>

            <button
              onClick={() => { setMode(2); setSearchQuery(''); }}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                mode === 2
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-rose-600" />
              <span>Derslik Bazlı</span>
            </button>
          </div>

          {/* Language filter pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <div className="flex items-center text-xs text-slate-400 mr-1">
              <Filter className="w-3 h-3 mr-1" />
              <span>Dil:</span>
            </div>
            <button
              onClick={() => setLangFilter(-1)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                langFilter === -1
                  ? 'bg-teal-600 text-white font-semibold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tümü
            </button>
            {SCHEDULE_LANGUAGES.map((lang, idx) => (
              <button
                key={lang}
                onClick={() => setLangFilter(idx)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  langFilter === idx
                    ? 'bg-teal-600 text-white font-semibold'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Search Input Box */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholders[mode]}
            className="w-full pl-10 pr-10 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:bg-white transition"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick summary line */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 px-1">
          <span>Toplam <strong>{groupedData.keys.length}</strong> kayıt listeleniyor</span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-teal-600 hover:underline cursor-pointer font-medium"
            >
              Aramayı Temizle
            </button>
          )}
        </div>
      </div>

      {/* Results List */}
      <div className="space-y-3">
        {groupedData.keys.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">Sonuç Bulunamadı</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Arama kriterlerinize uygun ders veya hoca kaydı bulunamadı. Lütfen farklı bir arama terimi deneyin.
            </p>
          </div>
        ) : (
          groupedData.keys.map((keyName) => {
            const group = groupedData.groups[keyName];
            const sortedRecords = [...group.records].sort(
              (a, b) => a[2] - b[2] || a[3] - b[3]
            );
            const status = getGroupStatus(sortedRecords);
            const isOpen = openItems[keyName] ?? false;

            return (
              <div
                key={keyName}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition hover:border-slate-300"
              >
                {/* Header Summary Bar (Clickable) */}
                <div
                  onClick={() => toggleGroup(keyName)}
                  className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3 cursor-pointer select-none hover:bg-slate-50/60 transition"
                >
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-bold text-slate-900 text-sm sm:text-base">
                        {keyName}
                      </span>
                      {mode === 0 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                          {SCHEDULE_LANGUAGES[group.langIndex]}
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-teal-50 text-teal-700">
                        {sortedRecords.length} Ders Bloğu
                      </span>
                    </div>

                    {/* Status row */}
                    <div className="flex items-center space-x-1.5 text-xs">
                      {status.isOngoing ? (
                        <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping mr-1"></span>
                          <span>{status.label}</span>
                          <span className="text-emerald-600/80 font-normal">({status.sub})</span>
                        </span>
                      ) : (
                        <span className="text-slate-500">
                          {status.label}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 pt-1 sm:pt-0">
                    <span className="text-xs text-slate-400 hidden sm:inline">
                      {isOpen ? 'Kapat' : 'Detaylar'}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center transition-transform ${
                        isOpen ? 'rotate-180 bg-teal-50 text-teal-700' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-2 border-t border-slate-100 bg-slate-50/40">
                    {sortedRecords.length === 0 ? (
                      <div className="py-4 text-center text-xs text-slate-400">
                        Bu dönem atanmış ders programı görünmüyor.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Group records by day */}
                        {SCHEDULE_DAYS.map((dayName, dayIdx) => {
                          const dayRecords = sortedRecords.filter((r) => r[2] === dayIdx);
                          if (dayRecords.length === 0) return null;
                          const isToday = dayIdx === currentTime.g;

                          return (
                            <div key={dayName} className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <span
                                  className={`text-xs font-bold uppercase tracking-wider ${
                                    isToday ? 'text-teal-700' : 'text-slate-400'
                                  }`}
                                >
                                  {dayName}
                                </span>
                                {isToday && (
                                  <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-teal-100 text-teal-800">
                                    BUGÜN
                                  </span>
                                )}
                              </div>

                              <div className="grid gap-2 sm:grid-cols-2">
                                {dayRecords.map((record, rIdx) => {
                                  const isOngoing = isClassOngoing(record);
                                  return (
                                    <div
                                      key={rIdx}
                                      className={`p-3 rounded-xl border transition flex items-center justify-between ${
                                        isOngoing
                                          ? 'bg-emerald-50/80 border-emerald-300 ring-1 ring-emerald-400 shadow-xs'
                                          : isToday
                                          ? 'bg-teal-50/40 border-teal-200'
                                          : 'bg-white border-slate-200/80'
                                      }`}
                                    >
                                      <div className="space-y-0.5">
                                        <div className="flex items-center space-x-2">
                                          <span className="font-bold text-xs text-slate-900">
                                            {getTimeSpan(record)}
                                          </span>
                                          {isOngoing && (
                                            <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-emerald-600 text-white">
                                              CANLI
                                            </span>
                                          )}
                                        </div>
                                        <div className="text-xs text-slate-600 font-medium">
                                          {getDisplayText(record, mode)}
                                        </div>
                                      </div>

                                      {/* Room pill */}
                                      {record[7] && (
                                        <div className="text-right">
                                          <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold text-[11px] border border-slate-200">
                                            {record[7]}
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
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
