import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { 
  X, 
  Mail, 
  Lock, 
  KeyRound, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { user, isAuthenticated, loginWithPassword, startFirstTimeRegister, completeFirstTimeRegister, logout } = useAuth();

  // 'login' | 'register_email' | 'register_verify'
  const [authMode, setAuthMode] = useState<'login' | 'register_email' | 'register_verify'>('login');
  
  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [fullName, setFullName] = useState('');
  const [title, setTitle] = useState('Dr. Öğr. Üyesi');
  const [department, setDepartment] = useState('Eğitim Fakültesi');

  // UI state
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await loginWithPassword(email, password);
      if (res.success) {
        onClose();
      } else {
        setError(res.message || 'Giriş yapılamadı.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const res = await startFirstTimeRegister(email);
      if (res.success && res.verificationCode) {
        setGeneratedCode(res.verificationCode);
        setVerificationCode(res.verificationCode); // autofill convenience for preview
        setSuccessMsg(`Kurumsal doğrulama kodunuz (${res.verificationCode}) üretildi.`);
        setAuthMode('register_verify');
      } else {
        setError(res.message || 'E-posta doğrulanamadı.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError('Şifreniz en az 6 karakter olmalıdır.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Şifreler birbiriyle eşleşmiyor.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await completeFirstTimeRegister(
        email,
        verificationCode,
        password,
        fullName,
        title,
        department
      );
      if (res.success) {
        onClose();
      } else {
        setError(res.message || 'Kayıt tamamlanamadı.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header Bar */}
        <div className="bg-[#0f2942] px-6 py-5 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-inner">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">ADÜ YDYO Kurumsal Giriş</h3>
              <p className="text-xs text-slate-300">@adu.edu.tr e-posta doğrulama</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">

          {/* Already logged in summary view */}
          {isAuthenticated && user ? (
            <div className="space-y-4 text-center py-2">
              <div className="w-16 h-16 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center mx-auto text-2xl font-bold border-2 border-blue-200">
                {user.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-lg text-slate-900">{user.name}</h4>
                <p className="text-xs text-slate-500">{user.email}</p>
                <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mt-2">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" />
                  {user.role === 'admin'
                    ? 'Sistem Yöneticisi (Admin)'
                    : user.role === 'cpd_manager'
                    ? 'CPD Birim Sorumlusu'
                    : 'Öğretim Elemanı'}
                </div>
              </div>
              <div className="pt-4 border-t border-slate-100 flex space-x-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                >
                  Kapat
                </button>
                <button
                  onClick={() => { logout(); onClose(); }}
                  className="flex-1 py-2.5 px-4 rounded-xl text-xs font-semibold bg-rose-600 text-white hover:bg-rose-700 transition"
                >
                  Çıkış Yap
                </button>
              </div>
            </div>
          ) : (
            <div>

              {/* Tabs: Giriş Yap / İlk Kez Giriş */}
              <div className="flex border-b border-slate-200 mb-5">
                <button
                  onClick={() => { setAuthMode('login'); setError(null); setSuccessMsg(null); }}
                  className={`flex-1 pb-3 text-xs font-semibold text-center transition border-b-2 ${
                    authMode === 'login'
                      ? 'border-blue-700 text-blue-800'
                      : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  Şifreyle Giriş
                </button>
                <button
                  onClick={() => { setAuthMode('register_email'); setError(null); setSuccessMsg(null); }}
                  className={`flex-1 pb-3 text-xs font-semibold text-center transition border-b-2 ${
                    authMode !== 'login'
                      ? 'border-blue-700 text-blue-800'
                      : 'border-transparent text-slate-400 hover:text-slate-600'
                  }`}
                >
                  İlk Kez Giriş (Kayıt Ol)
                </button>
              </div>

              {/* Error & Info Alerts */}
              {error && (
                <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              {successMsg && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {/* MODE 1: Standard Login */}
              {authMode === 'login' && (
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Kurumsal E-posta Adresi
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ad.soyad@adu.edu.tr"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                      />
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      Yalnızca <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-700">@adu.edu.tr</code> uzantısı geçerlidir.
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Şifreniz
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-[#0f2942] hover:bg-blue-900 transition shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Giriş Yap</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] space-y-1">
                    <div className="font-semibold flex items-center space-x-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Hızlı Test İpucu:</span>
                    </div>
                    <p>
                      CPD Birim Sorumlusu olarak girmek için e-postaya <code className="font-mono bg-white px-1 py-0.5 rounded border border-amber-300">cpd@adu.edu.tr</code> veya <code className="font-mono bg-white px-1 py-0.5 rounded border border-amber-300">ahmet.yilmaz@adu.edu.tr</code> yazabilirsiniz.
                    </p>
                  </div>
                </form>
              )}

              {/* MODE 2A: First Time Register - Email Input */}
              {authMode === 'register_email' && (
                <form onSubmit={handleStartRegister} className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 p-3 rounded-xl text-xs text-blue-900 space-y-1">
                    <p className="font-semibold">Şifresiz İlk Kayıt:</p>
                    <p className="text-[11px] text-blue-700 leading-relaxed">
                      Kurumsal e-posta adresinizi girin. E-postanıza tek kullanımlık 6 haneli doğrulama kodu gönderilecektir.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Kurumsal E-posta Adresiniz
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ornek.hoca@adu.edu.tr"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 transition shadow-md flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <span>Doğrulama Kodu Gönder</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* MODE 2B: First Time Register - Enter Code & Set Password */}
              {authMode === 'register_verify' && (
                <form onSubmit={handleCompleteRegister} className="space-y-3">
                  <div className="bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-xs text-amber-900">
                    <span className="font-semibold">{email}</span> adresine 6 haneli kod iletildi.
                    {generatedCode && (
                      <div className="mt-1 font-mono text-xs bg-white px-2 py-1 rounded border border-amber-300 font-bold inline-block">
                        Demo Kod: {generatedCode}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      6 Haneli Doğrulama Kodu
                    </label>
                    <div className="relative">
                      <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder="482910"
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 text-xs font-mono font-bold tracking-widest text-center focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Ad Soyad</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Örn: Dr. Mehmet Kaya"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Unvan</label>
                      <select
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-2 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none bg-white"
                      >
                        <option>Prof. Dr.</option>
                        <option>Doç. Dr.</option>
                        <option>Dr. Öğr. Üyesi</option>
                        <option>Öğr. Gör. Dr.</option>
                        <option>Öğr. Gör.</option>
                        <option>Arş. Gör. Dr.</option>
                        <option>Arş. Gör.</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Fakülte / Bölüm</label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="Örn: Fen Edebiyat Fakültesi"
                      className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Yeni Şifreniz</label>
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">Şifre Tekrar</label>
                      <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 transition shadow-md flex items-center justify-center space-x-2 cursor-pointer mt-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Şifremi Belirle ve Giriş Yap</span>
                  </button>
                </form>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
