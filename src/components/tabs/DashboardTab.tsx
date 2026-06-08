import { useState, useEffect } from 'react';
import { CARRERAS } from '../../data/carreras';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL ?? 'http://localhost:8000';

interface BachStat {
  nombre: string;
  tests: number;
  top_carrera: string;
  top_pct: number;
}

interface StatsAdmin {
  total: number;
  hoy: number;
  por_carrera: Record<string, number>;
  por_bachillerato: BachStat[];
  ultimos: { id: string; bachillerato: string; carrera_1: string; fecha: string }[];
}

function WidgetBachilleratos({ datos, total, cargando }: { datos: BachStat[]; total: number; cargando: boolean }) {
  if (cargando) {
    return (
      <div className="px-5 py-10 max-w-5xl mx-auto text-center">
        <div className="w-8 h-8 rounded-full border-4 border-gray-200 mx-auto mb-3"
          style={{ borderTopColor: '#3B82F6', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        <p className="text-sm text-gray-400">Cargando estadísticas...</p>
      </div>
    );
  }

  if (datos.length === 0) {
    return (
      <div className="px-5 py-10 max-w-5xl mx-auto text-center">
        <p className="text-3xl mb-3">📊</p>
        <p className="font-semibold text-gray-600">Aún no hay suficientes datos</p>
        <p className="text-sm text-gray-400 mt-1">
          Las tendencias aparecerán aquí conforme los aspirantes completen el test
        </p>
      </div>
    );
  }

  return (
    <div className="px-5 py-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-gray-900">Tendencias por bachillerato</h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Basado en {total} {total === 1 ? 'test realizado' : 'tests realizados'} · en tiempo real
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {datos.map((b, i) => {
          const c = CARRERAS[b.top_carrera];
          return (
            <div key={b.nombre}
              className="bg-white rounded-2xl border-2 p-5 transition-all hover:shadow-md"
              style={{ borderColor: i === 0 ? (c?.color.accent + '66') : '#E5E7EB' }}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-black text-gray-400">#{i + 1}</span>
                <span className="text-xs text-gray-400">{b.tests} {b.tests === 1 ? 'test' : 'tests'}</span>
              </div>

              <p className="font-bold text-gray-900 text-sm mb-3">{b.nombre}</p>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{c?.emoji}</span>
                <div>
                  <p className="text-xs font-semibold" style={{ color: c?.color.accent }}>{c?.nombreCorto}</p>
                  <p className="text-xs text-gray-500">carrera más común</p>
                </div>
              </div>

              <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-1.5">
                <div className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${b.top_pct}%`, background: c?.color.bar }} />
              </div>
              <p className="text-xs font-bold" style={{ color: c?.color.accent }}>
                {b.top_pct}% obtienen este perfil
              </p>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-gray-400 text-center mt-4">
        ¿Eres de alguno de estos bachilleratos?{' '}
        <span className="font-medium text-blue-500">Haz el test y compara tu resultado →</span>
      </p>
    </div>
  );
}

export function DashboardTab() {
  const [bachilleratos, setBachilleratos] = useState<BachStat[]>([]);
  const [totalPublico, setTotalPublico] = useState(0);
  const [cargandoPublico, setCargandoPublico] = useState(true);

  const [autenticado, setAutenticado] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [statsAdmin, setStatsAdmin] = useState<StatsAdmin | null>(null);
  const [loadingAdmin, setLoadingAdmin] = useState(false);

  // Cargar datos públicos al montar — sin auth
  useEffect(() => {
    fetch(`${BACKEND_URL}/stats/bachilleratos`)
      .then(r => r.json())
      .then(d => {
        setBachilleratos(d.bachilleratos ?? []);
        setTotalPublico(d.total ?? 0);
      })
      .catch(() => {
        setBachilleratos([]);
      })
      .finally(() => setCargandoPublico(false));
  }, []);

  const handleLogin = async () => {
    if (!password) { setError('Escribe la contraseña'); return; }
    setLoadingAdmin(true);
    setError('');
    try {
      const res = await fetch(`${BACKEND_URL}/dashboard`, {
        headers: { 'X-Admin-Key': password },
      });
      if (res.status === 401) { setError('Contraseña incorrecta'); return; }
      const data = await res.json();
      setStatsAdmin(data);
      setAutenticado(true);
    } catch {
      setError('No se pudo conectar al backend');
    } finally {
      setLoadingAdmin(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-5 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Estadísticas</h2>
            <p className="text-xs text-gray-400 mt-0.5">Compasslife · TecNM Monclova</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-gray-400 font-medium">
              {totalPublico > 0 ? `${totalPublico} tests registrados` : 'Sistema activo'}
            </span>
          </div>
        </div>
      </div>

      {/* Widget público — siempre visible, datos reales */}
      <div className="bg-white border-b border-gray-100">
        <WidgetBachilleratos datos={bachilleratos} total={totalPublico} cargando={cargandoPublico} />
      </div>

      {/* Sección admin */}
      <div className="px-4 py-8 max-w-5xl mx-auto">
        {!autenticado ? (
          <div className="max-w-sm mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm p-7">
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl mx-auto mb-3">🔒</div>
              <h3 className="text-base font-bold text-gray-900">Acceso Admin</h3>
              <p className="text-sm text-gray-500 mt-1">Ver datos completos, todas las prepas y actividad reciente</p>
            </div>
            <div className="flex flex-col gap-3">
              <input type="password" value={password}
                onChange={e => { setPassword(e.target.value); setError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleLogin()}
                placeholder="Contraseña de acceso"
                className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all" />
              {error && <p className="text-xs text-red-500 text-center">{error}</p>}
              <button onClick={handleLogin} disabled={loadingAdmin}
                className="bg-blue-600 text-white font-bold py-3 rounded-xl text-sm hover:bg-blue-700 transition-all disabled:opacity-60">
                {loadingAdmin ? 'Verificando...' : 'Acceder →'}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Panel de administración</h3>
              <button onClick={() => { setAutenticado(false); setStatsAdmin(null); setPassword(''); }}
                className="text-xs text-gray-400 hover:text-gray-600 border border-gray-200 px-3 py-1.5 rounded-lg">
                Cerrar sesión
              </button>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { emoji:'🎯', label:'Tests totales',    val: statsAdmin?.total ?? 0,                              color:'#3B82F6' },
                { emoji:'📅', label:'Tests hoy',         val: statsAdmin?.hoy ?? 0,                                color:'#22C55E' },
                { emoji:'🏫', label:'Bachilleratos',     val: statsAdmin?.por_bachillerato?.length ?? 0,            color:'#F97316' },
                { emoji:'🎓', label:'Carreras activas',  val: Object.keys(statsAdmin?.por_carrera ?? {}).length,    color:'#A855F7' },
              ].map(k => (
                <div key={k.label} className="bg-white rounded-2xl border border-gray-200 p-4 text-center">
                  <p className="text-xl mb-1">{k.emoji}</p>
                  <p className="text-2xl font-black" style={{ color: k.color }}>{k.val}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{k.label}</p>
                </div>
              ))}
            </div>

            {(statsAdmin?.total ?? 0) === 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
                <p className="text-4xl mb-3">📭</p>
                <p className="font-semibold text-gray-700">Aún no hay tests registrados</p>
              </div>
            )}

            {/* Por carrera */}
            {Object.keys(statsAdmin?.por_carrera ?? {}).length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="font-bold text-gray-900 text-sm">Distribución por carrera</h3>
                </div>
                <div className="px-5 py-4 flex flex-col gap-3">
                  {Object.entries(statsAdmin!.por_carrera)
                    .sort((a, b) => b[1] - a[1])
                    .map(([id, count]) => {
                      const c = CARRERAS[id];
                      const pct = Math.round((count / statsAdmin!.total) * 100);
                      return (
                        <div key={id} className="flex items-center gap-3">
                          <span className="text-base w-6">{c?.emoji}</span>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="text-xs font-semibold text-gray-700">{c?.nombreCorto ?? id}</span>
                              <span className="text-xs text-gray-500">{count} tests</span>
                            </div>
                            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full rounded-full" style={{ width:`${pct}%`, background: c?.color.bar }} />
                            </div>
                          </div>
                          <span className="text-xs font-bold w-9 text-right" style={{ color: c?.color.accent }}>{pct}%</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}

            {/* Todos los bachilleratos */}
            {(statsAdmin?.por_bachillerato?.length ?? 0) > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="font-bold text-gray-900 text-sm">
                    Todos los bachilleratos ({statsAdmin!.por_bachillerato.length})
                  </h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {statsAdmin!.por_bachillerato.map(b => {
                    const c = CARRERAS[b.top_carrera];
                    return (
                      <div key={b.nombre} className="px-5 py-3.5 flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">{b.nombre}</p>
                          <p className="text-xs text-gray-400">{b.tests} tests</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span>{c?.emoji}</span>
                          <div className="text-right">
                            <p className="text-xs font-bold" style={{ color: c?.color.accent }}>{c?.nombreCorto}</p>
                            <p className="text-xs text-gray-400">{b.top_pct}%</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Actividad reciente */}
            {(statsAdmin?.ultimos?.length ?? 0) > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="px-5 py-4 border-b border-gray-100">
                  <h3 className="font-bold text-gray-900 text-sm">Actividad reciente</h3>
                </div>
                <div className="divide-y divide-gray-50">
                  {statsAdmin!.ultimos.map((t, i) => {
                    const c = CARRERAS[t.carrera_1];
                    const hora = new Date(t.fecha).toLocaleTimeString('es-MX', { hour:'2-digit', minute:'2-digit' });
                    return (
                      <div key={i} className="px-5 py-3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0"
                          style={{ background: c?.color.badge }}>{c?.emoji}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold text-gray-700">ID: {t.id}</p>
                          <p className="text-xs text-gray-400 truncate">{t.bachillerato}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs font-bold" style={{ color: c?.color.accent }}>→ {c?.nombreCorto}</p>
                          <p className="text-xs text-gray-400">{hora}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
