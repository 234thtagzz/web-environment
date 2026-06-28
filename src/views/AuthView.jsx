import { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

export default function AuthView() {
  const { login, isDarkMode, toggleTheme } = useContext(AppContext);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  // Form states
  const [email, setEmail] = useState('pengunjung@envirochain.com');
  const [password, setPassword] = useState('password123');
  const [company, setCompany] = useState('');
  const [sector, setSector] = useState('Garmen');
  const [location, setLocation] = useState('Surakarta');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, authMode === 'login' ? 'User' : 'New_Corporate_Node');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-10 relative overflow-hidden bg-color-brand-50 dark:bg-brand-50-dark ">
      <div className="absolute top-6 right-6 z-100">
        <button id='themeToggle' onClick={toggleTheme} className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-yellow-400 shadow-md z-9999">
          <i className={`fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'} text-lg`}></i>
        </button>
      </div>

      <div className="w-full max-w-5xl bg-primary dark:bg-slate-950/60 backdrop-blur-md border border-slate-200 dark:border-slate-800/85 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative z-10">
        {/* Left Panel */}
        <div className="md:w-1/2 bg-primary bg-gradient-to-b from-slate-300 to-slate-50 dark:from-brand-100-dark dark:to-[#080b12] p-8 md:p-12 text-white flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800/60">
          <div className="flex items-center gap-3 -font-sans">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <i class="fa-solid fa-link text-slate-950 text-xl"></i>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-brand-50-dark dark:text-brand-50 font-tech">Enviro<span className="text-emerald-400">Chain</span></h1>
              <span className="text-[9px] text-emerald-400/80 font-bold tracking-wider uppercase block">Pentahelix Verified Ledger</span>
            </div>
          </div>

          <div className="my-8 space-y-4">
            <h2 className="text-2xl text-white md:text-3xl font-extrabold tracking-tight leading-snug">
              Infrastruktur Kepercayaan untuk <span className="text-emerald-400">Akuntansi Hijau</span> Masa Depan.
            </h2>
            <p className="text-xs text-abu dark:text-slate-200 leading-relaxed max-w-sm">
              Mengintegrasikan sensor IoT cerobong dan pipa buangan dengan jaringan blockchain Hyperledger Fabric guna mewujudkan transparansi tanpa celah manipulasi.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-slate-300/60 dark:bg-slate-900/20 border border-slate-800 p-4 rounded-2xl">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 text-sm">
              <i class="fa-solid fa-award"></i>
            </div>
            <div className="text-xs">
              <span className="font-bold text-abu dark:text-slate-200 block">Karya Terbaik MORAFEST 2026</span>
              <span className="text-[10px] text-slate-400 block">Tim Golden Albatross - UMS</span>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 pb-3 gap-6 text-sm font-semibold">
            <button onClick={() => setAuthMode('login')} className={`pb-2.5 transition ${authMode === 'login' ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-slate-400'}`}>Masuk Portal</button>
            <button onClick={() => setAuthMode('register')} className={`pb-2.5 transition ${authMode === 'register' ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-slate-400'}`}>Daftar Akun Baru</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'login' ? (
              <>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold dark:text-abu text-slate-600 dark:text-slate-400 block">Alamat Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-xs dark:text-[#C0C0C4]" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block">Kata Sandi</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-xs dark:text-[#C0C0C4]" />
                </div>
                <button type="submit" className="w-full bg-emerald-600 text-white font-extrabold text-xs py-3.5 rounded-xl transition">Masuk Dashboard</button>
              </>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold block text-slate-600 dark:text-slate-400">Nama Industri / PT</label>
                    <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} required className="w-full bg-slate-50 dark:bg-slate-900/50 border rounded-xl dark:border-slate-800 py-2 px-3 text-xs dark:text-[#C0C0C4]" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold block text-slate-600 dark:text-slate-400">Sektor Bisnis</label>
                    <select value={sector} onChange={(e) => setSector(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 rounded-xl py-2 px-3 text-xs dark:text-[#C0C0C4]">
                      <option value="Garmen">Garmen / Tekstil</option>
                      <option value="Pertambangan">Pertambangan</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold block text-slate-600 dark:text-slate-400">Wilayah Node GPS</label>
                  <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-900/50 border dark:border-slate-800 rounded-xl py-2 px-3 text-xs dark:text-[#C0C0C4]"/>
                </div>
                <button type="submit" className="w-full bg-emerald-600 text-white font-extrabold text-xs py-3 rounded-xl">Daftarkan Perusahaan Baru</button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}