import { useState } from 'react';
import { Navbar, type Tab } from './components/Navbar';
import { ChatWidget } from './components/ChatWidget';
import { HomeTab } from './components/tabs/HomeTab';
import { MaestrosTab } from './components/tabs/MaestrosTab';
import { CampusTab } from './components/tabs/CampusTab';
import { DashboardTab } from './components/tabs/DashboardTab';
import { DatosDemo, type DatosDemoData } from './components/DatosDemo';
import { TinderTest } from './components/TinderTest';
import { OpenQuestion } from './components/OpenQuestion';
import { Results } from './components/Results';
import { CarreraDetail } from './components/CarreraDetail';
import { predict, type PredictResponse } from './api/predict';

const MOCK_RESULT: PredictResponse = {
  top3: [
    { carrera_id: 'ELEC', nombre_carrera: 'Ingeniería en Electrónica',  porcentaje_match: 68.4, razonamiento: 'Tu afinidad con circuitos y automatización encaja con Electrónica.' },
    { carrera_id: 'MEC',  nombre_carrera: 'Ingeniería en Mecánica',     porcentaje_match: 52.1, razonamiento: 'Tu perfil técnico se alinea con Mecánica.' },
    { carrera_id: 'IND',  nombre_carrera: 'Ingeniería Industrial',       porcentaje_match: 38.7, razonamiento: 'Tu interés en procesos encaja con Industrial.' },
  ],
  texto_analisis: null,
  confianza: 0.684,
};

type TestVista = 'idle' | 'datosDemo' | 'test' | 'openQuestion' | 'loading' | 'results' | 'detail';

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-5">
      <div className="w-12 h-12 rounded-full border-4 border-gray-200"
        style={{ borderTopColor: '#3B82F6', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <p className="text-gray-500 text-sm font-medium">Analizando tu perfil…</p>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState<Tab>('home');
  const [testVista, setTestVista] = useState<TestVista>('idle');
  const [datosDemo, setDatosDemo] = useState<DatosDemoData | null>(null);
  const [respuestas, setRespuestas] = useState<Record<string, number>>({});
  const [resultado, setResultado] = useState<PredictResponse | null>(null);
  const [carreraSeleccionada, setCarreraSeleccionada] = useState<string | null>(null);

  const handleTabChange = (t: Tab) => {
    setTab(t);
    if (t !== 'test') setTestVista('idle');
  };

  const startTest = () => {
    setTab('test');
    setTestVista('datosDemo');
  };

  const handleDatosDemo = (datos: DatosDemoData) => {
    setDatosDemo(datos);
    setTestVista('test');
  };

  const handleTestComplete = (resp: Record<string, number>) => {
    setRespuestas(resp);
    setTestVista('openQuestion');
  };

  const handleOpenQuestion = async (texto: string) => {
    setTestVista('loading');
    try {
      const data = await predict(respuestas, texto, datosDemo ?? undefined);
      setResultado(data);
    } catch {
      await new Promise(r => setTimeout(r, 1500));
      setResultado(MOCK_RESULT);
    }
    setTestVista('results');
  };

  const handleReset = () => {
    setRespuestas({});
    setResultado(null);
    setDatosDemo(null);
    setCarreraSeleccionada(null);
    setTestVista('idle');
    setTab('home');
  };

  const renderTest = () => {
    switch (testVista) {
      case 'idle':
        return (
          <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-5 text-center">
            <div className="text-5xl mb-4">🎯</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Test Vocacional</h2>
            <p className="text-sm text-gray-500 mb-6 max-w-xs">
              61 preguntas para descubrir tu ingeniería ideal en el TecNM Monclova.
            </p>
            <button onClick={() => setTestVista('datosDemo')}
              className="bg-blue-600 text-white font-bold py-4 px-10 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              Comenzar →
            </button>
          </div>
        );
      case 'datosDemo':
        return <DatosDemo onContinue={handleDatosDemo} />;
      case 'test':
        return <TinderTest onComplete={handleTestComplete} />;
      case 'openQuestion':
        return <OpenQuestion onSubmit={handleOpenQuestion} />;
      case 'loading':
        return <LoadingScreen />;
      case 'results':
        return resultado ? (
          <Results resultado={resultado}
            onSelect={id => { setCarreraSeleccionada(id); setTestVista('detail'); }}
            onReset={handleReset} />
        ) : null;
      case 'detail':
        return resultado && carreraSeleccionada ? (
          <CarreraDetail carreraId={carreraSeleccionada} resultado={resultado}
            onBack={() => setTestVista('results')} onReset={handleReset} />
        ) : null;
      default:
        return null;
    }
  };

  const hideNav = tab === 'test' && ['datosDemo', 'test', 'openQuestion', 'loading'].includes(testVista);

  return (
    <div className="relative">
      {!hideNav && <Navbar activeTab={tab} onTabChange={handleTabChange} onStartTest={startTest} />}
      {tab === 'home'      && <HomeTab onStartTest={startTest} />}
      {tab === 'test'      && renderTest()}
      {tab === 'maestros'  && <MaestrosTab />}
      {tab === 'campus'    && <CampusTab />}
      {tab === 'dashboard' && <DashboardTab />}
      <ChatWidget />
    </div>
  );
}
