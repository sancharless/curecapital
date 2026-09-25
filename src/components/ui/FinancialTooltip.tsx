import React, { useState } from 'react';

export interface FinancialTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
  className?: string;
}

export const FinancialTooltip: React.FC<FinancialTooltipProps> = ({
  content,
  children,
  position = 'top',
  className = '',
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onClick={() => setIsVisible(!isVisible)}
    >
      {children}

      {isVisible && (
        <div 
          role="tooltip"
          className={`
            absolute z-50 px-2.5 py-1.5 rounded-lg text-[11px] font-medium tracking-tight
            bg-[#0C1B2F]/95 backdrop-blur-xl border border-white/10 shadow-financial-elevated
            text-text-primary whitespace-nowrap pointer-events-none transition-all duration-150
            left-1/2 -translate-x-1/2
            ${position === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'}
          `}
        >
          {content}
          <div 
            className={`
              absolute left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-[#0C1B2F] border border-white/10
              ${position === 'top' ? 'top-full -mt-1 border-t-0 border-l-0' : 'bottom-full -mb-1 border-b-0 border-r-0'}
            `}
          />
        </div>
      )}
    </div>
  );
};
