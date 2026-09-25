import React from 'react';
import { Card } from '../ui/Card';
import { Filter, ArrowRight } from 'lucide-react';
import { MOCK_AFFILIATE_FUNNEL } from '../../data/mockData';

export const AffiliateFunnel: React.FC = () => {
  const steps = [
    {
      label: 'Cliques no Link',
      count: 342,
      conversion: '100%',
      width: '100%',
      color: 'bg-brand-blue/30 border-brand-blue/40',
    },
    {
      label: 'Cadastros Realizados',
      count: 84,
      conversion: '24,5% conv.',
      width: '75%',
      color: 'bg-brand-cyan/25 border-brand-cyan/40',
    },
    {
      label: 'Identidade Verificada (KYC)',
      count: 41,
      conversion: '48,8% conv.',
      width: '50%',
      color: 'bg-positive/20 border-positive/40',
    },
    {
      label: 'Investidores Ativos',
      count: 12,
      conversion: '29,2% conv.',
      width: '28%',
      color: 'bg-positive/35 border-positive/60',
    },
  ];

  return (
    <Card variant="glass" radius="lg" className="space-y-5">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-cyan" />
          <h3 className="text-sm font-semibold text-text-primary tracking-tight">
            Funil de Conversão de Indicação
          </h3>
        </div>
        <span className="text-xs font-mono text-positive">Taxa Global: 3,51%</span>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={step.label} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-[10px] font-mono text-text-tertiary">
                  0{index + 1}
                </span>
                <span className="font-medium text-text-secondary">{step.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-text-tertiary">{step.conversion}</span>
                <span className="font-mono font-semibold text-text-primary tabular-numbers">
                  {step.count}
                </span>
              </div>
            </div>

            {/* Barra do Funil */}
            <div className="h-6 w-full bg-white/[0.02] rounded-lg overflow-hidden p-0.5 border border-white/[0.04]">
              <div 
                className={`h-full rounded-md border flex items-center px-3 transition-all duration-700 ${step.color}`}
                style={{ width: step.width }}
              >
                <span className="text-[10px] font-mono font-semibold text-text-primary">
                  {step.count}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs text-text-tertiary">
        <span>Tempo médio de conversão: 4,2 dias</span>
        <span className="text-brand-cyan flex items-center gap-1">
          <span>Otimizar campanhas</span>
          <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Card>
  );
};
