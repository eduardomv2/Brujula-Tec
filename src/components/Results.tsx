import { useState, useEffect } from 'react';
import type { PredictResponse } from '../api/predict';
import { CARRERAS } from '../data/carreras';

function RadarChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const cx = 150, cy = 150, r = 100;
  const n = data.length;
  const angleStep = (2 * Math.PI) / n;
  const getPoint = (i: number, val: number) => {
    const angle = i * angleStep - Math.PI / 2;
    const dist = (val / 100) * r;
    return { x: cx + dist * Math.cos(angle), y: cy + dist * Math.sin(angle) };
  };
  const getLabelPoint = (i: number) => {
    const angle = i * angleStep - Math.PI / 2;
    const dist = r + 24;
    return { x: cx + dist * Math.cos(angle), y: cy + dist * Math.sin(angle) };
  };
  const points = data.map((d, i) => getPoint(i, d.value));
  const polyPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') + ' Z';

  return (
    <svg viewBox="0 0 300 300" width="100%" style={{ maxWidth: 280 }} className="mx-auto block">
      {[25, 50, 75, 100].map(level => {
        const gPoints = data.map((_, i) => getPoint(i, level));
        const gPath = gPoints.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ') + ' Z';
        return <path key={level} d={gPath} fill="none" stroke="#E5E7EB" strokeWidth="1" />;
      })}
      {data.map((_, i) => {
        const outer = getPoint(i, 100);
        return <line key={i} x1={cx} y1={cy} x2={outer.x.toFixed(1)} y2={outer.y.toFixed(1)} stroke="#E5E7EB" strokeWidth="1" />;
      })}
      <path d={polyPath} fill="rgba(37,99,235,0.15)" stroke="#2563EB" strokeWidth="2" />
      {points.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill={data[i].color} stroke="white" strokeWidth="1.5" />
      ))}
      {data.map((d, i) => {
        const lp = getLabelPoint(i);
        return (
          <text key={i} x={lp.x} y={lp.y} textAnchor="middle" dominantBaseline="middle"
            fontSize="10" fontWeight="600" fill="#374151">{d.label}</text>
        );
      })}
      {[25, 50, 75].map(v => (
        <text key={v} x={cx + 4} y={cy - (v / 100) * r + 4} fontSize="8" fill="#9CA3AF">{v}</text>
      ))}
    </svg>
  );
}

interface ResultsProps {
  resultado: PredictResponse;
  onSelect: (carreraId: string) => void;
  onReset: () => void;
}

