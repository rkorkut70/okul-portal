import React, { useState } from 'react';
import {
  Calculator,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  Clock,
  Award,
  Info
} from 'lucide-react';

type LangKey = 'en' | 'de' | 'fr';
type LevelKey = '4A' | '4B';
type ProgramType = 'lisans' | 'onlisans';

interface CourseDistribution {
  name: string;
  hours: number;
}

interface ExamComponent {
  key: 'midterm' | 'quiz' | 'project' | 'online';
  label: string;
  count: number;
  weight: number;
}

interface LevelConfig {
  cefr: string;
  totalHours: number;
  courses: CourseDistribution[];
  components: ExamComponent[];
  finalWeight: number;
}

interface LanguageConfig {
  label: string;
  flag: string;
  projectDesc: string;
  levels: Record<LevelKey, LevelConfig>;
}

const PREP_SYSTEM: Record<LangKey, LanguageConfig> = {
  en: {
    label: 'İngilizce',
    flag: '🇬🇧',
    projectDesc: 'Derse katılım performansınız ve verilen ödevleri yerine getirme performansınız öğretim elemanları tarafından notlandırılır.',
    levels: {
      '4A': {
        cefr: 'A2 → B1+ (Başlangıç)',
        totalHours: 26,
        courses: [
          { name: 'Temel İngilizce (Main Course)', hours: 16 },
          { name: 'Yazma (Writing)', hours: 6 },
          { name: 'Konuşma (Speaking)', hours: 4 },
        ],
        components: [
          { key: 'midterm', label: 'Ara Sınav', count: 6, weight: 30 },
          { key: 'quiz', label: 'Quiz (Kısa Sınav)', count: 6, weight: 18 },
          { key: 'project', label: 'Proje', count: 2, weight: 4 },
          { key: 'online', label: 'Online Ödev', count: 2, weight: 8 },
        ],
        finalWeight: 40,
      },
      '4B': {
        cefr: 'B1 → B1+ (Alt-Orta)',
        totalHours: 20,
        courses: [
          { name: 'Temel İngilizce (Main Course)', hours: 11 },
          { name: 'Yazma (Writing)', hours: 6 },
          { name: 'Konuşma (Speaking)', hours: 3 },
        ],
        components: [
          { key: 'midterm', label: 'Ara Sınav', count: 4, weight: 28 },
          { key: 'quiz', label: 'Quiz (Kısa Sınav)', count: 4, weight: 16 },
          { key: 'project', label: 'Proje', count: 2, weight: 6 },
          { key: 'online', label: 'Online Ödev', count: 2, weight: 10 },
        ],
        finalWeight: 40,
      },
    },
  },
  de: {
    label: 'Almanca',
    flag: '🇩🇪',
    projectDesc: 'Hazırlık eğitimi boyunca gerçekleştireceğiniz Sunum ve Sınıf İçi Performans notlarınızın ortalaması proje notu olarak kaydedilir.',
    levels: {
      '4A': {
        cefr: 'A1 → B1 (Başlangıç)',
        totalHours: 26,
        courses: [
          { name: 'Temel Almanca (Grundkenntnisse)', hours: 26 },
        ],
        components: [
          { key: 'midterm', label: 'Ara Sınav', count: 6, weight: 36 },
          { key: 'quiz', label: 'Quiz (Kısa Sınav)', count: 6, weight: 18 },
          { key: 'project', label: 'Proje', count: 2, weight: 6 },
        ],
        finalWeight: 40,
      },
      '4B': {
        cefr: 'A2 → B1 (Alt-Orta)',
        totalHours: 20,
        courses: [
          { name: 'Temel Almanca (Grundkenntnisse)', hours: 20 },
        ],
        components: [
          { key: 'midterm', label: 'Ara Sınav', count: 4, weight: 36 },
          { key: 'quiz', label: 'Quiz (Kısa Sınav)', count: 4, weight: 16 },
          { key: 'project', label: 'Proje', count: 2, weight: 8 },
        ],
        finalWeight: 40,
      },
    },
  },
  fr: {
    label: 'Fransızca',
    flag: '🇫🇷',
    projectDesc: 'Hazırlık eğitimi boyunca Sınıf İçi Performans notlarınızın ve Fiil Çekim Sınavlarının ortalaması proje notu olarak kaydedilir.',
    levels: {
      '4A': {
        cefr: 'A1 → B1 (Başlangıç)',
        totalHours: 26,
        courses: [
          { name: 'Temel Fransızca (Méthode)', hours: 18 },
          { name: 'Dilbilgisi (Grammaire)', hours: 4 },
          { name: 'Okuma & Yazma (Comp. & Expr. Écrite)', hours: 2 },
          { name: 'Konuşma (Expression Orale)', hours: 2 },
        ],
        components: [
          { key: 'midterm', label: 'Ara Sınav', count: 6, weight: 36 },
          { key: 'quiz', label: 'Quiz (Kısa Sınav)', count: 6, weight: 18 },
          { key: 'project', label: 'Proje', count: 2, weight: 6 },
        ],
        finalWeight: 40,
      },
      '4B': {
        cefr: 'A2 → B1 (Alt-Orta)',
        totalHours: 20,
        courses: [
          { name: 'Temel Fransızca (Méthode)', hours: 12 },
          { name: 'Dilbilgisi (Grammaire)', hours: 4 },
          { name: 'Okuma & Yazma (Comp. & Expr. Écrite)', hours: 2 },
          { name: 'Konuşma (Expression Orale)', hours: 2 },
        ],
        components: [
          { key: 'midterm', label: 'Ara Sınav', count: 4, weight: 32 },
          { key: 'quiz', label: 'Quiz (Kısa Sınav)', count: 4, weight: 16 },
          { key: 'project', label: 'Proje', count: 2, weight: 12 },
        ],
        finalWeight: 40,
      },
    },
  },
};

