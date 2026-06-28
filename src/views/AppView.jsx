import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import DashboardTab from '../tabs/DashboardTab';

// Sub-komponen stub untuk menu tab lainnya
const LeaderboardTab = () => <div className="p-4">Menu Leaderboard Lingkungan</div>;
const AiConsultantTab = () => <div className="p-4">AI Consultant System</div>;
const EsgReporterTab = () => <div className="p-4">Otomatisasi Laporan ESG</div>;
const ProposalTab = () => <div className="p-4">Proposal Bisnis & Finansial</div>;

export default function AppView() {
  const { activeTab, setActiveTab, toggleTheme, theme, simulationOn, setSimulationOn, activeSession, setCurrentView } = useContext(AppContext);

  // Menentukan tab mana yang harus dirender secara kondisional
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab />;
      case 'leaderboard': return <LeaderboardTab />;
      case 'aiconsultant': return <AiConsultantTab />;
      case 'esgreporter': return <EsgReporterTab />;
      case 'proposal': return <ProposalTab />;
      default: return <DashboardTab />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* 1. SIDEBAR PANEL */}
      <aside className="w-72 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col h-full">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center">
            <i className="fa-solid fa-link text-slate-950 text-xl"></i>
          </div>
          <div>
            <h1 className="text-lg font-bold font-['Orbitron']">Enviro<span className="text-emerald-400">Chain</span></h1>
          </div>
        </div>

        {/* Menu Navigasi Sesuai Klik State */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm text-left ${activeTab === 'dashboard' ? 'bg-slate-100 dark:bg-slate-900 border-l-2 border-emerald-400 text-emerald-400' : 'hover:bg-slate-900/40'}`}>
            <i className="fa-solid fa-chart-line text-lg w-5"></i> <span>Dashboard Real-Time</span>
          </button>
          <button onClick={() => setActiveTab('leaderboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm text-left ${activeTab === 'leaderboard' ? 'bg-slate-100 dark:bg-slate-900 border-l-2 border-emerald-400 text-emerald-400' : 'hover:bg-slate-900/40'}`}>
            <i className="fa-solid fa-trophy text-lg w-5 text-yellow-500"></i> <span>Leaderboard</span>
          </button>
          <button onClick={() => setActiveTab('aiconsultant')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition text-sm text-left ${activeTab === 'aiconsultant' ? 'bg-slate-100 dark:bg-slate-900 border-l-2 border-emerald-400 text-emerald-400' : 'hover:bg-slate-900/40'}`}>
            <i className="fa-solid fa-robot text-lg w-5 text-indigo-500"></i> <span>AI Consultant</span>
          </button>
        </nav>

        {/* Tombol Keluar Sesi */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
          <button onClick={() => setCurrentView('auth')} className="w-full py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-xl text-xs font-bold transition">
            Keluar Portal
          </button>
        </div>
      </aside>

      {/* 2. AREA KONTEN UTAMA */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-slate-50 dark:bg-slate-950">
        {/* Header Global */}
        <header className="h-20 bg-white dark:bg-[#060913] border-b border-slate-200 dark:border-slate-800/60 px-8 flex items-center justify-between shrink-0">
          <h2 className="text-lg font-bold capitalize">{activeTab} Monitor</h2>

          <div className="flex items-center gap-4">
            {/* Sakelar Simulator IoT Berbasis React State */}
            <div className="flex bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-xl items-center gap-3 text-xs border dark:border-slate-800">
              <span className="text-slate-400 font-semibold">Aliran Data IoT</span>
              <input type="checkbox" checked={simulationOn} onChange={(e) => setSimulationOn(e.target.checked)} className="cursor-pointer accent-emerald-500" />
            </div>

            {/* Tombol Ganti Tema */}
            <button onClick={toggleTheme} className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-900 border dark:border-slate-800 flex items-center justify-center text-yellow-400">
              <i className={theme === 'dark' ? "fa-solid fa-sun" : "fa-solid fa-moon"}></i>
            </button>
            
            <div className="text-right text-xs border-l dark:border-slate-800 pl-4">
              <span className="font-extrabold block">{activeSession.companyName}</span>
              <span className="text-[10px] text-emerald-400 block font-mono">ID: UMS-JA-2026</span>
            </div>
          </div>
        </header>

        {/* Slot Render Konten Tab Aktif */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 relative">
          {renderTabContent()}
        </div>
      </main>
    </div>
  );
}