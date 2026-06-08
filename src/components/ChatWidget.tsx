import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  sources?: string[];
}

// Puerto separado para el chatbot RAG
const CHAT_URL = import.meta.env.VITE_CHAT_URL ?? 'http://localhost:8001';

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      text: '¡Hola! Soy el asistente del TecNM Monclova 👋 Puedo responderte sobre becas, carreras, admisión, materias, costos y cualquier tema del campus. ¿En qué te ayudo?',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', text }];
    setMessages(newMessages);
    setLoading(true);

    // Construir historial en el formato que espera el chatbot de tu compañero
    const historial = newMessages
      .slice(1) // quitar el mensaje inicial del asistente
      .map(m => ({ role: m.role, content: m.text }));

    try {
      const res = await fetch(`${CHAT_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          historial: historial.slice(0, -1), // todos menos el último (que es la pregunta actual)
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      setMessages(prev => [...prev, {
        role: 'assistant',
        text: data.answer,
        sources: data.sources?.filter(Boolean) ?? [],
      }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        text: 'Lo siento, no pude conectarme al asistente en este momento. Intenta de nuevo o llama al TecNM al 866-649-0375.',
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-5 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
          style={{ width: 360, height: 480 }}>

          {/* Header */}
          <div className="px-4 py-3 flex items-center justify-between shrink-0"
            style={{ background: 'linear-gradient(135deg, #1565c0, #1976d2)' }}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-sm font-bold">TM</div>
              <div>
                <p className="text-white text-sm font-semibold">Asistente TecNM</p>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <p className="text-blue-200 text-xs">En línea · RAG</p>
                </div>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-blue-200 hover:text-white transition-colors text-lg">✕</button>
          </div>

          {/* Mensajes */}
          <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold mr-2 mt-1 shrink-0">T</div>
                )}
                <div className="max-w-[80%] flex flex-col gap-1">
                  <div className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                  {/* Fuentes si las hay */}
                  {msg.sources && msg.sources.length > 0 && (
                    <div className="flex flex-wrap gap-1 px-1">
                      {msg.sources.map((s, si) => (
                        <a key={si} href={s} target="_blank" rel="noopener noreferrer"
                          className="text-xs text-blue-500 hover:underline bg-blue-50 px-2 py-0.5 rounded-full truncate max-w-[180px]">
                          🔗 Fuente {si + 1}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold mr-2 mt-1 shrink-0">T</div>
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1 items-center h-4">
                    {[0,1,2].map(i => (
                      <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-400"
                        style={{ animation: `bounce 1s ease-in-out ${i * 0.15}s infinite` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-gray-100 bg-white shrink-0">
            <div className="flex gap-2 items-end">
              <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
                placeholder="Pregunta sobre becas, carreras, admisión..."
                rows={1}
                className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
                style={{ maxHeight: 80 }} />
              <button onClick={sendMessage} disabled={!input.trim() || loading}
                className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 transition-all disabled:opacity-40 hover:bg-blue-700 active:scale-95">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1.5 text-center">Enter para enviar · Shift+Enter nueva línea</p>
          </div>
        </div>
      )}

      {/* Botón flotante */}
      <button onClick={() => setOpen(o => !o)}
        className="fixed bottom-5 right-5 z-50 w-14 h-14 rounded-full text-white shadow-lg flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        style={{ background: 'linear-gradient(135deg, #1565c0, #1976d2)', boxShadow: '0 8px 24px rgba(21,101,192,0.4)' }}>
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        )}
      </button>

      <style>{`@keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }`}</style>
    </>
  );
}
