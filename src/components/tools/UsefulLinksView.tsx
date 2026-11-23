import React, { useState, useMemo } from 'react';
import { USEFUL_LINKS } from '../../data/schoolData';
import { 
  ExternalLink, 
  Search, 
  Globe, 
  GraduationCap, 
  Mail, 
  BookOpen, 
  Utensils, 
  ShieldCheck, 
  Building2,
  BookmarkCheck
} from 'lucide-react';

export const UsefulLinksView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const set = new Set<string>();
    USEFUL_LINKS.forEach(item => set.add(item.category));
    return ['all', ...Array.from(set)];
  }, []);

  const filteredLinks = useMemo(() => {
    return USEFUL_LINKS.filter(link => {
      const matchesSearch = 
        link.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        link.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === 'all' || link.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const getCategoryIcon = (category: string) => {
    const cat = category.toLowerCase();
    if (cat.includes('öğrenci') || cat.includes('akademik')) return <GraduationCap className="w-5 h-5 text-blue-600" />;
    if (cat.includes('iletişim') || cat.includes('posta')) return <Mail className="w-5 h-5 text-indigo-600" />;
    if (cat.includes('araştırma') || cat.includes('kütüphane')) return <BookOpen className="w-5 h-5 text-amber-600" />;
    if (cat.includes('yemek') || cat.includes('kampüs')) return <Utensils className="w-5 h-5 text-emerald-600" />;
    if (cat.includes('sınav')) return <ShieldCheck className="w-5 h-5 text-purple-600" />;
    if (cat.includes('kurumsal')) return <Building2 className="w-5 h-5 text-cyan-600" />;
    return <Globe className="w-5 h-5 text-slate-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-4 sm:p-6 text-white shadow-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-blue-800/80 text-[11px] font-bold text-blue-200 border border-blue-700/50">
              <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Hızlı Erişim Portalları</span>
            </div>
            <h2 className="text-lg sm:text-2xl font-black tracking-tight text-white">
              Sık Kullanılan Üniversite Bağlantıları
            </h2>
            <p className="text-xs text-blue-200/80 max-w-xl leading-relaxed">
              ADÜ OBİS, EBYS, e-posta, yemek listesi, kütüphane ve resmi kurumsal portallara tek tıkla doğrudan erişin.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 text-center min-w-[130px] self-start md:self-auto">
            <div className="text-2xl font-black text-amber-400">{USEFUL_LINKS.length}</div>
            <div className="text-[11px] text-blue-200 font-semibold">Kayıtlı Portal</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Bağlantı veya portal ara..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
          />
        </div>

        {/* Category Pills (Pusula & Piksel Mobil Ergonomi) */}
        <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar -mx-1 px-1 w-full md:w-auto pb-1 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 min-h-[38px] rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer active:scale-95 ${
                selectedCategory === cat
                  ? 'bg-blue-900 text-white shadow-xs font-bold'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {cat === 'all' ? 'Tüm Kategoriler' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Links Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-xs hover:border-blue-500 hover:shadow-md transition active:scale-[0.98] flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 rounded-xl bg-slate-100 group-hover:bg-blue-50 flex items-center justify-center transition">
                  {getCategoryIcon(link.category)}
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-800 transition">
                  {link.category}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition flex items-center space-x-1">
                  <span>{link.title}</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                  {link.description}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-700 font-bold group-hover:translate-x-0.5 transition">
              <span className="text-[11px] text-slate-400 group-hover:text-blue-600 truncate max-w-[200px]">
                {link.url.replace('https://', '')}
              </span>
              <ExternalLink className="w-4 h-4 ml-2 flex-shrink-0" />
            </div>
          </a>
        ))}
      </div>

      {filteredLinks.length === 0 && (
        <div className="bg-white p-12 text-center rounded-3xl border border-slate-200 text-slate-400 space-y-2">
          <Globe className="w-8 h-8 mx-auto text-slate-300" />
          <p className="text-sm font-semibold">Arama kriterinize uygun bağlantı bulunamadı.</p>
          <p className="text-xs">Farklı bir anahtar kelime deneyebilir veya kategoriyi değiştirebilirsiniz.</p>
        </div>
      )}
    </div>
  );
};
