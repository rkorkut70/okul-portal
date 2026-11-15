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
  UserCheck
} from 'lucide-react';

interface CpdModuleProps {
  documents: DriveDocument[];
  activities: ActivityItem[];
  onAddActivity: (activity: ActivityItem) => void;
  defaultSubTab?: 'activities' | 'documents';
}

export const CpdModule: React.FC<CpdModuleProps> = ({
  documents,
  activities,
  onAddActivity,
  defaultSubTab = 'activities'
}) => {
  const { user } = useAuth();
  const isCpdManager = user?.role === 'cpd_manager' || user?.role === 'admin';

  const [activeSubTab, setActiveSubTab] = useState<'activities' | 'documents' | 'about'>(defaultSubTab);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      
      {/* CPD Birimi Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-900 flex items-center justify-center text-white shadow-lg flex-shrink-0">
              <GraduationCap className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 tracking-wide uppercase">
                  Akademik Birim 01 (Pilot)
                </span>
                <span className="inline-flex items-center text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  <UserCheck className="w-3 h-3 mr-1" />
                  Aktif Modül
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Sürekli Mesleki Gelişim Birimi (CPD)
              </h1>
              <p className="text-xs text-slate-500 max-w-2xl leading-relaxed">
                Öğretim elemanlarımızın pedagojik, dijital ve bilimsel yetkinliklerini artırmaya yönelik hizmet içi eğitimler, çalıştaylar ve akreditasyon döküman merkezi.
              </p>
            </div>
          </div>

          {/* Manager Info & Quick Action */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100">
            <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/80 text-xs text-slate-600 space-y-0.5">
              <div className="font-semibold text-slate-900 flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                <span>Birim Sorumlusu:</span>
              </div>
              <div>Doç. Dr. Ahmet Yılmaz</div>
              <div className="text-[10px] text-slate-400 flex items-center space-x-1">
                <Mail className="w-3 h-3 text-slate-400" />
                <span>ahmet.yilmaz@adu.edu.tr</span>
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

        {/* Sub Navigation Tabs */}
        <div className="flex items-center space-x-2 border-t border-slate-100 mt-6 pt-4 overflow-x-auto">
          <button
            onClick={() => setActiveSubTab('activities')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeSubTab === 'activities'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Yapılan İşler & Faaliyetler ({activities.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('documents')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeSubTab === 'documents'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <HardDrive className="w-3.5 h-3.5" />
            <span>Google Drive Belge Deposu ({documents.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('about')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              activeSubTab === 'about'
                ? 'bg-blue-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Info className="w-3.5 h-3.5" />
            <span>Birim Yönergesi & Amaç</span>
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

      {activeSubTab === 'documents' && (
        <DriveDocumentBrowser documents={documents} />
      )}

      {activeSubTab === 'about' && (
        <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-6">
          <div className="space-y-3">
            <h3 className="text-base font-bold text-slate-900">CPD Biriminin Görev ve Misyonu</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Adnan Menderes Üniversitesi Sürekli Mesleki Gelişim Birimi (CPD), 
              üniversitemizde görev yapan tüm öğretim elemanlarının çağdaş öğrenme-öğretme kuramları, 
              dijital öğretim teknolojileri, ölçme-değerlendirme yaklaşımları ve bilimsel araştırma metodolojileri alanlarında 
              kendilerini sürekli güncel tutmalarını sağlamak amacıyla kurulmuştur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="text-xs font-bold text-blue-900">1. Eğitici Eğitimi</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Yeni atanan ve kıdemli öğretim elemanlarına yönelik interaktif ders tasarımı ve yetişkin eğitimi seminerleri.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="text-xs font-bold text-indigo-900">2. Akreditasyon Desteği</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                YÖKAK kurumsal akreditasyon ölçütleri kapsamında sürekli iyileştirme, PUKÖ döngüsü ve program çıktısı kanıtları.
              </p>
            </div>
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
              <div className="text-xs font-bold text-emerald-900">3. Dijital Dönüşüm</div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Yapay zeka asistanları, harmanlanmış öğrenme ve online sınav araçlarının etkin ve etik kullanımı.
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
