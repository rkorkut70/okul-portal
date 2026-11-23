import React, { useState, useEffect } from 'react';
import { TEMPLATE_DOCUMENTS, GOOGLE_DRIVE_FOLDER_URL } from '../../data/mockData';
import type { TemplateDocument } from '../../types';
import { 
  FileText, 
  Search, 
  Plus,
  Trash2,
  X,
  ExternalLink,
  FolderOpen
} from 'lucide-react';

const STORAGE_KEY = 'adu_portal_user_templates';

export const TemplatesHub: React.FC = () => {
  const [templates, setTemplates] = useState<TemplateDocument[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch {
        // ignore
      }
    }
    return TEMPLATE_DOCUMENTS;
  });

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New template form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Dilekçe & İzin');
  const [newFormat, setNewFormat] = useState('DOCX');
  const [newDriveUrl, setNewDriveUrl] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const categories = ['all', 'Dilekçe & İzin', 'Ders & Sınav', 'Kurumsal Kimlik', 'Komisyon & Tutanak', 'Genel'];

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
  }, [templates]);

  const handleAddTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: TemplateDocument = {
      id: 'tpl-' + Date.now(),
      title: newTitle.trim(),
      category: newCategory,
      format: newFormat,
      size: '—',
      updatedAt: new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' }),
      driveUrl: newDriveUrl.trim() || '#',
      description: newDescription.trim() || 'Açıklama belirtilmedi.'
    };

    setTemplates(prev => [newItem, ...prev]);
    setIsModalOpen(false);

    // Reset form
    setNewTitle('');
    setNewDriveUrl('');
    setNewDescription('');
  };

  const handleDeleteTemplate = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Bu şablonu silmek istediğinize emin misiniz?')) {
      setTemplates(prev => prev.filter(t => t.id !== id));
    }
  };

  const filteredTemplates = templates.filter((tpl) => {
    const matchesCategory = selectedCategory === 'all' || tpl.category === selectedCategory;
    const matchesSearch = 
      tpl.title.toLowerCase().includes(search.toLowerCase()) ||
      tpl.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">

      {/* Header Banner */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold border border-amber-100 flex-shrink-0">
            <FileText className="w-6 h-6 text-amber-700" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-base sm:text-lg text-slate-900">Kurumsal Form ve Şablon Arşivi</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                {templates.length} Belge
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Sık kullanılan resmi dilekçeler, sınav şablonları, antetli yazılar ve kurul tutanakları.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm transition active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Yeni Şablon Ekle</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Dilekçe adı, form veya şablon ara..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[11px] px-2.5 py-1 rounded-lg transition whitespace-nowrap font-medium cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-amber-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'Tüm Şablonlar' : cat}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Templates Grid */}
      {filteredTemplates.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-3xl border border-slate-200/80 space-y-3">
          <div className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 mx-auto flex items-center justify-center">
            <FolderOpen className="w-7 h-7 text-slate-300" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-slate-800">Henüz Kayıtlı Şablon veya Form Yok</h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Sistemde örnek veriler temizlenmiştir. Kurumunuza ait resmi dilekçe, tutanak ve ders şablonlarını yukarıdaki <strong>"Yeni Şablon Ekle"</strong> butonunu kullanarak sisteme kaydedebilirsiniz.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>İlk Şablonu Ekle</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-amber-400 hover:shadow-md transition flex flex-col justify-between group space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                    {tpl.category}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded">
                    {tpl.format}
                  </span>
                </div>

                <h4 className="font-bold text-sm text-slate-900 group-hover:text-amber-700 transition line-clamp-2">
                  {tpl.title}
                </h4>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                  {tpl.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-400 font-medium">
                  {tpl.updatedAt}
                </span>

                <div className="flex items-center space-x-1.5">
                  <button
                    onClick={(e) => handleDeleteTemplate(tpl.id, e)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                    title="Şablonu Sil"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={tpl.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-amber-600 text-white font-bold text-[11px] transition shadow-xs cursor-pointer"
                  >
                    <span>Aç / İndir</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Template Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 space-y-4">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <Plus className="w-4 h-4 stroke-[3]" />
                </div>
                <h3 className="text-base font-bold text-slate-900">Yeni Form veya Şablon Ekle</h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddTemplate} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Şablon / Form Başlığı *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Örn: Bologna Uyumlu Ders İzlencesi Şablonu"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Kategori
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white"
                  >
                    <option>Dilekçe & İzin</option>
                    <option>Ders & Sınav</option>
                    <option>Kurumsal Kimlik</option>
                    <option>Komisyon & Tutanak</option>
                    <option>Genel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Dosya Formatı
                  </label>
                  <select
                    value={newFormat}
                    onChange={(e) => setNewFormat(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none bg-white font-mono"
                  >
                    <option>DOCX</option>
                    <option>PDF</option>
                    <option>XLSX</option>
                    <option>PPTX</option>
                    <option>DİĞER</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-semibold text-slate-700">
                    Bağlantı / Drive Linki
                  </label>
                  <button
                    type="button"
                    onClick={() => setNewDriveUrl(GOOGLE_DRIVE_FOLDER_URL)}
                    className="text-[10px] text-amber-700 hover:underline font-semibold cursor-pointer"
                  >
                    Ortak Drive Linkini Kullan
                  </button>
                </div>
                <input
                  type="url"
                  value={newDriveUrl}
                  onChange={(e) => setNewDriveUrl(e.target.value)}
                  placeholder={GOOGLE_DRIVE_FOLDER_URL}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Açıklama / Kullanım Notu
                </label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Bu formun hangi amaçla ve kimler tarafından doldurulması gerektiğini özetleyin..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition cursor-pointer"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold transition shadow-xs cursor-pointer"
                >
                  Şablonu Kaydet
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
