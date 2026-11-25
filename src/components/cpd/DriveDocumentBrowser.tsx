import React, { useState, useMemo } from 'react';
import type { DriveDocument } from '../../types';
import {
  GOOGLE_DRIVE_FOLDER_ID,
  GOOGLE_DRIVE_FOLDER_URL,
  GOOGLE_DRIVE_EMBED_URL
} from '../../data/mockData';
import { SHARED_DRIVE_TREE, type DriveTreeNode } from '../../data/driveTreeData';
import {
  Folder,
  FileText,
  Search,
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
  ChevronRight,
  ArrowLeft,
  Home,
  Film,
  Image as ImageIcon,
  FileArchive,
  FolderOpen
} from 'lucide-react';

interface DriveDocumentBrowserProps {
  documents: DriveDocument[];
}

const formatBytes = (bytes?: number) => {
  if (!bytes || bytes <= 0) return '';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getExtIcon = (ext?: string) => {
  const e = (ext || '').toLowerCase();
  if (e === 'pdf') return <FileText className="w-5 h-5 text-rose-600 flex-shrink-0" />;
  if (e === 'doc' || e === 'docx') return <FileText className="w-5 h-5 text-blue-600 flex-shrink-0" />;
  if (e === 'xls' || e === 'xlsx') return <FileSpreadsheet className="w-5 h-5 text-emerald-600 flex-shrink-0" />;
  if (e === 'ppt' || e === 'pptx') return <Presentation className="w-5 h-5 text-amber-600 flex-shrink-0" />;
  if (e === 'mp4' || e === 'mov') return <Film className="w-5 h-5 text-purple-600 flex-shrink-0" />;
  if (e === 'jpg' || e === 'jpeg' || e === 'png') return <ImageIcon className="w-5 h-5 text-teal-600 flex-shrink-0" />;
  if (e === 'zip' || e === 'rar') return <FileArchive className="w-5 h-5 text-slate-600 flex-shrink-0" />;
  return <FileText className="w-5 h-5 text-slate-500 flex-shrink-0" />;
};

export const DriveDocumentBrowser: React.FC<DriveDocumentBrowserProps> = ({ documents }) => {
  const [viewMode, setViewMode] = useState<'web' | 'live' | 'list'>('web');
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [treeSearch, setTreeSearch] = useState('');

  // Mode 'list' states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string>('all');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [previewDoc, setPreviewDoc] = useState<DriveDocument | null>(null);

  // Navigate current folder node in SHARED_DRIVE_TREE
  const currentNode: DriveTreeNode = useMemo(() => {
    let node: DriveTreeNode = SHARED_DRIVE_TREE;
    for (const seg of currentPath) {
      const found = (node.c || []).find(ch => ch.t === 'd' && ch.n === seg);
      if (found) {
        node = found;
      } else {
        break;
      }
    }
    return node;
  }, [currentPath]);

  // Flatten all nodes for instant global search across 1150+ files
  const globalSearchResults = useMemo(() => {
    const q = treeSearch.trim().toLowerCase();
    if (!q) return [];
    const results: { node: DriveTreeNode; path: string[] }[] = [];
    const walk = (n: DriveTreeNode, path: string[]) => {
      for (const ch of n.c || []) {
        if (ch.n.toLowerCase().includes(q)) {
          results.push({ node: ch, path });
        }
        if (ch.t === 'd') {
          walk(ch, [...path, ch.n]);
        }
      }
    };
    walk(SHARED_DRIVE_TREE, []);
    return results.slice(0, 80);
  }, [treeSearch]);

  // Quick shortcuts to key folders
  const quickNavigate = (pathSegments: string[]) => {
    setTreeSearch('');
    let node: DriveTreeNode = SHARED_DRIVE_TREE;
    const validPath: string[] = [];
    for (const seg of pathSegments) {
      const found = (node.c || []).find(ch => ch.t === 'd' && ch.n.toLowerCase().includes(seg.toLowerCase()));
      if (found) {
        validPath.push(found.n);
        node = found;
      } else {
        break;
      }
    }
    setCurrentPath(validPath);
  };

  // Mode 2: Dynamic folders list from documents
  const uniqueFolderNames = Array.from(new Set(documents.map(d => d.folderName).filter(Boolean)));
  const folders = [
    { id: 'all', name: 'Tüm Klasörler ve Belgeler', count: documents.length },
    ...uniqueFolderNames.map(fName => ({
      id: fName,
      name: `📁 ${fName}`,
      count: documents.filter(d => d.folderName === fName).length
    }))
  ];
  const allTags = Array.from(new Set(documents.flatMap(d => d.tags)));
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

  const currentChildren = currentNode.c || [];
  const currentDirs = currentChildren.filter(c => c.t === 'd');
  const currentFiles = currentChildren.filter(c => c.t === 'f');

  return (
    <div className="space-y-5">

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
              <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-white/10 text-amber-300 border border-amber-300/30 hidden sm:inline-block">
                ID: {GOOGLE_DRIVE_FOLDER_ID}
              </span>
            </div>
            <h3 className="text-base sm:text-xl font-bold">Resmi Evrak ve Paylaşım Dizini</h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Google Drive uygulamasını açmaya gerek kalmadan tüm ortak klasör yapısını ve dosyaları doğrudan web arayüzü üzerinden hızlıca gezebilir ve arayabilirsiniz.
            </p>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <a
              href={GOOGLE_DRIVE_FOLDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold shadow-md transition active:scale-95 cursor-pointer"
            >
              <span>Drive Uygulamasında Aç</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* View Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
        <div className="inline-flex p-1 bg-slate-100 rounded-2xl text-xs font-semibold overflow-x-auto no-scrollbar w-full sm:w-auto">
          <button
            onClick={() => setViewMode('web')}
            className={`flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-3 sm:px-4 py-2.5 rounded-xl transition cursor-pointer whitespace-nowrap active:scale-95 ${
              viewMode === 'web'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FolderOpen className="w-3.5 h-3.5 text-blue-700" />
            <span>Web Klasör Gezgini</span>
          </button>

          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-3 sm:px-4 py-2.5 rounded-xl transition cursor-pointer whitespace-nowrap active:scale-95 ${
              viewMode === 'list'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-indigo-700" />
            <span>Önemli Belgeler ({documents.length})</span>
          </button>

          <button
            onClick={() => setViewMode('live')}
            className={`flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-3 sm:px-4 py-2.5 rounded-xl transition cursor-pointer whitespace-nowrap active:scale-95 ${
              viewMode === 'live'
                ? 'bg-white text-slate-900 shadow-xs font-bold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FolderTree className="w-3.5 h-3.5 text-emerald-700" />
            <span>Canlı Drive Penceresi</span>
          </button>
        </div>
      </div>

      {/* MODE 1 (DEFAULT): NATIVE MOBILE-FRIENDLY WEB FOLDER EXPLORER */}
      {viewMode === 'web' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-3.5 sm:p-5 space-y-4">
          
          {/* Global Search & Quick Shortcuts */}
          <div className="space-y-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-blue-600 absolute left-3.5 top-3" />
              <input
                type="search"
                value={treeSearch}
                onChange={(e) => setTreeSearch(e.target.value)}
                placeholder="Tüm ortak Drive içinde klasör veya dosya adı ara (örn: Workshop, El Kitabı, FOCI)..."
                className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition"
              />
              {treeSearch && (
                <button
                  onClick={() => setTreeSearch('')}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-700 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Directory Shortcuts */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1 text-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mr-1 flex-shrink-0">
                Hızlı Geçiş:
              </span>
              <button
                onClick={() => { setTreeSearch(''); setCurrentPath([]); }}
                className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold whitespace-nowrap cursor-pointer active:scale-95"
              >
                Ana Dizin
              </button>
              <button
                onClick={() => quickNavigate(['Kalite ve Akreditasyon', '4. AKADEMIK', '5. SÜREKLİ MESLEKİ'])}
                className="px-2.5 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 font-semibold whitespace-nowrap cursor-pointer active:scale-95"
              >
                CPD Birimi
              </button>
              <button
                onClick={() => quickNavigate(['Kalite ve Akreditasyon', '4. AKADEMIK', '5. SÜREKLİ MESLEKİ', 'Etkinlikler'])}
                className="px-2.5 py-1 rounded-full bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 font-semibold whitespace-nowrap cursor-pointer active:scale-95"
              >
                CPD Etkinlikler & Arşiv
              </button>
              <button
                onClick={() => quickNavigate(['Kalite ve Akreditasyon', '3. EL KITAPLARI'])}
                className="px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-semibold whitespace-nowrap cursor-pointer active:scale-95"
              >
                El Kitapları
              </button>
              <button
                onClick={() => quickNavigate(['Kalite ve Akreditasyon', '4. AKADEMIK'])}
                className="px-2.5 py-1 rounded-full bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 font-semibold whitespace-nowrap cursor-pointer active:scale-95"
              >
                Akademik Birimler
              </button>
            </div>
          </div>

          {/* Search Results View OR Folder Navigation View */}
          {treeSearch.trim() ? (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span>
                  &ldquo;<strong>{treeSearch}</strong>&rdquo; için <strong>{globalSearchResults.length}</strong> eşleşme gösteriliyor
                </span>
                <button
                  onClick={() => setTreeSearch('')}
                  className="text-blue-700 font-bold hover:underline cursor-pointer"
                >
                  Aramayı Kapat
                </button>
              </div>

              {globalSearchResults.length === 0 ? (
                <div className="py-10 text-center text-xs text-slate-400">
                  Aradığınız ifadeyle eşleşen klasör veya dosya bulunamadı.
                </div>
              ) : (
                <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-2xl overflow-hidden">
                  {globalSearchResults.map((res, idx) => (
                    <div
                      key={`${res.node.n}-${idx}`}
                      onClick={() => {
                        if (res.node.t === 'd') {
                          setCurrentPath([...res.path, res.node.n]);
                          setTreeSearch('');
                        } else {
                          setCurrentPath(res.path);
                          setTreeSearch('');
                        }
                      }}
                      className="p-3 sm:p-3.5 hover:bg-blue-50/50 active:bg-blue-50 transition cursor-pointer flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        {res.node.t === 'd' ? (
                          <Folder className="w-5 h-5 text-amber-500 fill-amber-100 flex-shrink-0" />
                        ) : (
                          getExtIcon(res.node.e)
                        )}
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                            {res.node.n}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            {res.path.length > 0 ? res.path.join(' / ') : 'Ana Dizin'}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-1 rounded-lg flex-shrink-0">
                        {res.node.t === 'd' ? 'Klasöre Git' : 'Konuma Git'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {/* Breadcrumb & Back Bar */}
              <div className="flex items-center gap-2 bg-slate-50 p-2.5 sm:p-3 rounded-2xl border border-slate-200/70 overflow-x-auto no-scrollbar">
                {currentPath.length > 0 && (
                  <button
                    onClick={() => setCurrentPath(prev => prev.slice(0, -1))}
                    className="p-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 active:scale-95 transition flex-shrink-0 cursor-pointer"
                    title="Üst klasöre dön"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => setCurrentPath([])}
                  className={`inline-flex items-center space-x-1 px-2.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition ${
                    currentPath.length === 0
                      ? 'bg-blue-900 text-white'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <Home className="w-3.5 h-3.5" />
                  <span>Ortak Drive</span>
                </button>

                {currentPath.map((seg, i) => {
                  const isLast = i === currentPath.length - 1;
                  return (
                    <React.Fragment key={`${seg}-${i}`}>
                      <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <button
                        onClick={() => setCurrentPath(currentPath.slice(0, i + 1))}
                        className={`px-2.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap cursor-pointer transition ${
                          isLast
                            ? 'bg-blue-900 text-white'
                            : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {seg}
                      </button>
                    </React.Fragment>
                  );
                })}
              </div>

              {/* Current Folder Stats */}
              <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                <span>
                  <strong>{currentDirs.length}</strong> klasör, <strong>{currentFiles.length}</strong> dosya
                </span>
              </div>

              {/* Folders & Files List */}
              {currentDirs.length === 0 && currentFiles.length === 0 ? (
                <div className="py-10 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-2xl">
                  Bu klasörde gösterilecek öğe bulunmuyor.
                </div>
              ) : (
                <div className="divide-y divide-slate-100 border border-slate-200/80 rounded-2xl overflow-hidden">
                  {/* Subfolders */}
                  {currentDirs.map((dir) => {
                    const childCount = (dir.c || []).length;
                    return (
                      <button
                        key={dir.n}
                        onClick={() => setCurrentPath(prev => [...prev, dir.n])}
                        className="w-full p-3.5 hover:bg-blue-50/60 active:bg-blue-100/60 transition flex items-center justify-between gap-3 text-left cursor-pointer group"
                      >
                        <div className="flex items-center space-x-3 min-w-0">
                          <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
                            <Folder className="w-5 h-5 text-amber-500 fill-amber-200/60" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-blue-800 truncate">
                              {dir.n}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {childCount} öğe
                            </div>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 flex-shrink-0" />
                      </button>
                    );
                  })}

                  {/* Files */}
                  {currentFiles.map((file) => (
                    <div
                      key={file.n}
                      className="p-3.5 hover:bg-slate-50 transition flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center flex-shrink-0">
                          {getExtIcon(file.e)}
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs sm:text-sm font-semibold text-slate-800 truncate">
                            {file.n}
                          </div>
                          <div className="flex items-center space-x-2 text-[10px] text-slate-400 mt-0.5">
                            {file.e && (
                              <span className="uppercase font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                                {file.e}
                              </span>
                            )}
                            {file.s ? <span>{formatBytes(file.s)}</span> : null}
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] font-bold uppercase px-2 py-1 rounded-lg bg-slate-100 text-slate-500 flex-shrink-0">
                        {file.e || 'DOSYA'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* MODE 2: REGISTERED DOCUMENTS LIST */}
      {viewMode === 'list' && (
        <div className="space-y-6">
          {/* Search & Filter Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Belge adı, açıklama veya etiket ara..."
                  className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-700 focus:outline-none"
                />
              </div>

              <select
                value={selectedFolder}
                onChange={(e) => setSelectedFolder(e.target.value)}
                className="px-3.5 py-2 text-xs sm:text-sm rounded-xl border border-slate-300 bg-white font-medium text-slate-700 focus:ring-2 focus:ring-blue-700 focus:outline-none"
              >
                {folders.map(f => (
                  <option key={f.id} value={f.id}>{f.name} ({f.count})</option>
                ))}
              </select>
            </div>

            {allTags.length > 0 && (
              <div className="flex items-center flex-wrap gap-1.5 pt-1">
                <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mr-1">
                  Etiketler:
                </span>
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`text-[11px] px-2.5 py-0.5 rounded-full transition cursor-pointer ${
                    !selectedTag ? 'bg-blue-800 text-white font-bold' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Tümü
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                    className={`text-[11px] px-2.5 py-0.5 rounded-full transition cursor-pointer ${
                      selectedTag === tag
                        ? 'bg-blue-800 text-white font-bold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Documents List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDocs.length === 0 ? (
              <div className="col-span-full bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2">
                <FileCheck className="w-8 h-8 text-slate-300 mx-auto" />
                <h4 className="font-semibold text-sm text-slate-700">Kayıtlı önemli belge bulunamadı</h4>
                <p className="text-xs text-slate-400">Tüm klasörler için &ldquo;Web Klasör Gezgini&rdquo; sekmesini kullanabilirsiniz.</p>
              </div>
            ) : (
              filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-xs hover:border-blue-400 hover:shadow-md transition flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2.5">
                        <div className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center flex-shrink-0">
                          {getFileIcon(doc.fileType)}
                        </div>
                        <div>
                          <div className="flex items-center space-x-1.5">
                            <span className="text-[10px] font-bold text-blue-800 bg-blue-50 px-1.5 py-0.2 rounded">
                              {doc.folderName}
                            </span>
                            {doc.isPinned && (
                              <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded flex items-center">
                                <Pin className="w-2.5 h-2.5 mr-0.5" /> Sabit
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition leading-snug mt-0.5">
                            {doc.title}
                          </h4>
                        </div>
                      </div>
                    </div>

                    {doc.description && (
                      <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                        {doc.description}
                      </p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center space-x-3 text-[11px]">
                      <span>{doc.size}</span>
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" /> {doc.updatedAt}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setPreviewDoc(doc)}
                        className="p-1.5 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-700 transition cursor-pointer"
                        title="Belge Özeti"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <a
                        href={doc.driveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 font-bold transition text-[11px]"
                      >
                        <span>Aç</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* MODE 3: LIVE GOOGLE DRIVE EMBED (OPTIONAL) */}
      {viewMode === 'live' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-3.5 sm:p-5 space-y-4">
          <div className="rounded-2xl border border-slate-200 overflow-hidden bg-slate-100 relative min-h-[440px] sm:min-h-[550px]">
            <iframe
              src={GOOGLE_DRIVE_EMBED_URL}
              title="Kurumsal Google Drive Dizini"
              className="w-full h-[460px] sm:h-[620px] border-0"
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2.5">
                {getFileIcon(previewDoc.fileType)}
                <h4 className="font-bold text-sm text-slate-900">{previewDoc.title}</h4>
              </div>
              <button onClick={() => setPreviewDoc(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5">
                <div><strong>Klasör:</strong> {previewDoc.folderName}</div>
                <div><strong>Boyut:</strong> {previewDoc.size} • <strong>Güncelleme:</strong> {previewDoc.updatedAt}</div>
                <div><strong>Açıklama:</strong> {previewDoc.description || 'Belirtilmemiş.'}</div>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 cursor-pointer"
              >
                Kapat
              </button>
              <a
                href={previewDoc.driveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 flex items-center space-x-1.5"
              >
                <span>Belgeyi Aç</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
