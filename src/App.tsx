import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { BottomNav } from './components/layout/BottomNav';
import { AuthModal } from './components/auth/AuthModal';
import { HomeDashboard } from './components/dashboard/HomeDashboard';
import { CpdModule } from './components/cpd/CpdModule';
import { DriveDocumentBrowser } from './components/cpd/DriveDocumentBrowser';
import { ToolsHub } from './components/tools/ToolsHub';
import { CPD_ACTIVITIES, CPD_DRIVE_DOCUMENTS } from './data/mockData';
import type { ActivityItem, DriveDocument } from './types';

export const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedTool, setSelectedTool] = useState<string>('forms');
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false);

  // Excel'den gelen resmi faaliyetler her zaman güncel tutulur; kullanıcının arayüzden eklediği özel kayıtlar v2 anahtarında saklanır
  const [activities, setActivities] = useState<ActivityItem[]>(() => {
    localStorage.removeItem('adu_portal_activities');
    const saved = localStorage.getItem('adu_portal_activities_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const excelIds = new Set(CPD_ACTIVITIES.map(a => a.id));
          const customSaved = parsed.filter((a: ActivityItem) => !excelIds.has(a.id));
          return [...customSaved, ...CPD_ACTIVITIES];
        }
      } catch {
        return CPD_ACTIVITIES;
      }
    }
    return CPD_ACTIVITIES;
  });

  // Persistent documents
  const [documents] = useState<DriveDocument[]>(CPD_DRIVE_DOCUMENTS);

  useEffect(() => {
    const excelIds = new Set(CPD_ACTIVITIES.map(a => a.id));
    const customOnly = activities.filter(a => !excelIds.has(a.id));
    localStorage.setItem('adu_portal_activities_v2', JSON.stringify(customOnly));
  }, [activities]);

  const handleAddActivity = (newActivity: ActivityItem) => {
    setActivities(prev => [newActivity, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      
      {/* Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main Layout Area */}
      <div className="max-w-7xl mx-auto w-full flex-1 flex px-3 sm:px-6 lg:px-8 py-4 sm:py-6 gap-6">
        
        {/* Desktop Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          selectedTool={selectedTool}
          setSelectedTool={setSelectedTool}
        />

        {/* Dynamic Main Body Content */}
        <main className="flex-1 min-w-0 pb-24 md:pb-8">
          {activeTab === 'home' && (
            <HomeDashboard
              setActiveTab={setActiveTab}
              setSelectedTool={setSelectedTool}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          )}

          {activeTab === 'cpd' && (
            <CpdModule
              documents={documents}
              activities={activities}
              onAddActivity={handleAddActivity}
              defaultSubTab="activities"
            />
          )}

          {activeTab === 'documents' && (
            <DriveDocumentBrowser documents={documents} />
          )}

          {activeTab === 'tools' && (
            <ToolsHub
              selectedTool={selectedTool}
              setSelectedTool={setSelectedTool}
            />
          )}
        </main>

      </div>

      {/* Mobile Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
