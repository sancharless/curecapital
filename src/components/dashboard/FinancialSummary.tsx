import React from 'react';
import { Card } from '../ui/Card';
import { Landmark, TrendingUp, Wallet, Activity } from 'lucide-react';
import { usePortfolio } from '../../hooks/usePortfolio';
import { usePrivacyStore } from '../../store/privacyStore';
import { formatBRL, formatPercentage } from '../../utils/formatters';

export const FinancialSummary: React.FC = () => {
  const { 
    investedCapital, 
    profit, 
    availableBalance, 
    profitPercentage 
  } = usePortfolio();

  const hideValues = usePrivacyStore((s) => s.hideValues);

  const metrics = [
    {
      label: 'Capital aportado',
      value: formatBRL(investedCapital, hideValues),
      subtext: 'Alocação base em custódia',
      icon: <Landmark className="w-4 h-4 text-text-secondary" />,
      color: 'text-text-primary',
    },
    {
      label: 'Resultado acumulado',
      value: `+ ${formatBRL(profit, hideValues).replace('R$ ', 'R$ ')}`,
      subtext: 'Rendimentos líquidos consolidados',
      icon: <TrendingUp className="w-4 h-4 text-positive" />,
      color: 'text-positive font-semibold',
    },
    {
      label: 'Disponível',
      value: formatBRL(availableBalance, hideValues),
      subtext: 'Livre para resgate ou aporte',
      icon: <Wallet className="w-4 h-4 text-brand-cyan" />,
      color: 'text-text-primary',
    },
    {
      label: 'Rentabilidade acumulada',
      value: formatPercentage(profitPercentage),
      subtext: 'Retorno histórico total',
      icon: <Activity className="w-4 h-4 text-brand-blue" />,
      color: 'text-brand-cyan font-semibold',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {metrics.map((m) => (
        <Card 
          key={m.label} 
          variant="glass" 
          radius="md" 
          className="p-4 sm:p-5 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-text-secondary truncate">
              {m.label}
            </span>
            {/* Ícone simples com fundo sutil sem círculos pesados (Item 22) */}
            <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/[0.04]">
              {m.icon}
            </div>
          </div>

          <div className="space-y-1">
            <div className={`text-base sm:text-lg font-bold tabular-nums tracking-tight font-mono ${m.color}`}>
              {m.value}
            </div>
            <div className="text-[10px] text-text-tertiary truncate font-mono">
              {m.subtext}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
