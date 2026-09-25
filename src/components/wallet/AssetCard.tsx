import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { AssetHolding } from '../../types';
import { usePrivacyStore } from '../../store/privacyStore';
import { formatBRL } from '../../utils/formatters';

interface AssetCardProps {
  holding: AssetHolding;
}

export const AssetCard: React.FC<AssetCardProps> = ({ holding }) => {
  const hideValues = usePrivacyStore((s) => s.hideValues);

  const isBtc = holding.symbol === 'BTC';
  const themeColor = isBtc ? '#F5A623' : '#B8C2CC';
  const detailUrl = `/wallet/${holding.symbol.toLowerCase()}`;
  const isPositive = holding.profitBrl >= 0;

  // Sparkline SVG generator
  const sparklineData = holding.sparkline || [];
  const min = Math.min(...sparklineData);
  const max = Math.max(...sparklineData);
  const range = max - min || 1;
  const width = 120;
  const height = 40;

  const points = sparklineData
    .map((val, idx) => {
      const x = (idx / (sparklineData.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 8) - 4;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <Link to={detailUrl} className="block group">
      <Card
        variant="interactive"
        radius="lg"
        className="p-5 sm:p-6 transition-all duration-300 border-white/10 hover:border-white/20 hover:shadow-[0_8px_24px_rgba(0,0,0,0.3)] bg-gradient-to-b from-[#0B1728] to-[#07101E] relative overflow-hidden"
      >
        {/* Glow de fundo correspondente ao ativo */}
        <div
          className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-3xl opacity-15 pointer-events-none group-hover:opacity-25 transition-opacity"
          style={{ backgroundColor: themeColor }}
        />

        {/* Top Header do Card */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center font-bold text-lg border border-white/10 shrink-0 shadow-md transition-transform group-hover:scale-105"
              style={{ backgroundColor: `${themeColor}18`, color: themeColor }}
            >
              {isBtc ? '₿' : 'Ł'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-text-primary tracking-tight">
                  {holding.name}
                </h3>
                <span
                  className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
                  style={{ backgroundColor: `${themeColor}20`, color: themeColor }}
                >
                  {holding.symbol}
                </span>
              </div>
              <span className="text-xs font-mono text-text-tertiary">
                Participação: <strong className="text-text-secondary">{holding.sharePercent}%</strong>
              </span>
            </div>
          </div>

          {/* Sparkline compacta */}
          <div className="hidden xs:flex flex-col items-end">
            <svg width={width} height={height} className="overflow-visible">
              <polyline
                fill="none"
                stroke={isPositive ? '#10B981' : '#EF4444'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={points}
              />
            </svg>
            <span className="text-[10px] text-text-tertiary font-mono mt-0.5">Últimas 24H</span>
          </div>
        </div>

        {/* Bloco de Saldos e Valores */}
        <div className="grid grid-cols-2 gap-4 my-5 pt-1 border-t border-b border-white/5 py-4">
          <div>
            <span className="text-[11px] font-mono text-text-tertiary uppercase block">
              Saldo em Custódia
            </span>
            <div className="text-base sm:text-lg font-bold font-mono text-text-primary mt-0.5 tabular-numbers truncate">
              {hideValues ? '••••••••' : `${holding.quantity} ${holding.symbol}`}
            </div>
            <div className="text-xs font-mono text-text-secondary mt-0.5 tabular-numbers truncate">
              {hideValues ? 'R$ •••••' : formatBRL(holding.currentValue)}
            </div>
          </div>

          <div className="text-right">
            <span className="text-[11px] font-mono text-text-tertiary uppercase block">
              Resultado da Posição
            </span>
            <div
              className={`text-base sm:text-lg font-bold font-mono mt-0.5 tabular-numbers truncate flex items-center justify-end gap-1 ${
                isPositive ? 'text-positive' : 'text-negative'
              }`}
            >
              {isPositive ? <TrendingUp className="w-4 h-4 shrink-0" /> : <TrendingDown className="w-4 h-4 shrink-0" />}
              <span>{hideValues ? '+••••' : `+ ${formatBRL(holding.profitBrl)}`}</span>
            </div>
            <div
              className={`text-xs font-mono font-semibold mt-0.5 tabular-numbers ${
                isPositive ? 'text-positive' : 'text-negative'
              }`}
            >
              {hideValues ? '+••••' : `+${holding.profitPercent}%`}
            </div>
          </div>
        </div>

        {/* Métricas de Preço */}
        <div className="grid grid-cols-2 gap-3 text-xs bg-white/[0.02] p-3 rounded-xl border border-white/5">
          <div>
            <span className="text-text-tertiary block text-[11px]">Preço Atual:</span>
            <span className="font-mono font-bold text-text-primary tabular-numbers text-xs sm:text-sm">
              {formatBRL(holding.currentPrice)}
            </span>
          </div>
          <div className="text-right">
            <span className="text-text-tertiary block text-[11px]">Preço Médio:</span>
            <span className="font-mono font-semibold text-text-secondary tabular-numbers text-xs sm:text-sm">
              {formatBRL(holding.averageCost)}
            </span>
          </div>
        </div>

        {/* Hover Action Desktop & Mobile CTA */}
        <div className="mt-4 pt-2 flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5 text-text-tertiary text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-positive inline-block" />
            <span>24h: {holding.dailyChangePercent >= 0 ? `+${holding.dailyChangePercent}%` : `${holding.dailyChangePercent}%`}</span>
          </div>

          <div className="flex items-center gap-1 font-semibold text-brand-cyan group-hover:translate-x-0.5 transition-transform">
            <span>Ver detalhes</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </Card>
    </Link>
  );
};
