import React, { useState } from 'react';
import type { DriveDocument } from '../../types';
import { 
  GOOGLE_DRIVE_FOLDER_ID, 
  GOOGLE_DRIVE_FOLDER_URL, 
  GOOGLE_DRIVE_EMBED_URL 
} from '../../data/mockData';
import { 
  Folder, 
  FileText, 
  Search, 
  Filter, 
  ExternalLink, 
  Eye, 
  FileSpreadsheet, 
  Presentation, 
  HardDrive, 
  Pin, 
  Calendar,
  X,
  FileCheck,
  FolderTree,
  Maximize2
} from 'lucide-react';

interface DriveDocumentBrowserProps {
  documents: DriveDocument[];
}

export const DriveDocumentBrowser: React.FC<DriveDocumentBrowserProps> = ({ documents }) => {
  const [viewMode, setViewMode] = useState<'live' | 'list'>('live');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [previewDoc, setPreviewDoc] = useState<DriveDocument | null>(null);

  // Dynamic folders list from documents
  const uniqueFolderNames = Array.from(new Set(documents.map(d => d.folderName).filter(Boolean)));
  const folders = [
    { id: 'all', name: 'Tüm Klasörler ve Belgeler', count: documents.length },
    ...uniqueFolderNames.map(fName => ({
      id: fName,
      name: `📁 ${fName}`,
      count: documents.filter(d => d.folderName === fName).length
    }))
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
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-[#0f2942] rounded-3xl p-4 sm:p-6 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="p-1.5 bg-blue-500/20 border border-blue-400/30 rounded-lg">
                <HardDrive className="w-4 h-4 text-amber-300" />
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                Kurumsal Ortak Google Drive Deposu
              </span>
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white/10 text-amber-300 border border-amber-300/30">
                ID: {GOOGLE_DRIVE_FOLDER_ID}
              </span>
            </div>
            <h3 className="text-base sm:text-xl font-bold">Resmi Evrak ve Paylaşım Dizini</h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              YDYO akademik birimlerinin ortak klasör yapısı bu Google Drive dizini üzerinde toplanmıştır. 
              Aşağıdaki canlı gezgin üzerinden klasör ağacını inceleyebilir veya doğrudan Google Drive'da açabilirsiniz.
            </p>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <a
              href={GOOGLE_DRIVE_FOLDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-md transition active:scale-95 cursor-pointer"
            >
              <span>Google Drive'da Aç</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* View Switcher: Live Drive vs Document List */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div className="inline-flex p-1 bg-slate-100 rounded-2xl text-xs font-semibold overflow-x-auto no-scrollbar w-full sm:w-auto">
          <button
            onClick={() => setViewMode('live')}
            className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-3 sm:px-4 py-2.5 rounded-xl transition cursor-pointer active:scale-95 ${
              viewMode === 'live'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5 text-blue-700" />
            <span>Canlı Drive Gezgini</span>
          </button>

          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-3 sm:px-4 py-2.5 rounded-xl transition cursor-pointer active:scale-95 ${
              viewMode === 'list'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-indigo-700" />
            <span>Belgeler ({documents.length})</span>
          </button>
        </div>

        <a
          href={GOOGLE_DRIVE_FOLDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-bold text-blue-700 hover:underline inline-flex items-center space-x-1 self-end sm:self-auto cursor-pointer"
        >
          <span>Yeni Sekmede Tam Ekran</span>
          <Maximize2 className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* MODE 1: LIVE GOOGLE DRIVE EMBED */}
      {viewMode === 'live' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-3.5 sm:p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs bg-slate-50 p-3 sm:p-3.5 rounded-2xl border border-slate-200/70">
            <div className="flex items-center space-x-2.5">
              <Folder className="w-4 h-4 text-blue-700 flex-shrink-0" />
              <span className="text-slate-700">
                Klasör: <strong>YDYO Paylaşım Dizini</strong>
              </span>
            </div>
            <a
              href={GOOGLE_DRIVE_FOLDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 font-bold text-slate-800 transition shadow-2xs self-start sm:self-auto cursor-pointer"
            >
              <span>Drive Arayüzünde Aç</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>

          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-100 relative min-h-[440px] sm:min-h-[550px]">
            <iframe
              src={GOOGLE_DRIVE_EMBED_URL}
              title="Kurumsal Google Drive Dizini"
              className="w-full h-[460px] sm:h-[620px] border-0"
              loading="lazy"
            />
          </div>

          <p className="text-[11px] text-slate-400 text-center">
            İpucu: Dosya yüklemek veya yetki düzenlemek için yukarıdaki <strong>"Google Drive'da Aç"</strong> butonunu kullanarak resmi Google Drive arayüzüne geçebilirsiniz.
          </p>
        </div>
      )}

      {/* MODE 2: REGISTERED DOCUMENTS LIST */}
      {viewMode === 'list' && (
        <div className="space-y-6">
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

              {/* Folder Select */}
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
            {allTags.length > 0 && (
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
                          ? 'bg-blue-800 text-white font-bold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      #{tag}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocs.length === 0 ? (
              <div className="col-span-full py-12 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
                <Folder className="w-8 h-8 text-slate-300 mx-auto" />
                <h4 className="font-semibold text-sm text-slate-700">Aramanıza uygun belge bulunamadı</h4>
                <p className="text-xs text-slate-400">Arama terimini veya klasör filtresini değiştirin.</p>
              </div>
            ) : (
              filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:border-blue-400 hover:shadow-md transition flex flex-col justify-between group space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:scale-105 transition">
                        {getFileIcon(doc.fileType)}
                      </div>
                      {doc.isPinned && (
                        <span className="inline-flex items-center text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                          <Pin className="w-3 h-3 mr-1 fill-amber-500" />
                          Sabitlenmiş
                        </span>
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider">
                        {doc.folderName}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition line-clamp-2 mt-0.5">
                        {doc.title}
                      </h4>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {doc.tags.map(t => (
                        <span key={t} className="text-[9px] font-medium px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                          #{t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-400 font-medium">
                      {doc.updatedAt}
                    </span>

                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => setPreviewDoc(doc)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-blue-700 hover:bg-blue-50 transition cursor-pointer"
                        title="Detay & Önizleme"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <a
                        href={doc.driveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-blue-700 text-white font-bold text-[11px] transition shadow-xs cursor-pointer"
                      >
                        <span>Aç</span>
                        <ExternalLink className="w-3 h-3 ml-0.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Document Detail & Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-lg w-full overflow-hidden p-6 space-y-4">
            
            <div className="flex items-start justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-slate-100">
                  {getFileIcon(previewDoc.fileType)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-slate-900">{previewDoc.title}</h4>
                  <span className="text-xs text-slate-400">{previewDoc.folderName}</span>
                </div>
              </div>
              <button
                onClick={() => setPreviewDoc(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
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

            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
              <a
                href={previewDoc.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 transition shadow-sm flex items-center justify-center space-x-2"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Belgeyi Aç</span>
              </a>
              <button
                onClick={() => setPreviewDoc(null)}
                className="py-2.5 px-4 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
              >
                Kapat
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
