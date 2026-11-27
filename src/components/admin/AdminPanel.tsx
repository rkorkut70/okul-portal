import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  Users,
  LogIn,
  Activity,
  Search,
  Download,
  Trash2,
  RefreshCw,
  ShieldCheck,
  Clock,
  UserCheck,
  FilePlus2,
  LogOut,
  Compass,
  KeyRound,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import {
  getRegisteredUsers,
  getAuditLogs,
  updateRegisteredUserRole,
  clearAuditLogs,
  addAuditLog,
} from '../../utils/auditLog';
import type { AuditActionType, AuditLogEntry, RegisteredUserRecord, UserRole } from '../../types';

const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Sistem Yöneticisi (Admin)',
  cpd_manager: 'CPD Birim Sorumlusu',
  instructor: 'Öğretim Elemanı',
};

const ROLE_BADGE_CLASSES: Record<UserRole, string> = {
  admin: 'bg-amber-100 text-amber-900 border-amber-200',
  cpd_manager: 'bg-blue-100 text-blue-900 border-blue-200',
  instructor: 'bg-slate-100 text-slate-700 border-slate-200',
};

const ACTION_META: Record<
  AuditActionType,
  { label: string; badgeClass: string; Icon: React.ComponentType<{ className?: string }> }
> = {
  login: {
    label: 'Giriş',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    Icon: LogIn,
  },
  register: {
    label: 'İlk Kayıt',
    badgeClass: 'bg-blue-100 text-blue-800 border-blue-200',
    Icon: KeyRound,
  },
  logout: {
    label: 'Çıkış',
    badgeClass: 'bg-slate-100 text-slate-700 border-slate-200',
    Icon: LogOut,
  },
  role_change: {
    label: 'Yetki Değişikliği',
    badgeClass: 'bg-amber-100 text-amber-900 border-amber-200',
    Icon: ShieldCheck,
  },
  cpd_activity_add: {
    label: 'CPD Faaliyeti',
    badgeClass: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    Icon: FilePlus2,
  },
  navigation: {
    label: 'Modül Gezintisi',
    badgeClass: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    Icon: Compass,
  },
};

