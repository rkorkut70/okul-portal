import React, { useState } from 'react';
import type { ActivityItem } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { 
  Calendar, 
  Users, 
  MapPin, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Plus, 
  Search, 
  Award,
  Sparkles,
  FileText
} from 'lucide-react';

interface ActivityTimelineProps {
  activities: ActivityItem[];
  onOpenAddModal: () => void;
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ activities, onOpenAddModal }) => {
  const { user } = useAuth();
  const isCpdManager = user?.role === 'cpd_manager' || user?.role === 'admin';

  const [statusFilter, setStatusFilter] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Categories list
  const categories = ['all', 'Eğitim & Atölye', 'Seminer & Konferans', 'Akreditasyon', 'Toplantı & Karar'];

  // Calculate statistics
  const totalCompleted = activities.filter(a => a.status === 'completed').length;
  const totalUpcoming = activities.filter(a => a.status === 'upcoming').length;
  const totalParticipants = activities.reduce((acc, a) => acc + (a.participantCount || 0), 0);
  const accreditationCount = activities.filter(a => a.category === 'Akreditasyon').length;

  // Filter logic
  const filteredActivities = activities.filter((act) => {
    const matchesStatus = statusFilter === 'all' || act.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || act.category === categoryFilter;
    const matchesSearch = 
      act.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      act.targetAudience.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">

      {/* Metric Cards Banner */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-extrabold text-slate-900">{totalCompleted}</div>
            <div className="text-[11px] text-slate-500 font-medium">Tamamlanan Faaliyet</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-extrabold text-slate-900">{totalUpcoming}</div>
            <div className="text-[11px] text-slate-500 font-medium">Yaklaşan Etkinlik</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-extrabold text-slate-900">{totalParticipants}+</div>
            <div className="text-[11px] text-slate-500 font-medium">Toplam Katılımcı</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-extrabold text-slate-900">{accreditationCount}</div>
            <div className="text-[11px] text-slate-500 font-medium">Akreditasyon İşi</div>
          </div>
        </div>
      </div>

      {/* Toolbar & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Status Tabs */}
          <div className="inline-flex p-1 bg-slate-100 rounded-xl text-xs font-semibold self-start sm:self-auto">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-1.5 rounded-lg transition ${
                statusFilter === 'all' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tüm Faaliyetler ({activities.length})
            </button>
            <button
              onClick={() => setStatusFilter('upcoming')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5 ${
                statusFilter === 'upcoming' ? 'bg-amber-500 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Yaklaşanlar</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full">{totalUpcoming}</span>
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-1.5 rounded-lg transition flex items-center space-x-1.5 ${
                statusFilter === 'completed' ? 'bg-blue-800 text-white shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span>Tamamlananlar Arşivi</span>
              <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full">{totalCompleted}</span>
            </button>
          </div>

          {/* Action: Add Activity (For CPD Manager) */}
          {isCpdManager ? (
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center justify-center space-x-2 px-4 py-2 rounded-xl bg-[#0f2942] hover:bg-blue-900 text-white text-xs font-bold shadow-md transition active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>Yeni Faaliyet / İş Özeti Ekle</span>
            </button>
          ) : (
            <div className="text-[11px] text-slate-400 hidden lg:flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Bilgi girişleri yetkili CPD koordinatörlüğünce yapılır.</span>
            </div>
          )}

        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-slate-100">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Faaliyet başlığı, hedef kitle veya özet ara..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
            />
          </div>

          <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`text-[11px] px-2.5 py-1 rounded-lg transition whitespace-nowrap font-medium ${
                  categoryFilter === cat
                    ? 'bg-slate-800 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'Tüm Kategoriler' : cat}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Activity Cards List */}
      <div className="space-y-4">
        {filteredActivities.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center space-y-2">
            <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
            <h4 className="font-semibold text-sm text-slate-700">Seçili kriterde kayıtlı faaliyet bulunamadı</h4>
            <p className="text-xs text-slate-400">Lütfen filtreleri sıfırlayın veya yeni bir arama yapın.</p>
          </div>
        ) : (
          filteredActivities.map((act) => {
            const isUpcoming = act.status === 'upcoming';

            return (
              <div
                key={act.id}
                className={`bg-white rounded-2xl border p-5 shadow-xs transition hover:shadow-md ${
                  isUpcoming ? 'border-amber-300/80 bg-gradient-to-r from-amber-50/30 to-white' : 'border-slate-200'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                  
                  {/* Left Column: Details */}
                  <div className="space-y-2.5 flex-1">
                    
                    {/* Header Badges */}
                    <div className="flex items-center flex-wrap gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        isUpcoming ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                      }`}>
                        {isUpcoming ? 'Yaklaşan Etkinlik' : 'Tamamlandı'}
                      </span>

                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                        {act.category}
                      </span>

                      {act.participantCount && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 flex items-center space-x-1">
                          <Users className="w-3 h-3 text-slate-500 mr-1" />
                          <span>{act.participantCount} Katılımcı</span>
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h4 className="font-bold text-sm sm:text-base text-slate-900 leading-snug">
                      {act.title}
                    </h4>

                    {/* Metadata: Date, Location, Target */}
                    <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-slate-500">
                      <div className="flex items-center space-x-1.5 font-medium text-slate-700">
                        <Calendar className="w-3.5 h-3.5 text-blue-700" />
                        <span>{act.date}</span>
                      </div>
                      {act.location && (
                        <div className="flex items-center space-x-1.5">
                          <MapPin className="w-3.5 h-3.5 text-rose-500" />
                          <span>{act.location}</span>
                        </div>
                      )}
                      <div className="flex items-center space-x-1.5">
                        <Users className="w-3.5 h-3.5 text-slate-400" />
                        <span>Hedef: <strong className="text-slate-700">{act.targetAudience}</strong></span>
                      </div>
                    </div>

                    {/* Summary Paragraph */}
                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                      {act.summary}
                    </p>

                  </div>

                  {/* Right Column: Attached Document Link */}
                  {act.driveDocUrl && (
                    <div className="md:w-64 flex-shrink-0 pt-2 md:pt-0">
                      <div className="bg-blue-50/80 p-3 rounded-xl border border-blue-100 space-y-2">
                        <div className="text-[10px] font-bold text-blue-900 uppercase tracking-wider flex items-center space-x-1">
                          <FileText className="w-3 h-3 text-blue-700" />
                          <span>İlişkili Drive Belgesi</span>
                        </div>
                        <p className="text-xs font-semibold text-slate-800 line-clamp-2 leading-tight">
                          {act.driveDocTitle || 'Faaliyet Raporu & Belgeleri'}
                        </p>
                        <a
                          href={act.driveDocUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 hover:underline pt-1"
                        >
                          <span>Drive'da Görüntüle</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
