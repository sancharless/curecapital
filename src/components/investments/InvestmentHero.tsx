import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { PlusCircle, TrendingUp, DollarSign, Wallet, Percent, ShieldCheck } from 'lucide-react';
import { usePortfolio } from '../../hooks/usePortfolio';
import { usePrivacyStore } from '../../store/privacyStore';
import { formatBRL } from '../../utils/formatters';
import { ContributionModal } from '../finance/ContributionModal';

export const InvestmentHero: React.FC = () => {
  const { investedCapital, profit, totalBalance, profitPercentage } = usePortfolio();
  const hideValues = usePrivacyStore((s) => s.hideValues);

  const [isDepositOpen, setIsDepositOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
            Investimentos
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            Acompanhe suas posições e a evolução do capital investido.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          leftIcon={<PlusCircle className="w-4 h-4" />}
          onClick={() => setIsDepositOpen(true)}
          className="self-start sm:self-auto shadow-lg shadow-brand-blue/20"
        >
          Novo aporte
        </Button>

      </div>

      {/* Grid de 4 Métricas Hero (Item 23) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* 1. Capital Investido */}
        <Card variant="interactive" radius="lg" className="p-4 sm:p-5 space-y-2 bg-[#091527]/90 border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider">
              Capital Investido
            </span>
            <div className="w-7 h-7 rounded-lg bg-white/5 text-text-secondary flex items-center justify-center">
              <DollarSign className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-lg sm:text-2xl font-bold font-mono text-text-primary tabular-numbers">
            {hideValues ? 'R$ •••••' : formatBRL(investedCapital)}
          </div>
          <span className="text-[11px] text-text-tertiary block">
            Custo base de aquisições
          </span>
        </Card>

        {/* 2. Resultado Acumulado */}
        <Card variant="interactive" radius="lg" className="p-4 sm:p-5 space-y-2 bg-[#091527]/90 border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider">
              Resultado Acumulado
            </span>
            <div className="w-7 h-7 rounded-lg bg-positive/10 text-positive flex items-center justify-center">
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-lg sm:text-2xl font-bold font-mono text-positive tabular-numbers">
            {hideValues ? '+••••' : `+ ${formatBRL(profit)}`}
          </div>
          <span className="text-[11px] text-positive/90 font-mono font-medium block">
            {hideValues ? '+••••' : `+${profitPercentage}% sobre capital`}
          </span>
        </Card>

        {/* 3. Patrimônio Atual */}
        <Card variant="interactive" radius="lg" className="p-4 sm:p-5 space-y-2 bg-[#091527]/90 border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider">
              Patrimônio Atual
            </span>
            <div className="w-7 h-7 rounded-lg bg-brand-blue/15 text-brand-cyan flex items-center justify-center">
              <Wallet className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-lg sm:text-2xl font-bold font-mono text-text-primary tabular-numbers">
            {hideValues ? 'R$ •••••' : formatBRL(totalBalance)}
          </div>
          <span className="text-[11px] text-text-tertiary block">
            Valor a mercado consolidado
          </span>
        </Card>

        {/* 4. Performance Acumulada */}
        <Card variant="interactive" radius="lg" className="p-4 sm:p-5 space-y-2 bg-[#091527]/90 border-white/10">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider">
              Performance Total
            </span>
            <div className="w-7 h-7 rounded-lg bg-brand-cyan/10 text-brand-cyan flex items-center justify-center">
              <Percent className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-lg sm:text-2xl font-bold font-mono text-brand-cyan tabular-numbers">
            {hideValues ? '+••••' : `+${profitPercentage}%`}
          </div>
          <span className="text-[11px] text-text-tertiary block">
            Retorno histórico da carteira
          </span>
        </Card>
      </div>

      <ContributionModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
      />
    </div>
  );
};
