import  { useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function DashboardTab() {
  const { user } = useContext(AppContext);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-500/10 via-emerald-600/5 to-transparent border border-emerald-500/20 rounded-3xl p-6 relative overflow-hidden shadow-sm">
        <h3 className="text-base md:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          👋 Selamat Datang Kembali, <span className="text-emerald-500 font-extrabold">{user?.company}</span>!
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Sistem terintegrasi aman dalam <span class="font-bold text-slate-800 dark:text-slate-200">EnviroChain Pentahelix Ledger</span>. Status node aktif.
        </p>
      </div>

      {/* Grid Status Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-900 border p-6 rounded-3xl shadow-sm">
          <span className="text-xs text-slate-400 font-bold uppercase">Emisi Gas CO2</span>
          <h2 className="text-2xl font-black mt-2 text-slate-800 dark:text-white font-tech">24.5 <span className="text-xs text-slate-400">PPM</span></h2>
        </div>
        <div className="bg-white dark:bg-slate-900 border p-6 rounded-3xl shadow-sm">
          <span className="text-xs text-slate-400 font-bold uppercase">Limbah Cair Cairan</span>
          <h2 className="text-2xl font-black mt-2 text-slate-800 dark:text-white font-tech">6.82 <span className="text-xs text-slate-400">pH</span></h2>
        </div>
        <div className="bg-white dark:bg-slate-900 border p-6 rounded-3xl shadow-sm">
          <span className="text-xs text-slate-400 font-bold uppercase">Status Enkripsi Blok</span>
          <h2 className="text-xs font-bold mt-3 text-emerald-500 flex items-center gap-1.5">
            <i className="fa-solid fa-shield-halved"></i> Hyperledger Verified Ledger
          </h2>
        </div>
      </div>

      {/* Map Viewport Area */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 shadow-sm">
        <h3 className="text-sm font-bold mb-4">Pemantauan Lokasi Geografis (Pentahelix Node)</h3>
        <div className="bg-slate-100 dark:bg-slate-950 h-64 rounded-2xl flex items-center justify-center text-xs text-slate-400 border border-dashed border-slate-300 dark:border-slate-800">
          [ Leaflet Geolocation Map Viewport - Lokasi Surakarta Node ]
        </div>
      </div>
    </div>
  );
}