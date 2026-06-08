import { useState } from 'react';

interface OpenQuestionProps {
  onSubmit: (texto: string) => void;
}

export function OpenQuestion({ onSubmit }: OpenQuestionProps) {
  const [texto, setTexto] = useState('');

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-5">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 shadow-sm p-7">

        {/* Icono + título */}
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">✏️</div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Una última pregunta
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">
            Opcional — pero nos ayuda a darte un análisis más preciso
          </p>
        </div>

        {/* Pregunta */}
        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-5">
          <p className="text-sm text-gray-700 leading-relaxed">
            Imagina que terminas la carrera y consigues tu primer trabajo.{' '}
            <strong className="text-gray-900">Describe en 2-3 oraciones</strong>{' '}
            qué estarías haciendo en un día normal: ¿dónde estás, qué herramientas
            usas, con quién trabajas y qué problema estás resolviendo?
          </p>
        </div>

        {/* Textarea */}
        <textarea
          value={texto}
          onChange={e => setTexto(e.target.value)}
          placeholder="Ej: Estaría en una planta programando PLCs y revisando tableros de control. Trabajaría con el equipo de mantenimiento para que las máquinas no paren..."
          rows={4}
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
        />

        {/* Contador de caracteres */}
        <p className="text-right text-xs text-gray-400 mt-1 mb-5">
          {texto.length} caracteres
        </p>

        {/* Botones */}
        <div className="flex gap-3">
          <button
            onClick={() => onSubmit(texto)}
            className="flex-1 bg-blue-600 text-white font-semibold py-3 rounded-xl text-sm transition-all active:scale-95 hover:bg-blue-700"
          >
            Ver mis resultados →
          </button>
          <button
            onClick={() => onSubmit('')}
            className="px-4 py-3 bg-gray-100 text-gray-500 font-medium rounded-xl text-sm transition-all active:scale-95 hover:bg-gray-200"
          >
            Saltar
          </button>
        </div>
      </div>
    </div>
  );
}