export const GradeCalculator: React.FC = () => {
  const [lang, setLang] = useState<LangKey>('en');
  const [level, setLevel] = useState<LevelKey>('4A');
  const [programType, setProgramType] = useState<ProgramType>('lisans');

  const [scores, setScores] = useState<Record<'midterm' | 'quiz' | 'project' | 'online', number>>({
    midterm: 70,
    quiz: 75,
    project: 80,
    online: 85,
  });
  const [finalScore, setFinalScore] = useState<number>(70);

  const langConfig = PREP_SYSTEM[lang];
  const levelConfig = langConfig.levels[level];
  const passThreshold = programType === 'lisans' ? 70 : 50;
  const finalThreshold = 50; // Öğrenci El Kitabı: Final en az 50 olmalı

  // Yıl içi katkı hesaplama
  const inYearContribution = levelConfig.components.reduce((sum, comp) => {
    const val = scores[comp.key] ?? 0;
    return sum + val * (comp.weight / 100);
  }, 0);

  const finalContribution = finalScore * (levelConfig.finalWeight / 100);
  const totalScore = Math.round((inYearContribution + finalContribution) * 10) / 10;

  const passedFinalBaraj = finalScore >= finalThreshold;
  const passedOverall = passedFinalBaraj && totalScore >= passThreshold;

  // Hedef geçme notu için gereken minimum final puanı
  const rawNeededFinal = Math.ceil((passThreshold - inYearContribution) / (levelConfig.finalWeight / 100));
  const neededFinal = Math.max(finalThreshold, rawNeededFinal);

  const handleReset = () => {
    setScores({ midterm: 70, quiz: 75, project: 80, online: 85 });
    setFinalScore(70);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center font-bold flex-shrink-0">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-black text-base sm:text-lg text-slate-900">
                Hazırlık Not Hesaplama & Kur Sistemi
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                2026–2027 El Kitabı
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              İngilizce, Almanca ve Fransızca 4A/4B kurlarına göre resmi sınav sayıları, ağırlıklar ve başarı simülatörü.
            </p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 active:scale-95 self-start sm:self-auto cursor-pointer transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Puanları Sıfırla</span>
        </button>
      </div>

      {/* Selector Bar: Language, Kur (4A/4B), Program Type */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Dil Seçimi */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Yabancı Dil
          </label>
          <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-xl">
            {(['en', 'de', 'fr'] as LangKey[]).map((k) => (
              <button
                key={k}
                onClick={() => setLang(k)}
                className={`py-2 px-2 rounded-lg text-xs font-bold transition cursor-pointer active:scale-95 flex items-center justify-center space-x-1 ${
                  lang === k
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{PREP_SYSTEM[k].flag}</span>
                <span>{PREP_SYSTEM[k].label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Kur Seçimi */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Kur Seviyesi
          </label>
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl">
            {(['4A', '4B'] as LevelKey[]).map((lv) => (
              <button
                key={lv}
                onClick={() => setLevel(lv)}
                className={`py-2 px-3 rounded-lg text-xs font-bold transition cursor-pointer active:scale-95 ${
                  level === lv
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lv} Kuru ({langConfig.levels[lv].totalHours} Saat)
              </button>
            ))}
          </div>
        </div>

        {/* Program Türü */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
            Program Başarı Barajı
          </label>
          <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setProgramType('lisans')}
              className={`py-2 px-2 rounded-lg text-xs font-bold transition cursor-pointer active:scale-95 ${
                programType === 'lisans'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Lisans (Min. 70)
            </button>
            <button
              onClick={() => setProgramType('onlisans')}
              className={`py-2 px-2 rounded-lg text-xs font-bold transition cursor-pointer active:scale-95 ${
                programType === 'onlisans'
                  ? 'bg-emerald-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Ön-Lisans (Min. 50)
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Inputs + Result */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Inputs Column (2 cols on large) */}
        <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
              {langConfig.flag} {langConfig.label} • {level} Kuru Sınav Ortalamaları
            </h4>
            <span className="text-[11px] font-semibold text-blue-800 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              Yıl İçi %60 + Final %40
            </span>
          </div>

          {/* Dynamic Exam Components */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {levelConfig.components.map((comp) => {
              const val = scores[comp.key] ?? 0;
              return (
                <div key={comp.key} className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/80 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-900 block">
                        {comp.count} {comp.label}
                      </span>
                      <span className="text-[10px] text-slate-500">
                        Toplam Etki: <strong>%{comp.weight}</strong> (Adet: %{(comp.weight / comp.count).toFixed(1).replace('.0', '')})
                      </span>
                    </div>
                    <span className="text-sm font-black font-mono text-blue-800 bg-white px-2 py-0.5 rounded-lg border border-slate-200">
                      {val}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={val}
                    onChange={(e) => setScores(prev => ({ ...prev, [comp.key]: Number(e.target.value) }))}
                    className="w-full accent-blue-800 cursor-pointer"
                  />
                </div>
              );
            })}
          </div>

          {/* Final Input */}
          <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-200/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-bold text-slate-900 block">
                  Yıl Sonu (Final) Sınavı
                </span>
                <span className="text-[11px] text-amber-900">
                  Ağırlık: <strong>%{levelConfig.finalWeight}</strong> • Final Barajı: <strong>En az 50 puan</strong>
                </span>
              </div>
              <span className={`text-base font-black font-mono px-2.5 py-1 rounded-lg border ${
                passedFinalBaraj
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}>
                {finalScore}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={finalScore}
              onChange={(e) => setFinalScore(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer"
            />
          </div>

          {/* Proje Notu & Devam Notu */}
          <div className="bg-blue-50/70 p-3.5 rounded-xl border border-blue-100 text-xs text-blue-950 space-y-1.5">
            <div className="font-bold flex items-center space-x-1.5">
              <Info className="w-4 h-4 text-blue-700 flex-shrink-0" />
              <span>{langConfig.label} Proje Notu Nedir?</span>
            </div>
            <p className="text-blue-900/90 leading-relaxed">{langConfig.projectDesc}</p>
          </div>
        </div>

        {/* Result Column */}
        <div className="space-y-4">
          <div className={`p-6 rounded-3xl border shadow-sm space-y-4 ${
            passedOverall
              ? 'bg-gradient-to-br from-emerald-50 to-white border-emerald-300'
              : 'bg-gradient-to-br from-rose-50 to-white border-rose-300'
          }`}>
            <div className="text-center space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Yıl Sonu Başarı Notu
              </span>
              <div className="text-5xl font-black text-slate-900 tracking-tight">
                {totalScore}
              </div>
              <div className="text-xs text-slate-500">
                Yıl İçi Katkı: <strong>{inYearContribution.toFixed(1)}</strong> + Final: <strong>{finalContribution.toFixed(1)}</strong>
              </div>
            </div>

            <div className={`p-3 rounded-2xl border text-xs font-bold flex items-center justify-center space-x-2 ${
              passedOverall
                ? 'bg-emerald-600 text-white border-emerald-700'
                : 'bg-rose-600 text-white border-rose-700'
            }`}>
              {passedOverall ? (
                <>
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>BAŞARILI (Hazırlığı Geçer)</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span>
                    {!passedFinalBaraj
                      ? 'BAŞARISIZ (Final 50 Barajı Altı)'
                      : `BAŞARISIZ (${passThreshold} Puan Barajı Altı)`}
                  </span>
                </>
              )}
            </div>

            {/* Simulator */}
            <div className="bg-white/90 p-3.5 rounded-2xl border border-slate-200/80 space-y-1.5 text-xs">
              <div className="font-bold text-slate-800 flex items-center space-x-1.5">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Hedef Simülatörü ({passThreshold} Puan)</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Mevcut yıl içi puanlarınızla ({inYearContribution.toFixed(1)} katkı) geçebilmek için Finalden en az{' '}
                <strong className={neededFinal > 100 ? 'text-rose-700' : 'text-blue-800'}>
                  {neededFinal > 100 ? `${neededFinal} (Mümkün değil)` : `${neededFinal} puan`}
                </strong>{' '}
                almalısınız.
              </p>
            </div>
          </div>

          {/* Devam Zorunluluğu Kartı */}
          <div className="bg-slate-900 text-white p-4 rounded-2xl text-xs space-y-1.5">
            <div className="font-bold text-amber-400 flex items-center space-x-1.5">
              <Clock className="w-4 h-4" />
              <span>%80 Devam Zorunluluğu</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Öğretim yılı boyunca okutulan derslerin en az <strong>%80</strong>&apos;ine devam etmeyen öğrenciler final sınavına alınmaz ve hazırlık sınıfında başarısız sayılır.
            </p>
          </div>
        </div>
      </div>

      {/* Kur & Ders Saatleri Bilgi Kartı (2026-2027 El Kitabı) */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-blue-800" />
            <h4 className="font-bold text-sm sm:text-base text-slate-900">
              {langConfig.flag} {langConfig.label} — {level} Kuru Haftalık Ders Dağılımı
            </h4>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-800 font-bold">
              Hedef Seviye: {levelConfig.cefr}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-900 font-bold">
              Toplam {levelConfig.totalHours} Saat/Hafta
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {levelConfig.courses.map((c) => (
            <div key={c.name} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-800 pr-2">{c.name}</span>
              <span className="text-sm font-black text-blue-800 bg-white px-2.5 py-1 rounded-xl border border-slate-200 flex-shrink-0">
                {c.hours} sa
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
