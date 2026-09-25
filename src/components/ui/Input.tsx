import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label 
          htmlFor={inputId}
          className="text-xs font-medium text-text-secondary tracking-wide flex items-center justify-between"
        >
          <span>{label}</span>
          {hint && <span className="text-[11px] text-text-tertiary">{hint}</span>}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <div className="absolute left-3.5 flex items-center pointer-events-none text-text-tertiary">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          className={`
            w-full bg-[#081322] border rounded-input text-text-primary placeholder:text-text-tertiary/60
            transition-all duration-150 outline-none
            disabled:opacity-50 disabled:cursor-not-allowed
            py-2.5 min-h-[44px]
            ${leftIcon ? 'pl-10' : 'pl-3.5'}
            ${rightIcon ? 'pr-10' : 'pr-3.5'}
            ${error 
              ? 'border-negative/50 focus:border-negative focus:ring-1 focus:ring-negative/40' 
              : 'border-white/10 hover:border-white/20 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30'}
            ${className}
          `}
          style={{ fontSize: '16px' }} // Previne zoom indesejado no Safari iOS
          {...props}
        />

        {rightIcon && (
          <div className="absolute right-3.5 flex items-center text-text-tertiary">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <span className="text-xs text-negative font-medium mt-0.5">{error}</span>
      )}
    </div>
  );
});

Input.displayName = 'Input';
