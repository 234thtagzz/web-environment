import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function SystemModal() {
  const { modal, closeModal } = useContext(AppContext);

  if (!modal.isOpen) return null;

  // Tentukan palet warna ikon berdasarkan tipe pesan
  const getTypeStyles = () => {
    switch (modal.type) {
      case 'success':
        return { bg: 'bg-emerald-500/10 text-emerald-500', icon: 'fa-circle-check' };
      case 'error':
        return { bg: 'bg-red-500/10 text-red-500', icon: 'fa-triangle-exclamation' };
      default:
        return { bg: 'bg-indigo-500/10 text-indigo-500', icon: 'fa-circle-info' };
    }
  };

  const styles = getTypeStyles();

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${styles.bg}`}>
            <i className={`fa-solid ${styles.icon} text-xl`}></i>
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{modal.title}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-semibold">Sistem EnviroChain</p>
          </div>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-medium">
          {modal.message}
        </p>
        <button
          onClick={closeModal}
          className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white dark:text-slate-950 font-bold py-2.5 px-4 rounded-xl text-xs transition"
        >
          Mengerti
        </button>
      </div>
    </div>
  );
}