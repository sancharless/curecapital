import React from 'react';
import { Card } from '../ui/Card';
import { TrendingUp } from 'lucide-react';

interface MetricItem {
  period: string;
  value: number;
  barWidth: number; // Porcentagem para preenchimento da mini-barra
}

export const PerformanceCard: React.FC = () => {
  const metrics: MetricItem[] = [
    { period: 'Hoje', value: 0.23, barWidth: 15 },
    { period: '7 dias', value: 0.91, barWidth: 35 },
    { period: '30 dias', value: 2.51, barWidth: 65 },
    { period: 'Ano', value: 18.72, barWidth: 100 },
  ];

  return (
    <Card variant="glass" radius="lg" className="flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-positive" />
          <h3 className="text-sm font-semibold text-text-primary tracking-tight">Performance</h3>
        </div>
        <span className="text-[10px] font-mono text-text-tertiary uppercase">Rentabilidade Líquida</span>
      </div>

      <div className="space-y-3.5">
        {metrics.map((item) => (
          <div key={item.period} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-text-secondary">{item.period}</span>
              <span className="font-mono font-semibold text-positive tabular-numbers">
                +{item.value.toFixed(2)}%
              </span>
            </div>

            {/* Mini barra de progresso / sparkline minimalista */}
            <div className="h-1.5 w-full bg-white/[0.05] rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-positive/60 to-positive rounded-full transition-all duration-500"
                style={{ width: `${item.barWidth}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-text-tertiary">
        <span>Benchmark: CDI 10,4% a.a.</span>
        <span className="text-brand-cyan font-mono">+80% Alpha</span>
      </div>
    </Card>
  );
};
