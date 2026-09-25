import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'positive' | 'negative' | 'info' | 'cyan' | 'bitcoin' | 'litecoin' | 'neutral' | 'live';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  size = 'md',
  icon,
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-medium',
  };

  const variantStyles = {
    positive: 'bg-positive/10 text-positive border border-positive/25 font-semibold',
    negative: 'bg-negative/10 text-negative border border-negative/25 font-semibold',
    info: 'bg-brand-blue/10 text-brand-blue-hover border border-brand-blue/25',
    cyan: 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/25',
    bitcoin: 'bg-crypto-bitcoin/10 text-crypto-bitcoin border border-crypto-bitcoin/25 font-medium',
    litecoin: 'bg-crypto-litecoin/10 text-crypto-litecoin border border-crypto-litecoin/25 font-medium',
    neutral: 'bg-white/[0.05] text-text-secondary border border-white/10',
    live: 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30 flex items-center gap-1.5',
  };

  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-badge tracking-tight select-none
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${className}
      `}
    >
      {variant === 'live' && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-cyan opacity-60"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-cyan"></span>
        </span>
      )}
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
