import React, { useState } from 'react';
import { ACADEMIC_CALENDAR_EVENTS } from '../../data/mockData';
import type { CalendarEvent } from '../../types';
import { 
  Calendar as CalendarIcon, 
  Search, 
  Star, 
  Clock, 
  ExternalLink, 
  CalendarCheck 
} from 'lucide-react';

const OFFICIAL_CALENDAR_URL = 'https://idari.adu.edu.tr/db/ogrenciisleri/tr/page-810';

export const AcademicCalendarView: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const categories = ['all', 'Sınavlar', 'Kayıt & Harç', 'Ders Dönemi', 'Resmi Tatil'];

  const filteredEvents = ACADEMIC_CALENDAR_EVENTS.filter((ev) => {
    const matchesTerm = selectedTerm === 'all' || ev.term === selectedTerm;
    const matchesCategory = selectedCategory === 'all' || ev.category === selectedCategory;
    const matchesSearch = ev.title.toLowerCase().includes(search.toLowerCase());
    return matchesTerm && matchesCategory && matchesSearch;
  });

  const getCategoryColor = (cat: CalendarEvent['category']) => {
    switch (cat) {
      case 'Sınavlar':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'Kayıt & Harç':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'Ders Dönemi':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Resmi Tatil':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      default:
        return 'bg-slate-50 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">

      {/* Header Banner */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold border border-indigo-100 flex-shrink-0">
            <CalendarCheck className="w-6 h-6 text-indigo-700" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-base sm:text-lg text-slate-900">ADÜ Akademik Takvimi</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-800 border border-indigo-200">
                Resmi Bağlantı
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Ders başlangıçları, kayıt haftaları, vize, final ve bütünleme sınav tarihleri.
            </p>
          </div>
        </div>

        <a
          href={OFFICIAL_CALENDAR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-700 hover:bg-indigo-800 text-white shadow-sm transition active:scale-95 cursor-pointer self-start sm:self-auto"
          title="Öğrenci İşleri Daire Başkanlığı Akademik Takvim Sayfasını Aç"
        >
          <span>Resmi Takvim Sayfası</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Direct Official Link Callout Box */}
      <div className="bg-gradient-to-r from-indigo-50/80 via-blue-50/50 to-slate-50 p-4 sm:p-5 rounded-2xl border border-indigo-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-start sm:items-center space-x-3">
          <div className="p-2 rounded-xl bg-indigo-100 text-indigo-800 flex-shrink-0 mt-0.5 sm:mt-0">
            <ExternalLink className="w-4 h-4" />
          </div>
          <div className="space-y-0.5">
            <span className="font-bold text-indigo-950 text-xs sm:text-sm">
              ADÜ Öğrenci İşleri Daire Başkanlığı Akademik Takvimi
            </span>
            <p className="text-slate-600 text-[11px] sm:text-xs leading-relaxed">
              Senato tarafından onaylanan güncel önlisans, lisans ve lisansüstü akademik takvim belgelerine doğrudan resmi web sayfasından ulaşabilirsiniz.
            </p>
          </div>
        </div>

        <a
          href={OFFICIAL_CALENDAR_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white border border-indigo-300 font-bold text-indigo-800 hover:bg-indigo-50 shadow-2xs transition whitespace-nowrap self-start sm:self-auto cursor-pointer"
        >
          <span>idari.adu.edu.tr'de Aç</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Toolbar: Term Tabs, Search & Category Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Term Selector */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-semibold self-start sm:self-auto">
            <button
              onClick={() => setSelectedTerm('2025-2026 Güz')}
              className={`px-3 py-1.5 rounded-lg transition ${
                selectedTerm === '2025-2026 Güz' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2025-2026 Güz Dönemi
            </button>
            <button
              onClick={() => setSelectedTerm('2025-2026 Bahar')}
              className={`px-3 py-1.5 rounded-lg transition ${
                selectedTerm === '2025-2026 Bahar' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              2025-2026 Bahar Dönemi
            </button>
            <button
              onClick={() => setSelectedTerm('all')}
              className={`px-3 py-1.5 rounded-lg transition ${
                selectedTerm === 'all' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tüm Yıl
            </button>
          </div>

          {/* Search Box */}
          <div className="relative sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Sınav, kayıt veya tarih ara..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-indigo-600 focus:outline-none"
            />
          </div>

        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pt-1 border-t border-slate-100">
          <span className="text-[11px] font-semibold text-slate-400 mr-1">Filtre:</span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-[11px] px-2.5 py-1 rounded-lg transition whitespace-nowrap font-medium cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-indigo-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'Tümü' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Events Timeline / List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden divide-y divide-slate-100 shadow-xs">
        {filteredEvents.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            Arama kriterine uygun akademik takvim etkinliği bulunamadı.
          </div>
        ) : (
          filteredEvents.map((ev) => (
            <div
              key={ev.id}
              className={`p-4 transition hover:bg-slate-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                ev.isImportant ? 'bg-amber-50/20' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className="p-2 rounded-xl bg-slate-100 text-slate-700 flex-shrink-0 mt-0.5">
                  <CalendarIcon className="w-4 h-4 text-indigo-700" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getCategoryColor(ev.category)}`}>
                      {ev.category}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {ev.term}
                    </span>
                    {ev.isImportant && (
                      <span className="inline-flex items-center text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">
                        <Star className="w-3 h-3 mr-0.5 fill-amber-500 text-amber-500" />
                        Kritik Tarih
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 mt-1">
                    {ev.title}
                  </h4>
                </div>
              </div>

              {/* Date Box */}
              <div className="sm:text-right pl-11 sm:pl-0 flex-shrink-0">
                <div className="inline-flex items-center space-x-1.5 text-xs font-extrabold text-slate-800 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>
                    {ev.startDate} {ev.endDate ? `— ${ev.endDate}` : ''}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
