import React, { useState } from 'react';
import { X, Copy, Check, ShieldCheck, DollarSign, Percent, Calendar } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Commission, CommissionStatus } from '../../data/affiliateMock';
import { usePrivacyStore } from '../../store/privacyStore';
import { formatBRL } from '../../utils/formatters';

interface CommissionDetailDrawerProps {
  commission: Commission | null;
  isOpen: boolean;
  onClose: () => void;
}

export const CommissionDetailDrawer: React.FC<CommissionDetailDrawerProps> = ({
  commission,
  isOpen,
  onClose,
}) => {
  const hideValues = usePrivacyStore((s) => s.hideValues);
  const [copied, setCopied] = useState(false);

  if (!isOpen || !commission) return null;

  const handleCopyId = () => {
    navigator.clipboard.writeText(commission.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status: CommissionStatus) => {
    switch (status) {
      case 'available':
        return <Badge variant="positive" size="sm">Disponível</Badge>;
      case 'pending':
        return <Badge variant="neutral" size="sm">Pendente</Badge>;
      case 'paid':
        return <Badge variant="info" size="sm">Liquidado</Badge>;
      case 'reversed':
        return <Badge variant="negative" size="sm">Estornado</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-navy-deep/80 backdrop-blur-md animate-fade-in">
      <div className="w-full sm:max-w-md bg-[#081325] border-t sm:border border-white/10 rounded-t-[28px] sm:rounded-2xl shadow-2xl overflow-hidden max-h-[92dvh] flex flex-col pb-safe animate-slide-up">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-positive" />
            <h3 className="text-base font-bold text-text-primary tracking-tight">
              Detalhes da Comissão
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Valor Principal em Destaque */}
          <div className="text-center py-4 bg-[#050D1A] rounded-2xl border border-white/5 space-y-1">
            <span className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider block">
              {commission.eventLabel}
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-positive tabular-numbers">
              {hideValues ? '+••••' : `+ ${formatBRL(commission.amount)}`}
            </div>
            <div className="flex justify-center pt-1">
              {getStatusBadge(commission.status)}
            </div>
          </div>

          {/* Dados Estruturados com Transparência de Cálculo (Item 38 & 39) */}
          <div className="space-y-3 text-xs bg-white/[0.02] p-4 rounded-xl border border-white/5">
            <div className="flex justify-between items-center text-text-secondary">
              <span>ID da Operação</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-text-primary select-all">
                  {commission.id}
                </span>
                <button
                  type="button"
                  onClick={handleCopyId}
                  className="text-text-tertiary hover:text-text-primary p-0.5 cursor-pointer"
                  title="Copiar ID"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-positive" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-text-secondary">
              <span>Usuário Relacionado</span>
              <span className="font-semibold text-text-primary">
                {commission.referralName}
              </span>
            </div>

            <div className="flex justify-between items-center text-text-secondary">
              <span>Data de Apuração</span>
              <span className="font-mono text-text-primary font-medium">
                {commission.createdAt}
              </span>
            </div>

            {/* Base de Cálculo Clara (Item 38) */}
            <div className="pt-2 border-t border-white/5 space-y-2">
              <div className="flex justify-between items-center text-text-secondary">
                <span>Volume Elegível (Base)</span>
                <span className="font-mono font-bold text-text-primary tabular-numbers">
                  {hideValues ? 'R$ •••••' : formatBRL(commission.baseAmount)}
                </span>
              </div>

              <div className="flex justify-between items-center text-text-secondary">
                <span>Percentual Aplicado</span>
                <span className="font-mono font-bold text-brand-cyan">
                  {(commission.rate * 100).toFixed(2)}%
                </span>
              </div>

              <div className="flex justify-between items-center text-text-secondary">
                <span>Regra Vinculada</span>
                <span className="font-mono text-text-tertiary text-[11px]">
                  {commission.ruleId || 'RULE-STD-150'}
                </span>
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-brand-blue/5 border border-brand-blue/15 flex items-center gap-2 text-[11px] text-text-tertiary">
            <ShieldCheck className="w-4 h-4 text-brand-cyan shrink-0" />
            <span>Auditoria institucional reconciliada conforme as regras do programa.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/5 bg-[#050D1A]">
          <Button variant="outline" size="md" className="w-full justify-center" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
};
