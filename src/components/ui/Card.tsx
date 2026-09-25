import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'glass' | 'elevated' | 'solid' | 'interactive';
  radius?: 'md' | 'lg';
  glow?: 'none' | 'blue' | 'cyan' | 'green';
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'glass',
  radius = 'lg',
  glow = 'none',
  className = '',
  ...props
}) => {
  const radiusStyles = {
    md: 'rounded-card-md',
    lg: 'rounded-card-lg',
  };

  const variantStyles = {
    glass: 'bg-card-glass backdrop-blur-[18px] border border-white/[0.06] shadow-financial-glass',
    elevated: 'bg-card-elevated/90 backdrop-blur-[20px] border border-white/[0.08] shadow-financial-elevated',
    solid: 'bg-card border border-white/[0.07] shadow-lg',
    interactive: 'bg-card-glass backdrop-blur-[18px] border border-white/[0.06] shadow-financial-glass hover:border-white/[0.14] transition-all duration-200 hover:-translate-y-0.5',
  };

  const glowStyles = {
    none: '',
    blue: 'relative before:absolute before:-top-px before:left-10 before:right-10 before:h-px before:bg-gradient-to-r before:from-transparent before:via-brand-blue/50 before:to-transparent',
    cyan: 'relative before:absolute before:-top-px before:left-10 before:right-10 before:h-px before:bg-gradient-to-r before:from-transparent before:via-brand-cyan/50 before:to-transparent',
    green: 'relative before:absolute before:-top-px before:left-10 before:right-10 before:h-px before:bg-gradient-to-r before:from-transparent before:via-positive/50 before:to-transparent',
  };

  return (
    <div
      className={`
        p-4 sm:p-5 md:p-6
        ${radiusStyles[radius]}
        ${variantStyles[variant]}
        ${glowStyles[glow]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};
