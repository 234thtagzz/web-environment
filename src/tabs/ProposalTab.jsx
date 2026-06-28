import 'react';

export default function ProposalTab() {
  return (
    <div className="bg-white dark:bg-slate-900 border rounded-3xl p-6 shadow-sm">
      <h3 className="text-base font-bold mb-2">Akuntansi Hijau & Finansial</h3>
      <p className="text-xs text-slate-400 mb-6">Konversi reduksi karbon menjadi token insentif atau portofolio investasi hijau.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="border p-4 rounded-2xl bg-slate-50 dark:bg-slate-950">
          <span className="font-bold text-slate-400 block uppercase mb-1">Nilai Klaim Subsidi Karbon</span>
          <span className="text-lg font-black font-tech text-emerald-400">Rp 142.500.000,-</span>
        </div>
        <div className="border p-4 rounded-2xl bg-slate-50 dark:bg-slate-950">
          <span className="font-bold text-slate-400 block uppercase mb-1">Status Peninjauan Bank</span>
          <span className="text-slate-700 dark:text-slate-300 font-bold flex items-center gap-1.5 mt-1"><i class="fa-solid fa-circle-check text-emerald-400"></i> Lolos Verifikasi Awal</span>
        </div>
      </div>
    </div>
  );
}