function formatDateTime(iso: string): string {
  try {
    return new Date(iso).toLocaleString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

export const AdminPanel: React.FC = () => {
  const { user, switchRole } = useAuth();
  const [activeSubTab, setActiveSubTab] = useState<'users' | 'logins' | 'activities'>('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all');
  const [actionFilter, setActionFilter] = useState<'all' | AuditActionType>('all');
  const [refreshTick, setRefreshTick] = useState(0);

  const users = useMemo<RegisteredUserRecord[]>(() => {
    void refreshTick;
    return getRegisteredUsers();
  }, [refreshTick]);

  const logs = useMemo<AuditLogEntry[]>(() => {
    void refreshTick;
    return getAuditLogs();
  }, [refreshTick]);

  if (user?.role !== 'admin') {
    return (
      <div className="bg-white rounded-3xl p-8 border border-rose-200 shadow-xs text-center space-y-3">
        <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">Yetkisiz Erişim</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Bu alan yalnızca Sistem Yöneticisi (Admin) yetkisine sahip kullanıcılar tarafından görüntülenebilir.
        </p>
      </div>
    );
  }

  const totalLogins = users.reduce((acc, u) => acc + (u.loginCount || 0), 0);
  const todayPrefix = new Date().toISOString().slice(0, 10);
  const todayLogsCount = logs.filter((l) => l.timestamp.startsWith(todayPrefix)).length;

  const filteredUsers = users.filter((u) => {
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.department.toLowerCase().includes(q) ||
      u.title.toLowerCase().includes(q);
    return matchesRole && matchesSearch;
  });

  const loginLogs = logs.filter((l) => l.action === 'login' || l.action === 'register' || l.action === 'logout');

  const filteredLogs = (activeSubTab === 'logins' ? loginLogs : logs).filter((l) => {
    const matchesAction = activeSubTab === 'logins' || actionFilter === 'all' || l.action === actionFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      l.userName.toLowerCase().includes(q) ||
      l.userEmail.toLowerCase().includes(q) ||
      l.description.toLowerCase().includes(q);
    return matchesAction && matchesSearch;
  });

  const handleRoleUpdate = (targetEmail: string, targetName: string, newRole: UserRole) => {
    updateRegisteredUserRole(targetEmail, newRole);
    addAuditLog({
      userEmail: user.email,
      userName: user.name,
      userRole: user.role,
      action: 'role_change',
      description: `${targetName} (${targetEmail}) rolü "${ROLE_LABELS[newRole]}" olarak güncellendi`,
    });
    if (user.email.toLowerCase() === targetEmail.toLowerCase()) {
      switchRole(newRole);
    }
    setRefreshTick((t) => t + 1);
  };

  const handleExportCsv = () => {
    const headers = ['Tarih', 'Kullanıcı', 'E-posta', 'Rol', 'İşlem', 'Açıklama'];
    const rows = filteredLogs.map((l) => [
      formatDateTime(l.timestamp),
      l.userName,
      l.userEmail,
      ROLE_LABELS[l.userRole] || l.userRole,
      ACTION_META[l.action]?.label || l.action,
      l.description,
    ]);
    const csvContent =
      '\uFEFF' +
      [headers, ...rows]
        .map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
        .join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `adu-portal-kayitlar-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleClearLogs = () => {
    if (window.confirm('Tüm giriş ve aktivite kayıtlarını temizlemek istediğinize emin misiniz?')) {
      clearAuditLogs();
      setRefreshTick((t) => t + 1);
    }
  };

  return (
    <div className="space-y-6">
      {/* Üst Başlık Kartı */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#0f2942] text-amber-400 flex items-center justify-center shadow-lg shrink-0">
              <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <div>
              <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-100 text-amber-900">
                Yönetim & Denetim Merkezi
              </span>
              <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight mt-1">
                Admin Paneli
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Portal kullanıcı bilgileri, yetki rolleri, oturum girişleri ve sistem içi aktiviteler burada kayıt altına alınır.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setRefreshTick((t) => t + 1)}
            className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition active:scale-95 cursor-pointer self-start md:self-auto"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Kayıtları Yenile</span>
          </button>
        </div>

        {/* Özet KPI Kartları */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-5">
          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/70">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Kayıtlı Kullanıcı</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">{users.length}</div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/70">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Toplam Giriş</span>
              <LogIn className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">{totalLogins}</div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/70">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Kayıtlı Aktivite</span>
              <Activity className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">{logs.length}</div>
          </div>

          <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/70">
            <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Bugünkü İşlem</span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 mt-1">{todayLogsCount}</div>
          </div>
        </div>

        {/* Alt Sekmeler */}
        <div className="flex items-center gap-2 border-t border-slate-100 mt-5 pt-4 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveSubTab('users')}
            className={`inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer ${
              activeSubTab === 'users'
                ? 'bg-[#0f2942] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Kullanıcı Bilgileri ({users.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('logins')}
            className={`inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer ${
              activeSubTab === 'logins'
                ? 'bg-[#0f2942] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <LogIn className="w-4 h-4" />
            <span>Giriş Kayıtları ({loginLogs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('activities')}
            className={`inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition active:scale-95 cursor-pointer ${
              activeSubTab === 'activities'
                ? 'bg-[#0f2942] text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Tüm Aktiviteler ({logs.length})</span>
          </button>
        </div>
      </div>

      {/* Filtre ve Arama Çubuğu */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              activeSubTab === 'users'
                ? 'Ad, e-posta, unvan veya birim ara...'
                : 'Kullanıcı adı, e-posta veya işlem açıklaması ara...'
            }
            className="w-full min-h-[44px] pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0f2942]/20"
          />
        </div>

        {activeSubTab === 'users' ? (
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as 'all' | UserRole)}
            aria-label="Rol filtresi"
            className="min-h-[44px] px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0f2942]/20"
          >
            <option value="all">Tüm Roller</option>
            <option value="admin">Sistem Yöneticisi (Admin)</option>
            <option value="cpd_manager">CPD Birim Sorumlusu</option>
            <option value="instructor">Öğretim Elemanı</option>
          </select>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            {activeSubTab === 'activities' && (
              <select
                value={actionFilter}
                onChange={(e) => setActionFilter(e.target.value as 'all' | AuditActionType)}
                aria-label="İşlem türü filtresi"
                className="min-h-[44px] px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#0f2942]/20"
              >
                <option value="all">Tüm İşlemler</option>
                <option value="login">Giriş</option>
                <option value="register">İlk Kayıt</option>
                <option value="logout">Çıkış</option>
                <option value="cpd_activity_add">CPD Faaliyeti</option>
                <option value="navigation">Modül Gezintisi</option>
                <option value="role_change">Yetki Değişikliği</option>
              </select>
            )}

            <button
              type="button"
              onClick={handleExportCsv}
              className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition active:scale-95 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>CSV İndir</span>
            </button>

            <button
              type="button"
              onClick={handleClearLogs}
              className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-bold transition active:scale-95 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              <span>Temizle</span>
            </button>
          </div>
        )}
      </div>

      {/* KULLANICI BİLGİLERİ TABLOSU */}
      {activeSubTab === 'users' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          {filteredUsers.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">
              Eşleşen kullanıcı kaydı bulunamadı.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3.5 px-4">Kullanıcı</th>
                    <th className="py-3.5 px-4">Birim / Görev Yeri</th>
                    <th className="py-3.5 px-4">Yetki Rolü</th>
                    <th className="py-3.5 px-4">Giriş Sayısı</th>
                    <th className="py-3.5 px-4">Son Giriş</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredUsers.map((u) => (
                    <tr key={u.email} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#0f2942] text-white font-bold flex items-center justify-center shrink-0">
                            {u.name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">
                              {u.title} {u.name}
                            </div>
                            <div className="text-[11px] text-slate-500">{u.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">{u.department}</td>
                      <td className="py-3.5 px-4">
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleUpdate(u.email, u.name, e.target.value as UserRole)}
                          aria-label={`${u.name} rol seçimi`}
                          className={`min-h-[38px] px-2.5 py-1 rounded-lg border text-xs font-semibold cursor-pointer ${ROLE_BADGE_CLASSES[u.role]}`}
                        >
                          <option value="instructor">Öğretim Elemanı</option>
                          <option value="cpd_manager">CPD Birim Sorumlusu</option>
                          <option value="admin">Sistem Yöneticisi (Admin)</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-800 font-bold">
                          <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                          {u.loginCount}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">
                        {formatDateTime(u.lastLoginAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* GİRİŞ VE AKTİVİTE KAYITLARI */}
      {(activeSubTab === 'logins' || activeSubTab === 'activities') && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          {filteredLogs.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500">
              Henüz kayıtlı işlem bulunmuyor.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredLogs.map((log) => {
                const meta = ACTION_META[log.action] || ACTION_META.navigation;
                const Icon = meta.Icon;
                return (
                  <div
                    key={log.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:bg-slate-50/70 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${meta.badgeClass}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{log.userName}</span>
                          <span className="text-[11px] text-slate-500">{log.userEmail}</span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${ROLE_BADGE_CLASSES[log.userRole]}`}>
                            {ROLE_LABELS[log.userRole]}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 mt-1">{log.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:flex-col sm:items-end shrink-0 pl-12 sm:pl-0">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${meta.badgeClass}`}>
                        {meta.label}
                      </span>
                      <span className="text-[11px] text-slate-400 whitespace-nowrap">
                        {formatDateTime(log.timestamp)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
