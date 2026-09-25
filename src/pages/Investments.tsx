import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { TrendingUp, ShieldCheck, ArrowUpRight, Lock, CheckCircle2 } from 'lucide-react';
import { usePrivacyStore } from '../store/privacyStore';

export const Investments: React.FC = () => {
  const formatCurrency = usePrivacyStore(s => s.formatCurrency);

  const strategies = [
    {
      title: 'Custódia Ativa Litecoin (LTC)',
      type: 'Alocação Primária',
      allocated: 34016.08,
      yieldRate: '1.70% a.m.',
      term: 'Liquidez Diária',
      status: 'active',
      risk: 'Conservador / Institucional',
      profitAcc: 4320.10,
    },
    {
      title: 'Reserva Estratégica Bitcoin (BTC)',
      type: 'Alocação Soberana',
      allocated: 18464.82,
      yieldRate: 'Apreciação + 0.8% a.m.',
      term: 'Sem carência',
      status: 'active',
      risk: 'Moderado',
      profitAcc: 2410.80,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
            Investimentos & Alocações
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Estratégias estruturadas de custódia e rendimento com segregação patrimonial.
          </p>
        </div>

        <Button variant="primary" size="md">
          Nova Alocação Estratégica
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {strategies.map((strat) => (
          <Card key={strat.title} variant="glass" radius="lg" className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono text-brand-cyan uppercase tracking-wider block mb-1">
                  {strat.type}
                </span>
                <h3 className="text-base font-semibold text-text-primary">
                  {strat.title}
                </h3>
              </div>
              <Badge variant="positive" size="sm">
                Ativo
              </Badge>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-text-tertiary block">Capital Alocado:</span>
                <span className="text-sm font-bold font-mono text-text-primary tabular-numbers">
                  {formatCurrency(strat.allocated)}
                </span>
              </div>
              <div>
                <span className="text-text-tertiary block">Rentabilidade Média:</span>
                <span className="text-sm font-bold font-mono text-positive tabular-numbers">
                  {strat.yieldRate}
                </span>
              </div>
              <div>
                <span className="text-text-tertiary block">Lucro Acumulado:</span>
                <span className="font-mono text-positive font-semibold">
                  + {formatCurrency(strat.profitAcc)}
                </span>
              </div>
              <div>
                <span className="text-text-tertiary block">Carência / Prazo:</span>
                <span className="font-mono text-text-secondary font-medium">
                  {strat.term}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-text-tertiary flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan" />
                <span>{strat.risk}</span>
              </span>
              <Button variant="outline" size="sm">
                Gerenciar Alocação
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
