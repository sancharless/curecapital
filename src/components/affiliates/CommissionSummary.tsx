import React from 'react';
import { Card } from '../ui/Card';
import { DollarSign, Clock, CheckCircle2, Wallet } from 'lucide-react';
import { usePrivacyStore } from '../../store/privacyStore';
import { formatBRL } from '../../utils/formatters';

interface CommissionSummaryProps {
  accumulated: number;
  available: number;
  pending: number;
  paid: number;
}

export const CommissionSummary: React.FC<CommissionSummaryProps> = ({
  accumulated,
  available,
  pending,
  paid,
}) => {
  const hideValues = usePrivacyStore((s) => s.hideValues);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-text-primary tracking-tight">
            Gestão de Comissões
          </h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Saldo acumulado, liquidez disponível e valores em processamento.
          </p>
        </div>
      </div>

      {/* Grid de 4 Cards com Hierarquia (Itens 30 & 31) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        {/* 1. Acumulado (Maior Destaque) */}
        <Card
          variant="interactive"
          radius="lg"
          className="p-4 sm:p-5 space-y-2 bg-gradient-to-br from-[#0c1c36] to-[#081325] border-brand-blue/30 shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider">
              Total Acumulado
            </span>
            <div className="p-1.5 rounded-lg bg-brand-blue/15 text-brand-cyan">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-text-primary tabular-numbers">
            {hideValues ? 'R$ •••••' : formatBRL(accumulated)}
          </div>
          <span className="text-[10px] text-brand-cyan block">
            Apurado historicamente
          </span>
        </Card>

        {/* 2. Disponível (Azul/Verde Discreto) */}
        <Card
          variant="interactive"
          radius="lg"
          className="p-4 sm:p-5 space-y-2 bg-[#091527]/90 border-positive/20"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider">
              Disponível
            </span>
            <div className="p-1.5 rounded-lg bg-positive/10 text-positive">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-positive tabular-numbers">
            {hideValues ? 'R$ •••••' : formatBRL(available)}
          </div>
          <span className="text-[10px] text-positive/80 block">
            Liberado para resgate
          </span>
        </Card>

        {/* 3. Pendente (Amarelo Suave) */}
        <Card
          variant="interactive"
          radius="lg"
          className="p-4 sm:p-5 space-y-2 bg-[#091527]/90 border-amber-500/20"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider">
              Pendente
            </span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-amber-300 tabular-numbers">
            {hideValues ? 'R$ •••••' : formatBRL(pending)}
          </div>
          <span className="text-[10px] text-amber-400/80 block">
            Em ciclo de liquidação
          </span>
        </Card>

        {/* 4. Pago (Cinza/Azul) */}
        <Card
          variant="interactive"
          radius="lg"
          className="p-4 sm:p-5 space-y-2 bg-[#091527]/90 border-white/10"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider">
              Já Liquidado
            </span>
            <div className="p-1.5 rounded-lg bg-white/5 text-text-secondary">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-text-secondary tabular-numbers">
            {hideValues ? 'R$ •••••' : formatBRL(paid)}
          </div>
          <span className="text-[10px] text-text-tertiary block">
            Transferido para conta
          </span>
        </Card>
      </div>
    </div>
  );
};
