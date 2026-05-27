import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, MapPin, Briefcase, BookOpen, Users, CheckCircle2, Bot, ChevronDown, ChevronUp, Star, Building2 } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Tooltip } from 'recharts';
import Footer from '../components/Footer';

interface LocationState {
  scores: Record<string, number>;
  sessionId: string;
  openResponse: string;
  yesResponses: string[];
}

const careerDetails: Record<string, { name: string; description: string; whatTheyDo: string; subjects: string[]; jobMarket: string[]; skills: string[]; emoji: string; color: string }> = {
  'Informatica': {
    name: 'Ing. en Informatica', description: 'Disena y desarrolla software, apps y sistemas digitales',
    whatTheyDo: 'Desarrolla aplicaciones moviles y web, administra servidores y bases de datos, automatiza procesos mediante codigo.',
    subjects: ['Programacion', 'Algoritmos', 'Bases de Datos', 'Desarrollo Web', 'Ciberseguridad', 'Inteligencia Artificial', 'Arquitectura de Software', 'Cloud Computing'],
    jobMarket: ['Empresas tecnologicas', 'Startups', 'Bancos y fintech', 'Consultorias TI', 'E-commerce'],
    skills: ['Pensamiento logico', 'Resolucion de problemas', 'Aprendizaje continuo', 'Trabajo colaborativo'],
    emoji: '💻', color: 'from-cyan-500 to-cyan-700',
  },
  'Industrial': {
    name: 'Ing. Industrial', description: 'Optimiza procesos productivos y mejora la eficiencia operativa',
    whatTheyDo: 'Analiza y mejora procesos de produccion, implementa sistemas de calidad, reduce tiempos y costos, gestiona cadenas de suministro.',
    subjects: ['Estadistica Industrial', 'Gestion de Calidad', 'Investigacion de Operaciones', 'Lean Manufacturing', 'Cadena de Suministro', 'Ergonomia', 'Control Estadistico', 'Simulacion'],
    jobMarket: ['Plantas manufactureras', 'Industria automotriz', 'Consultoria', 'Logistica', 'Sector salud'],
    skills: ['Analisis de datos', 'Liderazgo', 'Vision sistemica', 'Optimizacion'],
    emoji: '🏭', color: 'from-orange-500 to-orange-700',
  },
  'Electronica': {
    name: 'Ing. Electronica', description: 'Disena sistemas electronicos y de automatizacion',
    whatTheyDo: 'Disena circuitos y sistemas embebidos, programa microcontroladores, configura PLCs industriales, desarrolla sistemas de control automatizado.',
    subjects: ['Circuitos Electronicos', 'Microcontroladores', 'PLC y Automatizacion', 'Sistemas de Control', 'Comunicaciones', 'Instrumentacion', 'Electronica de Potencia', 'IoT'],
    jobMarket: ['Industria automotriz', 'Manufactura automatizada', 'Empresas de computo', 'Telecomunicaciones', 'Sector energetico'],
    skills: ['Pensamiento analitico', 'Precision tecnica', 'Creatividad', 'Resolucion de fallas'],
    emoji: '⚡', color: 'from-yellow-500 to-yellow-700',
  },
  'Mecanica': {
    name: 'Ing. Mecanica', description: 'Disena, fabrica y mantiene sistemas mecanicos',
    whatTheyDo: 'Disena piezas y ensambles en CAD, programa maquinas CNC, selecciona materiales, analiza esfuerzos y resistencias, realiza mantenimiento.',
    subjects: ['Diseno Mecanico', 'Mecanica de Materiales', 'Manufactura', 'Termodinamica', 'Maquinas y Mecanismos', 'CAD/CAM', 'CNC', 'Mantenimiento'],
    jobMarket: ['Industria automotriz', 'Aeroespacial', 'Manufactura', 'Plantas industriales', 'Constructoras'],
    skills: ['Razonamiento espacial', 'Creatividad tecnica', 'Trabajo con herramientas', 'Analisis de fallas'],
    emoji: '🔧', color: 'from-red-500 to-red-700',
  },
  'Energias Renovables': {
    name: 'Ing. en Energias Renovables', description: 'Desarrolla proyectos de energia limpia y sostenible',
    whatTheyDo: 'Dimensiona sistemas fotovoltaicos, evalua viabilidad de proyectos verdes, realiza auditorias energeticas, calcula huellas de carbono.',
    subjects: ['Energia Solar', 'Energia Eolica', 'Eficiencia Energetica', 'Normatividad Ambiental', 'Auditorias Energeticas', 'Huella de Carbono', 'Mercados Electricos', 'Gestion de Proyectos'],
    jobMarket: ['Empresas de energia', 'Consultoria ambiental', 'Gobierno', 'Organismos internacionales', 'Sector industrial'],
    skills: ['Conciencia ambiental', 'Trabajo en campo', 'Analisis costo-beneficio', 'Vision integral'],
    emoji: '🌱', color: 'from-green-500 to-green-700',
  },
  'Gestion Empresarial': {
    name: 'Ing. en Gestion Empresarial', description: 'Lidera organizaciones y gestiona recursos estrategicamente',
    whatTheyDo: 'Elabora presupuestos y estados financieros, disena estrategias de marketing, gestiona equipos y recursos humanos, negocia contratos.',
    subjects: ['Contabilidad', 'Finanzas', 'Marketing', 'Recursos Humanos', 'Derecho Empresarial', 'Planeacion Estrategica', 'Negociacion', 'Emprendimiento'],
    jobMarket: ['Empresas de servicios', 'Sector financiero', 'Retail', 'Consultoria', 'Emprendimiento propio'],
    skills: ['Liderazgo', 'Comunicacion', 'Negociacion', 'Analisis financiero'],
    emoji: '📊', color: 'from-purple-500 to-purple-700',
  },
};

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const [showConfetti, setShowConfetti] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const scores = state?.scores || {};
  const openResponse = state?.openResponse || '';
  const yesResponses = state?.yesResponses || [];

  const sortedCareers = Object.entries(scores).sort((a, b) => b[1] - a[1]).map(([name, score]) => ({ name, score, details: careerDetails[name] }));
  const topCareer = sortedCareers[0];
  const topThree = sortedCareers.slice(0, 3);
  const radarData = sortedCareers.map((c) => ({ name: c.name, value: c.score, fullName: c.details?.name || c.name }));

  useEffect(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  if (!topCareer) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-16">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">No hay resultados disponibles</p>
          <button onClick={() => navigate('/test')} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold">Realizar el test</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-16 relative overflow-hidden">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(60)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, x: Math.random() * window.innerWidth, opacity: 1 }}
              animate={{ y: window.innerHeight + 20, opacity: [1, 1, 0], rotate: Math.random() * 360 }}
              transition={{ duration: 3 + Math.random() * 2, ease: 'easeOut', delay: Math.random() * 0.5 }}
              className="absolute w-3 h-3"
              style={{ backgroundColor: ['#1A56DB', '#60A5FA', '#FCD34D', '#22C55E'][Math.floor(Math.random() * 4)], borderRadius: Math.random() > 0.5 ? '50%' : '2px' }}
            />
          ))}
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-12 relative">
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.3 }} className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6">
            <Star className="w-5 h-5" />
            <span className="font-semibold">Tu resultado esta listo</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-5xl md:text-7xl font-bold text-slate-900 mb-6">
            Es un Match!
          </motion.h1>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.7 }} className="relative max-w-md mx-auto">
            <div className={`bg-gradient-to-br ${topCareer.details?.color} rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden`}>
              <div className="absolute top-6 right-6">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <Trophy className="w-7 h-7 text-yellow-300" />
                </div>
              </div>
              <div className="text-6xl mb-4">{topCareer.details?.emoji}</div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">{topCareer.details?.name}</h2>
              <p className="text-white/90 mb-6">{topCareer.details?.description}</p>
              <div className="inline-flex items-center gap-3 bg-white rounded-2xl px-6 py-4">
                <div className="relative">
                  <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                    <circle cx="18" cy="18" r="16" fill="none" stroke="#1A56DB" strokeWidth="3" strokeDasharray={`${topCareer.score}, 100`} strokeLinecap="round" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-slate-900">{topCareer.score}%</span>
                </div>
                <div className="text-left">
                  <p className="text-sm text-gray-500">compatibilidad</p>
                  <p className="font-semibold text-slate-900">con tu perfil</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Tus mejores matches</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {topThree.map((career, index) => (
              <motion.div key={career.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 + index * 0.1 }} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold" style={{ background: `linear-gradient(to bottom right, #1A56DB, #60A5FA)` }}>{index + 1}</div>
                  <div className="text-2xl">{career.details?.emoji}</div>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{career.details?.name}</h3>
                <p className="text-sm text-gray-600 mb-3">{career.details?.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden mr-3">
                    <div className={`h-full bg-gradient-to-r ${career.details?.color} rounded-full`} style={{ width: `${career.score}%` }} />
                  </div>
                  <span className="font-bold text-blue-600">{career.score}%</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {career.details?.skills.slice(0, 3).map((skill) => (
                    <span key={skill} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 }} className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Todo sobre {topCareer.details?.name}</h2>

          {[{ key: 'what', icon: Briefcase, title: 'Que hace un ingeniero en esta area?', content: topCareer.details?.whatTheyDo },
            { key: 'subjects', icon: BookOpen, title: 'Materias principales', content: topCareer.details?.subjects?.join(', ') },
            { key: 'jobs', icon: MapPin, title: 'Campo laboral', content: topCareer.details?.jobMarket?.join(', ') },
            { key: 'profile', icon: Users, title: 'Perfil del egresado', content: topCareer.details?.skills?.join(', ') }
          ].map((section) => (
            <div key={section.key} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-4">
              <button onClick={() => setExpandedSection(expandedSection === section.key ? null : section.key)} className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="font-semibold text-slate-900">{section.title}</span>
                </div>
                {expandedSection === section.key ? <ChevronUp className="w-5 h-5 text-gray-400" /> : <ChevronDown className="w-5 h-5 text-gray-400" />}
              </button>
              {expandedSection === section.key && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="px-6 pb-6 text-gray-600">{section.content}</motion.div>
              )}
            </div>
          ))}

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-6 h-6 text-blue-600" />
              <h3 className="font-semibold text-slate-900">Por que hace match contigo?</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Tus respuestas muestran una fuerte afinidad con las actividades y habilidades clave de {topCareer.details?.name}.
              Demostraste interes en {topCareer.details?.skills?.slice(0, 2).join(' y ')}, cualidades esenciales para destacar en esta carrera.
            </p>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }} className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Tus respuestas en numeros</h2>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="name" tick={{ fill: '#0f172a', fontSize: 11 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 10 }} tickCount={5} />
                  <Radar name="Afinidad" dataKey="value" stroke="#1A56DB" fill="#60A5FA" fillOpacity={0.4} strokeWidth={2} />
                  <Tooltip content={({ active, payload }) => active && payload && payload.length ? (
                    <div className="bg-white px-4 py-3 rounded-lg shadow-xl border border-gray-100">
                      <p className="font-semibold text-slate-900">{payload[0].payload.fullName}</p>
                      <p className="text-blue-600 font-bold text-lg">{payload[0].payload.value}%</p>
                    </div>
                  ) : null} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }} className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Que sigue?</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[{ icon: Building2, title: 'Explorar el campus', desc: 'Conoce las instalaciones', action: () => navigate('/carreras') },
              { icon: Bot, title: 'Hablar con el chatbot', desc: 'Resuelve tus dudas', action: () => { const btn = document.querySelector('[class*="fixed bottom-6"]') as HTMLElement; if (btn) btn.click(); } },
              { icon: BookOpen, title: 'Ver todas las carreras', desc: 'Compara las 6 ingenierias', action: () => navigate('/carreras') }
            ].map((cta, i) => (
              <button key={i} onClick={cta.action} className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all text-left group">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-200">
                  <cta.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-slate-900 mb-2">{cta.title}</h3>
                <p className="text-sm text-gray-500">{cta.desc}</p>
              </button>
            ))}
          </div>
        </motion.section>

        <div className="text-center">
          <button onClick={() => navigate('/test')} className="text-blue-600 hover:text-blue-700 font-medium">Quieres hacer el test de nuevo?</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
