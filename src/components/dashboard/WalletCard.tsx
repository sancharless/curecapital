import React from 'react';
import { Card } from '../ui/Card';
import { Wallet } from 'lucide-react';
import { usePortfolio } from '../../hooks/usePortfolio';
import { usePrivacyStore } from '../../store/privacyStore';
import { formatBRL, formatBTC, formatLTC } from '../../utils/formatters';

export const WalletCard: React.FC = () => {
  const {
    btcAmount,
    ltcAmount,
    btcPortfolioBrl,
    ltcPortfolioBrl,
    totalBalance,
  } = usePortfolio();

  const hideValues = usePrivacyStore((s) => s.hideValues);

  // Percentuais de alocação
  const total = totalBalance || 1;
  const btcPercent = Math.round((btcPortfolioBrl / total) * 1000) / 10;
  const ltcPercent = Math.round((ltcPortfolioBrl / total) * 1000) / 10;

  // Donut minimalista de no máximo 150px (Item 24)
  const size = 120;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const ltcStroke = (ltcPercent / 100) * circumference;
  const btcStroke = (btcPercent / 100) * circumference;

  return (
    <Card variant="glass" radius="lg" className="flex flex-col justify-between h-full">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-4">
        <div className="flex items-center gap-2">
          <Wallet className="w-4 h-4 text-brand-cyan" />
          <h3 className="text-sm font-semibold text-text-primary tracking-tight">
            Minha carteira
          </h3>
        </div>
        <span className="text-[10px] font-mono text-text-tertiary">
          Custódia Multifirmada
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-5 my-auto">
        {/* Donut Minimalista (Max 150px - Item 24) */}
        <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
          <svg width={size} height={size} className="w-full h-full -rotate-90 transform">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth={strokeWidth}
            />
            {/* Litecoin (Prata #B8C2CC) */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#B8C2CC"
              strokeWidth={strokeWidth}
              strokeDasharray={`${ltcStroke} ${circumference}`}
              strokeDashoffset="0"
              strokeLinecap="round"
              className="transition-all duration-700"
            />
            {/* Bitcoin (Dourado #F5A623) */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#F5A623"
              strokeWidth={strokeWidth}
              strokeDasharray={`${btcStroke} ${circumference}`}
              strokeDashoffset={`-${ltcStroke}`}
              strokeLinecap="round"
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-[10px] text-text-tertiary font-mono">Total</span>
            <span className="text-xs font-mono font-bold text-text-primary">2 ativos</span>
          </div>
        </div>

        {/* Detalhamento dos Ativos e Barra de Distribuição */}
        <div className="flex-1 w-full space-y-3.5">
          {/* Litecoin LTC (64.8%) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-crypto-litecoin" />
                <span className="font-semibold text-text-primary">LTC</span>
                <span className="text-[11px] font-mono text-text-tertiary">
                  {formatLTC(ltcAmount, hideValues)}
                </span>
              </div>
              <span className="font-mono text-xs text-crypto-litecoin font-medium">
                {ltcPercent}%
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-text-secondary pl-4.5">
              <span>{formatBRL(ltcPortfolioBrl, hideValues)}</span>
              <span className="text-text-tertiary">64,8% da carteira</span>
            </div>
          </div>

          {/* Bitcoin BTC (35.2%) */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-crypto-bitcoin" />
                <span className="font-semibold text-text-primary">BTC</span>
                <span className="text-[11px] font-mono text-text-tertiary">
                  {formatBTC(btcAmount, hideValues)}
                </span>
              </div>
              <span className="font-mono text-xs text-crypto-bitcoin font-medium">
                {btcPercent}%
              </span>
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-text-secondary pl-4.5">
              <span>{formatBRL(btcPortfolioBrl, hideValues)}</span>
              <span className="text-text-tertiary">35,2% da carteira</span>
            </div>
          </div>

          {/* Barra de Distribuição Horizontal Compacta (Item 23) */}
          <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden flex gap-0.5">
            <div 
              style={{ width: `${ltcPercent}%` }} 
              className="bg-crypto-litecoin rounded-l-full transition-all duration-500" 
            />
            <div 
              style={{ width: `${btcPercent}%` }} 
              className="bg-crypto-bitcoin rounded-r-full transition-all duration-500" 
            />
          </div>
        </div>
      </div>

      <div className="pt-3 mt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-text-tertiary">
        <span>Segregação Patrimonial</span>
        <span className="text-positive font-mono">100% On-chain</span>
      </div>
    </Card>
  );
};
