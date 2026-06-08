import { useState } from 'react';

const BACHILLERATOS = [
  "CBTis 36", "CETis 46", "COBAC 24", "FIME UADEC",
  "COBAC Castaños", "Telebachillerato", "ICC Monclova",
  "La Salle", "Bachillerato Incorporado", "Otro",
];

const MUNICIPIOS = [
  "Monclova", "Frontera", "Castaños", "San Buenaventura",
  "Lamadrid", "Otro",
];

export interface DatosDemoData {
  bachillerato: string;
  municipio: string;
  edad: number;
}

interface DatosDemoProps {
  onContinue: (datos: DatosDemoData) => void;
}

export function DatosDemo({ onContinue }: DatosDemoProps) {
  const [bachillerato, setBachillerato] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [edad, setEdad] = useState('');
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!bachillerato || !municipio || !edad) {
      setError('Por favor completa todos los campos');
      return;
    }
    if (parseInt(edad) < 14 || parseInt(edad) > 25) {
      setError('La edad debe ser entre 14 y 25 años');
      return;
    }
    onContinue({ bachillerato, municipio, edad: parseInt(edad) });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 py-8"
      style={{ background: 'linear-gradient(135deg, #1a237e 0%, #1565c0 50%, #0d47a1 100%)' }}>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-4">
            <div className="w-2 h-2 rounded-full bg-blue-300" />
            <span className="text-xs font-bold text-blue-100 tracking-widest uppercase">
              Antes de comenzar
            </span>
          </div>
          <h2 className="text-2xl font-black text-white mb-2">Cuéntanos sobre ti</h2>
          <p className="text-blue-200 text-sm">
            Esta información nos ayuda a personalizar tu experiencia y mejorar nuestras estadísticas.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl p-6 shadow-2xl">
          <div className="flex flex-col gap-5">

            {/* Bachillerato */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                ¿De qué bachillerato eres?
              </label>
              <select
                value={bachillerato}
                onChange={e => { setBachillerato(e.target.value); setError(''); }}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all bg-white"
              >
                <option value="">Selecciona tu bachillerato...</option>
                {BACHILLERATOS.map(b => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            {/* Municipio */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                ¿De qué municipio eres?
              </label>
              <select
                value={municipio}
                onChange={e => { setMunicipio(e.target.value); setError(''); }}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all bg-white"
              >
                <option value="">Selecciona tu municipio...</option>
                {MUNICIPIOS.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Edad */}
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                ¿Cuántos años tienes?
              </label>
              <input
                type="number"
                min={14} max={25}
                value={edad}
                onChange={e => { setEdad(e.target.value); setError(''); }}
                placeholder="Ej: 17"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
              />
            </div>

            {error && (
              <p className="text-xs text-red-500 text-center -mt-2">{error}</p>
            )}

            <button
              onClick={handleContinue}
              className="w-full font-bold py-4 rounded-xl text-sm text-white transition-all active:scale-98 hover:opacity-90 mt-1"
              style={{ background: 'linear-gradient(135deg, #1565c0, #1976d2)' }}
            >
              Iniciar test →
            </button>
          </div>
        </div>

        <p className="text-blue-300 text-xs text-center mt-4">
          Tus datos son anónimos y solo se usan para estadísticas del TecNM
        </p>
      </div>
    </div>
  );
}
