import React, { useState } from 'react';
import { GRADE_SCALE_STANDARD } from '../../data/mockData';
import { 
  Calculator, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle,
  RotateCcw
} from 'lucide-react';

export const GradeCalculator: React.FC = () => {
  const [midtermScore, setMidtermScore] = useState<number>(65);
  const [midtermWeight, setMidtermWeight] = useState<number>(40);

  const [finalScore, setFinalScore] = useState<number>(70);
  const [finalWeight, setFinalWeight] = useState<number>(60);

  const [hasQuiz, setHasQuiz] = useState<boolean>(false);
  const [quizScore, setQuizScore] = useState<number>(80);
  const [quizWeight, setQuizWeight] = useState<number>(10);

  const [finalThreshold] = useState<number>(50); // ADÜ Final Barajı

  // Calculate actual weights sum
  const effectiveMidtermWeight = hasQuiz ? midtermWeight - quizWeight : midtermWeight;
  
  // Total weighted average
  let totalScore = 0;
  if (hasQuiz) {
    totalScore = (midtermScore * (effectiveMidtermWeight / 100)) + (quizScore * (quizWeight / 100)) + (finalScore * (finalWeight / 100));
  } else {
    totalScore = (midtermScore * (midtermWeight / 100)) + (finalScore * (finalWeight / 100));
  }
  totalScore = Math.round(totalScore * 10) / 10;

  // Determine letter grade
  const finalPassedBaraj = finalScore >= finalThreshold;
  let calculatedGrade = GRADE_SCALE_STANDARD.find(g => totalScore >= g.minScore) || GRADE_SCALE_STANDARD[GRADE_SCALE_STANDARD.length - 1];
  
  if (!finalPassedBaraj && totalScore >= 50) {
    // Failed due to final threshold baraj
    calculatedGrade = {
      letter: 'FF',
      gpa: 0.00,
      minScore: 0,
      status: 'Final Barajı Altında (Kaldı)',
      color: 'text-rose-700 bg-rose-50 border-rose-200'
    };
  }

  // Simulator: Needed final score for target grade
  const [targetLetter, setTargetLetter] = useState<string>('CB');
  const targetObj = GRADE_SCALE_STANDARD.find(g => g.letter === targetLetter);
  const targetMin = targetObj ? targetObj.minScore : 75;

  let neededFinal = 0;
  if (hasQuiz) {
    const currentBase = (midtermScore * (effectiveMidtermWeight / 100)) + (quizScore * (quizWeight / 100));
    neededFinal = Math.ceil((targetMin - currentBase) / (finalWeight / 100));
  } else {
    const currentBase = midtermScore * (midtermWeight / 100);
    neededFinal = Math.ceil((targetMin - currentBase) / (finalWeight / 100));
  }
  if (neededFinal < finalThreshold) neededFinal = finalThreshold;

  const handleReset = () => {
    setMidtermScore(65);
    setMidtermWeight(40);
    setFinalScore(70);
    setFinalWeight(60);
    setHasQuiz(false);
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-base text-slate-900">ADÜ Not & Harf Notu Hesaplama Aracı</h3>
            <p className="text-xs text-slate-500">
              Yarıyıl içi vize, ödev ve final oranlarına göre bağıl ve standart başarı notu simülatörü.
            </p>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 self-start sm:self-auto cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Sıfırla</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Inputs Column (2 cols on large) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-5">
          
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
            Sınav ve Ağırlık Bilgileri
          </h4>

          {/* Vize Input */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Ara Sınav (Vize) Notu</span>
              <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                Ağırlık: %{hasQuiz ? effectiveMidtermWeight : midtermWeight}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Puan (0 - 100)</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={midtermScore}
                  onChange={(e) => setMidtermScore(Math.min(100, Math.max(0, Number(e.target.value))))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Vize Ağırlığı (%)</label>
                <input
                  type="number"
                  min={10}
                  max={90}
                  value={midtermWeight}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setMidtermWeight(val);
                    setFinalWeight(100 - val);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>
          </div>

          {/* Final Input */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">Genel Sınav (Final / Büt) Notu</span>
              <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                Ağırlık: %{finalWeight}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Puan (0 - 100)</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={finalScore}
                  onChange={(e) => setFinalScore(Math.min(100, Math.max(0, Number(e.target.value))))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Final Ağırlığı (%)</label>
                <input
                  type="number"
                  min={10}
                  max={90}
                  value={finalWeight}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    setFinalWeight(val);
                    setMidtermWeight(100 - val);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm font-bold text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            </div>

            {finalScore < finalThreshold && (
              <div className="p-2.5 bg-rose-50 rounded-lg border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>ADÜ Yönetmeliği gereği final sınavından en az <strong>50</strong> alma şartı bulunmaktadır.</span>
              </div>
            )}
          </div>

          {/* Optional Quiz/Homework Checkbox */}
          <div className="border border-slate-200 rounded-xl p-3.5 space-y-3">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="quizCheck"
                checked={hasQuiz}
                onChange={(e) => setHasQuiz(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
              />
              <label htmlFor="quizCheck" className="text-xs font-semibold text-slate-800 cursor-pointer">
                Kısa Sınav (Quiz) / Dönem Ödevi / Proje Ekle
              </label>
            </div>

            {hasQuiz && (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Ödev/Quiz Puanı</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={quizScore}
                    onChange={(e) => setQuizScore(Math.min(100, Math.max(0, Number(e.target.value))))}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold bg-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Ödev Payı (% Vizeden Düşülür)</label>
                  <input
                    type="number"
                    min={5}
                    max={30}
                    value={quizWeight}
                    onChange={(e) => setQuizWeight(Number(e.target.value))}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-bold bg-white"
                  />
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Result & Target Simulator Column */}
        <div className="space-y-4">
          
          {/* Main Grade Result Card */}
          <div className="bg-[#0f2942] rounded-2xl p-5 text-white shadow-lg space-y-4 text-center">
            <span className="text-[11px] uppercase tracking-wider font-bold text-slate-300">
              Ağırlıklı Başarı Ortalaması
            </span>
            
            <div className="text-5xl font-black text-amber-400 tracking-tight">
              {totalScore}
            </div>

            <div className="py-3 px-4 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 flex items-center justify-around">
              <div>
                <div className="text-[10px] text-slate-300 uppercase">Harf Notu</div>
                <div className="text-2xl font-black text-white">{calculatedGrade.letter}</div>
              </div>
              <div className="h-8 w-[1px] bg-white/20" />
              <div>
                <div className="text-[10px] text-slate-300 uppercase">4'lük Katsayı</div>
                <div className="text-2xl font-black text-white">{calculatedGrade.gpa.toFixed(2)}</div>
              </div>
            </div>

            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/20 text-white">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{calculatedGrade.status}</span>
            </div>
          </div>

          {/* Final Simulator */}
          <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200/80 space-y-3">
            <div className="flex items-center space-x-2 text-amber-900 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Hedef Harf Notu Simülatörü</span>
            </div>
            <p className="text-[11px] text-amber-800 leading-tight">
              Öğrencinin bu vize notuyla hedeflediği harf notunu alması için finalden kaç alması gerekir?
            </p>

            <div className="flex items-center space-x-2">
              <select
                value={targetLetter}
                onChange={(e) => setTargetLetter(e.target.value)}
                className="w-24 px-2 py-1.5 rounded-lg border border-amber-300 bg-white text-xs font-bold text-amber-900"
              >
                <option value="AA">AA (90)</option>
                <option value="BA">BA (85)</option>
                <option value="BB">BB (80)</option>
                <option value="CB">CB (75)</option>
                <option value="CC">CC (65)</option>
                <option value="DC">DC (58)</option>
                <option value="DD">DD (50)</option>
              </select>

              <div className="flex-1 bg-white p-2 rounded-lg border border-amber-200 text-center">
                <span className="text-[10px] text-slate-400 block">Gereken Final Notu</span>
                <span className={`text-base font-extrabold ${neededFinal > 100 ? 'text-rose-600' : 'text-emerald-700'}`}>
                  {neededFinal > 100 ? 'İmkansız (>100)' : `${neededFinal} puan`}
                </span>
              </div>
            </div>
          </div>

          {/* Information Card */}
          <div className="p-3 bg-slate-100 rounded-xl text-[11px] text-slate-500 space-y-1">
            <div className="font-semibold text-slate-700 flex items-center space-x-1">
              <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
              <span>ADÜ Bağıl Not Baremi:</span>
            </div>
            <p>
              CC (65+) ve üzeri doğrudan başarılı, DC ve DD şartlı başarılıdır. Final barajı asgari 50'dir.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};
