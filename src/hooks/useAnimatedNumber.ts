import { useState, useEffect, useRef } from 'react';

/**
 * Anima uma transição suave entre valores numéricos financeiros.
 * Duração padrão: 400ms com easing cúbico para evitar saltos visuais abruptos.
 */
export function useAnimatedNumber(targetValue: number, durationMs = 400): number {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const startValueRef = useRef(targetValue);
  const targetValueRef = useRef(targetValue);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Se o valor inicial for igual ao alvo, não precisa animar
    if (displayValue === targetValue) {
      return;
    }

    startValueRef.current = displayValue;
    targetValueRef.current = targetValue;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / durationMs, 1);

      // Easing suave (easeOutCubic)
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = startValueRef.current + (targetValueRef.current - startValueRef.current) * ease;

      setDisplayValue(current);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(targetValueRef.current);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [targetValue, durationMs]);

  return displayValue;
}
