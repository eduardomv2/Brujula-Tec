import { useCallback, useEffect } from 'react';
import { useSwipe } from '../hooks/useSwipe';
import type { Pregunta } from '../data/questions';

interface SwipeCardProps {
  pregunta: Pregunta;
  onSwipe: (value: 0 | 1) => void;
  isTop: boolean;
  stackOffset: number;
}

export function SwipeCard({ pregunta, onSwipe, isTop, stackOffset }: SwipeCardProps) {
  const handleSwipe = useCallback((v: 0 | 1) => onSwipe(v), [onSwipe]);

  const { state, mouseHandlers, touchHandlers } = useSwipe({
    onSwipe: handleSwipe,
    enabled: isTop,
    threshold: 80,
  });

  useEffect(() => {
    if (!isTop) return;
    const handleDocMouseUp = (e: MouseEvent) => {
      if (state.isDragging) {
        mouseHandlers.onMouseUp(e as unknown as React.MouseEvent);
      }
    };
    document.addEventListener('mouseup', handleDocMouseUp);
    return () => document.removeEventListener('mouseup', handleDocMouseUp);
  }, [isTop, state.isDragging, mouseHandlers]);

  const rotate = state.dragX * 0.06;

  const cardStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    transform: isTop
      ? `translateX(${state.dragX}px) rotate(${rotate}deg)`
      : `translateY(${stackOffset * 10}px) scale(${1 - stackOffset * 0.04})`,
    transition: state.isDragging ? 'none' : 'transform 0.35s cubic-bezier(.25,.8,.25,1)',
    opacity: isTop ? 1 : 1 - stackOffset * 0.15,
    zIndex: 10 - stackOffset,
    cursor: isTop ? 'grab' : 'default',
    userSelect: 'none',
    touchAction: 'none',
  };

  return (
    <div
      style={cardStyle}
      {...(isTop ? {
        onMouseDown: mouseHandlers.onMouseDown,
        onMouseMove: mouseHandlers.onMouseMove,
        onMouseUp:   mouseHandlers.onMouseUp,
        onTouchStart: touchHandlers.onTouchStart,
        onTouchMove:  touchHandlers.onTouchMove,
        onTouchEnd:   touchHandlers.onTouchEnd,
      } : {})}
    >
      <div className="w-full h-full rounded-2xl bg-white border border-gray-200 shadow-lg flex flex-col"
        style={{ overflow: 'hidden' }}>

        {/* Tinte de dirección */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: 20,
          background: state.direction === 'right' ? 'rgba(34,197,94,0.08)' :
                      state.direction === 'left'  ? 'rgba(239,68,68,0.08)' : 'transparent',
          transition: 'background 0.15s', pointerEvents: 'none',
        }} />

        {/* Solo número de pregunta — sin revelar tipo ni carrera */}
        <div className="px-5 pt-4 pb-0">
          <div className="inline-flex items-center gap-1.5 bg-blue-50 rounded-lg px-2.5 py-1">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="text-xs font-semibold text-blue-500">Pregunta</span>
          </div>
        </div>

        {/* Texto */}
        <div className="flex-1 flex items-center px-6 py-5">
          <p className="text-gray-800 text-xl font-semibold leading-snug">{pregunta.texto}</p>
        </div>

        {/* Labels NO / SÍ */}
        <div className="px-5 pb-5 flex justify-between items-center">
          <div className="flex items-center gap-1.5 text-sm font-medium transition-opacity"
            style={{ color: '#EF4444', opacity: isTop ? (state.direction === 'left' ? 1 : 0.3) : 0 }}>
            <span>✕</span> No
          </div>
          <p className="text-gray-300 text-xs select-none">desliza</p>
          <div className="flex items-center gap-1.5 text-sm font-medium transition-opacity"
            style={{ color: '#22C55E', opacity: isTop ? (state.direction === 'right' ? 1 : 0.3) : 0 }}>
            Sí <span>✓</span>
          </div>
        </div>
      </div>

      {isTop && state.direction === 'right' && (
        <div className="absolute top-5 left-5 px-4 py-1.5 rounded-lg font-black text-lg tracking-widest border-2 border-green-400 text-green-600 bg-green-50"
          style={{ transform: 'rotate(-8deg)', zIndex: 20 }}>SÍ</div>
      )}
      {isTop && state.direction === 'left' && (
        <div className="absolute top-5 right-5 px-4 py-1.5 rounded-lg font-black text-lg tracking-widest border-2 border-red-400 text-red-600 bg-red-50"
          style={{ transform: 'rotate(8deg)', zIndex: 20 }}>NO</div>
      )}
    </div>
  );
}
