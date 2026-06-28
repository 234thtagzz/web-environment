import { useContext } from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import SystemModal from './components/SystemModal';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

// javascript
import '../data/nav.js';

// View Tabs
import AuthView from './views/AuthView';
import DashboardTab from './tabs/DashboardTab';
import LeaderboardTab from './tabs/LeaderboardTab';
import AIConsultantTab from './tabs/AIConsultantTab';
import ESGReporterTab from './tabs/ESGReporterTab';
import ProposalTab from './tabs/ProposalTab';

function MainAppLayout() {
  const { isAuthenticated, activeTab } = useContext(AppContext);

  // Jika belum login, tampilkan layar gerbang AuthView
  if (!isAuthenticated) {
    return <AuthView />;
  }

  // Router internal untuk merender tab aktif secara dinamis
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardTab />;
      case 'leaderboard':
        return <LeaderboardTab />;
      case 'aiconsultant':
        return <AIConsultantTab />;
      case 'esgreporter':
        return <ESGReporterTab />;
      case 'proposal':
        return <ProposalTab />;
      default:
        return <DashboardTab />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50 dark:bg-[#060913] text-slate-800 dark:text-slate-100 font-sans antialiased">
      {/* 1. Sidebar Kiri */}
      <Sidebar />

      {/* Container Konten Utama Kanan */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* 2. Header Atas */}
        <Header />

        {/* 3. Panel Area View Tab */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 relative">
          {renderActiveTabContent()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      {/* Memasang Modal di Root Teratas agar selalu Siaga */}
      <SystemModal />
      <MainAppLayout />
    </AppProvider>
  );
}