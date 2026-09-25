import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Percent, TrendingUp, Calendar, ArrowUpRight } from 'lucide-react';
import { useMarketData } from '../providers/MarketDataProvider';
import { usePrivacyStore } from '../store/privacyStore';

export const Earnings: React.FC = () => {
  const { accumulatedProfitBrl, monthlyGrowthBrl } = useMarketData();
  const formatCurrency = usePrivacyStore(s => s.formatCurrency);

  const earningsHistory = [
    { date: '24/09/2026', asset: 'BRL', value: 284.32, rate: '+0.09%', ref: 'YIELD-D24' },
    { date: '23/09/2026', asset: 'BRL', value: 279.10, rate: '+0.09%', ref: 'YIELD-D23' },
    { date: '22/09/2026', asset: 'BRL', value: 268.45, rate: '+0.08%', ref: 'YIELD-D22' },
    { date: '21/09/2026', asset: 'BRL', value: 272.00, rate: '+0.09%', ref: 'YIELD-D21' },
    { date: '20/09/2026', asset: 'BRL', value: 265.80, rate: '+0.08%', ref: 'YIELD-D20' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
          Rendimentos & Proventos
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          Extrato analítico de resultados distribuídos sobre a custódia patrimonial.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card variant="glass" radius="md" className="p-5">
          <span className="text-xs text-text-tertiary">Lucro Acumulado Total</span>
          <div className="text-2xl font-bold font-mono text-positive tabular-numbers mt-1">
            + {formatCurrency(accumulatedProfitBrl)}
          </div>
          <span className="text-[11px] text-text-secondary mt-1 block">Desde o primeiro aporte</span>
        </Card>

        <Card variant="glass" radius="md" className="p-5">
          <span className="text-xs text-text-tertiary">Rendimento Este Mês</span>
          <div className="text-2xl font-bold font-mono text-positive tabular-numbers mt-1">
            + {formatCurrency(monthlyGrowthBrl)}
          </div>
          <span className="text-[11px] text-text-secondary mt-1 block">+2,51% apurado em Setembro</span>
        </Card>

        <Card variant="glass" radius="md" className="p-5">
          <span className="text-xs text-text-tertiary">Média Diária</span>
          <div className="text-2xl font-bold font-mono text-text-primary tabular-numbers mt-1">
            {formatCurrency(274.00)}
          </div>
          <span className="text-[11px] text-brand-cyan mt-1 block">Creditamento automático</span>
        </Card>
      </div>

      <Card variant="glass" radius="lg" className="p-0 overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-white/[0.06] flex items-center justify-between">
          <h3 className="text-sm font-semibold text-text-primary">Lançamentos Recentes de Rendimento</h3>
          <Badge variant="positive" size="sm">100% Liquidados</Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/[0.06] text-[11px] text-text-tertiary font-mono uppercase tracking-wider">
                <th className="py-3 px-4 sm:px-6">Data</th>
                <th className="py-3 px-4">Referência</th>
                <th className="py-3 px-4">Taxa Apurada</th>
                <th className="py-3 px-4 text-right">Crédito</th>
                <th className="py-3 px-4 sm:px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {earningsHistory.map((item) => (
                <tr key={item.ref} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-mono text-text-secondary">{item.date}</td>
                  <td className="py-3.5 px-4 font-mono text-brand-cyan">{item.ref}</td>
                  <td className="py-3.5 px-4 font-mono text-positive">{item.rate}</td>
                  <td className="py-3.5 px-4 text-right font-mono font-medium text-positive tabular-numbers">
                    + {formatCurrency(item.value)}
                  </td>
                  <td className="py-3.5 px-4 sm:px-6 text-right">
                    <Badge variant="positive" size="sm">Creditado</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
