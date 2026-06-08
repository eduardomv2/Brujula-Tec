import { useState } from 'react';
import { CARRERAS } from '../../data/carreras';

interface Edificio {
  id: string;
  nombre: string;
  carreraId: string;
  x: number; y: number;
  w: number; h: number;
  areas: string[];
  descripcion: string;
}

const EDIFICIOS: Edificio[] = [
  {
    id: 'edif-inf',
    nombre: 'Edificio de Informática',
    carreraId: 'INF',
    x: 40, y: 40, w: 160, h: 110,
    areas: ['Lab. Programación', 'Lab. Redes', 'Lab. Ciberseguridad', 'Sala de Servidores'],
    descripcion: 'Centro de cómputo con más de 120 equipos de última generación, servidores propios y laboratorio de redes empresariales.',
  },
  {
    id: 'edif-ind',
    nombre: 'Edificio Industrial',
    carreraId: 'IND',
    x: 240, y: 40, w: 150, h: 110,
    areas: ['Lab. Manufactura', 'Sala de Simulación', 'Lab. Calidad', 'Área de Procesos'],
    descripcion: 'Planta de manufactura escala real con celdas de trabajo, equipos de medición y software de simulación industrial.',
  },
  {
    id: 'edif-elec',
    nombre: 'Edificio de Electrónica',
    carreraId: 'ELEC',
    x: 440, y: 40, w: 150, h: 110,
    areas: ['Lab. Electrónica', 'Lab. PLCs', 'Lab. Automatización', 'Taller de Control'],
    descripcion: 'Laboratorios con PLCs Allen-Bradley y Siemens, banco de pruebas de automatización y equipos de instrumentación industrial.',
  },
  {
    id: 'edif-mec',
    nombre: 'Edificio de Mecánica',
    carreraId: 'MEC',
    x: 40, y: 200, w: 160, h: 110,
    areas: ['Taller CNC', 'Lab. CAD/CAM', 'Lab. Resistencia', 'Taller de Soldadura'],
    descripcion: 'Taller de maquinado con tornos CNC, fresadoras, laboratorio de resistencia de materiales y estación de diseño CAD.',
  },
  {
    id: 'edif-enrv',
    nombre: 'Edificio Energías Renovables',
    carreraId: 'ENRV',
    x: 240, y: 200, w: 150, h: 110,
    areas: ['Lab. Solar', 'Lab. Eólico', 'Planta Piloto', 'Lab. Ambiental'],
    descripcion: 'Planta piloto fotovoltaica en el techo, aerogenerador de demostración y laboratorio de auditoría energética.',
  },
  {
    id: 'edif-ge',
    nombre: 'Edificio Gestión Empresarial',
    carreraId: 'GE',
    x: 440, y: 200, w: 150, h: 110,
    areas: ['Aula Financiera', 'Sala de Negocios', 'Lab. Empresarial', 'Centro de Emprendimiento'],
    descripcion: 'Centro de simulación empresarial, sala de negocios con software ERP y hub de emprendimiento con mentores.',
  },
];

const ELEMENTOS_CAMPUS = [
  { label: 'Biblioteca', x: 240, y: 360, w: 150, h: 60, emoji: '📚' },
  { label: 'Cafetería', x: 40, y: 360, w: 150, h: 60, emoji: '🍽️' },
  { label: 'Estacionamiento', x: 440, y: 360, w: 150, h: 60, emoji: '🚗' },
];

