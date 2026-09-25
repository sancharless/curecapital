import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  size = 'md', 
  showTagline = false,
  className = '' 
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Símbolo Geométrico Sofisticado */}
      <div className={`relative ${iconSizes[size]} flex items-center justify-center rounded-xl bg-card-elevated border border-white/10 shadow-financial-glass overflow-hidden group`}>
        <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/30 via-transparent to-brand-cyan/20 group-hover:opacity-100 transition-opacity" />
        <svg 
          viewBox="0 0 32 32" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:scale-105"
        >
          {/* Formas facetadas com profundidade arquitetural */}
          <path 
            d="M8 16L16 6L24 16L16 26L8 16Z" 
            stroke="url(#cure-grad-1)" 
            strokeWidth="2" 
            strokeLinejoin="round" 
          />
          <path 
            d="M12 16L16 11L20 16L16 21L12 16Z" 
            fill="url(#cure-grad-2)" 
          />
          <circle cx="16" cy="16" r="2.5" fill="#36C5F0" />
          <defs>
            <linearGradient id="cure-grad-1" x1="8" y1="6" x2="24" y2="26" gradientUnits="userSpaceOnUse">
              <stop stopColor="#36C5F0" />
              <stop offset="1" stopColor="#2563EB" />
            </linearGradient>
            <linearGradient id="cure-grad-2" x1="12" y1="11" x2="20" y2="21" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2563EB" stopOpacity="0.8" />
              <stop offset="1" stopColor="#36C5F0" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 tracking-tight font-semibold text-text-primary">
          <span className={`${textSizes[size]} font-bold tracking-tight`}>CURE</span>
          <span className={`${textSizes[size]} font-light text-brand-cyan`}>CAPITAL</span>
        </div>
        {showTagline && (
          <span className="text-[10px] tracking-wider uppercase text-text-tertiary font-mono -mt-1">
            Private Digital Wealth
          </span>
        )}
      </div>
    </div>
  );
};
