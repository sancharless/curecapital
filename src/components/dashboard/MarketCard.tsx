import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { LiveIndicator } from '../ui/LiveIndicator';
import { usePortfolio } from '../../hooks/usePortfolio';
import { formatBRL, formatPercentage } from '../../utils/formatters';

interface CleanSparklineProps {
  data: number[];
  color: string;
}

// Sparklines limpas de 40px sem eixos ou grid (Item 26)
const CleanSparkline: React.FC<CleanSparklineProps> = ({ data, color }) => {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = Math.max(max - min, 1);
  const width = 90;
  const height = 36;

  const points = data
    .map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible shrink-0">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

export const MarketCard: React.FC = () => {
  const { quotes } = usePortfolio();

  return (
    <Card variant="glass" radius="lg" className="flex flex-col justify-between h-full space-y-4">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
        <h3 className="text-sm font-semibold text-text-primary tracking-tight">
          Mercado agora
        </h3>
        {/* Indicador ao vivo: Atualizado agora (Item 27) */}
        <LiveIndicator status="live" label="Atualizado agora" />
      </div>

      <div className="space-y-3.5 my-auto">
        {/* Bitcoin BTC (Item 71) */}
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Ícone Dourado sem colorir o card inteiro */}
            <div className="w-8 h-8 rounded-xl bg-crypto-bitcoin/15 border border-crypto-bitcoin/35 flex items-center justify-center text-crypto-bitcoin font-bold text-sm shrink-0">
              ₿
            </div>
            <div className="truncate">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-xs text-text-primary">BTC</span>
                <span className="text-[11px] text-text-tertiary">Bitcoin</span>
              </div>
              <div className="text-xs font-bold font-mono text-text-primary tabular-nums mt-0.5">
                {formatBRL(quotes.BTC.priceBrl)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <CleanSparkline data={quotes.BTC.sparkline} color="#F5A623" />
            <Badge variant={quotes.BTC.change24h >= 0 ? 'positive' : 'negative'} size="sm">
              {formatPercentage(quotes.BTC.change24h)}
            </Badge>
          </div>
        </div>

        {/* Litecoin LTC (Item 72) */}
        <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Ícone Prata refinado */}
            <div className="w-8 h-8 rounded-xl bg-crypto-litecoin/15 border border-crypto-litecoin/35 flex items-center justify-center text-crypto-litecoin font-bold text-sm shrink-0">
              Ł
            </div>
            <div className="truncate">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-xs text-text-primary">LTC</span>
                <span className="text-[11px] text-text-tertiary">Litecoin</span>
              </div>
              <div className="text-xs font-bold font-mono text-text-primary tabular-nums mt-0.5">
                {formatBRL(quotes.LTC.priceBrl)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <CleanSparkline data={quotes.LTC.sparkline} color="#B8C2CC" />
            <Badge variant={quotes.LTC.change24h >= 0 ? 'positive' : 'negative'} size="sm">
              {formatPercentage(quotes.LTC.change24h)}
            </Badge>
          </div>
        </div>
      </div>

      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-text-tertiary">
        <span>Cotações Globais</span>
        <span className="font-mono text-text-secondary">Spread Médio 0.04%</span>
      </div>
    </Card>
  );
};