export function CampusTab() {
  const [seleccionado, setSeleccionado] = useState<Edificio | null>(null);

  const handleClick = (edif: Edificio) => {
    setSeleccionado(s => s?.id === edif.id ? null : edif);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-5 py-5">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl font-bold text-gray-900">Campus TecNM Monclova</h2>
          <p className="text-sm text-gray-500 mt-0.5">Toca un edificio para ver sus laboratorios</p>
        </div>
      </div>

      <div className="px-4 py-5 max-w-2xl mx-auto">
        {/* Plano SVG */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-4">
          <div className="bg-gray-50 border-b border-gray-100 px-4 py-2.5 flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">🗺️ Plano del campus</span>
            <span className="text-xs text-gray-400 ml-auto">Vista esquemática</span>
          </div>

          <div className="overflow-x-auto p-4">
            <svg
              viewBox="0 0 640 450"
              width="100%"
              style={{ minWidth: 320, maxWidth: 640 }}
              className="block"
            >
              {/* Fondo del campus */}
              <rect x="20" y="20" width="600" height="410" rx="12" fill="#F9FAFB" stroke="#E5E7EB" strokeWidth="1.5" />

              {/* Caminos internos */}
              <rect x="210" y="20" width="20" height="410" fill="#F3F4F6" />
              <rect x="405" y="20" width="20" height="410" fill="#F3F4F6" />
              <rect x="20" y="170" width="600" height="20" fill="#F3F4F6" />
              <rect x="20" y="335" width="600" height="20" fill="#F3F4F6" />

              {/* Edificios de carreras */}
              {EDIFICIOS.map(edif => {
                const carrera = CARRERAS[edif.carreraId];
                const activo = seleccionado?.id === edif.id;
                const c = carrera?.color;
                return (
                  <g
                    key={edif.id}
                    onClick={() => handleClick(edif)}
                    style={{ cursor: 'pointer' }}
                  >
                    <rect
                      x={edif.x} y={edif.y}
                      width={edif.w} height={edif.h}
                      rx="8"
                      fill={activo ? (c?.accent ?? '#3B82F6') : (c?.badge ?? '#EFF6FF')}
                      stroke={c?.accent ?? '#3B82F6'}
                      strokeWidth={activo ? 2.5 : 1.5}
                      style={{ transition: 'all 0.2s' }}
                    />
                    {/* Emoji */}
                    <text
                      x={edif.x + edif.w / 2}
                      y={edif.y + 38}
                      textAnchor="middle"
                      fontSize="22"
                    >
                      {carrera?.emoji}
                    </text>
                    {/* Nombre corto */}
                    <text
                      x={edif.x + edif.w / 2}
                      y={edif.y + 62}
                      textAnchor="middle"
                      fontSize="9.5"
                      fontWeight="700"
                      fill={activo ? 'white' : '#374151'}
                      style={{ transition: 'all 0.2s' }}
                    >
                      {carrera?.nombreCorto}
                    </text>
                    {/* Número de áreas */}
                    <text
                      x={edif.x + edif.w / 2}
                      y={edif.y + 77}
                      textAnchor="middle"
                      fontSize="8"
                      fill={activo ? 'rgba(255,255,255,0.8)' : '#9CA3AF'}
                    >
                      {edif.areas.length} laboratorios
                    </text>
                    {/* Indicador seleccionado */}
                    {activo && (
                      <circle
                        cx={edif.x + edif.w - 10}
                        cy={edif.y + 10}
                        r="5"
                        fill="white"
                      />
                    )}
                  </g>
                );
              })}

              {/* Elementos del campus (biblioteca, cafetería, etc.) */}
              {ELEMENTOS_CAMPUS.map(el => (
                <g key={el.label}>
                  <rect
                    x={el.x} y={el.y}
                    width={el.w} height={el.h}
                    rx="6"
                    fill="#F9FAFB"
                    stroke="#D1D5DB"
                    strokeWidth="1"
                    strokeDasharray="4 2"
                  />
                  <text x={el.x + el.w / 2} y={el.y + 22} textAnchor="middle" fontSize="16">{el.emoji}</text>
                  <text x={el.x + el.w / 2} y={el.y + 42} textAnchor="middle" fontSize="9" fill="#6B7280" fontWeight="500">
                    {el.label}
                  </text>
                </g>
              ))}

              {/* Entrada principal */}
              <rect x="280" y="410" width="80" height="20" rx="0" fill="#D1D5DB" />
              <text x="320" y="423" textAnchor="middle" fontSize="8" fill="#6B7280" fontWeight="600">
                ENTRADA PRINCIPAL
              </text>
            </svg>
          </div>
        </div>

        {/* Panel de detalle del edificio seleccionado */}
        {seleccionado ? (
          <div
            className="bg-white rounded-2xl border-2 overflow-hidden transition-all"
            style={{ borderColor: CARRERAS[seleccionado.carreraId]?.color.accent }}
          >
            <div
              className="px-5 py-4 flex items-center gap-3"
              style={{ background: CARRERAS[seleccionado.carreraId]?.color.bg }}
            >
              <span className="text-3xl">{CARRERAS[seleccionado.carreraId]?.emoji}</span>
              <div>
                <p className="font-bold text-gray-900">{seleccionado.nombre}</p>
                <p className="text-xs text-gray-500">{CARRERAS[seleccionado.carreraId]?.nombre}</p>
              </div>
            </div>

            <div className="px-5 py-4">
              <p className="text-sm text-gray-700 leading-relaxed mb-4">{seleccionado.descripcion}</p>

              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Áreas y laboratorios
              </p>
              <div className="grid grid-cols-2 gap-2">
                {seleccionado.areas.map(area => (
                  <div
                    key={area}
                    className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: CARRERAS[seleccionado.carreraId]?.color.bar }}
                    />
                    <span className="text-xs text-gray-700 font-medium">{area}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400 bg-white rounded-2xl border border-gray-200">
            <p className="text-3xl mb-2">👆</p>
            <p className="text-sm font-medium">Selecciona un edificio en el plano</p>
            <p className="text-xs mt-1">Ver laboratorios y descripción</p>
          </div>
        )}

        {/* Leyenda */}
        <div className="mt-4 bg-white rounded-2xl border border-gray-100 px-4 py-3">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Leyenda</p>
          <div className="grid grid-cols-3 gap-2">
            {Object.values(CARRERAS).map(c => (
              <div key={c.id} className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded" style={{ background: c.color.accent }} />
                <span className="text-xs text-gray-600">{c.emoji} {c.nombreCorto}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
