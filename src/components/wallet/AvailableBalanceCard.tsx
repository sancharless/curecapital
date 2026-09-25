import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Wallet, ArrowDownLeft, PlusCircle } from 'lucide-react';
import { usePortfolio } from '../../hooks/usePortfolio';
import { usePrivacyStore } from '../../store/privacyStore';
import { formatBRL } from '../../utils/formatters';
import { ContributionModal } from '../finance/ContributionModal';
import { WithdrawalModal } from '../finance/WithdrawalModal';

export const AvailableBalanceCard: React.FC = () => {
  const { availableBalance } = usePortfolio(); // R$ 2.840,00
  const hideValues = usePrivacyStore((s) => s.hideValues);

  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  return (
    <>
      <Card variant="glass" radius="lg" className="p-5 sm:p-6 space-y-4 relative overflow-hidden bg-gradient-to-br from-[#091527] to-[#060E1B] border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-blue/15 text-brand-cyan flex items-center justify-center border border-brand-blue/30">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider block">
                Saldo Disponível
              </span>
              <div className="text-xl sm:text-2xl font-bold font-mono text-text-primary tabular-numbers mt-0.5">
                {hideValues ? 'R$ •••••' : formatBRL(availableBalance)}
              </div>
            </div>
          </div>

          <Badge variant="cyan" size="sm">
            Liquidez Imediata
          </Badge>
        </div>

        <p className="text-xs text-text-secondary leading-relaxed">
          Saldo disponível para novas alocações ou saque.
        </p>

        <div className="flex items-center gap-2.5 pt-1">
          <Button
            variant="primary"
            size="sm"
            leftIcon={<PlusCircle className="w-3.5 h-3.5" />}
            onClick={() => setIsDepositOpen(true)}
            className="flex-1 justify-center"
          >
            Investir
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<ArrowDownLeft className="w-3.5 h-3.5" />}
            onClick={() => setIsWithdrawOpen(true)}
            className="flex-1 justify-center bg-white/5 border-white/10 hover:bg-white/10"
          >
            Solicitar saque
          </Button>
        </div>

      </Card>

      <ContributionModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
      />

      <WithdrawalModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
      />
    </>
  );
};
