import React, { useState } from 'react';
import type { ActivityItem } from '../../types';
import { 
  X, 
  Calendar, 
  Users, 
  Link as LinkIcon, 
  FileText, 
  CheckCircle2, 
  MapPin,
  Sparkles
} from 'lucide-react';

interface CpdAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddActivity: (activity: ActivityItem) => void;
}

export const CpdAdminModal: React.FC<CpdAdminModalProps> = ({ isOpen, onClose, onAddActivity }) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState<ActivityItem['category']>('Eğitim & Atölye');
  const [summary, setSummary] = useState('');
  const [targetAudience, setTargetAudience] = useState('Tüm Akademik Personel');
  const [participantCount, setParticipantCount] = useState<number | ''>('');
  const [status, setStatus] = useState<'completed' | 'upcoming'>('completed');
  const [location, setLocation] = useState('Merkez Kütüphane / Hibrit');
  const [driveDocTitle, setDriveDocTitle] = useState('');
  const [driveDocUrl, setDriveDocUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !summary) return;

    const newActivity: ActivityItem = {
      id: 'act-' + Date.now(),
      unitId: 'cpd',
      title,
      date,
      category,
      summary,
      targetAudience,
      participantCount: participantCount ? Number(participantCount) : undefined,
      status,
      location,
      driveDocTitle: driveDocTitle || undefined,
      driveDocUrl: driveDocUrl || (driveDocTitle ? 'https://drive.google.com' : undefined),
      organizer: 'CPD Koordinatörlüğü'
    };

    onAddActivity(newActivity);
    onClose();

    // Reset form
    setTitle('');
    setDate('');
    setSummary('');
    setParticipantCount('');
    setDriveDocTitle('');
    setDriveDocUrl('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Header */}
        <div className="bg-[#0f2942] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 flex items-center justify-center border border-amber-500/30">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base">Yeni CPD Faaliyeti / İş Özeti Ekle</h3>
              <p className="text-[11px] text-slate-300">CPD Birim Sorumlusu Giriş Ekranı</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Faaliyet / Çalıştay Başlığı *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Örn: Yükseköğretimde Üretken Yapay Zeka Atölyesi"
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ActivityItem['category'])}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
              >
                <option value="Eğitim & Atölye">Eğitim & Atölye</option>
                <option value="Seminer & Konferans">Seminer & Konferans</option>
                <option value="Akreditasyon">Akreditasyon</option>
                <option value="Toplantı & Karar">Toplantı & Karar</option>
                <option value="Yayın & Rehber">Yayın & Rehber</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Durum
              </label>
              <div className="flex rounded-xl bg-slate-100 p-1 text-xs">
                <button
                  type="button"
                  onClick={() => setStatus('completed')}
                  className={`flex-1 py-1 rounded-lg font-semibold transition ${
                    status === 'completed' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Tamamlandı
                </button>
                <button
                  type="button"
                  onClick={() => setStatus('upcoming')}
                  className={`flex-1 py-1 rounded-lg font-semibold transition ${
                    status === 'upcoming' ? 'bg-white text-amber-800 shadow-xs' : 'text-slate-500'
                  }`}
                >
                  Yaklaşan Etkinlik
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tarih ve Saat *
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="Örn: 28 Kasım 2025, 14:00"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mekan / Salon
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Örn: Rektörlük A Salonu / Zoom"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Hedef Kitle
              </label>
              <input
                type="text"
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="Örn: Tüm Akademik Personel"
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Katılımcı Sayısı (Varsa)
              </label>
              <div className="relative">
                <Users className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="number"
                  value={participantCount}
                  onChange={(e) => setParticipantCount(e.target.value ? Number(e.target.value) : '')}
                  placeholder="Örn: 75"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Faaliyet Özeti ve Kazanımları *
            </label>
            <textarea
              required
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Yapılan işin ana hatları, ele alınan konular, hedeflenen çıktılar..."
              className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          {/* Drive Integration Fields */}
          <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200/60 space-y-3">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-blue-900">
              <LinkIcon className="w-3.5 h-3.5 text-blue-700" />
              <span>İlişkili Google Drive Belgesi (Opsiyonel)</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Belge / Dosya Adı</label>
                <div className="relative">
                  <FileText className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                  <input
                    type="text"
                    value={driveDocTitle}
                    onChange={(e) => setDriveDocTitle(e.target.value)}
                    placeholder="Örn: Atölye_Sunumlari.pdf"
                    className="w-full pl-8 pr-2 py-1.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-600 mb-1">Google Drive Paylaşım Linki</label>
                <input
                  type="url"
                  value={driveDocUrl}
                  onChange={(e) => setDriveDocUrl(e.target.value)}
                  placeholder="https://drive.google.com/..."
                  className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none"
                />
              </div>
            </div>
            <p className="text-[10px] text-slate-500">
              Drive linki eklediğinizde hocalar portaldan tek tıkla ilgili evrak veya sunuma ulaşabilir.
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="pt-2 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition"
            >
              İptal
            </button>
            <button
              type="submit"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-800 hover:bg-blue-900 transition shadow-md active:scale-95"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Faaliyeti Kaydet</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
