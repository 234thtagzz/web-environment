import { useState, useEffect, useRef } from 'react';
import OpenAI from 'openai';

// Inisialisasi Groq Menggunakan SDK OpenAI
const groq = new OpenAI({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
  dangerouslyAllowBrowser: true
});

export default function AIConsultantTab() {
  const [messages, setMessages] = useState([
    { 
      role: 'assistant', 
      text: 'Halo, saya konsultan AI EnviroChain. Saya mendeteksi penggunaan energi atau emisi di pabrik Anda. Ada yang bisa saya bantu terkait sirkulasi gas buang, denda audit emisi, atau panduan kepatuhan POJK 51/2017?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatHistoryRef = useRef(null);

  // Otomatis scroll ke bawah setiap kali ada pesan baru
  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [messages, isLoading]); // Ditambahkan isLoading agar ikut terscroll ke bawah saat loading muncul

  // PERBAIKAN UTAMA: Menambahkan kata kunci 'async' di bawah ini
  const handleSend = async (e) => {
    if (e) e.preventDefault();
    const queryText = input.trim();
    if (!queryText || isLoading) return;

    setMessages(prev => [...prev, { role: 'user', text: queryText }]);
    setInput('');
    setIsLoading(true);

    try {
      const completion = await groq.chat.completions.create({
        model: 'llama-3.1-8b-instant', 
        messages: [
          { 
            role: 'system', 
            content: 'Anda adalah AI Consultant ahli akuntansi hijau dan audit karbon untuk platform bernama EnviroChain. Tugas Anda adalah membantu user menganalisis emisi CO2, regulasi POJK 51/2017, dan memberikan solusi teknis pengurangan emisi dengan gaya bahasa yang profesional, ringkas, dan solutif.' 
          },
          ...messages.map(msg => ({ role: msg.role, content: msg.text })),
          { role: 'user', content: queryText }
        ],
      });

      const aiReply = completion.choices[0].message.content;
      setMessages(prev => [...prev, { role: 'assistant', text: aiReply }]);

    } catch (error) {
      console.error("Gagal memanggil Groq API:", error);
      setMessages(prev => [...prev, { role: 'assistant', text: 'Maaf, terjadi gangguan pada server AI. Silakan coba lagi.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Workspace Chat Advisor */}
      <div className="bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-4 md:p-6 shadow-sm dark:shadow-none flex flex-col justify-between h-[500px]">
        <div className="flex flex-col h-full justify-between overflow-hidden">
          
          {/* Banner Kepala Advisor */}
          <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800/80">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-400 flex items-center justify-center text-white dark:text-slate-950 text-sm">
              <i className="fa-solid fa-robot"></i>
            </div>
            <div className="text-left">
              <h4 className="text-sm font-bold text-slate-850 dark:text-slate-200">Asisten Pakar Akuntansi Hijau</h4>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                <span className={`w-1.5 h-1.5 rounded-full inline-block ${isLoading ? 'bg-amber-500 animate-bounce' : 'bg-emerald-500 animate-pulse'}`}></span>
                {isLoading ? 'AI Sedang Menganalisis...' : 'Sistem Aktif & Siap Bantu'}
              </span>
            </div>
          </div>

          {/* Kotak Riwayat Chat (Scrollable) */}
          <div 
            ref={chatHistoryRef} 
            className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 text-xs"
          >
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex items-start gap-2.5 ${msg.role === 'user' ? 'justify-end' : ''}`}
              >
                {msg.role !== 'user' && (
                  <div className="w-6 h-6 rounded bg-slate-100 dark:bg-indigo-950 border border-slate-200 dark:border-indigo-500/30 flex items-center justify-center text-[10px] text-indigo-600 dark:text-indigo-400 shrink-0 font-bold">
                    AI
                  </div>
                )}
                
                <div className={`p-3 rounded-2xl rounded-tl-none max-w-[85%] leading-relaxed font-medium text-left whitespace-pre-line ${
                  msg.role === 'user' 
                    ? 'bg-indigo-500/10 border border-indigo-500/20 text-slate-800 dark:text-slate-200 font-semibold' 
                    : 'bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-750 dark:text-slate-300'
                }`}>
                  {msg.text}
                </div>

                {msg.role === 'user' && (
                  <div className="w-6 h-6 rounded bg-slate-100 dark:bg-indigo-900/40 border border-slate-200 dark:border-indigo-500/20 flex items-center justify-center text-[10px] text-indigo-600 dark:text-indigo-400 shrink-0 font-bold">
                    U
                  </div>
                )}
              </div>
            ))}

            {/* Tambahan UI: Animasi Bublem Chat Mengetik Saat Loading */}
            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="w-6 h-6 rounded bg-slate-100 dark:bg-indigo-950 border border-slate-200 dark:border-indigo-500/30 flex items-center justify-center text-[10px] text-indigo-600 dark:text-indigo-400 shrink-0 font-bold">
                  AI
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-3 rounded-2xl rounded-tl-none text-slate-400 dark:text-slate-500 italic animate-pulse">
                  Sedang memproses respons di blockchain...
                </div>
              </div>
            )}
          </div>

          {/* Pengendali Input */}
          <div className="flex items-center gap-2 pt-4 border-t border-slate-200 dark:border-slate-800/80">
            <input 
              type="text" 
              value={input}
              disabled={isLoading}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress} 
              placeholder={isLoading ? "Tunggu sebentar..." : "Ketik pertanyaan untuk AI Consultant..."} 
              className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-2.5 px-4 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 disabled:opacity-50 transition" 
            />
            <button 
              onClick={handleSend} 
              disabled={isLoading}
              className="w-9 h-9 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-400 transition flex items-center justify-center text-white text-sm shrink-0 shadow-lg shadow-indigo-500/10"
            >
              <i className="fa-solid fa-paper-plane"></i>
            </button>
          </div>

        </div>
      </div>
    </>
  );
}