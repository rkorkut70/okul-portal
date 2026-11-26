import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  KeyRound,
  BookOpen,
  CalendarDays,
  FolderOpen,
  UserCheck,
  ArrowLeft,
} from 'lucide-react';
import { useAuth, findStaffByEmail } from '../../context/AuthContext';

export const LoginPage: React.FC = () => {
  const { loginWithPassword, startFirstTimeRegister, completeFirstTimeRegister } = useAuth();

  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // İlk giriş / şifre belirleme durumu
  const [registerStep, setRegisterStep] = useState<1 | 2>(1);
  const [verificationCode, setVerificationCode] = useState('');
  const [demoCodeDisplay, setDemoCodeDisplay] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [department, setDepartment] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [needsSetupPrompt, setNeedsSetupPrompt] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const matchedStaff = useMemo(() => findStaffByEmail(email), [email]);

  const resetMessages = () => {
    setError(null);
    setNeedsSetupPrompt(false);
    setSuccessMsg(null);
  };

  const switchMode = (nextMode: 'login' | 'register') => {
    setMode(nextMode);
    setRegisterStep(1);
    setPassword('');
    setVerificationCode('');
    setDemoCodeDisplay(null);
    resetMessages();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    setIsLoading(true);
    try {
      const res = await loginWithPassword(email, password);
      if (!res.success) {
        setError(res.message || 'Giriş yapılamadı.');
        setNeedsSetupPrompt(Boolean(res.needsSetup));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    setIsLoading(true);
    try {
      const res = await startFirstTimeRegister(email);
      if (!res.success) {
        setError(res.message || 'İşlem başarısız.');
        return;
      }

      if (matchedStaff) {
        setName(matchedStaff.name);
        setTitle(matchedStaff.title);
        setDepartment(matchedStaff.department);
      } else {
        const cleanEmail = email.trim().toLowerCase();
        const fallbackName = cleanEmail
          .split('@')[0]
          .split('.')
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join(' ');
        setName(fallbackName);
        setTitle('Öğr. Gör.');
        setDepartment('Yabancı Diller Yüksekokulu');
      }

      setDemoCodeDisplay(res.verificationCode || null);
      setSuccessMsg(res.message || 'Doğrulama kodu oluşturuldu.');
      setRegisterStep(2);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCompleteRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    resetMessages();
    setIsLoading(true);
    try {
      const res = await completeFirstTimeRegister(
        email,
        verificationCode,
        password,
        name,
        title,
        department
      );
      if (!res.success) {
        setError(res.message || 'Kayıt tamamlanamadı.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50/70 flex flex-col justify-center items-center p-4 sm:p-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Sol Kurumsal Tanıtım Paneli */}
        <div className="lg:col-span-5 bg-[#0f2942] text-white p-7 sm:p-9 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-blue-400/10 blur-2xl pointer-events-none" />

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2.5 bg-white/10 border border-white/15 px-3.5 py-2 rounded-xl mb-6">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="text-xs font-semibold tracking-wide text-amber-100 uppercase">
                ADÜ YDYO Kurumsal Erişim
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug mb-3">
              Yabancı Diller Yüksekokulu Portalı
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed mb-8">
              Akademik kadro duyuruları, Sürekli Mesleki Gelişim (CPD) etkinlik arşivi ve ortak belge deposuna güvenli erişim sağlayın.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <CalendarDays className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">CPD Etkinlik ve Eğitim Özeti</h2>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Gerçekleşen eğitim özetleri, katılım kayıtları ve etkinlik belgeleri tek noktada.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <FolderOpen className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">Web Belge ve Klasör Gezgini</h2>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Drive klasörlerine gitmeden portal içinden belge ve görselleri önizleyin.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">Kurumsal Kadro Eşleşmesi</h2>
                  <p className="text-xs text-slate-300 mt-0.5">
                    @adu.edu.tr adresinizle unvan ve biriminiz otomatik olarak tanımlanır.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mt-8 pt-5 border-t border-white/10 text-xs text-slate-400 flex items-center justify-between gap-2">
            <span>Aydın Adnan Menderes Üniversitesi</span>
            <span className="text-amber-400/90 font-medium">@adu.edu.tr</span>
          </div>
        </div>

        {/* Sağ Giriş / İlk Kayıt Form Paneli */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-center">
          {/* Sekme Seçimi */}
          <div className="flex p-1 bg-slate-100 rounded-xl mb-6" role="tablist" aria-label="Giriş yöntemleri">
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'login'}
              onClick={() => switchMode('login')}
              className={`flex-1 min-h-[44px] px-4 rounded-lg text-sm font-semibold transition-all active:scale-95 ${
                mode === 'login'
                  ? 'bg-white text-[#0f2942] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Giriş Yap
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'register'}
              onClick={() => switchMode('register')}
              className={`flex-1 min-h-[44px] px-4 rounded-lg text-sm font-semibold transition-all active:scale-95 ${
                mode === 'register'
                  ? 'bg-white text-[#0f2942] shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              İlk Kez Giriş / Şifre Belirle
            </button>
          </div>

          {/* Hata ve Bilgi Mesajları */}
          {error && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2.5 text-sm text-red-700">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p>{error}</p>
                {needsSetupPrompt && (
                  <button
                    type="button"
                    onClick={() => {
                      setMode('register');
                      setRegisterStep(1);
                      setError(null);
                      setNeedsSetupPrompt(false);
                    }}
                    className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#0f2942] underline underline-offset-2 hover:text-blue-700 min-h-[36px]"
                  >
                    İlk Kez Giriş / Şifre Belirle adımına geç <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}

          {successMsg && (
            <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-sm text-emerald-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* GİRİŞ YAP FORMU */}
          {mode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Portal Hesabınıza Giriş Yapın</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Kurumsal <span className="font-medium text-slate-700">@adu.edu.tr</span> e-posta adresiniz ve belirlediğiniz şifre ile devam edin.
                </p>
              </div>

              <div>
                <label htmlFor="login-email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Kurumsal E-posta Adresi
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="login-email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ad.soyad@adu.edu.tr"
                    className="w-full min-h-[48px] pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0f2942]/20 focus:border-[#0f2942] transition-colors"
                  />
                </div>
                {matchedStaff && (
                  <p className="mt-1.5 text-xs text-emerald-700 flex items-center gap-1.5 font-medium">
                    <UserCheck className="w-3.5 h-3.5 shrink-0" />
                    {matchedStaff.title} {matchedStaff.name} — {matchedStaff.department}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="login-password" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Şifre
                </label>
                <div className="relative">
                  <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="login-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full min-h-[48px] pl-11 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0f2942]/20 focus:border-[#0f2942] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-400 hover:text-slate-700 rounded-lg"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full min-h-[48px] bg-[#0f2942] hover:bg-[#173b5e] disabled:opacity-60 text-white font-semibold text-sm rounded-xl shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>{isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-xs text-slate-500 text-center pt-1">
                Henüz şifre oluşturmadıysanız{' '}
                <button
                  type="button"
                  onClick={() => switchMode('register')}
                  className="font-semibold text-[#0f2942] hover:underline"
                >
                  İlk Kez Giriş / Şifre Belirle
                </button>{' '}
                sekmesini kullanın.
              </p>
            </form>
          )}

          {/* İLK KEZ GİRİŞ / ŞİFRE BELİRLEME FORMU */}
          {mode === 'register' && registerStep === 1 && (
            <form onSubmit={handleStartRegister} className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">İlk Giriş ve Şifre Oluşturma</h2>
                <p className="text-sm text-slate-500 mt-1">
                  Kurumsal e-posta adresinizi girin; akademik/idari kadro kaydınız varsa bilgileriniz otomatik getirilir.
                </p>
              </div>

              <div>
                <label htmlFor="register-email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                  Kurumsal E-posta Adresi
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="register-email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ad.soyad@adu.edu.tr"
                    className="w-full min-h-[48px] pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0f2942]/20 focus:border-[#0f2942] transition-colors"
                  />
                </div>

                {matchedStaff && (
                  <div className="mt-2.5 p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-xs text-emerald-800">
                    <UserCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div>
                      <span className="font-bold">Kadro Eşleşmesi Bulundu:</span>{' '}
                      {matchedStaff.title} {matchedStaff.name} ({matchedStaff.department})
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full min-h-[48px] bg-[#0f2942] hover:bg-[#173b5e] disabled:opacity-60 text-white font-semibold text-sm rounded-xl shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4 text-amber-400" />
                <span>{isLoading ? 'Kod Hazırlanıyor...' : 'Doğrulama Kodu Oluştur'}</span>
              </button>
            </form>
          )}

          {mode === 'register' && registerStep === 2 && (
            <form onSubmit={handleCompleteRegister} className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Doğrulama ve Şifre Tanımlama</h2>
                  <p className="text-xs text-slate-500 mt-0.5">{email.trim().toLowerCase()}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setRegisterStep(1);
                    resetMessages();
                  }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 min-h-[44px] px-2"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  E-postayı Değiştir
                </button>
              </div>

              {demoCodeDisplay && (
                <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center justify-between gap-3">
                  <span>
                    <strong className="font-semibold">Doğrulama Kodu:</strong> E-posta servisi bağlı olmadığı için kod aşağıda gösterilmiştir.
                  </span>
                  <span className="font-mono font-bold text-base tracking-widest bg-white px-3 py-1 rounded-lg border border-amber-300 text-[#0f2942] shrink-0">
                    {demoCodeDisplay}
                  </span>
                </div>
              )}

              <div>
                <label htmlFor="verify-code" className="block text-xs font-semibold text-slate-700 mb-1">
                  6 Haneli Doğrulama Kodu
                </label>
                <input
                  id="verify-code"
                  type="text"
                  required
                  inputMode="numeric"
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="6 haneli kodu girin"
                  className="w-full min-h-[48px] px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono tracking-widest text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0f2942]/20 focus:border-[#0f2942]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label htmlFor="reg-name" className="block text-xs font-semibold text-slate-700 mb-1">
                    Ad Soyad
                  </label>
                  <input
                    id="reg-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0f2942]/20 focus:border-[#0f2942]"
                  />
                </div>
                <div>
                  <label htmlFor="reg-title" className="block text-xs font-semibold text-slate-700 mb-1">
                    Unvan
                  </label>
                  <input
                    id="reg-title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0f2942]/20 focus:border-[#0f2942]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="reg-dept" className="block text-xs font-semibold text-slate-700 mb-1">
                  Birim / Görev Yeri
                </label>
                <input
                  id="reg-dept"
                  type="text"
                  required
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full min-h-[44px] px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0f2942]/20 focus:border-[#0f2942]"
                />
              </div>

              <div>
                <label htmlFor="reg-password" className="block text-xs font-semibold text-slate-700 mb-1">
                  Yeni Şifre (En az 6 karakter)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="reg-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="En az 6 karakterli şifre belirleyin"
                    className="w-full min-h-[48px] pl-10 pr-12 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0f2942]/20 focus:border-[#0f2942]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={showPassword ? 'Şifreyi gizle' : 'Şifreyi göster'}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-400 hover:text-slate-700 rounded-lg"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full min-h-[48px] bg-[#0f2942] hover:bg-[#173b5e] disabled:opacity-60 text-white font-semibold text-sm rounded-xl shadow-sm transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>{isLoading ? 'Kaydediliyor...' : 'Şifreyi Kaydet ve Portala Gir'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
