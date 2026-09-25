import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { useMarketData } from '../../providers/MarketDataProvider';
import { usePrivacyStore } from '../../store/privacyStore';
import { useAnimatedNumber } from '../../hooks/useAnimatedNumber';

interface SparklineProps {
  data: number[];
  color: string;
}

const Sparkline: React.FC<SparklineProps> = ({ data, color }) => {
  if (!data || data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = Math.max(max - min, 1);
  const width = 80;
  const height = 28;

  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 6) - 3;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg width={width} height={height} className="overflow-visible">
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
  const { quotes } = useMarketData();
  const formatCurrency = usePrivacyStore(s => s.formatCurrency);

  const animatedBtc = useAnimatedNumber(quotes.BTC.priceBrl, 350);
  const animatedLtc = useAnimatedNumber(quotes.LTC.priceBrl, 350);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Card Bitcoin */}
      <Card variant="glass" radius="lg" className="flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-crypto-bitcoin/15 border border-crypto-bitcoin/40 flex items-center justify-center text-crypto-bitcoin text-xs font-bold">
              ₿
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-text-primary">BITCOIN</span>
                <span className="text-[10px] font-mono text-text-tertiary">BTC</span>
              </div>
              <span className="text-[10px] text-text-tertiary">Dados em tempo real</span>
            </div>
          </div>
          <Badge variant={quotes.BTC.change24h >= 0 ? 'positive' : 'negative'} size="sm">
            {quotes.BTC.change24h >= 0 ? '+' : ''}{quotes.BTC.change24h.toFixed(2)}%
          </Badge>
        </div>

        <div className="flex items-end justify-between mt-4">
          <div>
            <div className="text-base sm:text-lg font-bold text-text-primary tabular-numbers font-mono">
              R$ {animatedBtc.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-text-tertiary font-mono">
              Vol 24h: R$ {(quotes.BTC.volume24hBrl / 1000000).toFixed(1)}M
            </div>
          </div>
          <Sparkline data={quotes.BTC.sparkline} color="#F5A623" />
        </div>
      </Card>

      {/* Card Litecoin */}
      <Card variant="glass" radius="lg" className="flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-crypto-litecoin/15 border border-crypto-litecoin/40 flex items-center justify-center text-crypto-litecoin text-xs font-bold">
              Ł
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-text-primary">LITECOIN</span>
                <span className="text-[10px] font-mono text-text-tertiary">LTC</span>
              </div>
              <span className="text-[10px] text-text-tertiary">Atualizado há poucos segundos</span>
            </div>
          </div>
          <Badge variant={quotes.LTC.change24h >= 0 ? 'positive' : 'negative'} size="sm">
            {quotes.LTC.change24h >= 0 ? '+' : ''}{quotes.LTC.change24h.toFixed(2)}%
          </Badge>
        </div>

        <div className="flex items-end justify-between mt-4">
          <div>
            <div className="text-base sm:text-lg font-bold text-text-primary tabular-numbers font-mono">
              R$ {animatedLtc.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-text-tertiary font-mono">
              Vol 24h: R$ {(quotes.LTC.volume24hBrl / 1000000).toFixed(2)}M
            </div>
          </div>
          <Sparkline data={quotes.LTC.sparkline} color="#B8C2CC" />
        </div>
      </Card>
    </div>
  );
};
