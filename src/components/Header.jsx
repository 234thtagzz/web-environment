import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function Header() {
  const { user, isDarkMode, toggleTheme, isSimulating, setIsSimulating, setIsMobileSidebarOpen, activeTab } = useContext(AppContext);

  const getFormatTitle = () => {
    return activeTab.charAt(0).toUpperCase() + activeTab.slice(1) + ' Panel';
  };

  return (
    <header className="h-20 bg-white dark:bg-[#060913] border-b border-slate-200 dark:border-slate-800/60 px-6 md:px-8 flex items-center justify-between shrink-0 relative z-10">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsMobileSidebarOpen(true)}
          className="md:hidden text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 p-2 rounded-lg"
        >
          <i className="fa-solid fa-bars text-lg"></i>
        </button>
        <h2 className="text-lg md:text-xl font-bold text-slate-800 dark:text-white tracking-tight capitalize">
          {getFormatTitle()}
        </h2>
        <span className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Blockchain & IoT Connected
        </span>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        <div className="hidden sm:flex bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 px-3 py-1.5 rounded-xl items-center gap-3 text-xs">
          <span className="text-slate-600 dark:text-slate-400 font-semibold">Aliran Data IoT</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isSimulating}
              onChange={(e) => setIsSimulating(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-slate-300 dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>

        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800/80 flex items-center justify-center text-slate-600 dark:text-yellow-400 transition"
        >
          <i className={`fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'} text-lg`}></i>
        </button>

        <div className="flex items-center gap-3 border-l border-slate-200 dark:border-slate-800 pl-3 md:pl-4">
          <div className="text-right hidden sm:block">
            <span className="text-xs font-extrabold text-slate-800 dark:text-slate-200 block">{user?.company}</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider block">ID: {user?.id}</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center shrink-0">
            <i className="fa-solid fa-industry text-emerald-500 text-sm"></i>
          </div>
        </div>
      </div>
    </header>
  );
}