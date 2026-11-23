import React, { useState } from 'react';
import type { ActivityItem, DriveDocument } from '../../types';
import { ActivityTimeline } from './ActivityTimeline';
import { DriveDocumentBrowser } from './DriveDocumentBrowser';
import { CpdAdminModal } from './CpdAdminModal';
import { useAuth } from '../../context/AuthContext';
import { 
  GraduationCap, 
  Calendar, 
  HardDrive, 
  Info, 
  Plus, 
  ShieldCheck, 
  Mail, 
  UserCheck,
  Sparkles,
  Phone,
  FileText
} from 'lucide-react';

interface CpdModuleProps {
  documents: DriveDocument[];
  activities: ActivityItem[];
  onAddActivity: (activity: ActivityItem) => void;
  defaultSubTab?: 'activities' | 'documents' | 'workshops';
}

export const CpdModule: React.FC<CpdModuleProps> = ({
  documents,
  activities,
  onAddActivity,
  defaultSubTab = 'activities'
}) => {
  const { user } = useAuth();
  const isCpdManager = user?.role === 'cpd_manager' || user?.role === 'admin';

  const [activeSubTab, setActiveSubTab] = useState<'activities' | 'workshops' | 'documents' | 'about'>(defaultSubTab);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      
      {/* CPD Birimi Header Card */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-start space-x-3 sm:space-x-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <GraduationCap className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 tracking-wide uppercase">
                  Akademik Birim 01 (Pilot)
                </span>
                <span className="inline-flex items-center text-[10px] sm:text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  <UserCheck className="w-3 h-3 mr-1" />
                  Aktif Modül
                </span>
              </div>
              <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
                Sürekli Mesleki Gelişim Birimi (CPD)
              </h1>
              <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                Öğretim elemanlarımızın pedagojik, dijital ve bilimsel yetkinliklerini artırmaya yönelik hizmet içi eğitimler, çalıştaylar ve akreditasyon döküman merkezi.
              </p>
            </div>
          </div>

          {/* Manager Info & Quick Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-xs text-slate-600 space-y-0.5 w-full sm:w-auto">
              <div className="font-semibold text-slate-900 flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                <span>Birim Sorumlusu:</span>
              </div>
              <div className="font-bold text-slate-900">Öğr. Gör. Pınar UĞUR</div>
              <div className="text-[10px] text-slate-500 flex items-center space-x-2">
                <span className="flex items-center space-x-1">
                  <Mail className="w-3 h-3 text-slate-400" />
                  <span>pinar.ugur@adu.edu.tr</span>
                </span>
                <span className="flex items-center space-x-1 font-mono font-semibold text-emerald-700 bg-emerald-50 px-1 rounded">
                  <Phone className="w-2.5 h-2.5" />
                  <span>Dahili: 4638</span>
                </span>
              </div>
            </div>

            {isCpdManager && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md transition active:scale-95 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Faaliyet Girişi</span>
              </button>
            )}
          </div>

        </div>

        {/* Sub Navigation Tabs (Pusula & Piksel Mobil Ergonomi) */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 border-t border-slate-100 mt-4 sm:mt-6 pt-3 sm:pt-4 overflow-x-auto no-scrollbar -mx-1 px-1 sm:mx-0">
          <button
            onClick={() => setActiveSubTab('activities')}
            className={`flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 min-h-[40px] rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer active:scale-95 ${
              activeSubTab === 'activities'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Etkinlik Takvimi & Faaliyetler ({activities.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('workshops')}
            className={`flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 min-h-[40px] rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer active:scale-95 ${
              activeSubTab === 'workshops'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>2026–2027 Workshop Programı</span>
          </button>

          <button
            onClick={() => setActiveSubTab('documents')}
            className={`flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 min-h-[40px] rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer active:scale-95 ${
              activeSubTab === 'documents'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5" />
            <span>Belge Deposu ({documents.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('about')}
            className={`flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 min-h-[40px] rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer active:scale-95 ${
              activeSubTab === 'about'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>Birim Yönergesi</span>
          </button>
        </div>

      </div>

      {/* Content Rendering */}
      {activeSubTab === 'activities' && (
        <ActivityTimeline
          activities={activities}
          onOpenAddModal={() => setIsAddModalOpen(true)}
        />
      )}

      {/* 2026-2027 Workshop Program Showcase */}
      {activeSubTab === 'workshops' && (
        <div className="space-y-6">
          {/* Header Info Banner */}
          <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-blue-800/80 text-[11px] font-bold text-blue-200 border border-blue-700/50">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>2026–2027 Akademik Yılı Hizmet İçi Eğitim</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Workshop ve Uygulamalı Atölye Programı
                </h2>
                <p className="text-xs text-blue-200/90 max-w-2xl leading-relaxed">
                  2025–2026 ders gözlem raporları (Planlı, Habersiz, Eşli) ile 2026–2027 İhtiyaç Analizi Anketi verilerine dayalı yayınevi iş birliğiyle planlanan 4 öncelikli atölye takvimi.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-xs text-blue-100 space-y-1 min-w-[200px]">
                <div className="font-bold text-white flex items-center space-x-1.5">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>Uygulama Esası</span>
                </div>
                <p className="text-[11px] text-blue-200 leading-snug">
                  Tüm diller için Türkçe, 13.30–15.30 (2x45 dk) uygulamalı (hands-on) atölye formatında.
                </p>
              </div>
            </div>
          </div>

          {/* 4 Prioritized Workshops Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Workshop 1 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 hover:border-blue-400 transition">
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="space-y-1">
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 uppercase tracking-wider">
                    1. ÖNCELİK
                  </span>
                  <h3 className="font-extrabold text-base text-slate-900 mt-1">
                    From Passive Screens to Active Minds: Designing Interactive Language Tasks with AI, H5P, and Canva
                  </h3>
                  <p className="text-xs text-blue-800 font-semibold">
                    Yapay Zekâ ve Etkileşimli Dijital Araçlarla Öğrenci Merkezli Materyal Tasarımı
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Tarih & Saat</span>
                  <span className="font-bold text-slate-900">11 Aralık 2026 Cuma</span>
                  <span className="text-slate-500 block text-[11px]">13.30–15.30 (2 x 45 dk)</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Odak Araçlar</span>
                  <span className="font-semibold text-slate-800 text-[11px] block">
                    Yapay Zekâ, H5P, Canva, Etkileşimli Platformlar
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs bg-blue-50/50 p-3 rounded-2xl border border-blue-100 text-blue-900">
                <strong className="block text-[11px] uppercase tracking-wider text-blue-950">Veri Gerekçesi:</strong>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  İhtiyaç Analizi Anketi'nde en yüksek talep gören ilk iki alan olan <strong>'Dijital materyal hazırlama' (%48,4)</strong> ve <strong>'Yabancı dil öğretiminde yapay zekâ kullanımı' (%45,2)</strong> başlıklarına doğrudan yanıt verir.
                </p>
              </div>
            </div>

            {/* Workshop 2 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 hover:border-blue-400 transition">
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="space-y-1">
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-blue-900 text-white uppercase tracking-wider">
                    2. ÖNCELİK
                  </span>
                  <h3 className="font-extrabold text-base text-slate-900 mt-1">
                    Smart & Instant Feedback: Automated Feedback Tools for Writing and Speaking
                  </h3>
                  <p className="text-xs text-blue-800 font-semibold">
                    Yapay Zekâ Destekli Otomatik Geri Bildirim Araçları (Yazma & Konuşma)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Tarih & Saat</span>
                  <span className="font-bold text-slate-900">26 Şubat 2027 Cuma</span>
                  <span className="text-slate-500 block text-[11px]">13.30–15.30 (2 x 45 dk)</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Odak Araçlar</span>
                  <span className="font-semibold text-slate-800 text-[11px] block">
                    Brisk, Write & Improve, ELSA, Speakable, Yoodli
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs bg-blue-50/50 p-3 rounded-2xl border border-blue-100 text-blue-900">
                <strong className="block text-[11px] uppercase tracking-wider text-blue-950">Veri Gerekçesi:</strong>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  İhtiyaç analizindeki <strong>'Otomatik geri bildirim araçları' (%32,3)</strong>, <strong>'Yazma teknikleri' (%32,3)</strong> ve <strong>'Konuşma teknikleri' (%25,8)</strong> taleplerini karşılar. Öğretmenlerin geri bildirim iş yükünü hafifletir.
                </p>
              </div>
            </div>

            {/* Workshop 3 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 hover:border-blue-400 transition">
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="space-y-1">
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-slate-800 text-white uppercase tracking-wider">
                    3. ÖNCELİK
                  </span>
                  <h3 className="font-extrabold text-base text-slate-900 mt-1">
                    Activating the Quiet Classroom: Task-Based Learning (TBL) & Dynamic Pair/Group Rotations
                  </h3>
                  <p className="text-xs text-blue-800 font-semibold">
                    Çekingen Öğrencileri Aktifleştirme ve Dinamik Grup/Eşli Çalışma Kurgusu
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Tarih & Saat</span>
                  <span className="font-bold text-slate-900">26 Mart 2027 Cuma</span>
                  <span className="text-slate-500 block text-[11px]">13.30–15.30 (2 x 45 dk)</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Odak Araçlar</span>
                  <span className="font-semibold text-slate-800 text-[11px] block">
                    Görev Temelli Öğrenme (TBL), Rotasyon Teknikleri
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs bg-blue-50/50 p-3 rounded-2xl border border-blue-100 text-blue-900">
                <strong className="block text-[11px] uppercase tracking-wider text-blue-950">Veri Gerekçesi:</strong>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  <strong>'Aktif öğrenme teknikleri' (%41,9)</strong> ve <strong>'TBL' (%35,5)</strong> talepleriyle birlikte; Planlı, Habersiz ve Eşli Ders Gözlemi raporlarında öne çıkan pasif/çekingen öğrencileri derse katma ihtiyacını hedefler.
                </p>
              </div>
            </div>

            {/* Workshop 4 */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4 hover:border-blue-400 transition">
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
                <div className="space-y-1">
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-slate-800 text-white uppercase tracking-wider">
                    4. ÖNCELİK
                  </span>
                  <h3 className="font-extrabold text-base text-slate-900 mt-1">
                    Crystal-Clear Setups & Smart Feedback: Mastering ICQs, CCQs, and Peer Correction
                  </h3>
                  <p className="text-xs text-blue-800 font-semibold">
                    Yönerge Netliği (ICQ/CCQ) ve Süreç Odaklı Hata Düzeltme / Akran Geri Bildirimi
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Tarih & Saat</span>
                  <span className="font-bold text-slate-900">07 Mayıs 2027 Cuma</span>
                  <span className="text-slate-500 block text-[11px]">13.30–15.30 (2 x 45 dk)</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Odak Araçlar</span>
                  <span className="font-semibold text-slate-800 text-[11px] block">
                    ICQ & CCQ Yapılandırma, Akran Kontrol Listeleri
                  </span>
                </div>
              </div>

              <div className="space-y-1.5 text-xs bg-blue-50/50 p-3 rounded-2xl border border-blue-100 text-blue-900">
                <strong className="block text-[11px] uppercase tracking-wider text-blue-950">Veri Gerekçesi:</strong>
                <p className="text-slate-700 leading-relaxed text-[11px]">
                  Üç farklı ders gözlem raporunda da (Planlı, Habersiz, Eşli) öne çıkan yönerge netliği, ICQ/CCQ kullanımı ve akıcılığı bozmadan akran geri bildirimi / gecikmeli hata düzeltme ihtiyacını karşılar.
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {activeSubTab === 'documents' && (
        <DriveDocumentBrowser documents={documents} />
      )}

      {activeSubTab === 'about' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-6">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">CPD Biriminin Görev ve Misyonu (Kalite El Kitabı Esaslı)</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Öğretim elemanlarının ve öğrencilerin ihtiyaç analizleri, geri bildirim formları, kurum öncelikleri ve sınıf içi öz/akran gözlemlerine dayalı olarak kolektif ve bireysel mesleki gelişim faaliyetlerini teşvik etmek ve organize etmektir.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="text-xs font-bold text-blue-900">1. Oryantasyon ve El Kitapları</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Öğrenci ve öğretim elemanı oryantasyon programlarını yürütmek; Öğrenci El Kitabı ve Öğretim Elemanı El Kitabı'nı (TR/EN) güncel tutmak.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="text-xs font-bold text-indigo-900">2. İhtiyaç Analizi & Çalıştaylar</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Yıllık anket bulgularına ve gözlem raporlarına dayalı 4 öncelikli uygulamalı çalıştay, seminer ve atölyeler organize etmek.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="text-xs font-bold text-emerald-900">3. Eşli ve Akran Gözlemleri</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Sistematik öz değerlendirme, akran sınıf gözlemi (peer observation) ve idari gözlem faaliyetlerini planlamak ve raporlamak.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Add Activity Modal for Authorized Users */}
      <CpdAdminModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddActivity={onAddActivity}
      />

    </div>
  );
};
