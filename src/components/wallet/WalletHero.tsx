import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { AnimatedNumber } from '../ui/AnimatedNumber';
import { LiveIndicator } from '../ui/LiveIndicator';
import { Eye, EyeOff, PlusCircle, ArrowDownLeft, ArrowLeftRight, TrendingUp } from 'lucide-react';
import { usePortfolio } from '../../hooks/usePortfolio';
import { usePrivacyStore } from '../../store/privacyStore';
import { formatBRL } from '../../utils/formatters';
import { ContributionModal } from '../finance/ContributionModal';
import { WithdrawalModal } from '../finance/WithdrawalModal';
import { TransferModal } from '../finance/TransferModal';

export const WalletHero: React.FC = () => {
  const {
    totalBalance,
    monthlyGrowthBrl,
    monthlyGrowthPercent,
    btcChipDisplay,
    ltcChipDisplay,
    isLive,
    lastTickTimestamp,
  } = usePortfolio();

  const hideValues = usePrivacyStore((s) => s.hideValues);
  const toggleHideValues = usePrivacyStore((s) => s.toggleHideValues);

  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  return (
    <div className="space-y-4">
      {/* Top Header com controles da carteira */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
            Carteira
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            Visualize e acompanhe seus ativos digitais em um único lugar.
          </p>
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          {/* Ocultar valores */}
          <button
            onClick={toggleHideValues}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
            title={hideValues ? 'Mostrar valores' : 'Ocultar valores'}
          >
            {hideValues ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span className="hidden xs:inline">{hideValues ? 'Mostrar' : 'Ocultar'}</span>
          </button>

          {/* Atualização em tempo real */}
          <LiveIndicator status={isLive ? 'live' : 'connecting'} label="Atualizado agora" />
        </div>

      </div>

      {/* Card Patrimonial Hero */}
      <Card
        variant="interactive"
        radius="lg"
        className="relative overflow-hidden bg-gradient-to-br from-[#0c1c36] via-[#091527] to-[#050D1A] border-white/10 p-5 sm:p-7 shadow-[0_8px_32px_rgba(0,0,0,0.36)]"
      >
        {/* Glow de fundo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-brand-cyan/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Bloco de Valor e Variação */}
          <div className="space-y-3">
            <span className="text-[11px] font-mono font-semibold text-text-tertiary uppercase tracking-wider block">
              VALOR TOTAL DA CARTEIRA
            </span>

            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-2xl sm:text-4xl lg:text-5xl font-bold font-mono text-text-primary tracking-tight tabular-numbers">
                {hideValues ? (
                  'R$ •••••••'
                ) : (
                  <AnimatedNumber
                    value={totalBalance}
                    formatter={(n: number) => formatBRL(n)}
                  />
                )}
              </span>

              {/* Variação Mensal */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-positive/10 border border-positive/20 text-positive text-xs font-mono font-bold">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>
                  {hideValues ? '+••••' : `+ ${formatBRL(monthlyGrowthBrl)}`}
                </span>
                <span className="text-[10px] text-positive/80 font-normal">
                  (+{monthlyGrowthPercent}% este mês)
                </span>
              </div>
            </div>

            {/* Chips de equivalência em criptoativos */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-text-tertiary">
              <span className="text-text-tertiary">Equivalência:</span>
              <span className="font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/10 text-crypto-bitcoin font-medium">
                {hideValues ? '•••• BTC' : `≈ ${btcChipDisplay}`}
              </span>
              <span className="font-mono px-2 py-0.5 rounded bg-white/[0.03] border border-white/10 text-crypto-litecoin font-medium">
                {hideValues ? '•••• LTC' : `≈ ${ltcChipDisplay}`}
              </span>
            </div>
          </div>

          {/* Botões de Ação Institucionais */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5">
            <Button
              variant="primary"
              size="md"
              leftIcon={<PlusCircle className="w-4 h-4" />}
              onClick={() => setIsDepositOpen(true)}
              className="flex-1 sm:flex-none justify-center shadow-lg shadow-brand-blue/20"
            >
              Aportar
            </Button>

            <Button
              variant="outline"
              size="md"
              leftIcon={<ArrowDownLeft className="w-4 h-4" />}
              onClick={() => setIsWithdrawOpen(true)}
              className="flex-1 sm:flex-none justify-center bg-white/5 border-white/15 hover:bg-white/10"
            >
              Solicitar saque
            </Button>

            <Button
              variant="ghost"
              size="md"
              leftIcon={<ArrowLeftRight className="w-4 h-4" />}
              onClick={() => setIsTransferOpen(true)}
              className="w-full sm:w-auto justify-center text-text-secondary hover:text-text-primary hover:bg-white/5"
            >
              Transferir
            </Button>
          </div>
        </div>
      </Card>


      {/* Modais de Fluxo */}
      <ContributionModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
      />

      <WithdrawalModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
      />

      <TransferModal
        isOpen={isTransferOpen}
        onClose={() => setIsTransferOpen(false)}
      />
    </div>
  );
};
