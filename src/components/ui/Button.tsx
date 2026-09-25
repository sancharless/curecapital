import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  leftIcon,
  rightIcon,
  isLoading = false,
  className = '',
  disabled,
  ...props
}, ref) => {
  // Tamanhos com mínimo de 44px de área de toque no mobile
  const sizeStyles = {
    sm: 'text-xs px-3.5 py-2 min-h-[38px] md:min-h-[36px]',
    md: 'text-sm px-4 py-2.5 min-h-[44px]',
    lg: 'text-base px-6 py-3 min-h-[48px]',
  };

  // Variantes visuais refinadas (sem saturação de verde)
  const variantStyles = {
    primary: 'bg-brand-blue hover:bg-brand-blue-hover text-white shadow-glow-blue/40 border border-blue-400/20',
    secondary: 'bg-white/[0.05] hover:bg-white/[0.08] text-text-primary border border-white/10 hover:border-white/20',
    outline: 'bg-transparent text-text-primary border border-white/15 hover:border-white/30 hover:bg-white/[0.04]',
    ghost: 'bg-transparent hover:bg-white/[0.05] text-text-secondary hover:text-text-primary border border-transparent',
    danger: 'bg-negative/15 hover:bg-negative/25 text-negative border border-negative/30',
  };

  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      transition={{ duration: 0.12 }}
      disabled={disabled || isLoading}
      className={`
        inline-flex items-center justify-center font-medium rounded-btn transition-colors
        focus:outline-none focus:ring-2 focus:ring-brand-blue/50 focus:ring-offset-2 focus:ring-offset-bg-primary
        disabled:opacity-50 disabled:cursor-not-allowed select-none cursor-pointer
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          <span>Carregando...</span>
        </div>
      ) : (
        <span className="flex items-center gap-2">
          {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
        </span>
      )}
    </motion.button>
  );
});

Button.displayName = 'Button';
