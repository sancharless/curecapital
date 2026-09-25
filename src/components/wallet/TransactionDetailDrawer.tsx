import React, { useState } from 'react';
import { X, Copy, Check, ShieldCheck, ArrowDownLeft, ArrowUpRight, Percent, ArrowLeftRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Transaction } from '../../types';
import { formatBRL } from '../../utils/formatters';

interface TransactionDetailDrawerProps {
  transaction: Transaction | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TransactionDetailDrawer: React.FC<TransactionDetailDrawerProps> = ({
  transaction,
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !transaction) return null;

  const handleCopyRef = () => {
    navigator.clipboard.writeText(transaction.reference);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusBadge = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return <Badge variant="positive" size="sm">Concluído</Badge>;
      case 'processing':
        return <Badge variant="cyan" size="sm">Processando</Badge>;
      case 'pending':
        return <Badge variant="cyan" size="sm">Pendente</Badge>;
      case 'cancelled':
        return <Badge variant="negative" size="sm">Cancelado</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{status}</Badge>;
    }
  };


  const getTypeLabel = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit': return 'Aporte de Capital';
      case 'withdrawal': return 'Resgate / Saque';
      case 'yield': return 'Rendimento Apurado';
      case 'commission': return 'Comissão de Alocação';
      case 'conversion': return 'Conversão de Ativo';
      case 'adjustment': return 'Ajuste de Custódia';
      default: return type;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-navy-deep/80 backdrop-blur-md animate-fade-in">
      <div className="w-full sm:max-w-md bg-[#081325] border-t sm:border border-white/10 rounded-t-[28px] sm:rounded-2xl shadow-2xl overflow-hidden max-h-[92dvh] flex flex-col pb-safe animate-slide-up">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan" />
            <h3 className="text-base font-bold text-text-primary tracking-tight">
              Detalhes da Operação
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Valor Principal em Destaque */}
          <div className="text-center py-3 bg-[#050D1A] rounded-2xl border border-white/5">
            <span className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider block">
              {getTypeLabel(transaction.type)}
            </span>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-text-primary mt-1 tabular-numbers">
              {formatBRL(Math.abs(transaction.amountFiatBrl))}
            </div>
            {transaction.asset !== 'BRL' && (
              <div className="text-xs font-mono text-brand-cyan mt-0.5">
                {transaction.amount > 0 ? `+${transaction.amount}` : transaction.amount} {transaction.asset}
              </div>
            )}
            <div className="mt-2 flex justify-center">
              {getStatusBadge(transaction.status)}
            </div>
          </div>

          {/* Dados Estruturados */}
          <div className="space-y-3 text-xs bg-white/[0.02] p-4 rounded-xl border border-white/5">
            <div className="flex justify-between items-center text-text-secondary">
              <span>ID de Referência</span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono font-bold text-text-primary select-all">
                  {transaction.reference}
                </span>
                <button
                  type="button"
                  onClick={handleCopyRef}
                  className="text-text-tertiary hover:text-text-primary p-0.5 cursor-pointer"
                  title="Copiar referência"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-positive" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center text-text-secondary">
              <span>Data e Hora</span>
              <span className="font-mono text-text-primary font-medium">
                {transaction.createdAt}
              </span>
            </div>

            <div className="flex justify-between items-center text-text-secondary">
              <span>Ativo</span>
              <span className="font-mono font-bold text-text-primary">
                {transaction.asset}
              </span>
            </div>

            <div className="flex justify-between items-center text-text-secondary">
              <span>Descrição</span>
              <span className="text-text-primary text-right max-w-[200px] truncate">
                {transaction.description}
              </span>
            </div>

            {transaction.txHash && (
              <div className="flex justify-between items-center text-text-secondary pt-2 border-t border-white/5">
                <span>Hash Ledger</span>
                <span className="font-mono text-text-tertiary text-[11px] truncate max-w-[160px]">
                  {transaction.txHash}
                </span>
              </div>
            )}
          </div>

          <div className="p-3 rounded-xl bg-brand-blue/5 border border-brand-blue/15 flex items-center gap-2 text-[11px] text-text-tertiary">
            <ShieldCheck className="w-4 h-4 text-brand-cyan shrink-0" />
            <span>Registro imutável reconciliado sob custódia Cure Capital.</span>
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
