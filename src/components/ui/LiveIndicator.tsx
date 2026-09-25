import React from 'react';

export interface LiveIndicatorProps {
  status?: 'live' | 'connecting' | 'offline';
  label?: string;
  className?: string;
}

export const LiveIndicator: React.FC<LiveIndicatorProps> = ({
  status = 'live',
  label,
  className = '',
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'live':
        return {
          dotColor: 'bg-positive',
          haloColor: 'bg-positive/30',
          textColor: 'text-text-secondary',
          defaultText: 'Atualizado agora',
        };
      case 'connecting':
        return {
          dotColor: 'bg-brand-cyan',
          haloColor: 'bg-brand-cyan/30',
          textColor: 'text-brand-cyan',
          defaultText: 'Conectando...',
        };
      case 'offline':
        return {
          dotColor: 'bg-text-tertiary',
          haloColor: 'transparent',
          textColor: 'text-text-tertiary',
          defaultText: 'Modo offline',
        };
    }
  };

  const config = getStatusConfig();
  const displayText = label || config.defaultText;

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {/* Ponto 5px com halo 12px suave conforme especificação */}
      <span className="relative flex items-center justify-center w-3 h-3">
        {status === 'live' && (
          <span className={`absolute inline-flex w-3 h-3 rounded-full opacity-75 animate-ping ${config.haloColor}`} />
        )}
        <span className={`relative inline-flex rounded-full w-1.5 h-1.5 ${config.dotColor}`} />
      </span>

      <span className={`text-[11px] font-mono font-medium tracking-tight ${config.textColor}`}>
        {displayText}
      </span>
    </div>
  );
};
