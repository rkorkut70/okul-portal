import React from 'react';
import { TemplatesHub } from './TemplatesHub';
import { AcademicCalendarView } from './AcademicCalendarView';
import { CourseScheduleQuery } from './CourseScheduleQuery';
import { GradeCalculator } from './GradeCalculator';
import { AssignmentTrackerCard } from './AssignmentTrackerCard';
import { UsefulLinksView } from './UsefulLinksView';
import { AdvisorDirectoryView } from './AdvisorDirectoryView';
import { 
  FileText, 
  Calendar, 
  Calculator, 
  ExternalLink,
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
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-800 flex items-center justify-center font-bold border border-amber-500/30">
            <Wrench className="w-6 h-6 text-amber-700" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Akademik Faydalı Araçlar
            </h1>
            <p className="text-xs text-slate-500">
              Hocalarımızın ders, sınav, idari dilekçe ve notlandırma süreçlerini hızlandıran dijital araçlar.
            </p>
          </div>
        </div>

        {/* Tools Segmented Buttons */}
        <div className="flex items-center p-1 bg-slate-100 rounded-2xl overflow-x-auto">
          <button
            onClick={() => setSelectedTool('links')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              selectedTool === 'links'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-blue-600" />
            <span>Faydalı Linkler</span>
          </button>

          <button
            onClick={() => setSelectedTool('schedule')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              selectedTool === 'schedule'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-teal-600" />
            <span>Ders Programı</span>
          </button>

          <button
            onClick={() => setSelectedTool('advisors')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              selectedTool === 'advisors'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-purple-600" />
            <span>Danışmanlar</span>
          </button>

          <button
            onClick={() => setSelectedTool('calendar')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              selectedTool === 'calendar'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-indigo-600" />
            <span>Akademik Takvim</span>
          </button>

          <button
            onClick={() => setSelectedTool('forms')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              selectedTool === 'forms'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-amber-600" />
            <span>Formlar</span>
          </button>

          <button
            onClick={() => setSelectedTool('grade')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              selectedTool === 'grade'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-3.5 h-3.5 text-emerald-600" />
            <span>Not Hesaplama</span>
          </button>

          <button
            onClick={() => setSelectedTool('assignment')}
            className={`flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
              selectedTool === 'assignment'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5 text-rose-600" />
            <span>Ödev Takip</span>
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
      {selectedTool === 'assignment' && <AssignmentTrackerCard />}

    </div>
  );
};
