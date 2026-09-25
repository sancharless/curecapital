import React from 'react';
import { usePortfolio } from '../../hooks/usePortfolio';

export const AllocationBar: React.FC = () => {
  const { btcSharePercent, ltcSharePercent, cashSharePercent } = usePortfolio();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-semibold text-text-secondary uppercase tracking-wider text-[11px]">
          Distribuição Patrimonial
        </span>
        <div className="flex items-center gap-3 text-[11px] font-mono">
          <span className="flex items-center gap-1.5 text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-[#F5A623]" />
            BTC {btcSharePercent}%
          </span>
          <span className="flex items-center gap-1.5 text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-[#B8C2CC]" />
            LTC {ltcSharePercent}%
          </span>
          <span className="flex items-center gap-1.5 text-text-secondary">
            <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
            Disponível {cashSharePercent}%
          </span>
        </div>
      </div>

      {/* Barra Horizontal Segmentada */}
      <div className="h-3 w-full rounded-full bg-[#0B192C] p-0.5 flex overflow-hidden border border-white/5 shadow-inner">
        <div
          style={{ width: `${btcSharePercent}%` }}
          className="h-full bg-[#F5A623] rounded-l-full transition-all duration-500 hover:brightness-110"
          title={`Bitcoin: ${btcSharePercent}%`}
        />
        <div
          style={{ width: `${ltcSharePercent}%` }}
          className="h-full bg-[#B8C2CC] transition-all duration-500 hover:brightness-110"
          title={`Litecoin: ${ltcSharePercent}%`}
        />
        <div
          style={{ width: `${cashSharePercent}%` }}
          className="h-full bg-[#2563EB] rounded-r-full transition-all duration-500 hover:brightness-110"
          title={`Disponível: ${cashSharePercent}%`}
        />
      </div>
    </div>
  );
};
