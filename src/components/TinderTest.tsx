import { useState, useCallback, useMemo } from 'react';
import { SwipeCard } from './SwipeCard';
import { PREGUNTAS } from '../data/questions';

interface TinderTestProps {
  onComplete: (respuestas: Record<string, number>) => void;
}

// Fisher-Yates shuffle
function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function TinderTest({ onComplete }: TinderTestProps) {
  // Mezclar preguntas una sola vez al montar el componente
  const preguntasMezcladas = useMemo(() => shuffleArray(PREGUNTAS), []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<string, number>>({});
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const total = preguntasMezcladas.length;
  const progress = (currentIndex / total) * 100;
  const remaining = preguntasMezcladas.slice(currentIndex);

  const handleSwipe = useCallback((valor: 0 | 1) => {
    if (isAnimatingOut) return;
    const pregunta = preguntasMezcladas[currentIndex];
    const nuevas = { ...respuestas, [pregunta.id]: valor };
    setIsAnimatingOut(true);

    setTimeout(() => {
      setRespuestas(nuevas);
      setCurrentIndex(prev => prev + 1);
      setIsAnimatingOut(false);
      if (currentIndex + 1 >= total) {
        onComplete(nuevas);
      }
    }, 280);
  }, [currentIndex, respuestas, isAnimatingOut, total, onComplete, preguntasMezcladas]);

  if (currentIndex >= total) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-5 py-4">
        <div className="max-w-md mx-auto">
          <div className="flex justify-between items-center mb-3">
            {/* Sin mencionar la sección/carrera */}
            <span className="text-xs text-gray-400 font-medium">Compasslife · Test vocacional</span>
            <span className="text-sm font-bold text-gray-700">
              {currentIndex + 1}<span className="text-gray-400 font-normal"> / {total}</span>
            </span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* Stack de cards */}
      <div className="flex-1 flex flex-col items-center justify-center px-5 py-6">
        <div className="w-full max-w-md" style={{ height: 360, position: 'relative' }}>
          {remaining.slice(0, 3).map((pregunta, i) => {
            const isTop = i === 0 && !isAnimatingOut;
            return (
              <SwipeCard
                key={pregunta.id}
                pregunta={pregunta}
                onSwipe={handleSwipe}
                isTop={isTop}
                stackOffset={i}
              />
            );
          })}
        </div>
      </div>

      {/* Botones */}
      <div className="pb-8 px-5">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-center gap-6 mb-4">
            <button onClick={() => handleSwipe(0)}
              className="w-16 h-16 rounded-full bg-white border-2 border-red-200 text-red-500 text-2xl shadow-sm flex items-center justify-center transition-all active:scale-95 hover:border-red-400 hover:bg-red-50"
              aria-label="No">✕</button>
            <div className="flex flex-col items-center gap-1">
              <div className="flex gap-1">
                {[0,1,2].map(i => (
                  <div key={i} className="rounded-full transition-all"
                    style={{ width: i === 0 ? 20 : 6, height: 6, background: i === 0 ? '#3B82F6' : '#E5E7EB' }} />
                ))}
              </div>
              <span className="text-xs text-gray-400">desliza o usa los botones</span>
            </div>
            <button onClick={() => handleSwipe(1)}
              className="w-16 h-16 rounded-full bg-white border-2 border-green-200 text-green-600 text-2xl shadow-sm flex items-center justify-center transition-all active:scale-95 hover:border-green-400 hover:bg-green-50"
              aria-label="Sí">✓</button>
          </div>
        </div>
      </div>
    </div>
  );
}
