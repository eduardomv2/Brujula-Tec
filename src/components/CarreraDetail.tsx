import type { PredictResponse } from '../api/predict';
import { CARRERAS } from '../data/carreras';

interface CarreraDetailProps {
  carreraId: string;
  resultado: PredictResponse;
  onBack: () => void;
  onReset: () => void;
}

export function CarreraDetail({ carreraId, resultado, onBack, onReset }: CarreraDetailProps) {
  const carrera = CARRERAS[carreraId];
  const matchData = resultado.top3.find(t => t.carrera_id === carreraId);
  if (!carrera || !matchData) return null;

  const c = carrera.color;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header con color de carrera */}
      <div
        className="px-5 pt-5 pb-8"
        style={{ background: c.bg, borderBottom: `1px solid ${c.border}` }}
      >
        <div className="max-w-md mx-auto">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-sm font-medium mb-5 transition-opacity hover:opacity-70"
            style={{ color: c.accent }}
          >
            ← Volver a resultados
          </button>

          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0"
              style={{ background: 'white', border: `1px solid ${c.border}` }}
            >
              {carrera.emoji}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{carrera.nombreCorto}</h1>
              <p className="text-sm text-gray-500 mt-0.5">{carrera.nombre}</p>
            </div>
          </div>

          {/* Badge de match */}
          <div className="mt-4 flex items-center gap-3">
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold"
              style={{ background: 'white', color: c.accent, border: `1.5px solid ${c.accent}` }}
            >
              <div className="w-2 h-2 rounded-full" style={{ background: c.bar }} />
              {matchData.porcentaje_match.toFixed(0)}% compatibilidad
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex-1 overflow-y-auto px-5 py-5">
        <div className="max-w-md mx-auto flex flex-col gap-4">

          {/* Descripción */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
              Sobre la carrera
            </h3>
            <p className="text-gray-700 text-sm leading-relaxed">{carrera.descripcion}</p>
          </div>

          {/* Info en grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <div className="text-xl mb-2">🏢</div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                Campo laboral
              </p>
              <p className="text-xs text-gray-700 leading-relaxed">{carrera.campoLaboral}</p>
            </div>
            <div className="bg-white rounded-2xl border border-gray-200 p-4">
              <div className="text-xl mb-2">💰</div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                Salario inicial
              </p>
              <p className="text-xs font-semibold text-gray-700">{carrera.salario}</p>
              <p className="text-xs text-gray-400 mt-1">estimado mensual</p>
            </div>
          </div>

          {/* Análisis IA */}
          <div
            className="rounded-2xl border p-5"
            style={{ background: c.bg, borderColor: c.border }}
          >
            <h3
              className="text-xs font-bold uppercase tracking-wider mb-2"
              style={{ color: c.accent }}
            >
              Análisis IA · Por qué esta carrera
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">{matchData.razonamiento}</p>
          </div>

          {/* Otras opciones del top 3 */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              También podrías considerar
            </h3>
            <div className="flex flex-col gap-2">
              {resultado.top3
                .filter(t => t.carrera_id !== carreraId)
                .map(t => {
                  const otraCarrera = CARRERAS[t.carrera_id];
                  if (!otraCarrera) return null;
                  return (
                    <button
                      key={t.carrera_id}
                      onClick={() => {
                        // navegar a esa carrera — el padre manejará esto
                        window.dispatchEvent(new CustomEvent('selectCarrera', { detail: t.carrera_id }));
                      }}
                      className="flex items-center gap-3 py-2 rounded-xl hover:bg-gray-50 transition-colors text-left"
                    >
                      <span className="text-xl">{otraCarrera.emoji}</span>
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-700">
                          {otraCarrera.nombreCorto}
                        </span>
                      </div>
                      <span
                        className="text-sm font-bold"
                        style={{ color: otraCarrera.color.accent }}
                      >
                        {t.porcentaje_match.toFixed(0)}%
                      </span>
                    </button>
                  );
                })}
            </div>
          </div>

          {/* Separador */}
          <div className="h-px bg-gray-200 my-1" />

          <p className="text-xs text-gray-400 text-center leading-relaxed">
            Este análisis es orientativo. Te recomendamos visitar el campus del{' '}
            <strong className="text-gray-600">TecNM Monclova</strong> para conocer
            los laboratorios y hablar con los maestros de cada carrera.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-100 px-5 py-4">
        <div className="max-w-md mx-auto flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 py-3 rounded-xl text-sm font-semibold border-2 transition-all active:scale-98"
            style={{ borderColor: c.accent, color: c.accent }}
          >
            ← Ver otras opciones
          </button>
          <button
            onClick={onReset}
            className="flex-1 py-3 rounded-xl text-sm font-semibold text-white transition-all active:scale-98"
            style={{ background: c.accent }}
          >
            Repetir test
          </button>
        </div>
      </div>
    </div>
  );
}
