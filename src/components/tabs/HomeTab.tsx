import { useState, useEffect } from 'react';
import { CARRERAS_LIST } from '../../data/carreras';

interface HomeTabProps {
  onStartTest: () => void;
}

const CARRERA_DATOS = {
  INF:  { crecimiento: '+28% demanda 2025', dato: '2.5M empleos TI en México para 2026', color: '#2563EB' },
  IND:  { crecimiento: '+18% en manufactura', dato: 'Sector más empleador en Coahuila', color: '#16A34A' },
  ELEC: { crecimiento: '+35% en automatización', dato: 'Industria 4.0 genera 40K vacantes/año', color: '#EA580C' },
  MEC:  { crecimiento: '+22% en industria pesada', dato: 'AHMSA y metalúrgicas buscan 800 ing/año', color: '#CA8A04' },
  ENRV: { crecimiento: '+67% en 3 años', dato: 'México: 20GW renovables para 2030', color: '#059669' },
  GE:   { crecimiento: '+15% en PYMES', dato: '4.1M MiPymes necesitan administradores', color: '#9333EA' },
};

function CarreraCarrusel() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIdx(i => (i + 1) % CARRERAS_LIST.length); setVisible(true); }, 300);
    }, 2800);
    return () => clearInterval(t);
  }, []);

  const c = CARRERAS_LIST[idx];
  const datos = CARRERA_DATOS[c.id as keyof typeof CARRERA_DATOS];

  return (
    <div className="w-64 shrink-0">
      <div className="bg-white rounded-2xl p-5 shadow-2xl">
        <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(8px)', transition: 'opacity 0.3s, transform 0.3s' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: c.color.badge }}>{c.emoji}</div>
            <div>
              <p className="font-bold text-gray-900 text-sm">{c.nombreCorto}</p>
              <p className="text-xs font-semibold" style={{ color: datos?.color }}>{datos?.crecimiento}</p>
            </div>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-3">
            <div className="h-full rounded-full transition-all duration-700" style={{ width: `${75 + idx * 4}%`, background: c.color.bar }} />
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">{datos?.dato}</p>
        </div>
        <div className="flex justify-center gap-1 mt-4">
          {CARRERAS_LIST.map((_, i) => (
            <div key={i} className="rounded-full transition-all duration-300"
              style={{ width: i === idx ? 16 : 5, height: 5, background: i === idx ? c.color.accent : '#E5E7EB' }} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function HomeTab({ onStartTest }: HomeTabProps) {
  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ──────────────────────────────────────────────── */}
      <div className="relative overflow-hidden px-6 pt-16 pb-20 text-white"
        style={{ background: 'linear-gradient(135deg, #1a237e 0%, #1565c0 60%, #0d47a1 100%)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, white, transparent)', transform: 'translate(30%,-30%)' }} />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, white, transparent)', transform: 'translate(-30%,30%)' }} />

        <div className="relative z-10 max-w-5xl mx-auto flex flex-col lg:flex-row items-center gap-10">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/25 rounded-full px-4 py-1.5 mb-6">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-blue-200">
                <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
              </svg>
              <span className="text-xs font-semibold text-blue-100 tracking-wide">Orientación vocacional inteligente</span>
            </div>

            <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-4">
              Descubre la ingeniería<br />que está hecha para ti
            </h1>
            <p className="text-blue-200 text-base leading-relaxed mb-6 max-w-lg">
              El test vocacional de <strong className="text-white">Compasslife</strong> utiliza inteligencia
              artificial para encontrar la carrera perfecta para ti en el TecNM Monclova.
            </p>

            {/* Banner de descuento */}
            <div className="bg-yellow-400 text-yellow-900 rounded-xl px-4 py-3 mb-6 flex items-center gap-3 max-w-md">
              <span className="text-2xl shrink-0">🎁</span>
              <div>
                <p className="font-black text-sm">¡Descuento en inscripción!</p>
                <p className="text-xs font-medium opacity-80">
                  Presenta tu resultado del test vocacional al momento de tu admisión en el TecNM Monclova y obtén un beneficio exclusivo.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button onClick={onStartTest}
                className="bg-white text-blue-700 font-bold py-3.5 px-7 rounded-xl text-sm hover:bg-blue-50 transition-all active:scale-98 shadow-lg">
                Iniciar test vocacional →
              </button>
              <button onClick={() => document.getElementById('carreras')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 border border-white/30 text-white font-bold py-3.5 px-7 rounded-xl text-sm hover:bg-white/20 transition-all">
                Explorar carreras
              </button>
            </div>
          </div>
          <CarreraCarrusel />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto mt-14 pt-8 border-t border-white/20 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {[
            { val: '15,000+', label: 'Estudiantes orientados' },
            { val: '94%',     label: 'Precisión del modelo' },
            { val: '6',       label: 'Carreras disponibles' },
            { val: '4.9/5',   label: 'Satisfacción' },
          ].map(s => (
            <div key={s.label}>
              <p className="text-2xl font-black text-white">{s.val}</p>
              <p className="text-blue-300 text-xs mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CARRERAS ──────────────────────────────────────────── */}
      <div id="carreras" className="px-5 py-12 max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-black text-gray-900">Nuestras ingenierías</h2>
          <p className="text-gray-500 text-sm mt-1">6 programas disponibles · TecNM Campus Monclova</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CARRERAS_LIST.map(c => {
            const datos = CARRERA_DATOS[c.id as keyof typeof CARRERA_DATOS];
            return (
              <div key={c.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group">
                <div className="h-24 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${c.color.accent}, ${c.color.bar})` }}>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {c.emoji}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-base mb-1">{c.nombre}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed mb-3">{c.descripcion}</p>
                  {/* Dato de crecimiento */}
                  <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                    <span className="text-sm">📈</span>
                    <div>
                      <p className="text-xs font-bold" style={{ color: datos?.color }}>{datos?.crecimiento}</p>
                      <p className="text-xs text-gray-500">{datos?.dato}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── CÓMO FUNCIONA ─────────────────────────────────────── */}
      <div className="bg-gray-50 border-y border-gray-100 px-5 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-gray-900 mb-2">¿Cómo funciona Compasslife?</h2>
            <p className="text-gray-500 text-sm">Tecnología real, resultados personalizados</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {[
              { num:'01', emoji:'👆', titulo:'Responde el test',
                desc:'Desliza 61 tarjetas tipo Tinder sobre tus intereses y habilidades. Las preguntas están mezcladas para un análisis imparcial.' },
              { num:'02', emoji:'🧠', titulo:'IA analiza tu perfil',
                desc:'Nuestro modelo BayesNet entrenado con 21,598 perfiles calcula tu compatibilidad con cada ingeniería con 94.6% de precisión.' },
              { num:'03', emoji:'🎯', titulo:'Recibe tu match',
                desc:'Obtén las 3 carreras más afines con porcentaje, razonamiento explicable, gráfica de perfil y análisis de tu texto libre.' },
            ].map(p => (
              <div key={p.num} className="flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-2xl bg-blue-600 text-2xl flex items-center justify-center mb-4 shadow-lg shadow-blue-200">
                  {p.emoji}
                </div>
                <span className="text-xs font-black text-blue-400 tracking-widest mb-1">{p.num}</span>
                <h3 className="font-bold text-gray-900 mb-2">{p.titulo}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-white rounded-2xl border border-blue-100 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-xl">🧠</div>
                <h3 className="font-bold text-gray-900 text-sm">Modelo de Machine Learning</h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Usamos <strong>BayesNet</strong> entrenado con <strong>21,598 perfiles</strong> de las 6 ingenierías.
                Analiza 61 características con <strong>94.6% de precisión</strong> y Kappa de 0.9358.
              </p>
              <div className="flex gap-2 mt-3 flex-wrap">
                {['BayesNet', '21K perfiles', 'Kappa 0.93', '61 features'].map(t => (
                  <span key={t} className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded-lg">{t}</span>
                ))}
              </div>
            </div>
            <div className="bg-white rounded-2xl border border-green-100 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-xl">💬</div>
                <h3 className="font-bold text-gray-900 text-sm">Chatbot con RAG del TecNM</h3>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">
                Asistente entrenado con <strong>web scraping</strong> de la página oficial del TecNM Monclova.
                Pregunta sobre <strong>becas, materias, admisión, laboratorios</strong> y más.
              </p>
              <div className="flex gap-2 mt-3 flex-wrap">
                {['Web scraping', 'ChromaDB', 'RAG', 'TecNM Monclova'].map(t => (
                  <span key={t} className="bg-green-50 text-green-700 text-xs font-semibold px-2 py-1 rounded-lg">{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="text-center">
            <button onClick={onStartTest}
              className="bg-blue-600 text-white font-bold py-4 px-10 rounded-2xl text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              Comenzar test gratuito →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
