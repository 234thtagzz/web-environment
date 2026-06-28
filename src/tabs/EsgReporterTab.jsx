import 'react';

export default function ESGReporterTab() {
  return (
    <div className="bg-white dark:bg-slate-900 border rounded-3xl p-6 shadow-sm">
      <h3 className="text-base font-bold mb-2">Penyusunan Lembar Kerja ESG Otomatis</h3>
      <p className="text-xs text-slate-400 mb-6">Dokumen kompilasi yang siap diserahkan langsung ke portal OJK Simpedas & KLHK.</p>
      
      <div className="p-6 bg-slate-50 dark:bg-slate-950 border rounded-2xl space-y-4">
        <div className="flex justify-between items-center text-xs border-b pb-3 border-slate-200 dark:border-slate-800">
          <span className="font-semibold">Laporan Periode Berjalan</span>
          <span className="bg-emerald-500/10 text-emerald-500 font-bold px-2 py-0.5 rounded">Q2 2026</span>
        </div>
        <button className="w-full bg-emerald-600 text-white text-xs font-bold py-3 rounded-xl"><i class="fa-solid fa-file-pdf mr-2"></i>Kompilasi & Unduh Dokumen ESG (.pdf)</button>
      </div>
    </div>
  );
}