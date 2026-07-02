import { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { supabase } from '../supabaseClient';

export default function AuthView() {
  const { login, isDarkMode, toggleTheme } = useContext(AppContext);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [industryType, setIndustryType] = useState('Garmen');
  const [isLoading, setIsLoading] = useState(false);

  // 1. FUNGSI LOGIN (Masuk Portal)
  const handleLogin = async () => {
    setIsLoading(true);
  try {
      // 1. Daftarkan akun ke Auth Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (authError) throw authError;

            // Masukkan data user login ke AppContext global Anda
            login(authData.user); 
            alert('Selamat datang kembali di EnviroChain!');
          } catch (error) {
            console.error('Login gagal:', error.message);
            alert('Gagal Masuk: ' + error.message);
          } finally {
            setIsLoading(false);
          }
        };

// 2. FUNGSI REGISTRASI (Daftar Akun Baru + Simpan Detail Pabrik)
  const handleRegister = async () => {
    setIsLoading(true);
    try {
      // Langkah A: Daftarkan akun kredensial ke Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      if (authError) throw authError;

      const userId = authData.user?.id;

      if (!userId) {
      throw new Error("User tidak terbentuk dari Supabase Auth");
    
        // Langkah B: Masukkan data pabrik lengkap ke tabel 'companies' memakai ID di atas
        const { error: dbError } = await supabase
          .from('companies')
          .insert([
            { 
              id: userId,
              email: email,
              company_name: companyName,
              factory_location: location,
              industry_type: industryType
            }
          ]);

        if (dbError) throw dbError;

        alert('Pendaftaran Perusahaan Berhasil! Silakan cek email atau langsung coba masuk.');
        setAuthMode('login'); // Otomatis balik ke tab login setelah sukses
      }
    } catch (error) {
      console.error('Proses pendaftaran gagal:', error.message);
      alert('Gagal mendaftar: ' + error.message);
    } finally {
      setIsLoading(false);
      console.log("SUPABASE URL:", import.meta.env.VITE_SUPABASE_URL);
    }
  };


  // 3. PENGENDALI UTAMA SUBMIT FORM
  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'login') {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center p-4 md:p-10 relative overflow-hidden bg-color-brand-50 dark:bg-brand-50-dark">
      {/* Tombol Tema */}
      <div className="absolute top-6 right-6 z-100">
        <button id='themeToggle' type="button" onClick={toggleTheme} className="w-10 h-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-600 dark:text-yellow-400 shadow-md z-9999">
          <i className={`fa-solid ${isDarkMode ? 'fa-sun' : 'fa-moon'} text-lg`}></i>
        </button>
      </div>

      <div className="w-full max-w-5xl bg-primary dark:bg-slate-950/60 backdrop-blur-md border border-slate-200 dark:border-slate-800/85 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row relative z-10">
        {/* Panel Kiri */}
        <div className="md:w-1/2 bg-primary bg-gradient-to-b from-slate-300 to-slate-50 dark:from-brand-100-dark dark:to-[#080b12] p-8 md:p-12 text-white flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800/60">
          <div className="flex items-center gap-3 -font-sans">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/25">
              <i className="fa-solid fa-link text-slate-950 text-xl"></i>
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
              <i className="fa-solid fa-award"></i>
            </div>
            <div className="text-xs">
              <span className="font-bold text-abu dark:text-slate-200 block">Karya Terbaik MORAFEST 2026</span>
              <span className="text-[10px] text-slate-400 block">Tim Golden Albatross - UMS</span>
            </div>
          </div>
        </div>

        {/* Panel Kanan */}
        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          {/* Navigasi Tab */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 pb-3 gap-6 text-sm font-semibold">
            <button type="button" onClick={() => setAuthMode('login')} className={`pb-2.5 transition ${authMode === 'login' ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-slate-400'}`}>Masuk Portal</button>
            <button type="button" onClick={() => setAuthMode('register')} className={`pb-2.5 transition ${authMode === 'register' ? 'text-emerald-500 border-b-2 border-emerald-500' : 'text-slate-400'}`}>Daftar Akun Baru</button>
          </div>

          {/* Form Utama */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {authMode === 'login' ? (
              // TAMPILAN JIKA MODE LOGIN
              <>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block">Alamat Email Portal</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-xs dark:text-[#C0C0C4] focus:outline-none focus:border-emerald-500" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 block">Kata Sandi</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl py-3 px-4 text-xs dark:text-[#C0C0C4] focus:outline-none focus:border-emerald-500" />
                </div>
                <button type="submit" disabled={isLoading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3.5 rounded-xl transition disabled:opacity-50">
                  {isLoading ? 'Memproses Masuk...' : 'Masuk Dashboard'}
                </button>
              </>
            ) : (
              // TAMPILAN JIKA MODE DAFTAR AKUN BARU
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold block text-slate-600 dark:text-slate-400">Nama Industri / PT</label>
                    <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required disabled={isLoading} className="w-full bg-slate-50 dark:bg-slate-900/50 border rounded-xl border-slate-200 dark:border-slate-800 py-2.5 px-3 text-xs dark:text-[#C0C0C4] focus:outline-none focus:border-emerald-500" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold block text-slate-600 dark:text-slate-400">Sektor Bisnis</label>
                    <select value={industryType} onChange={(e) => setIndustryType(e.target.value)} disabled={isLoading} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 px-3 text-xs dark:text-[#C0C0C4] focus:outline-none focus:border-emerald-500">
                      <option value="Garmen">Garmen / Tekstil</option>
                      <option value="Pertambangan">Pertambangan</option>
                      <option value="Manufaktur">Manufaktur Umum</option>
                      <option value="Kelapa Sawit">Kelapa Sawit</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold block text-slate-600 dark:text-slate-400">Wilayah Node GPS Pabrik</label>
                  <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required disabled={isLoading} placeholder="Contoh: Boyolali, Jawa Tengah" className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 px-3 text-xs dark:text-[#C0C0C4] focus:outline-none focus:border-emerald-500"/>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold block text-slate-600 dark:text-slate-400">Email Registrasi</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={isLoading} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 px-3 text-xs dark:text-[#C0C0C4] focus:outline-none focus:border-emerald-500" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold block text-slate-600 dark:text-slate-400">Kata Sandi Akun Baru</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading} className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 px-3 text-xs dark:text-[#C0C0C4] focus:outline-none focus:border-emerald-500" />
                </div>
                <button type="submit" disabled={isLoading} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3.5 rounded-xl transition disabled:opacity-50">
                  {isLoading ? 'Mendaftarkan Perusahaan...' : 'Daftarkan Perusahaan Baru'}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}