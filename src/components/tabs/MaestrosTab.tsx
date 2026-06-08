import { useState } from 'react';
import { MAESTROS, getMaestrosByCarrera, type Maestro } from '../../data/maestros';
import { CARRERAS, CARRERAS_LIST } from '../../data/carreras';

function AvatarGenerico({ nombre, color }: { nombre: string; color: string }) {
  const iniciales = nombre
    .split(' ')
    .filter((_, i) => i < 2)
    .map(n => n[0])
    .join('');
  return (
    <div
      className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-lg font-bold shrink-0"
      style={{ background: color }}
    >
      {iniciales}
    </div>
  );
}

function MaestroCard({ maestro }: { maestro: Maestro }) {
  const [expanded, setExpanded] = useState(false);
  const carrera = CARRERAS[maestro.carrera];
  const c = carrera?.color;

  return (
    <div
      className="bg-white rounded-2xl border-2 overflow-hidden transition-all"
      style={{ borderColor: expanded ? c?.accent ?? '#E5E7EB' : '#E5E7EB' }}
    >
      {/* Header de la card */}
      <div className="p-4">
        <div className="flex gap-3 items-start">
          {maestro.foto ? (
            <img
              src={maestro.foto}
              alt={maestro.nombre}
              className="w-16 h-16 rounded-2xl object-cover shrink-0"
            />
          ) : (
            <AvatarGenerico nombre={maestro.nombre} color={c?.accent ?? '#6B7280'} />
          )}

          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 text-sm leading-tight">{maestro.nombre}</p>
            <p className="text-xs text-gray-500 mt-0.5">{maestro.especialidad}</p>
            <div
              className="inline-block mt-1.5 text-xs font-semibold px-2 py-0.5 rounded-full"
              style={{ background: c?.badge ?? '#F3F4F6', color: c?.badgeText ?? '#374151' }}
            >
              {carrera?.nombreCorto}
            </div>
          </div>
        </div>

        {/* Materias en pills */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {maestro.materias.map(m => (
            <span
              key={m}
              className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full"
            >
              {m}
            </span>
          ))}
        </div>
      </div>

      {/* Expandible */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full px-4 py-2.5 flex items-center justify-between border-t border-gray-100 bg-gray-50 text-xs font-semibold text-gray-500 hover:bg-gray-100 transition-colors"
      >
        <span>{expanded ? 'Ver menos' : 'Ver perfil completo'}</span>
        <span className="transition-transform" style={{ transform: expanded ? 'rotate(180deg)' : 'none' }}>
          ▾
        </span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 pt-3 flex flex-col gap-3 border-t border-gray-100">
          {/* Descripción */}
          <p className="text-sm text-gray-700 leading-relaxed">{maestro.descripcion}</p>

          {/* Experiencia */}
          <div className="flex gap-2 items-start">
            <span className="text-base mt-0.5">💼</span>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Experiencia</p>
              <p className="text-sm text-gray-700">{maestro.experiencia}</p>
            </div>
          </div>

          {/* Contacto y CV */}
          <div className="flex gap-2 flex-wrap mt-1">
            {maestro.email && (
              <a
                href={`mailto:${maestro.email}`}
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
              >
                ✉️ Contactar
              </a>
            )}
            {maestro.cvUrl ? (
              <a
                href={maestro.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-medium px-3 py-2 rounded-xl border text-white transition-colors"
                style={{ background: c?.accent ?? '#3B82F6', borderColor: c?.accent ?? '#3B82F6' }}
              >
                📄 Descargar CV
              </a>
            ) : (
              <span className="flex items-center gap-1.5 text-xs text-gray-400 px-3 py-2 rounded-xl border border-dashed border-gray-200">
                📄 CV próximamente
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export function MaestrosTab() {
  const [carreraFiltro, setCarreraFiltro] = useState<string>('todos');

  const maestrosFiltrados = carreraFiltro === 'todos'
    ? MAESTROS
    : getMaestrosByCarrera(carreraFiltro);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-5 py-5">
        <div className="max-w-lg mx-auto">
          <h2 className="text-xl font-bold text-gray-900">Cuerpo docente</h2>
          <p className="text-sm text-gray-500 mt-0.5">
            {MAESTROS.length} maestros · {CARRERAS_LIST.length} ingenierías
          </p>
        </div>
      </div>

      {/* Filtro por carrera */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="max-w-lg mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setCarreraFiltro('todos')}
              className={`shrink-0 text-xs font-semibold px-3 py-2 rounded-full border transition-all ${
                carreraFiltro === 'todos'
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              }`}
            >
              Todos ({MAESTROS.length})
            </button>
            {CARRERAS_LIST.map(c => {
              const count = getMaestrosByCarrera(c.id).length;
              const activo = carreraFiltro === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setCarreraFiltro(c.id)}
                  className="shrink-0 text-xs font-semibold px-3 py-2 rounded-full border transition-all"
                  style={{
                    background: activo ? c.color.accent : 'white',
                    color: activo ? 'white' : c.color.badgeText,
                    borderColor: activo ? c.color.accent : c.color.border,
                  }}
                >
                  {c.emoji} {c.nombreCorto} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lista de maestros */}
      <div className="px-4 py-5 max-w-lg mx-auto flex flex-col gap-4">
        {maestrosFiltrados.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-4xl mb-3">👩‍🏫</p>
            <p className="font-medium">No hay maestros registrados para esta carrera</p>
          </div>
        ) : (
          maestrosFiltrados.map(m => <MaestroCard key={m.id} maestro={m} />)
        )}
      </div>
    </div>
  );
}
