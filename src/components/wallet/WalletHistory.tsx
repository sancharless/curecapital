import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ArrowDownLeft, ArrowUpRight, Percent, ArrowLeftRight, Coins, ChevronRight } from 'lucide-react';
import { Transaction, TransactionType } from '../../types';
import { MOCK_TRANSACTIONS } from '../../data/mockData';
import { usePrivacyStore } from '../../store/privacyStore';
import { formatBRL } from '../../utils/formatters';
import { TransactionDetailDrawer } from './TransactionDetailDrawer';

type FilterType = 'all' | TransactionType;

export const WalletHistory: React.FC = () => {
  const hideValues = usePrivacyStore((s) => s.hideValues);

  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  const filterOptions: { label: string; value: FilterType }[] = [
    { label: 'Todas', value: 'all' },
    { label: 'Aportes', value: 'deposit' },
    { label: 'Saques', value: 'withdrawal' },
    { label: 'Rendimentos', value: 'yield' },
    { label: 'Conversões', value: 'conversion' },
    { label: 'Comissões', value: 'commission' },
  ];

  const filteredTransactions = MOCK_TRANSACTIONS.filter((tx) => {
    if (activeFilter === 'all') return true;
    return tx.type === activeFilter;
  });

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


  const getTypeIcon = (type: TransactionType) => {
    switch (type) {
      case 'deposit':
        return (
          <div className="w-8 h-8 rounded-lg bg-positive/10 text-positive flex items-center justify-center shrink-0">
            <ArrowDownLeft className="w-4 h-4" />
          </div>
        );
      case 'withdrawal':
        return (
          <div className="w-8 h-8 rounded-lg bg-white/10 text-text-secondary flex items-center justify-center shrink-0">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        );
      case 'yield':
        return (
          <div className="w-8 h-8 rounded-lg bg-brand-cyan/10 text-brand-cyan flex items-center justify-center shrink-0">
            <Percent className="w-4 h-4" />
          </div>
        );
      case 'conversion':
        return (
          <div className="w-8 h-8 rounded-lg bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0">
            <ArrowLeftRight className="w-4 h-4" />
          </div>
        );
      case 'commission':
        return (
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0">
            <Coins className="w-4 h-4" />
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 rounded-lg bg-white/5 text-text-tertiary flex items-center justify-center shrink-0">
            <ArrowLeftRight className="w-4 h-4" />
          </div>
        );
    }
  };

  return (
    <Card variant="glass" radius="lg" className="p-5 sm:p-6 space-y-4">
      {/* Header com Filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-text-primary tracking-tight">
            Movimentações Recentes
          </h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Histórico consolidado de transações, aportes e rendimentos.
          </p>
        </div>

        {/* Filtros em scroll horizontal */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => setActiveFilter(opt.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                activeFilter === opt.value
                  ? 'bg-brand-blue text-white font-semibold shadow-sm'
                  : 'bg-white/5 text-text-tertiary hover:text-text-primary hover:bg-white/10'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Visualização Desktop (Tabela Elegante) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/5 text-text-tertiary font-mono uppercase text-[11px]">
              <th className="py-3 px-3">Operação / Ativo</th>
              <th className="py-3 px-3">Identificador</th>
              <th className="py-3 px-3">Data</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right">Valor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredTransactions.map((tx) => (
              <tr
                key={tx.id}
                onClick={() => setSelectedTx(tx)}
                className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
              >
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-3">
                    {getTypeIcon(tx.type)}
                    <div>
                      <div className="font-semibold text-text-primary group-hover:text-brand-cyan transition-colors">
                        {tx.description}
                      </div>
                      <div className="text-[11px] font-mono text-text-tertiary">
                        {tx.asset} {tx.amount !== 0 && tx.asset !== 'BRL' ? `(${tx.amount > 0 ? `+${tx.amount}` : tx.amount})` : ''}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-3 font-mono text-text-secondary select-all">
                  {tx.reference}
                </td>
                <td className="py-3.5 px-3 font-mono text-text-tertiary">
                  {tx.createdAt}
                </td>
                <td className="py-3.5 px-3">
                  {getStatusBadge(tx.status)}
                </td>
                <td className="py-3.5 px-3 text-right">
                  <div
                    className={`font-mono font-bold text-sm tabular-numbers ${
                      tx.amountFiatBrl >= 0 ? 'text-positive' : 'text-text-primary'
                    }`}
                  >
                    {hideValues ? '••••••' : `${tx.amountFiatBrl >= 0 ? '+' : ''}${formatBRL(tx.amountFiatBrl)}`}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Visualização Mobile (Cards) */}
      <div className="md:hidden space-y-2.5">
        {filteredTransactions.map((tx) => (
          <div
            key={tx.id}
            onClick={() => setSelectedTx(tx)}
            className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 active:bg-white/[0.05] transition-colors cursor-pointer flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              {getTypeIcon(tx.type)}
              <div className="truncate">
                <div className="text-xs font-semibold text-text-primary truncate">
                  {tx.description}
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-[11px] font-mono text-text-tertiary">
                  <span>{tx.createdAt}</span>
                  <span>•</span>
                  <span className="truncate">{tx.reference}</span>
                </div>
              </div>
            </div>

            <div className="text-right shrink-0 flex items-center gap-2">
              <div>
                <div
                  className={`text-xs font-bold font-mono tabular-numbers ${
                    tx.amountFiatBrl >= 0 ? 'text-positive' : 'text-text-primary'
                  }`}
                >
                  {hideValues ? '••••••' : `${tx.amountFiatBrl >= 0 ? '+' : ''}${formatBRL(tx.amountFiatBrl)}`}
                </div>
                <div className="mt-0.5">{getStatusBadge(tx.status)}</div>
              </div>
              <ChevronRight className="w-4 h-4 text-text-tertiary" />
            </div>
          </div>
        ))}
      </div>

      {/* Drawer de Detalhes */}
      <TransactionDetailDrawer
        transaction={selectedTx}
        isOpen={Boolean(selectedTx)}
        onClose={() => setSelectedTx(null)}
      />
    </Card>
  );
};
