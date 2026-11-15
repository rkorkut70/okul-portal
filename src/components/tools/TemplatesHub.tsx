import React, { useState } from 'react';
import { TEMPLATE_DOCUMENTS } from '../../data/mockData';
import type { TemplateDocument } from '../../types';
import { 
  FileText, 
  Search, 
  Download, 
  HardDrive, 
  Check 
} from 'lucide-react';

export const TemplatesHub: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['all', 'Dilekçe & İzin', 'Ders & Sınav', 'Kurumsal Kimlik', 'Komisyon & Tutanak'];

  const filteredTemplates = TEMPLATE_DOCUMENTS.filter((tpl) => {
    const matchesCategory = selectedCategory === 'all' || tpl.category === selectedCategory;
    const matchesSearch = 
      tpl.title.toLowerCase().includes(search.toLowerCase()) ||
      tpl.description.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownloadSimulation = (tpl: TemplateDocument) => {
    setCopiedId(tpl.id);
    setTimeout(() => setCopiedId(null), 2000);
    window.open(tpl.driveUrl, '_blank');
  };

  return (
    <div className="space-y-6">

      {/* Header Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">Kurumsal Form ve Şablon Arşivi</h3>
            <p className="text-xs text-slate-500">
              Sık kullanılan resmi dilekçeler, sınav şablonları, antetli yazılar ve kurul tutanakları.
            </p>
          </div>
        </div>

        <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-800 text-xs font-semibold border border-blue-200">
          <HardDrive className="w-3.5 h-3.5 text-blue-600" />
          <span>Drive: 00_Genel_Formlar_ve_Sablonlar</span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
          
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Dilekçe adı, mazeret, antetli kağıt ara..."
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
                    ? 'bg-amber-700 text-white'
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.length === 0 ? (
          <div className="col-span-full p-8 text-center text-slate-400 text-xs bg-white rounded-2xl border border-slate-200">
            Aradığınız kriterde form veya şablon bulunamadı.
          </div>
        ) : (
          filteredTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {tpl.category}
                  </span>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                    {tpl.format}
                  </span>
                </div>

                <h4 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-blue-700 transition leading-snug">
                  {tpl.title}
                </h4>

                <p className="text-xs text-slate-500 leading-relaxed">
                  {tpl.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>{tpl.size} • {tpl.updatedAt}</span>

                <button
                  onClick={() => handleDownloadSimulation(tpl)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs transition active:scale-95 cursor-pointer"
                >
                  {copiedId === tpl.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-slate-900" />
                      <span>İndirildi</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Şablonu İndir</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};
