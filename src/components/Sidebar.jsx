import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Sidebar() {
  const { activeTab, setActiveTab, isMobileSidebarOpen, setIsMobileSidebarOpen, logout } = useContext(AppContext);

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard Real-Time', icon: 'fa-chart-line text-emerald-500' },
    { id: 'leaderboard', label: 'Leaderboard Lingkungan', icon: 'fa-trophy text-yellow-500' },
    { id: 'aiconsultant', label: 'AI Consultant', icon: 'fa-robot text-indigo-500', badge: 'Live' },
    { id: 'esgreporter', label: 'ESG Reporter', icon: 'fa-file-invoice text-purple-500' },
    { id: 'proposal', label: 'Proposal & Finansial', icon: 'fa-folder-open text-cyan-500' },
  ];

  return (
    <aside
      className={`w-72 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 flex flex-col z-20 transition-transform duration-300 fixed md:relative h-full 
      ${isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
    >
      <div className="p-6 border-b border-slate-200 dark:border-slate-800/85 flex items-center gap-3 justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <i className="fa-solid fa-link text-slate-950 text-xl"></i>
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white font-tech">
              Enviro<span className="text-emerald-500">Chain</span>
            </h1>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wider uppercase block">Lacak Karbon & Untung</span>
          </div>
        </div>
        <button onClick={() => setIsMobileSidebarOpen(false)} className="md:hidden text-slate-500 hover:text-white">
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>
      </div>

      <nav class="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {menuItems.map((item, index) => {
          // Tambahkan header sub-menu sesuai skrip asli
          const showHeaderCore = index === 0;
          const showHeaderSmart = index === 2;
          const showHeaderBusiness = index === 4;

          return (
            <React.Fragment key={item.id}>
              {showHeaderCore && <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest px-3 mb-2">Monitoring Core</p>}
              {showHeaderSmart && <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest px-3 pt-6 mb-2">Smart Analysis</p>}
              {showHeaderBusiness && <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest px-3 pt-6 mb-2">Proposal & Business Info</p>}
              
              <button
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition font-medium text-sm text-left border-l-2 ${
                  activeTab === item.id
                    ? 'bg-slate-100 dark:bg-slate-900/80 text-slate-900 dark:text-white border-emerald-500'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/40'
                }`}
              >
                <i className={`fa-solid ${item.icon} text-lg w-5`}></i>
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20 uppercase">
                    {item.badge}
                  </span>
                )}
              </button>
            </React.Fragment>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <div className="p-3.5 bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-2xl">
          <div className="flex items-center gap-2.5 mb-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-xs text-slate-700 dark:text-slate-300 font-bold">Tim Golden Albatross</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">Univ. Muhammadiyah Surakarta</p>
          <button
            onClick={logout}
            className="w-full mt-3 py-2 px-3 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/20 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5"
          >
            <i class="fa-solid fa-arrow-right-from-bracket"></i> Keluar Portal
          </button>
        </div>
      </div>
    </aside>
  );
}