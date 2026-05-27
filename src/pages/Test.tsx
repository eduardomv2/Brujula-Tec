import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { Check, X, ChevronRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface TestProps {
  sessionToken: string | null;
}

interface Question {
  id: string;
  text: string;
  category: string;
  categoryEmoji: string;
  weights: Record<string, number>;
}

const questions: Question[] = [
  // Perfil General
  { id: 'pg1', text: 'Prefieres trabajar con las manos que frente a una computadora?', category: 'Perfil General', categoryEmoji: '🧩', weights: { 'Mecanica': 2, 'Electronica': 1, 'Industrial': 1 } },
  { id: 'pg2', text: 'Prefieres trabajar en equipo que solo?', category: 'Perfil General', categoryEmoji: '🧩', weights: { 'Gestion Empresarial': 2, 'Industrial': 1 } },
  { id: 'pg3', text: 'Te atrae mas crear cosas fisicas que resolver cosas abstractas?', category: 'Perfil General', categoryEmoji: '🧩', weights: { 'Mecanica': 2, 'Electronica': 1, 'Industrial': 1 } },
  { id: 'pg4', text: 'Te gusta liderar o coordinar a otras personas?', category: 'Perfil General', categoryEmoji: '🧩', weights: { 'Gestion Empresarial': 2, 'Industrial': 1 } },
  { id: 'pg5', text: 'Eres curioso sobre como funcionan las cosas?', category: 'Perfil General', categoryEmoji: '🧩', weights: { 'Electronica': 1, 'Mecanica': 1, 'Informatica': 1 } },
  { id: 'pg6', text: 'Preferirias trabajar en oficina/laboratorio que en campo abierto?', category: 'Perfil General', categoryEmoji: '🧩', weights: { 'Informatica': 2, 'Gestion Empresarial': 1 } },
  { id: 'pg7', text: 'Te sientes comodo con numeros y formulas?', category: 'Perfil General', categoryEmoji: '🧩', weights: { 'Industrial': 2, 'Energias Renovables': 1, 'Informatica': 1 } },

  // Informatica
  { id: 'inf1', text: 'Disfrutas escribir codigo o programar?', category: 'Informatica', categoryEmoji: '💻', weights: { 'Informatica': 3 } },
  { id: 'inf2', text: 'Te interesan los algoritmos y la logica de programacion?', category: 'Informatica', categoryEmoji: '💻', weights: { 'Informatica': 3 } },
  { id: 'inf3', text: 'Te llama la atencion la ciberseguridad?', category: 'Informatica', categoryEmoji: '💻', weights: { 'Informatica': 3 } },
  { id: 'inf4', text: 'Te sientes comodo trabajando con bases de datos?', category: 'Informatica', categoryEmoji: '💻', weights: { 'Informatica': 2 } },
  { id: 'inf5', text: 'Te interesa el desarrollo de apps web o moviles?', category: 'Informatica', categoryEmoji: '💻', weights: { 'Informatica': 3 } },
  { id: 'inf6', text: 'Te gusta automatizar tareas repetitivas con scripts o bots?', category: 'Informatica', categoryEmoji: '💻', weights: { 'Informatica': 2, 'Electronica': 1 } },
  { id: 'inf7', text: 'Te interesa el analisis de datos para tomar decisiones?', category: 'Informatica', categoryEmoji: '💻', weights: { 'Informatica': 2, 'Industrial': 1 } },
  { id: 'inf8', text: 'Resuelves problemas paso a paso con logica sistematica?', category: 'Informatica', categoryEmoji: '💻', weights: { 'Informatica': 2 } },

  // Industrial
  { id: 'ind1', text: 'Te interesa optimizar lineas de produccion en fabricas?', category: 'Industrial', categoryEmoji: '🏭', weights: { 'Industrial': 3 } },
  { id: 'ind2', text: 'Te interesan estandares de calidad como ISO 9001?', category: 'Industrial', categoryEmoji: '🏭', weights: { 'Industrial': 3 } },
  { id: 'ind3', text: 'Disfrutas medir y reducir tiempos en procesos?', category: 'Industrial', categoryEmoji: '🏭', weights: { 'Industrial': 2 } },
  { id: 'ind4', text: 'Te interesa gestionar inventarios o cadenas de suministro?', category: 'Industrial', categoryEmoji: '🏭', weights: { 'Industrial': 2 } },
  { id: 'ind5', text: 'Conoces o te interesa Lean Manufacturing o Six Sigma?', category: 'Industrial', categoryEmoji: '🏭', weights: { 'Industrial': 3 } },
  { id: 'ind6', text: 'Te ves trabajando en planta supervisando operarios?', category: 'Industrial', categoryEmoji: '🏭', weights: { 'Industrial': 2 } },
  { id: 'ind7', text: 'Te interesa el balanceo de lineas y cargas de trabajo?', category: 'Industrial', categoryEmoji: '🏭', weights: { 'Industrial': 2 } },
  { id: 'ind8', text: 'Usarias herramientas estadisticas para controlar procesos?', category: 'Industrial', categoryEmoji: '🏭', weights: { 'Industrial': 2 } },

  // Electronica
  { id: 'ele1', text: 'Programas o te gustaria programar microcontroladores (Arduino, PIC)?', category: 'Electronica', categoryEmoji: '⚡', weights: { 'Electronica': 3 } },
  { id: 'ele2', text: 'Disenas o analizas circuitos electronicos?', category: 'Electronica', categoryEmoji: '⚡', weights: { 'Electronica': 3 } },
  { id: 'ele3', text: 'Te interesa configurar y programar PLCs para automatizacion?', category: 'Electronica', categoryEmoji: '⚡', weights: { 'Electronica': 2, 'Industrial': 1 } },
  { id: 'ele4', text: 'Trabajas o quisieras trabajar con sensores y actuadores?', category: 'Electronica', categoryEmoji: '⚡', weights: { 'Electronica': 2 } },
  { id: 'ele5', text: 'Entiendes senales analogas y digitales?', category: 'Electronica', categoryEmoji: '⚡', weights: { 'Electronica': 2 } },
  { id: 'ele6', text: 'Te interesa instalar o mantener equipos electronicos?', category: 'Electronica', categoryEmoji: '⚡', weights: { 'Electronica': 2 } },
  { id: 'ele7', text: 'Te llama la atencion disenar sistemas de control con retroalimentacion?', category: 'Electronica', categoryEmoji: '⚡', weights: { 'Electronica': 2, 'Mecanica': 1 } },
  { id: 'ele8', text: 'Te interesan las comunicaciones industriales (MODBUS, redes)?', category: 'Electronica', categoryEmoji: '⚡', weights: { 'Electronica': 2 } },

  // Mecanica
  { id: 'mec1', text: 'Disenas o quisieras disenar piezas en CAD (SolidWorks, AutoCAD)?', category: 'Mecanica', categoryEmoji: '🔧', weights: { 'Mecanica': 3 } },
  { id: 'mec2', text: 'Te interesa calcular esfuerzos y resistencia de materiales?', category: 'Mecanica', categoryEmoji: '🔧', weights: { 'Mecanica': 3 } },
  { id: 'mec3', text: 'Operarias o programarias maquinas CNC?', category: 'Mecanica', categoryEmoji: '🔧', weights: { 'Mecanica': 2 } },
  { id: 'mec4', text: 'Te interesa seleccionar materiales para fabricacion?', category: 'Mecanica', categoryEmoji: '🔧', weights: { 'Mecanica': 2 } },
  { id: 'mec5', text: 'Te llama la atencion disenar sistemas de transmision de potencia?', category: 'Mecanica', categoryEmoji: '🔧', weights: { 'Mecanica': 2, 'Electronica': 1 } },
  { id: 'mec6', text: 'Realizarias mantenimiento preventivo a maquinaria?', category: 'Mecanica', categoryEmoji: '🔧', weights: { 'Mecanica': 2 } },
  { id: 'mec7', text: 'Te interesa analizar fallas en equipos mecanicos?', category: 'Mecanica', categoryEmoji: '🔧', weights: { 'Mecanica': 2 } },
  { id: 'mec8', text: 'Te ves trabajando en manufactura o taller de maquinado?', category: 'Mecanica', categoryEmoji: '🔧', weights: { 'Mecanica': 2, 'Industrial': 1 } },

  // Energias Renovables
  { id: 'ren1', text: 'Te interesa dimensionar sistemas fotovoltaicos (paneles solares)?', category: 'Energias Renovables', categoryEmoji: '🌱', weights: { 'Energias Renovables': 3 } },
  { id: 'ren2', text: 'Evaluarias la viabilidad de proyectos de energia limpia?', category: 'Energias Renovables', categoryEmoji: '🌱', weights: { 'Energias Renovables': 3 } },
  { id: 'ren3', text: 'Realizarias auditorias energeticas en edificios o empresas?', category: 'Energias Renovables', categoryEmoji: '🌱', weights: { 'Energias Renovables': 2, 'Industrial': 1 } },
  { id: 'ren4', text: 'Te interesa la normativa ambiental (NOM, SEMARNAT)?', category: 'Energias Renovables', categoryEmoji: '🌱', weights: { 'Energias Renovables': 2 } },
  { id: 'ren5', text: 'Estarias dispuesto a trabajar en campo instalando equipos?', category: 'Energias Renovables', categoryEmoji: '🌱', weights: { 'Energias Renovables': 2, 'Mecanica': 1 } },
  { id: 'ren6', text: 'Te interesa calcular la huella de carbono de empresas?', category: 'Energias Renovables', categoryEmoji: '🌱', weights: { 'Energias Renovables': 2, 'Gestion Empresarial': 1 } },
  { id: 'ren7', text: 'Gestionarias proyectos de infraestructura energetica?', category: 'Energias Renovables', categoryEmoji: '🌱', weights: { 'Energias Renovables': 2 } },
  { id: 'ren8', text: 'Te interesan los mercados electricos y tarifas de CFE?', category: 'Energias Renovables', categoryEmoji: '🌱', weights: { 'Energias Renovables': 2 } },

  // Gestion Empresarial
  { id: 'ges1', text: 'Elaborarias estados financieros y presupuestos?', category: 'Gestion Empresarial', categoryEmoji: '📊', weights: { 'Gestion Empresarial': 3 } },
  { id: 'ges2', text: 'Disenarias estrategias de marketing y ventas?', category: 'Gestion Empresarial', categoryEmoji: '📊', weights: { 'Gestion Empresarial': 3 } },
  { id: 'ges3', text: 'Te interesa gestionar equipos de trabajo y recursos humanos?', category: 'Gestion Empresarial', categoryEmoji: '📊', weights: { 'Gestion Empresarial': 2 } },
  { id: 'ges4', text: 'Realizarias analisis financiero de inversiones?', category: 'Gestion Empresarial', categoryEmoji: '📊', weights: { 'Gestion Empresarial': 2 } },
  { id: 'ges5', text: 'Negociarias contratos con clientes y proveedores?', category: 'Gestion Empresarial', categoryEmoji: '📊', weights: { 'Gestion Empresarial': 2 } },
  { id: 'ges6', text: 'Te interesa el derecho empresarial y fiscal?', category: 'Gestion Empresarial', categoryEmoji: '📊', weights: { 'Gestion Empresarial': 2 } },
  { id: 'ges7', text: 'Usarias KPIs y cuadro de mando integral (Balanced Scorecard)?', category: 'Gestion Empresarial', categoryEmoji: '📊', weights: { 'Gestion Empresarial': 2, 'Industrial': 1 } },
  { id: 'ges8', text: 'Elaborarias planes de negocio o modelo Canvas?', category: 'Gestion Empresarial', categoryEmoji: '📊', weights: { 'Gestion Empresarial': 3 } },

  // Desafios Situacionales
  { id: 'sit1', text: 'Preferirias programar una app antes que disenar una pieza mecanica?', category: 'Desafios Situacionales', categoryEmoji: '🎯', weights: { 'Informatica': 2, 'Mecanica': -1 } },
  { id: 'sit2', text: 'Preferirias optimizar un proceso de produccion antes que gestionar personas?', category: 'Desafios Situacionales', categoryEmoji: '🎯', weights: { 'Industrial': 2, 'Gestion Empresarial': -1 } },
  { id: 'sit3', text: 'Preferirias cablear un circuito antes que instalar un panel solar?', category: 'Desafios Situacionales', categoryEmoji: '🎯', weights: { 'Electronica': 2, 'Energias Renovables': -1 } },
  { id: 'sit4', text: 'Preferirias escribir codigo antes que supervisar una planta?', category: 'Desafios Situacionales', categoryEmoji: '🎯', weights: { 'Informatica': 2, 'Industrial': -1 } },
  { id: 'sit5', text: 'Preferirias calcular la resistencia de un material antes que hacer una auditoria energetica?', category: 'Desafios Situacionales', categoryEmoji: '🎯', weights: { 'Mecanica': 2, 'Energias Renovables': -1 } },
  { id: 'sit6', text: 'Preferirias automatizar una maquina antes que hacer un presupuesto financiero?', category: 'Desafios Situacionales', categoryEmoji: '🎯', weights: { 'Electronica': 1, 'Mecanica': 1, 'Gestion Empresarial': -2 } },
];

const careers = ['Informatica', 'Industrial', 'Electronica', 'Mecanica', 'Energias Renovables', 'Gestion Empresarial'];

export default function Test({ sessionToken }: TestProps) {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Map<string, number>>(new Map());
  const [scores, setScores] = useState<Record<string, number>>({});
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showOpenQuestion, setShowOpenQuestion] = useState(false);
  const [openResponse, setOpenResponse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / (questions.length + 1)) * 100;

  const x = useMotionValue(0);
  const background = useTransform(x, [-300, 0, 300], ['rgba(239, 68, 68, 0.2)', 'rgba(255, 255, 255, 1)', 'rgba(26, 86, 219, 0.2)']);

  useEffect(() => {
    createSession();
  }, []);

  useEffect(() => {
    calculateScores();
  }, [responses]);

  const createSession = async () => {
    try {
      const { data } = await supabase.from('user_sessions').insert({
        session_token: sessionToken || crypto.randomUUID(),
        referrer: document.referrer,
        user_agent: navigator.userAgent,
      }).select().single();
      if (data) setSessionId(data.id);
    } catch (error) {
      console.error('Session error:', error);
    }
  };

  const calculateScores = useCallback(() => {
    const newScores: Record<string, number> = { 'Informatica': 0, 'Industrial': 0, 'Electronica': 0, 'Mecanica': 0, 'Energias Renovables': 0, 'Gestion Empresarial': 0 };

    responses.forEach((value, questionId) => {
      const question = questions.find((q) => q.id === questionId);
      if (!question) return;
      Object.entries(question.weights).forEach(([career, weight]) => {
        if (newScores[career] !== undefined) newScores[career] += value * weight;
      });
    });

    const maxScores: Record<string, number> = {};
    questions.forEach(q => {
      Object.entries(q.weights).forEach(([career, weight]) => {
        if (weight > 0) maxScores[career] = (maxScores[career] || 0) + weight;
      });
    });

    const normalizedScores: Record<string, number> = {};
    Object.keys(newScores).forEach(career => {
      const maxPossible = maxScores[career] || 1;
      normalizedScores[career] = Math.max(0, Math.min(100, Math.round((newScores[career] / maxPossible) * 100)));
    });
    setScores(normalizedScores);
  }, [responses]);

  const handleResponse = async (value: number) => {
    if (!currentQuestion) return;

    const newResponses = new Map(responses);
    newResponses.set(currentQuestion.id, value);
    setResponses(newResponses);

    if (sessionId) {
      await supabase.from('test_responses').insert({
        session_id: sessionId,
        question_id: currentQuestion.id,
        response_value: value,
      });
    }

    if (currentIndex >= questions.length - 1) {
      setShowOpenQuestion(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
    x.set(0);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > 100) handleResponse(1);
    else if (info.offset.x < -100) handleResponse(0);
    else x.set(0);
  };

  const handleFinishTest = async () => {
    if (!openResponse.trim()) {
      alert('Por favor, describe tu dia ideal de trabajo.');
      return;
    }
    setIsSubmitting(true);

    if (sessionId) {
      await supabase.from('chatbot_queries').insert({
        session_id: sessionId,
        query_text: 'Pregunta abierta: Describe tu dia ideal',
        response_text: openResponse,
        was_answered: true,
        query_type: 'open_question',
      });
      await supabase.from('user_sessions').update({
        test_completed_at: new Date().toISOString(),
        compatibility_scores: scores,
      }).eq('id', sessionId);
    }

    navigate('/results', {
      state: {
        scores,
        sessionId,
        openResponse,
        yesResponses: Array.from(responses.entries()).filter(([_, v]) => v === 1).map(([id]) => id),
      },
    });
  };

  if (showOpenQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-16 flex items-center">
        <div className="max-w-2xl mx-auto px-4 relative">
          <div className="mb-6">
            <div className="flex justify-between mb-2 text-sm">
              <span className="text-gray-600">Pregunta {questions.length + 1} de {questions.length + 1}</span>
              <span className="text-blue-600">100%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-full" />
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl shadow-2xl p-8">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700 mb-6">✍️ Pregunta final</span>

            <h2 className="text-xl md:text-2xl font-bold text-slate-900 leading-relaxed mb-6">
              Imagina que terminas la carrera y consigues tu primer trabajo. Describe en 2-3 oraciones que estarias haciendo en un dia normal: donde estas, que herramientas usas, con quien trabajas y que problema estas resolviendo?
            </h2>

            <textarea
              value={openResponse}
              onChange={(e) => setOpenResponse(e.target.value)}
              placeholder="Escribe aqui tu respuesta..."
              className="w-full h-48 p-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />

            <button
              onClick={handleFinishTest}
              disabled={!openResponse.trim() || isSubmitting}
              className="w-full mt-6 bg-blue-600 text-white py-4 rounded-xl font-semibold hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Procesando...' : 'Finalizar test'}
              {!isSubmitting && <ChevronRight className="w-5 h-5" />}
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 pt-16 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative">
        <div className="max-w-lg mx-auto mb-8">
          <div className="flex justify-between mb-2 text-sm">
            <span className="text-gray-600">Pregunta {currentIndex + 1} de {questions.length + 1}</span>
            <span className="text-blue-600">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-lg relative h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion?.id}
                style={{ x, background }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                <div className="w-full h-full bg-white rounded-3xl shadow-2xl p-8 flex flex-col justify-between border border-gray-100">
                  <div>
                    <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                      {currentQuestion?.categoryEmoji} {currentQuestion?.category}
                    </span>
                    <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-6 leading-relaxed">
                      {currentQuestion?.text}
                    </h2>
                  </div>

                  <div className="flex items-center justify-center gap-6">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleResponse(0)}
                      className="w-20 h-20 rounded-2xl bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-gray-200 border-2 border-gray-300 shadow-md"
                    >
                      <X className="w-10 h-10" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleResponse(1)}
                      className="w-20 h-20 rounded-2xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 shadow-lg"
                    >
                      <Check className="w-10 h-10" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-12 max-w-2xl mx-auto">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {careers.map((career) => (
              <div key={career} className="text-center p-2 bg-white/60 rounded-lg backdrop-blur">
                <p className="text-xs text-gray-500 truncate">{career}</p>
                <p className="text-lg font-bold text-blue-600">{scores[career] || 0}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
