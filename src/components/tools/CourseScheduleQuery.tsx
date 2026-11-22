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
  X,
  SunMedium,
  Sunset,
  Sparkles
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

const getTimeSpan = (b: ScheduleRecord) =>
  `${START_HOURS[b[3] - 1]} – ${END_HOURS[b[4] - 1]}`;

const getLessonCount = (b: ScheduleRecord) => b[4] - b[3] + 1;

// Ajan Piksel: Beceri & Ders Türü Renk Rozetleri
const getSkillInfo = (type: string) => {
  const code = type.trim();
  switch (code) {
    case 'MC':
      return {
        label: 'MC',
        full: 'Main Course (Temel Beceri)',
        bg: 'bg-blue-50 text-blue-800 border-blue-200 ring-1 ring-blue-500/20',
        dot: 'bg-blue-600',
      };
    case 'WR':
      return {
        label: 'WR',
        full: 'Writing (Yazma Becerisi)',
        bg: 'bg-amber-50 text-amber-900 border-amber-200 ring-1 ring-amber-500/20',
        dot: 'bg-amber-600',
      };
    case 'SP':
      return {
        label: 'SP',
        full: 'Speaking & Listening (Konuşma)',
        bg: 'bg-emerald-50 text-emerald-900 border-emerald-200 ring-1 ring-emerald-500/20',
        dot: 'bg-emerald-600',
      };
    case 'MET.':
      return {
        label: 'MET.',
        full: 'Méthodologie (Metodoloji)',
        bg: 'bg-purple-50 text-purple-900 border-purple-200 ring-1 ring-purple-500/20',
        dot: 'bg-purple-600',
      };
    case 'GRAM.':
      return {
        label: 'GRAM.',
        full: 'Grammaire (Dilbilgisi)',
        bg: 'bg-indigo-50 text-indigo-900 border-indigo-200 ring-1 ring-indigo-500/20',
        dot: 'bg-indigo-600',
      };
    case 'COMP.ECR.':
      return {
        label: 'COMP.ECR.',
        full: 'Compréhension Écrite (Okuma)',
        bg: 'bg-rose-50 text-rose-900 border-rose-200 ring-1 ring-rose-500/20',
        dot: 'bg-rose-600',
      };
    case 'EXP.ORL.':
      return {
        label: 'EXP.ORL.',
        full: 'Expression Orale (Sözlü İfade)',
        bg: 'bg-teal-50 text-teal-900 border-teal-200 ring-1 ring-teal-500/20',
        dot: 'bg-teal-600',
      };
    default:
      return {
        label: code || 'Ders',
        full: code || 'Ders',
        bg: 'bg-slate-100 text-slate-700 border-slate-200',
        dot: 'bg-slate-500',
      };
  }
};

// Ajan Piksel: Şube Kodu Renk Rozetleri
const getSectionInfo = (sube: string) => {
  const s = sube.trim().toUpperCase();
  if (s.startsWith('İHS')) {
    return {
      flag: '🇬🇧',
      lang: 'İngilizce',
      bg: 'bg-sky-50 text-sky-900 border-sky-300 font-bold',
      pill: 'bg-sky-600 text-white',
    };
  }
  if (s.startsWith('AHS')) {
    return {
      flag: '🇩🇪',
      lang: 'Almanca',
      bg: 'bg-amber-50 text-amber-950 border-amber-300 font-bold',
      pill: 'bg-amber-600 text-white',
    };
  }
  if (s.startsWith('FHS')) {
    return {
      flag: '🇫🇷',
      lang: 'Fransızca',
      bg: 'bg-rose-50 text-rose-950 border-rose-300 font-bold',
      pill: 'bg-rose-600 text-white',
    };
  }
  return {
    flag: '🏛️',
    lang: 'Genel',
    bg: 'bg-slate-100 text-slate-800 border-slate-200 font-bold',
    pill: 'bg-slate-600 text-white',
  };
};

// Ajan Piksel: Derslik & Yer Kartı Stilleri
const getRoomInfo = (yer: string) => {
  const y = yer.trim();
  if (/^D\d+$/i.test(y)) {
    return {
      type: 'derslik',
      label: y,
      badge: 'bg-slate-900 text-emerald-300 border-slate-800 shadow-xs font-mono font-black',
      icon: 'map-pin',
    };
  }
  if (/SALON/i.test(y)) {
    return {
      type: 'salon',
      label: y,
      badge: 'bg-purple-900 text-purple-200 border-purple-800 font-semibold',
      icon: 'sparkles',
    };
  }
  return {
    type: 'dis_fakulte',
    label: y || 'Dış Birim',
    badge: 'bg-amber-500 text-slate-950 border-amber-600 font-black',
    icon: 'external',
  };
};

