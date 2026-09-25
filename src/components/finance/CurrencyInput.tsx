import React, { useState, useEffect } from 'react';

interface CurrencyInputProps {
  id?: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  placeholder?: string;
  disabled?: boolean;
  error?: string | null;
  className?: string;
  label?: string;
  helperText?: string;
}

export const CurrencyInput: React.FC<CurrencyInputProps> = ({
  id = 'currency-input',
  value,
  onChange,
  min,
  max,
  placeholder = '0,00',
  disabled = false,
  error,
  className = '',
  label,
  helperText,
}) => {
  // Format numeric value to Brazilian format (e.g. 5.000,00)
  const formatDisplay = (val: number): string => {
    if (val === 0 || isNaN(val)) return '';
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const [displayValue, setDisplayValue] = useState<string>(() => formatDisplay(value));

  useEffect(() => {
    setDisplayValue(formatDisplay(value));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawDigits = e.target.value.replace(/\D/g, '');
    if (!rawDigits) {
      setDisplayValue('');
      onChange(0);
      return;
    }

    const numericValue = parseFloat(rawDigits) / 100;
    setDisplayValue(formatDisplay(numericValue));
    onChange(numericValue);
  };

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="block text-xs font-semibold text-text-secondary tracking-wide uppercase">
          {label}
        </label>
      )}

      <div className="relative flex items-center rounded-xl bg-[#091527]/90 border border-white/10 focus-within:border-brand-blue/70 focus-within:ring-2 focus-within:ring-brand-blue/20 transition-all">
        <span className="pl-4 pr-2 text-base sm:text-lg font-bold font-mono text-text-tertiary select-none">
          R$
        </span>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete="off"
          className="w-full py-3.5 pr-4 bg-transparent text-xl sm:text-2xl font-bold font-mono text-text-primary placeholder:text-text-tertiary/40 focus:outline-none tabular-numbers disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ fontSize: '20px' }} // Garante >= 16px no iOS para evitar auto-zoom indesejado
        />
      </div>

      {error ? (
        <p className="text-xs text-negative font-medium animate-fade-in flex items-center gap-1.5 pt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-negative inline-block" />
          {error}
        </p>
      ) : helperText ? (
        <p className="text-[11px] text-text-tertiary pt-0.5">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};
