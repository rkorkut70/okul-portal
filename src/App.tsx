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

  // Persistent activities in localStorage (ensure official 2026-2027 workshops are included)
  const [activities, setActivities] = useState<ActivityItem[]>(() => {
    const saved = localStorage.getItem('adu_portal_activities');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Remove old mock/dummy activity items if previously stored in browser
          const cleanSaved = parsed.filter((a: ActivityItem) => !['act-1', 'act-2', 'act-3', 'act-4', 'act-5'].includes(a.id));
          const existingIds = new Set(cleanSaved.map((a: ActivityItem) => a.id));
          const missing = CPD_ACTIVITIES.filter(a => !existingIds.has(a.id));
          return [...missing, ...cleanSaved];
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
    localStorage.setItem('adu_portal_activities', JSON.stringify(activities));
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
        <main className="flex-1 min-w-0 pb-20 md:pb-6">
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
