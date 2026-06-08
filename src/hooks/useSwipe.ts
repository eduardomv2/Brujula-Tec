import { useRef, useState, useCallback } from 'react';

interface SwipeState {
  dragX: number;
  isDragging: boolean;
  direction: 'left' | 'right' | null;
}

interface UseSwipeOptions {
  threshold?: number;
  onSwipe: (value: 0 | 1) => void;
  enabled?: boolean;
}

export function useSwipe({ threshold = 80, onSwipe, enabled = true }: UseSwipeOptions) {
  const startX = useRef(0);
  const isDraggingRef = useRef(false);  // ref para evitar closures obsoletos
  const hasSwipedRef = useRef(false);   // evita que se dispare onSwipe más de una vez
  const [state, setState] = useState<SwipeState>({
    dragX: 0,
    isDragging: false,
    direction: null,
  });

  const handleStart = useCallback((clientX: number) => {
    if (!enabled) return;
    startX.current = clientX;
    isDraggingRef.current = true;
    hasSwipedRef.current = false;
    setState({ dragX: 0, isDragging: true, direction: null });
  }, [enabled]);

  const handleMove = useCallback((clientX: number) => {
    if (!enabled || !isDraggingRef.current) return;
    const dx = clientX - startX.current;
    setState({
      dragX: dx,
      isDragging: true,
      direction: dx > 40 ? 'right' : dx < -40 ? 'left' : null,
    });
  }, [enabled]);

  const handleEnd = useCallback((clientX?: number) => {
    if (!enabled || !isDraggingRef.current) return;
    isDraggingRef.current = false;

    const dx = (clientX ?? startX.current) - startX.current;
    const finalDx = clientX !== undefined ? dx : 0;

    setState(s => {
      const actualDx = clientX !== undefined ? finalDx : s.dragX;
      // Solo dispara onSwipe una vez por gesto
      if (!hasSwipedRef.current && Math.abs(actualDx) > threshold) {
        hasSwipedRef.current = true;
        // Timeout mínimo para dejar que la animación de salida se vea
        setTimeout(() => onSwipe(actualDx > 0 ? 1 : 0), 50);
      }
      return { dragX: 0, isDragging: false, direction: null };
    });
  }, [enabled, threshold, onSwipe]);

  const mouseHandlers = {
    onMouseDown: (e: React.MouseEvent) => { e.preventDefault(); handleStart(e.clientX); },
    onMouseMove: (e: React.MouseEvent) => { if (isDraggingRef.current) handleMove(e.clientX); },
    onMouseUp:   (e: React.MouseEvent) => handleEnd(e.clientX),
    // onMouseLeave ya NO dispara handleEnd — evita el bug de saltar preguntas
  };

  const touchHandlers = {
    onTouchStart: (e: React.TouchEvent) => handleStart(e.touches[0].clientX),
    onTouchMove:  (e: React.TouchEvent) => {
      e.preventDefault(); // evita scroll mientras se desliza
      handleMove(e.touches[0].clientX);
    },
    onTouchEnd: (e: React.TouchEvent) => {
      const lastX = e.changedTouches[0]?.clientX;
      handleEnd(lastX);
    },
  };

  return { state, mouseHandlers, touchHandlers };
}
