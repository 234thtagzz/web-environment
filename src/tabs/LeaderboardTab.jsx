import 'react';

export default function LeaderboardTab() {
  const ranks = [
    { name: 'PT Sinar Hijau Tbk', score: '98.4', badge: 'Gold Platinum' },
    { name: 'PT Jaya Abadi Tbk (Anda)', score: '92.1', badge: 'Gold' },
    { name: 'PT Tekstil Makmur', score: '84.6', badge: 'Silver' },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 border rounded-3xl p-6 shadow-sm">
      <h3 className="text-base font-bold mb-4">Peringkat Kepatuhan ESG & Industri Hijau</h3>
      <div className="space-y-3">
        {ranks.map((company, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 border rounded-2xl">
            <div className="flex items-center gap-3">
              <span className="text-sm font-black text-emerald-500 w-5">#{i + 1}</span>
              <span className="text-xs font-bold">{company.name}</span>
            </div>
            <div className="text-right">
              <span className="text-xs font-black font-tech text-slate-900 dark:text-white">{company.score} pts</span>
              <span className="block text-[10px] text-emerald-400 font-bold uppercase">{company.badge}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}