export function Results({ resultado, onSelect, onReset }: ResultsProps) {
  const [animado, setAnimado] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnimado(true), 150); return () => clearTimeout(t); }, []);

  const ORDEN_RADAR = ['INF', 'ENRV', 'MEC', 'ELEC', 'IND', 'GE'];
  const radarData = ORDEN_RADAR.map(id => {
    const match = resultado.top3.find(t => t.carrera_id === id);
    const c = CARRERAS[id];
    const seed = id.charCodeAt(0) % 20;
    return {
      label: c?.nombreCorto.split(' ')[0] ?? id,
      value: match ? match.porcentaje_match : Math.max(5, seed),
      color: c?.color.accent ?? '#6B7280',
    };
  });

  const top1 = resultado.top3[0];
  const c1 = CARRERAS[top1.carrera_id];

  // Detectar si el texto libre menciona una carrera diferente al resultado
  const textoAnalisis = resultado.texto_analisis;
  const carreraEnTexto = textoAnalisis
    ? Object.keys(CARRERAS).find(id => textoAnalisis.includes(CARRERAS[id].nombre))
    : null;
  const textoCoincideConResultado = carreraEnTexto === top1.carrera_id;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="bg-white border-b border-gray-100 px-5 py-5">
        <div className="max-w-lg mx-auto text-center">
          <div className="text-4xl mb-2">🎯</div>
          <h2 className="text-xl font-bold text-gray-900">Tus carreras más afines</h2>
          <p className="text-sm text-gray-500 mt-1">Selecciona una para ver más detalles</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5">
        <div className="max-w-lg mx-auto flex flex-col gap-5">

          {/* Top 3 */}
          {resultado.top3.map((item, idx) => {
            const carrera = CARRERAS[item.carrera_id];
            if (!carrera) return null;
            const c = carrera.color;
            return (
              <button key={item.carrera_id} onClick={() => onSelect(item.carrera_id)}
                className="w-full text-left bg-white rounded-2xl border-2 transition-all active:scale-98 hover:shadow-md group"
                style={{ borderColor: idx === 0 ? c.accent : '#E5E7EB' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = c.accent)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = idx === 0 ? c.accent : '#E5E7EB')}
              >
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                      style={{ background: c.badge }}>{carrera.emoji}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-gray-900 text-base">{carrera.nombreCorto}</span>
                        {idx === 0 && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                            style={{ background: c.badge, color: c.badgeText }}>Mejor match</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5 truncate">{carrera.nombre}</p>
                    </div>
                    <span className="text-2xl font-black shrink-0" style={{ color: c.accent }}>
                      {item.porcentaje_match.toFixed(0)}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                    <div className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ width: animado ? `${item.porcentaje_match}%` : '0%', background: c.bar }} />
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{item.razonamiento}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs font-semibold" style={{ color: c.accent }}>
                    Ver detalles <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </div>
                </div>
              </button>
            );
          })}

          {/* Por qué hace match */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">⭐</span>
              <h3 className="font-bold text-gray-900 text-sm">¿Por qué hace match contigo?</h3>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              Tus respuestas muestran una fuerte afinidad con las actividades y habilidades clave de{' '}
              <strong>{c1?.nombre}</strong>. {top1.razonamiento}
            </p>
          </div>

          {/* Análisis del texto libre — mensaje inteligente */}
          {textoAnalisis && carreraEnTexto && (
            textoCoincideConResultado ? (
              // Texto confirma el resultado
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">✅</span>
                  <h3 className="font-bold text-gray-900 text-sm">Tu descripción respalda el resultado</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{textoAnalisis}</p>
              </div>
            ) : (
              // Texto menciona una carrera diferente
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">💡</span>
                  <h3 className="font-bold text-gray-900 text-sm">Algo interesante en tu descripción</h3>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  {textoAnalisis} Sin embargo, tu perfil de respuestas apunta principalmente a{' '}
                  <strong>{c1?.nombre}</strong>. Esto puede significar que tienes intereses en
                  múltiples áreas — algo muy valioso en ingeniería.
                </p>
                <div className="bg-white rounded-xl p-3 border border-amber-100">
                  <p className="text-xs text-amber-700 font-medium">
                    💬 ¿Te interesa explorar{' '}
                    <strong>{CARRERAS[carreraEnTexto]?.nombreCorto}</strong>?
                    Pregúntale a nuestro chatbot sobre el plan de estudios, materias y campo laboral de esa carrera.
                  </p>
                </div>
              </div>
            )
          )}

          {/* Gráfica radar */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h3 className="font-bold text-gray-900 text-sm mb-1">Tus respuestas en números</h3>
            <p className="text-xs text-gray-500 mb-4">Perfil de afinidad por área de ingeniería</p>
            <RadarChart data={radarData} />
          </div>

          {/* Banner descuento */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-5 text-yellow-900">
            <div className="flex items-start gap-3">
              <span className="text-3xl shrink-0">🎁</span>
              <div>
                <h3 className="font-black text-base mb-1">¡Usa tu resultado para obtener un descuento!</h3>
                <p className="text-sm opacity-80 leading-relaxed">
                  Presenta esta pantalla al momento de tu admisión en el TecNM Monclova
                  y obtén un beneficio exclusivo en tu inscripción.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-t border-gray-100 px-5 py-4">
        <div className="max-w-lg mx-auto">
          <button onClick={onReset}
            className="w-full py-3 rounded-xl text-sm text-gray-500 font-medium bg-gray-100 hover:bg-gray-200 transition-all">
            Hacer el test de nuevo
          </button>
        </div>
      </div>
    </div>
  );
}
