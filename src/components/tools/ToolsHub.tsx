import React from 'react';
import { TemplatesHub } from './TemplatesHub';
import { AcademicCalendarView } from './AcademicCalendarView';
import { CourseScheduleQuery } from './CourseScheduleQuery';
import { GradeCalculator } from './GradeCalculator';
import { UsefulLinksView } from './UsefulLinksView';
import { AdvisorDirectoryView } from './AdvisorDirectoryView';
import { 
  FileText, 
  Calendar, 
  Calculator, 
  Wrench, 
  Clock, 
  Globe, 
  Users 
} from 'lucide-react';

interface ToolsHubProps {
  selectedTool: string;
  setSelectedTool: (tool: string) => void;
}

export const ToolsHub: React.FC<ToolsHubProps> = ({ selectedTool, setSelectedTool }) => {
  return (
    <div className="space-y-6">

      {/* Top Header Card */}
      <div className="bg-white p-4 sm:p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-amber-500/20 text-amber-800 flex items-center justify-center font-bold border border-amber-500/30 flex-shrink-0">
            <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-amber-700" />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
              Akademik Faydalı Araçlar
            </h1>
            <p className="text-xs text-slate-500">
              Hocalarımızın ders, sınav, idari dilekçe ve notlandırma süreçlerini hızlandıran dijital araçlar.
            </p>
          </div>
        </div>

        {/* Tools Segmented Buttons (Pusula & Piksel Mobil Ergonomi) */}
        <div className="flex items-center p-1 bg-slate-100 rounded-2xl overflow-x-auto no-scrollbar -mx-1 px-1 sm:mx-0 sm:px-1">
          <button
            onClick={() => setSelectedTool('links')}
            className={`flex items-center space-x-1.5 px-3 sm:px-3.5 py-2 sm:py-2.5 min-h-[42px] sm:min-h-[44px] rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer active:scale-95 ${
              selectedTool === 'links'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
            <span>Faydalı Linkler</span>
          </button>

          <button
            onClick={() => setSelectedTool('schedule')}
            className={`flex items-center space-x-1.5 px-3 sm:px-3.5 py-2 sm:py-2.5 min-h-[42px] sm:min-h-[44px] rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer active:scale-95 ${
              selectedTool === 'schedule'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
            <span>Ders Programı</span>
          </button>

          <button
            onClick={() => setSelectedTool('advisors')}
            className={`flex items-center space-x-1.5 px-3 sm:px-3.5 py-2 sm:py-2.5 min-h-[42px] sm:min-h-[44px] rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer active:scale-95 ${
              selectedTool === 'advisors'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
            <span>Danışmanlar & Rehber</span>
          </button>

          <button
            onClick={() => setSelectedTool('calendar')}
            className={`flex items-center space-x-1.5 px-3 sm:px-3.5 py-2 sm:py-2.5 min-h-[42px] sm:min-h-[44px] rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer active:scale-95 ${
              selectedTool === 'calendar'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
            <span>Akademik Takvim</span>
          </button>

          <button
            onClick={() => setSelectedTool('forms')}
            className={`flex items-center space-x-1.5 px-3 sm:px-3.5 py-2 sm:py-2.5 min-h-[42px] sm:min-h-[44px] rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer active:scale-95 ${
              selectedTool === 'forms'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
            <span>Formlar</span>
          </button>

          <button
            onClick={() => setSelectedTool('grade')}
            className={`flex items-center space-x-1.5 px-3 sm:px-3.5 py-2 sm:py-2.5 min-h-[42px] sm:min-h-[44px] rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer active:scale-95 ${
              selectedTool === 'grade'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
            <span>Not Hesaplama</span>
          </button>
        </div>
      </div>

      {/* Render active tool */}
      {selectedTool === 'links' && <UsefulLinksView />}
      {selectedTool === 'schedule' && <CourseScheduleQuery />}
      {(selectedTool === 'advisors' || selectedTool === 'duties') && (
        <AdvisorDirectoryView initialTab={selectedTool === 'duties' ? 'duties' : 'staff'} />
      )}
      {selectedTool === 'calendar' && <AcademicCalendarView />}
      {selectedTool === 'forms' && <TemplatesHub />}
      {selectedTool === 'grade' && <GradeCalculator />}

    </div>
  );
};