// Ajan Pusula: Gün Renk Teması
const DAY_THEMES = [
  { name: 'Pazartesi', header: 'bg-blue-50/80 border-blue-200 text-blue-900', badge: 'bg-blue-600 text-white' },
  { name: 'Salı', header: 'bg-emerald-50/80 border-emerald-200 text-emerald-900', badge: 'bg-emerald-600 text-white' },
  { name: 'Çarşamba', header: 'bg-purple-50/80 border-purple-200 text-purple-900', badge: 'bg-purple-600 text-white' },
  { name: 'Perşembe', header: 'bg-amber-50/80 border-amber-200 text-amber-900', badge: 'bg-amber-600 text-white' },
  { name: 'Cuma', header: 'bg-teal-50/80 border-teal-200 text-teal-900', badge: 'bg-teal-600 text-white' },
];

interface GroupData {
  langIndex: number;
  records: ScheduleRecord[];
}

export const CourseScheduleQuery: React.FC = () => {
  const [mode, setMode] = useState<number>(0); // 0: Hoca, 1: Şube, 2: Derslik
  const [langFilter, setLangFilter] = useState<number>(-1); // -1: Tüm diller
  const [dayFilter, setDayFilter] = useState<number>(-1); // -1: Tüm günler
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [currentTime, setCurrentTime] = useState<{ g: number; m: number }>(() => {
    const d = new Date();
    return { g: d.getDay() - 1, m: d.getHours() * 60 + d.getMinutes() };
  });

  // Update clock every 30 seconds
  useEffect(() => {
    const update = () => {
      const d = new Date();
      setCurrentTime({ g: d.getDay() - 1, m: d.getHours() * 60 + d.getMinutes() });
    };
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  const placeholders = [
    'Hoca adı yazın (Örn: Rıdvan Korkut, Beyhan Sezer, Buket Şahin...)',
    'Şube kodu yazın (Örn: İHS 107, AHS 101, FHS 103...)',
    'Derslik yazın (Örn: D12, D6, D18, Seminer Salonu...)',
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
      const skill = getSkillInfo(ongoing[6]);
      const sube = ongoing[5] || 'Ders';
      const yer = ongoing[7] || 'Birim';
      return {
        label: `Şu an Canlı Derste: ${sube} · ${skill.label} (${yer})`,
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
      const nextSkill = getSkillInfo(next[6]);
      const sube = next[5] || 'Ders';
      const yer = next[7] ? `(${next[7]})` : '';
      return {
        label: `Şu an Boş · Sıradaki Ders: ${dayLabel} ${START_HOURS[next[3] - 1]}`,
        sub: `${sube} · ${nextSkill.label} ${yer}`,
        isOngoing: false,
        currentRecord: null,
      };
    }

    return {
      label: 'Şu an boş (Kalan planlı ders yok)',
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
      if (dayFilter >= 0 && b[2] !== dayFilter) return;
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
  }, [mode, langFilter, dayFilter, searchQuery]);

  // Keep groups open if few results
  useEffect(() => {
    if (groupedData.keys.length <= 4) {
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
      
      {/* Top Banner with Clock & Legend Drawer */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-700 text-white flex items-center justify-center font-bold shadow-md shadow-teal-500/10">
            <CalendarDays className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Ders Programı Sorgulama
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-teal-50 text-teal-800 border border-teal-200 shadow-2xs">
                2026-27 Güz
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Hoca, şube veya derslik bazlı akıllı renk kodlu anlık ders durumu ve program çizelgesi.
            </p>
          </div>
        </div>

        {/* Live Clock Badge with Pulsing State */}
        <div className="flex items-center space-x-2.5 px-4 py-2 rounded-2xl bg-slate-900 text-white text-xs font-semibold self-start md:self-auto shadow-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-200">{currentDayName}</span>
          <span className="text-slate-600">|</span>
          <span className="font-mono text-emerald-300 text-sm">
            {new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Ajan Piksel & Pusula: Görsel Renk & Kısaltma Rehberi (Legend) */}
      <div className="bg-gradient-to-r from-slate-50 via-teal-50/20 to-indigo-50/20 p-4 rounded-2xl border border-slate-200/70 text-xs text-slate-600 space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-bold text-[11px] uppercase tracking-wider text-slate-500 flex items-center">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 mr-1.5" />
            <span>Hızlı Renk & Kısaltma Rehberi</span>
          </span>
          <span className="text-[10px] text-slate-400 hidden sm:inline">Kolay ayırt etmek için renk kodları atanmıştır</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {/* Section badges preview */}
          <span className="px-2 py-0.5 rounded-md text-[11px] bg-sky-100 text-sky-900 border border-sky-300 font-bold">
            🇬🇧 İHS: İngilizce
          </span>
          <span className="px-2 py-0.5 rounded-md text-[11px] bg-amber-100 text-amber-950 border border-amber-300 font-bold">
            🇩🇪 AHS: Almanca
          </span>
          <span className="px-2 py-0.5 rounded-md text-[11px] bg-rose-100 text-rose-950 border border-rose-300 font-bold">
            🇫🇷 FHS: Fransızca
          </span>

          <span className="text-slate-300">|</span>

          {/* Skill badges preview */}
          <span className="px-2 py-0.5 rounded-md text-[11px] bg-blue-100 text-blue-900 border border-blue-200 font-bold">
            MC: Main Course
          </span>
          <span className="px-2 py-0.5 rounded-md text-[11px] bg-amber-100 text-amber-900 border border-amber-200 font-bold">
            WR: Writing
          </span>
          <span className="px-2 py-0.5 rounded-md text-[11px] bg-emerald-100 text-emerald-900 border border-emerald-200 font-bold">
            SP: Speaking
          </span>
          <span className="px-2 py-0.5 rounded-md text-[11px] bg-purple-100 text-purple-900 border border-purple-200 font-bold">
            MET/GRAM/EXP
          </span>

          <span className="text-slate-300">|</span>

          {/* Room badge preview */}
          <span className="px-2 py-0.5 rounded-md text-[11px] bg-slate-900 text-emerald-300 font-mono font-bold flex items-center space-x-1">
            <MapPin className="w-3 h-3 text-emerald-400" />
            <span>D1..D18 (Derslik)</span>
          </span>
        </div>
      </div>

      {/* Control Panel: Mode Selector, Language & Day Chips, Search */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
        
        {/* Mode Selector Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center p-1 bg-slate-100 rounded-2xl">
            <button
              onClick={() => { setMode(0); setSearchQuery(''); }}
              className={`flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                mode === 0
                  ? 'bg-white text-teal-900 shadow-xs ring-1 ring-slate-200'
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
                  ? 'bg-white text-indigo-900 shadow-xs ring-1 ring-slate-200'
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
                  ? 'bg-white text-rose-900 shadow-xs ring-1 ring-slate-200'
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
              className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                langFilter === -1
                  ? 'bg-teal-700 text-white font-bold shadow-2xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tümü
            </button>
            {SCHEDULE_LANGUAGES.map((lang, idx) => (
              <button
                key={lang}
                onClick={() => setLangFilter(idx)}
                className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
                  langFilter === idx
                    ? 'bg-teal-700 text-white font-bold shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Day Selector Chips (Ajan Pusula: Hızlı Gün Filtresi) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-slate-400 font-medium mr-1 flex items-center">
            <CalendarDays className="w-3 h-3 mr-1" />
            <span>Gün:</span>
          </span>
          <button
            onClick={() => setDayFilter(-1)}
            className={`px-3 py-1 rounded-xl text-xs font-medium transition cursor-pointer whitespace-nowrap ${
              dayFilter === -1
                ? 'bg-slate-800 text-white font-bold'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Haftalık (Tümü)
          </button>
          {SCHEDULE_DAYS.map((dayName, idx) => {
            const isToday = idx === currentTime.g;
            const isSelected = dayFilter === idx;
            return (
              <button
                key={dayName}
                onClick={() => setDayFilter(idx)}
                className={`px-3 py-1 rounded-xl text-xs font-medium transition cursor-pointer whitespace-nowrap flex items-center space-x-1 ${
                  isSelected
                    ? 'bg-teal-600 text-white font-bold shadow-2xs'
                    : isToday
                    ? 'bg-emerald-100 text-emerald-900 font-bold border border-emerald-300'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{dayName}</span>
                {isToday && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping ml-1" />
                )}
              </button>
            );
          })}
        </div>

        {/* Search Input Box */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4 text-teal-600" />
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
          <span>Toplam <strong>{groupedData.keys.length}</strong> sonuç listeleniyor</span>
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
      <div className="space-y-4">
        {groupedData.keys.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-xs space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm">Arama Kriterine Uygun Kayıt Bulunamadı</h4>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Lütfen filtrelerinizi kontrol edin veya farklı bir hoca, şube veya derslik adı deneyin.
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
                className={`bg-white rounded-3xl border transition shadow-xs overflow-hidden ${
                  status.isOngoing
                    ? 'border-emerald-300 ring-2 ring-emerald-500/20'
                    : 'border-slate-200/80 hover:border-slate-300'
                }`}
              >
                {/* Header Summary Bar (Clickable) */}
                <div
                  onClick={() => toggleGroup(keyName)}
                  className="p-4 sm:p-5 flex items-start sm:items-center justify-between gap-3 cursor-pointer select-none hover:bg-slate-50/70 transition"
                >
                  <div className="space-y-1.5 flex-1 min-w-0">
                    
                    {/* Top Identity Row */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-black text-slate-900 text-base sm:text-lg tracking-tight">
                        {keyName}
                      </span>
                      
                      {/* Language Tag */}
                      {mode === 0 && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          {SCHEDULE_LANGUAGES[group.langIndex]}
                        </span>
                      )}

                      {/* Course count pill */}
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                        {sortedRecords.length} Ders Bloğu
                      </span>
                    </div>

                    {/* Live Status Row (Ajan Pusula: Net Durum Çubuğu) */}
                    <div className="flex items-center text-xs">
                      {status.isOngoing ? (
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-xl bg-emerald-50 text-emerald-900 font-bold border border-emerald-300 shadow-2xs">
                          <span className="relative flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600" />
                          </span>
                          <span>{status.label}</span>
                          <span className="text-emerald-700 font-normal">({status.sub})</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-lg bg-slate-50 text-slate-600 font-medium">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{status.label}</span>
                          {status.sub && <span className="text-slate-500 font-semibold">• {status.sub}</span>}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Accordion Toggle Icon */}
                  <div className="flex items-center space-x-2 flex-shrink-0 pt-1 sm:pt-0">
                    <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                      {isOpen ? 'Programı Gizle' : 'Programı İncele'}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center transition-transform ${
                        isOpen ? 'rotate-180 bg-teal-50 text-teal-700' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Expanded Details Body */}
                {isOpen && (
                  <div className="px-4 sm:px-6 pb-6 pt-3 border-t border-slate-100 bg-slate-50/50 space-y-5">
                    {sortedRecords.length === 0 ? (
                      <div className="py-6 text-center text-xs text-slate-400">
                        Bu dönem atanmış ders programı görünmüyor.
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Group records by day */}
                        {SCHEDULE_DAYS.map((dayName, dayIdx) => {
                          const dayRecords = sortedRecords.filter((r) => r[2] === dayIdx);
                          if (dayRecords.length === 0) return null;
                          const isToday = dayIdx === currentTime.g;
                          const theme = DAY_THEMES[dayIdx] || DAY_THEMES[0];

                          return (
                            <div key={dayName} className="space-y-2.5">
                              
                              {/* Day Header Bar */}
                              <div className={`flex items-center justify-between px-3.5 py-1.5 rounded-xl border font-bold text-xs ${
                                isToday
                                  ? 'bg-emerald-100/80 border-emerald-300 text-emerald-950 shadow-2xs'
                                  : theme.header
                              }`}>
                                <div className="flex items-center space-x-2">
                                  <span className="uppercase tracking-wider">{dayName}</span>
                                  {isToday && (
                                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-600 text-white animate-pulse">
                                      BUGÜN
                                    </span>
                                  )}
                                </div>
                                <span className="text-[11px] opacity-80 font-normal">
                                  {dayRecords.length} Ders Bloğu
                                </span>
                              </div>

                              {/* Course Cards Grid */}
                              <div className="grid gap-3 sm:grid-cols-2">
                                {dayRecords.map((record, rIdx) => {
                                  const isOngoing = isClassOngoing(record);
                                  const skill = getSkillInfo(record[6]);
                                  const section = getSectionInfo(record[5]);
                                  const room = getRoomInfo(record[7]);
                                  const lessonCount = getLessonCount(record);
                                  const isMorning = record[3] <= 4;

                                  return (
                                    <div
                                      key={rIdx}
                                      className={`p-3.5 rounded-2xl border transition relative overflow-hidden flex flex-col justify-between space-y-3 ${
                                        isOngoing
                                          ? 'bg-emerald-50/90 border-emerald-400 ring-2 ring-emerald-500 shadow-sm'
                                          : isToday
                                          ? 'bg-white border-teal-200/90 hover:border-teal-400 shadow-2xs'
                                          : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                                      }`}
                                    >
                                      {/* Top Row: Time Badge & Lesson Period Indicator */}
                                      <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center space-x-2">
                                          <div className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-xl font-bold text-xs ${
                                            isOngoing 
                                              ? 'bg-emerald-700 text-white shadow-2xs' 
                                              : 'bg-slate-100 text-slate-800'
                                          }`}>
                                            <Clock className="w-3.5 h-3.5 opacity-80" />
                                            <span>{getTimeSpan(record)}</span>
                                          </div>

                                          <span className="text-[10px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded-lg flex items-center space-x-1">
                                            {isMorning ? (
                                              <>
                                                <SunMedium className="w-3 h-3 text-amber-500 mr-0.5" />
                                                <span>{lessonCount} Saat • Sabah</span>
                                              </>
                                            ) : (
                                              <>
                                                <Sunset className="w-3 h-3 text-indigo-500 mr-0.5" />
                                                <span>{lessonCount} Saat • Öğle</span>
                                              </>
                                            )}
                                          </span>
                                        </div>

                                        {isOngoing && (
                                          <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-600 text-white animate-bounce">
                                            CANLI
                                          </span>
                                        )}
                                      </div>

                                      {/* Middle Area: Context-Aware Badges & Information */}
                                      <div className="space-y-2">
                                        
                                        {/* If Hoca Mode: Show Section & Skill prominent */}
                                        {mode === 0 && (
                                          <div className="flex flex-wrap items-center gap-2">
                                            {record[5] && (
                                              <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl text-xs border ${section.bg}`}>
                                                <span>{section.flag}</span>
                                                <span>{record[5]}</span>
                                              </span>
                                            )}

                                            {record[6] && (
                                              <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl text-xs font-bold border ${skill.bg}`} title={skill.full}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${skill.dot}`} />
                                                <span>{skill.label}</span>
                                                <span className="font-normal text-[10px] opacity-80">({skill.full.split(' ')[0]})</span>
                                              </span>
                                            )}
                                          </div>
                                        )}

                                        {/* If Şube Mode: Show Instructor & Skill prominent */}
                                        {mode === 1 && (
                                          <div className="space-y-1.5">
                                            <div className="flex items-center space-x-2 text-slate-900 font-bold text-xs sm:text-sm">
                                              <User className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                                              <span>{record[1]}</span>
                                            </div>

                                            {record[6] && (
                                              <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl text-xs font-bold border ${skill.bg}`} title={skill.full}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${skill.dot}`} />
                                                <span>{skill.label}</span>
                                                <span className="font-normal text-[10px] opacity-80">({skill.full})</span>
                                              </span>
                                            )}
                                          </div>
                                        )}

                                        {/* If Derslik Mode: Show Instructor & Section prominent */}
                                        {mode === 2 && (
                                          <div className="space-y-1.5">
                                            <div className="flex items-center space-x-2 text-slate-900 font-bold text-xs sm:text-sm">
                                              <User className="w-4 h-4 text-rose-600 flex-shrink-0" />
                                              <span>{record[1]}</span>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-2">
                                              {record[5] && (
                                                <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl text-xs border ${section.bg}`}>
                                                  <span>{section.flag}</span>
                                                  <span>{record[5]}</span>
                                                </span>
                                              )}

                                              {record[6] && (
                                                <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl text-xs font-bold border ${skill.bg}`}>
                                                  <span>{skill.label}</span>
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                        )}

                                      </div>

                                      {/* Bottom Row: Classroom / Room Pill (Ajan Piksel: Konum Vurgusu) */}
                                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                                        <span className="text-[11px] text-slate-400 font-medium">Derslik / Konum:</span>
                                        {record[7] ? (
                                          <span className={`inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl text-xs border ${room.badge}`}>
                                            <MapPin className="w-3.5 h-3.5" />
                                            <span>{record[7]}</span>
                                          </span>
                                        ) : (
                                          <span className="text-[11px] text-slate-400 italic">Belirtilmemiş</span>
                                        )}
                                      </div>

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
