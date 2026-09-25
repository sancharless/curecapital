import React, { useEffect, useState, useRef } from 'react';

export interface AnimatedNumberProps {
  value: number;
  startFrom?: number;
  duration?: number;
  privacyMode?: boolean;
  formatter?: (val: number) => string;
  className?: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  startFrom,
  duration = 850,
  privacyMode = false,
  formatter,
  className = '',
}) => {
  const isFirstMount = useRef(true);
  const [displayValue, setDisplayValue] = useState(() => {
    return startFrom !== undefined ? startFrom : value;
  });

  const startValueRef = useRef(displayValue);
  const targetValueRef = useRef(value);
  const startTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Se for o primeiro mount e tiver startFrom definido, anima de startFrom até value
    const fromVal = isFirstMount.current && startFrom !== undefined ? startFrom : displayValue;
    isFirstMount.current = false;

    if (fromVal === value) return;

    startValueRef.current = fromVal;
    targetValueRef.current = value;
    startTimeRef.current = null;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

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
  }, [value, duration, startFrom]);

  if (privacyMode) {
    return (
      <span className={`tabular-nums transition-opacity duration-200 ${className}`}>
        R$ ••••••
      </span>
    );
  }

  const formatted = formatter
    ? formatter(displayValue)
    : `R$ ${displayValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <span className={`tabular-nums transition-all duration-150 ${className}`}>
      {formatted}
    </span>
  );
};
