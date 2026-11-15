import React, { useState } from 'react';
import { 
  CheckSquare, 
  UserCheck, 
  Sparkles, 
  ArrowUpRight, 
  Clock, 
  FileCheck2 
} from 'lucide-react';

export const AssignmentTrackerCard: React.FC = () => {
  const [externalUrl] = useState('https://odev.adu.edu.tr');

  return (
    <div className="space-y-6">

      {/* Main Feature Showcase Card */}
      <div className="bg-gradient-to-br from-[#0f2942] via-slate-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
        
        {/* Background glow & accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-amber-400 text-slate-950">
              <CheckSquare className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Harici Akademik Entegrasyon
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
            Akademik Ödev & Proje Takip Sistemi
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Ders kapsamındaki öğrenci ödevlerinin toplanması, son teslim tarihi takibi, dosya yükleme kontrolleri 
            ve notlandırma süreçlerini yönetmek için fakültemiz öğretim elemanları tarafından geliştirilen bağımsız platform.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/10 text-xs font-medium border border-white/20 text-slate-200">
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>Geliştirici: Fakülte Öğretim Elemanı Koordinasyonu</span>
            </div>

            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-white/10 text-xs font-medium border border-white/20 text-slate-200">
              <Clock className="w-4 h-4 text-blue-300" />
              <span>7/24 Kesintisiz Erişim</span>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 font-black text-sm shadow-lg transition active:scale-95"
            >
              <span>Ödev Takip Sistemine Git</span>
              <ArrowUpRight className="w-4 h-4 stroke-[3]" />
            </a>

            <button
              onClick={() => alert(`Sistem bağlantı adresi: ${externalUrl}\nİlgili hocamızın geliştirdiği ödev takip platformuna yeni bir pencerede yönlendiriliyorsunuz.`)}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold border border-white/20 transition cursor-pointer"
            >
              Bağlantı Detayı & Yardım
            </button>
          </div>

        </div>

      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <FileCheck2 className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs text-slate-900">Öğrenci Dosya Teslimi</h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            PDF, ZIP ve rapor formatındaki ödevlerin belirlenen son teslim tarihine kadar güvenle yüklenmesi.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Clock className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs text-slate-900">Gecikme & Ceza Takibi</h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Geç teslim edilen ödevlerin zaman damgasıyla işaretlenmesi ve otomatik ceza puanı hesaplaması.
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs text-slate-900">Geri Bildirim & Notlandırma</h4>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Hocalarımızın tek ekrandan ödevleri inceleyip öğrenciye açıklamalı geri bildirim gönderebilmesi.
          </p>
        </div>

      </div>

    </div>
  );
};
