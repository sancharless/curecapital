import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { TrendingUp, BarChart2 } from 'lucide-react';
import { formatPercentage } from '../../utils/formatters';

interface MetricItem {
  period: string;
  value: number;
  barWidth: number;
}

export const PerformanceCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'periods' | 'compare'>('periods');

  const metrics: MetricItem[] = [
    { period: 'Hoje', value: 0.23, barWidth: 18 },
    { period: '7 dias', value: 0.91, barWidth: 38 },
    { period: '30 dias', value: 2.51, barWidth: 64 },
    { period: 'Ano', value: 18.72, barWidth: 100 },
  ];

  // Comparativo de Performance (Item 29 - sem tom de promessa)
  const comparisons = [
    { asset: 'Sua Carteira', value: 14.71, color: 'bg-brand-cyan', textColor: 'text-brand-cyan' },
    { asset: 'Benchmark BTC', value: 11.20, color: 'bg-crypto-bitcoin', textColor: 'text-crypto-bitcoin' },
    { asset: 'Benchmark LTC', value: 17.30, color: 'bg-crypto-litecoin', textColor: 'text-crypto-litecoin' },
  ];

  return (
    <Card variant="glass" radius="lg" className="flex flex-col justify-between h-full space-y-4">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-positive" />
          <h3 className="text-sm font-semibold text-text-primary tracking-tight">
            Performance
          </h3>
        </div>

        {/* Alternância discreta entre Períodos e Comparativo */}
        <div className="flex items-center p-0.5 rounded-lg bg-white/[0.04] border border-white/10 text-[10px] font-mono">
          <button
            onClick={() => setActiveTab('periods')}
            className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
              activeTab === 'periods' ? 'bg-[#162A46] text-white font-semibold' : 'text-text-tertiary hover:text-text-primary'
            }`}
          >
            Períodos
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`px-2 py-0.5 rounded transition-colors cursor-pointer ${
              activeTab === 'compare' ? 'bg-[#162A46] text-white font-semibold' : 'text-text-tertiary hover:text-text-primary'
            }`}
          >
            Comparativo
          </button>
        </div>
      </div>

      <div className="my-auto">
        {activeTab === 'periods' ? (
          <div className="space-y-3">
            {metrics.map((item) => (
              <div key={item.period} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">{item.period}</span>
                  <span className="font-mono font-semibold text-positive tabular-nums">
                    {formatPercentage(item.value)}
                  </span>
                </div>
                {/* Mini visualização horizontal (Item 28) */}
                <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-positive/50 to-positive rounded-full transition-all duration-500"
                    style={{ width: `${item.barWidth}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-[11px] text-text-tertiary">
              Comparativo de variação histórica relativa do portfólio.
            </p>
            {comparisons.map((c) => (
              <div key={c.asset} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-text-secondary">{c.asset}</span>
                  <span className={`font-mono font-semibold tabular-nums ${c.textColor}`}>
                    +{c.value.toFixed(1)}%
                  </span>
                </div>
                <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                  <div
                    className={`h-full ${c.color} rounded-full transition-all duration-500`}
                    style={{ width: `${(c.value / 20) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-text-tertiary">
        <span>Rentabilidade Líquida Histórica</span>
        <span className="text-brand-cyan font-mono">+14,71% Total</span>
      </div>
    </Card>
  );
};
