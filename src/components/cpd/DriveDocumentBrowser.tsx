import React, { useState } from 'react';
import type { DriveDocument } from '../../types';
import { 
  Folder, 
  FileText, 
  Search, 
  Filter, 
  ExternalLink, 
  Download, 
  Eye, 
  FileSpreadsheet, 
  Presentation, 
  HardDrive, 
  Pin, 
  Calendar,
  X,
  FileCheck
} from 'lucide-react';

interface DriveDocumentBrowserProps {
  documents: DriveDocument[];
}

export const DriveDocumentBrowser: React.FC<DriveDocumentBrowserProps> = ({ documents }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [previewDoc, setPreviewDoc] = useState<DriveDocument | null>(null);

  // Folders list
  const folders = [
    { id: 'all', name: 'Tüm Klasörler ve Belgeler', count: documents.length },
    { id: '01_Etkinlikler_ve_Egitimler', name: '📁 01_Etkinlikler_ve_Egitimler', count: documents.filter(d => d.folderName.includes('01_')).length },
    { id: '02_Raporlar_ve_Faaliyet_Ozetleri', name: '📁 02_Raporlar_ve_Faaliyet_Ozetleri', count: documents.filter(d => d.folderName.includes('02_')).length },
    { id: '03_Komisyon_ve_Kararlar', name: '📁 03_Komisyon_ve_Kararlar', count: documents.filter(d => d.folderName.includes('03_')).length },
    { id: '04_Materyaller_ve_Rehberler', name: '📁 04_Materyaller_ve_Rehberler', count: documents.filter(d => d.folderName.includes('04_')).length },
  ];

  // All unique tags
  const allTags = Array.from(new Set(documents.flatMap(d => d.tags)));

  // Filtered documents
  const filteredDocs = documents.filter((doc) => {
    const matchesFolder = selectedFolder === 'all' || doc.folderName.includes(selectedFolder);
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.description && doc.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      doc.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTag = !selectedTag || doc.tags.includes(selectedTag);

    return matchesFolder && matchesSearch && matchesTag;
  });

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-rose-600" />;
      case 'doc':
        return <FileText className="w-5 h-5 text-blue-600" />;
      case 'xls':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-600" />;
      case 'ppt':
        return <Presentation className="w-5 h-5 text-amber-600" />;
      default:
        return <Folder className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">

      {/* Google Drive Status & Notice Card */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-[#0f2942] rounded-2xl p-5 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="p-1.5 bg-blue-500/20 border border-blue-400/30 rounded-lg">
                <HardDrive className="w-4 h-4 text-amber-300" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                Kurumsal Google Drive Deposu
              </span>
            </div>
            <h3 className="text-lg font-bold">CPD Birimi Resmi Belge ve Arşiv Dizini</h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Tüm belgeler kurumsal Ortak Drive altyapısında yetkili CPD sorumluları tarafından yönetilir. 
              Portaldan en güncel evraklara, yönergelere ve atölye materyallerine anlık erişebilirsiniz.
            </p>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <a
              href="https://drive.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-md transition active:scale-95"
            >
              <span>Ortak Drive'da Aç</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Belge adı, yönerge, rapor veya etiket ara..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Folder Select for Mobile */}
          <div className="sm:w-64">
            <div className="relative">
              <Filter className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <select
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white font-medium"
              >
                {folders.map(f => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.count})
                  </option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* Tag Cloud */}
        <div className="flex items-center flex-wrap gap-1.5 pt-1 border-t border-slate-100">
          <span className="text-[11px] font-semibold text-slate-400 mr-1">Etiketler:</span>
          {allTags.map((tag) => {
            const isSelected = selectedTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setSelectedTag(isSelected ? null : tag)}
                className={`text-[10px] px-2.5 py-1 rounded-lg transition font-medium cursor-pointer ${
                  isSelected
                    ? 'bg-blue-800 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                #{tag}
              </button>
            );
          })}
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="text-[10px] px-2 py-1 text-rose-600 hover:underline"
            >
              Filtreyi Temizle
            </button>
          )}
        </div>
      </div>

      {/* Document Count Info */}
      <div className="flex items-center justify-between text-xs text-slate-500 px-1">
        <span>Toplam <strong>{filteredDocs.length}</strong> belge listeleniyor</span>
        <span className="text-[11px] text-slate-400">Tıklandığında önizleme açılır</span>
      </div>

      {/* Documents Grid / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocs.length === 0 ? (
          <div className="col-span-full bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2">
            <FileText className="w-8 h-8 text-slate-300 mx-auto" />
            <h4 className="font-semibold text-sm text-slate-700">Arama kriterine uygun belge bulunamadı</h4>
            <p className="text-xs text-slate-400">Lütfen arama teriminizi veya klasör filtresini değiştirin.</p>
          </div>
        ) : (
          filteredDocs.map((doc) => (
            <div
              key={doc.id}
              className={`bg-white rounded-2xl border p-4 shadow-xs hover:shadow-md transition flex flex-col justify-between group ${
                doc.isPinned ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200'
              }`}
            >
              <div className="space-y-2.5">
                
                {/* Header: File Type & Folder Name */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2.5 truncate">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 group-hover:scale-105 transition">
                      {getFileIcon(doc.fileType)}
                    </div>
                    <div className="truncate">
                      <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full inline-block truncate max-w-[170px]">
                        {doc.folderName}
                      </span>
                    </div>
                  </div>
                  {doc.isPinned && (
                    <span className="p-1 text-amber-600 bg-amber-100 rounded-lg" title="Önemli / Sabitlenmiş Belge">
                      <Pin className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                {/* Document Title */}
                <h4 
                  onClick={() => setPreviewDoc(doc)}
                  className="font-bold text-xs sm:text-sm text-slate-800 leading-snug cursor-pointer group-hover:text-blue-700 transition line-clamp-2"
                >
                  {doc.title}
                </h4>

                {/* Description */}
                {doc.description && (
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {doc.description}
                  </p>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {doc.tags.map((tag) => (
                    <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>

              </div>

              {/* Bottom Info & Action Buttons */}
              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-slate-600 uppercase">{doc.fileType}</span>
                  <span>•</span>
                  <span>{doc.size}</span>
                </div>

                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => setPreviewDoc(doc)}
                    className="p-1.5 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-blue-50 transition"
                    title="Önizle & Bilgi"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </button>
                  <a
                    href={doc.driveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg text-slate-600 hover:text-amber-700 hover:bg-amber-50 transition"
                    title="Google Drive'da Aç"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          ))
        )}
      </div>

      {/* Document Preview & Details Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-[#0f2942] p-4 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2.5 truncate">
                <div className="p-1.5 bg-white/10 rounded-lg">
                  {getFileIcon(previewDoc.fileType)}
                </div>
                <div className="truncate">
                  <h4 className="font-bold text-xs sm:text-sm truncate">{previewDoc.title}</h4>
                  <span className="text-[10px] text-slate-300">{previewDoc.folderName}</span>
                </div>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 space-y-4">
              
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Dosya Boyutu:</span>
                  <span className="font-semibold text-slate-800">{previewDoc.size}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-200/60">
                  <span className="text-slate-500">Son Güncelleme:</span>
                  <span className="font-semibold text-slate-800 flex items-center space-x-1">
                    <Calendar className="w-3 h-3 text-slate-400 mr-1" />
                    {previewDoc.updatedAt}
                  </span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Erişim Yetkisi:</span>
                  <span className="font-semibold text-emerald-700 flex items-center">
                    <FileCheck className="w-3.5 h-3.5 mr-1" />
                    Tüm ADÜ Personeli (Görüntüleme)
                  </span>
                </div>
              </div>

              {previewDoc.description && (
                <div>
                  <h5 className="text-xs font-bold text-slate-700 mb-1">Belge Açıklaması:</h5>
                  <p className="text-xs text-slate-600 leading-relaxed bg-blue-50/50 p-3 rounded-xl border border-blue-100">
                    {previewDoc.description}
                  </p>
                </div>
              )}

              {/* Tag Badges */}
              <div>
                <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">İlişkili Etiketler</h5>
                <div className="flex flex-wrap gap-1.5">
                  {previewDoc.tags.map(t => (
                    <span key={t} className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
                <a
                  href={previewDoc.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 transition shadow-sm flex items-center justify-center space-x-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Google Drive'da Görüntüle</span>
                </a>
                <a
                  href={previewDoc.driveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>İndir</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
