import React from 'react';
import { Card } from '../ui/Card';
import { Landmark, ArrowUpRight, Coins, CheckCircle2 } from 'lucide-react';
import { useMarketData } from '../../providers/MarketDataProvider';
import { usePrivacyStore } from '../../store/privacyStore';
import { useAnimatedNumber } from '../../hooks/useAnimatedNumber';

export const FinancialSummary: React.FC = () => {
  const { 
    investedCapitalBrl, 
    accumulatedProfitBrl, 
    portfolioTotalBrl, 
    fiatCashBrl 
  } = useMarketData();

  const formatCurrency = usePrivacyStore(s => s.formatCurrency);
  const animatedTotal = useAnimatedNumber(portfolioTotalBrl, 400);

  const cards = [
    {
      label: 'Capital Aportado',
      value: formatCurrency(investedCapitalBrl),
      subtext: 'Alocação base principal',
      icon: <Landmark className="w-4 h-4 text-text-tertiary" />,
      highlight: false,
    },
    {
      label: 'Resultado Acumulado',
      value: `+ ${formatCurrency(accumulatedProfitBrl).replace('R$ ', 'R$ ')}`,
      subtext: '+14,71% sobre o capital',
      icon: <ArrowUpRight className="w-4 h-4 text-positive" />,
      highlight: true,
      textColor: 'text-positive',
    },
    {
      label: 'Patrimônio',
      value: formatCurrency(animatedTotal),
      subtext: 'Valor de mercado em custódia',
      icon: <Coins className="w-4 h-4 text-brand-cyan" />,
      highlight: false,
    },
    {
      label: 'Disponível',
      value: formatCurrency(fiatCashBrl),
      subtext: 'Livre para saque imediato',
      icon: <CheckCircle2 className="w-4 h-4 text-brand-blue" />,
      highlight: false,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {cards.map((c) => (
        <Card key={c.label} variant="glass" radius="md" className="p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-text-secondary truncate">{c.label}</span>
            <div className="p-1.5 rounded-lg bg-white/[0.04]">
              {c.icon}
            </div>
          </div>

          <div className="space-y-1">
            <div className={`text-base sm:text-lg font-bold tabular-numbers tracking-tight ${c.textColor || 'text-text-primary'}`}>
              {c.value}
            </div>
            <div className="text-[10px] text-text-tertiary truncate font-mono">
              {c.subtext}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
