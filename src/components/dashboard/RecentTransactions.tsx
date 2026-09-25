import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ArrowLeftRight, ChevronRight, ArrowDownLeft, ArrowUpRight, Percent, Share2 } from 'lucide-react';
import { MOCK_TRANSACTIONS } from '../../data/mockData';
import { usePrivacyStore } from '../../store/privacyStore';
import { formatBRL } from '../../utils/formatters';
import { TransactionType } from '../../types';

export const RecentTransactions: React.FC = () => {
  const navigate = useNavigate();
  const hideValues = usePrivacyStore((s) => s.hideValues);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        // Verde suave (Item 33)
        return <Badge variant="positive" size="sm">Concluído</Badge>;
      case 'processing':
        // Azul (Item 33)
        return <Badge variant="info" size="sm">Processando</Badge>;
      case 'pending':
        // Amarelo suave (Item 33)
        return (
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-alert/10 text-alert border border-alert/20 font-medium">
            Pendente
          </span>
        );
      case 'cancelled':
      default:
        // Cinza suave (Item 33)
        return <Badge variant="neutral" size="sm">Cancelado</Badge>;
    }
  };

  const getTypeLabel = (type: TransactionType) => {
    switch (type) {
      case 'yield': return 'Rendimento';
      case 'deposit': return 'Aporte';
      case 'commission': return 'Comissão';
      case 'withdrawal': return 'Saque';
      case 'conversion': return 'Conversão';
      default: return type;
    }
  };

  const getTypeIcon = (type: TransactionType) => {
    switch (type) {
      case 'yield':
        return <Percent className="w-3.5 h-3.5 text-positive" />;
      case 'deposit':
        return <ArrowDownLeft className="w-3.5 h-3.5 text-brand-cyan" />;
      case 'withdrawal':
        return <ArrowUpRight className="w-3.5 h-3.5 text-text-tertiary" />;
      case 'commission':
        return <Share2 className="w-3.5 h-3.5 text-brand-blue" />;
      default:
        return <ArrowLeftRight className="w-3.5 h-3.5 text-text-secondary" />;
    }
  };

  return (
    <Card variant="glass" radius="lg" className="p-0 overflow-hidden">
      {/* Header do Card (Item 30) */}
      <div className="p-4 sm:p-5 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="w-4 h-4 text-brand-blue" />
          <h3 className="text-sm font-semibold text-text-primary tracking-tight">
            Movimentações recentes
          </h3>
        </div>
        <button
          onClick={() => navigate('/transactions')}
          className="text-xs text-brand-cyan hover:text-brand-blue-hover flex items-center gap-1 font-medium transition-colors cursor-pointer"
        >
          <span>Ver todas</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 1. VISUAL MOBILE: Cards / Lista compacta sem tabela pesada (Item 31) */}
      <div className="divide-y divide-white/[0.04] md:hidden">
        {MOCK_TRANSACTIONS.slice(0, 5).map((tx) => {
          const isPositive = tx.amountFiatBrl > 0 && tx.type !== 'deposit';
          const isNegative = tx.amountFiatBrl < 0;

          return (
            <div
              key={tx.id}
              onClick={() => navigate('/transactions')}
              className="p-4 flex items-center justify-between gap-3 active:bg-white/[0.02] cursor-pointer"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.05] shrink-0">
                  {getTypeIcon(tx.type)}
                </div>
                <div className="truncate">
                  <div className="font-semibold text-xs text-text-primary">
                    {getTypeLabel(tx.type)}
                  </div>
                  <div className="text-[11px] font-mono text-text-tertiary">
                    {tx.createdAt.split(' ')[0]} • {tx.asset}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className={`font-mono text-xs font-semibold tabular-nums ${isPositive ? 'text-positive' : isNegative ? 'text-text-primary' : 'text-text-primary'}`}>
                  {isPositive ? '+ ' : ''}
                  {formatBRL(tx.amountFiatBrl, hideValues)}
                </div>
                <div className="mt-0.5">
                  {getStatusBadge(tx.status)}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 2. VISUAL DESKTOP: Tabela Tradicional com 5 colunas (Item 32) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.01] text-[11px] text-text-tertiary font-mono uppercase tracking-wider">
              <th className="py-3 px-6">Operação</th>
              <th className="py-3 px-4">Data</th>
              <th className="py-3 px-4">Ativo</th>
              <th className="py-3 px-4 text-right">Valor</th>
              <th className="py-3 px-6 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {MOCK_TRANSACTIONS.slice(0, 5).map((tx) => {
              const isPositive = tx.amountFiatBrl > 0 && tx.type !== 'deposit';
              const isNegative = tx.amountFiatBrl < 0;

              return (
                <tr 
                  key={tx.id}
                  onClick={() => navigate('/transactions')}
                  className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                >
                  <td className="py-3.5 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/[0.04] text-text-secondary">
                        {getTypeIcon(tx.type)}
                      </div>
                      <span className="font-semibold text-text-primary">
                        {getTypeLabel(tx.type)}
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-text-secondary whitespace-nowrap">
                    {tx.createdAt.split(' ')[0]}
                  </td>

                  <td className="py-3.5 px-4 whitespace-nowrap font-mono font-medium">
                    <span className={tx.asset === 'BTC' ? 'text-crypto-bitcoin' : tx.asset === 'LTC' ? 'text-crypto-litecoin' : 'text-text-primary'}>
                      {tx.asset}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right font-mono font-medium whitespace-nowrap tabular-nums">
                    <span className={isPositive ? 'text-positive' : isNegative ? 'text-text-primary' : 'text-text-primary'}>
                      {isPositive ? '+ ' : ''}
                      {formatBRL(tx.amountFiatBrl, hideValues)}
                    </span>
                  </td>

                  <td className="py-3.5 px-6 text-right whitespace-nowrap">
                    {getStatusBadge(tx.status)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
