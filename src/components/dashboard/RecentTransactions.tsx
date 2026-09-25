import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ArrowLeftRight, ChevronRight } from 'lucide-react';
import { MOCK_TRANSACTIONS } from '../../data/mockData';
import { usePrivacyStore } from '../../store/privacyStore';

export const RecentTransactions: React.FC = () => {
  const navigate = useNavigate();
  const formatCurrency = usePrivacyStore(s => s.formatCurrency);
  const hideValues = usePrivacyStore(s => s.hideValues);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge variant="positive" size="sm">Concluído</Badge>;
      case 'processing':
        return <Badge variant="cyan" size="sm">Processado</Badge>;
      case 'pending':
        return <Badge variant="neutral" size="sm">Pendente</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{status}</Badge>;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'yield': return 'Rendimento';
      case 'deposit': return 'Aporte';
      case 'commission': return 'Comissão';
      case 'withdrawal': return 'Saque';
      case 'conversion': return 'Conversão';
      default: return type;
    }
  };

  const getAssetBadge = (asset: string) => {
    switch (asset) {
      case 'BTC':
        return <span className="font-mono text-xs font-semibold text-crypto-bitcoin">BTC</span>;
      case 'LTC':
        return <span className="font-mono text-xs font-semibold text-crypto-litecoin">LTC</span>;
      case 'BRL':
      default:
        return <span className="font-mono text-xs text-text-tertiary">BRL</span>;
    }
  };

  return (
    <Card variant="glass" radius="lg" className="p-0 overflow-hidden">
      {/* Header do Card */}
      <div className="p-4 sm:p-5 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ArrowLeftRight className="w-4 h-4 text-brand-blue" />
          <h3 className="text-sm font-semibold text-text-primary tracking-tight">
            Movimentações Recentes
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

      {/* Tabela Responsiva */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.01] text-[11px] text-text-tertiary font-mono uppercase tracking-wider">
              <th className="py-3 px-4 sm:px-6">Data</th>
              <th className="py-3 px-4">Tipo</th>
              <th className="py-3 px-4">Ativo</th>
              <th className="py-3 px-4 text-right">Valor</th>
              <th className="py-3 px-4 sm:px-6 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {MOCK_TRANSACTIONS.slice(0, 5).map((tx) => {
              const isPositive = tx.amountFiatBrl > 0 && tx.type !== 'deposit';
              const isNegative = tx.amountFiatBrl < 0;

              return (
                <tr 
                  key={tx.id}
                  className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                  onClick={() => navigate('/transactions')}
                >
                  {/* Data */}
                  <td className="py-3.5 px-4 sm:px-6 font-mono text-text-secondary whitespace-nowrap">
                    {tx.createdAt.split(' ')[0]}
                  </td>

                  {/* Tipo */}
                  <td className="py-3.5 px-4 font-medium text-text-primary whitespace-nowrap">
                    {getTypeLabel(tx.type)}
                  </td>

                  {/* Ativo */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    {getAssetBadge(tx.asset)}
                  </td>

                  {/* Valor */}
                  <td className="py-3.5 px-4 text-right font-mono font-medium whitespace-nowrap tabular-numbers">
                    <span className={isPositive ? 'text-positive' : isNegative ? 'text-negative' : 'text-text-primary'}>
                      {isPositive ? '+ ' : ''}
                      {formatCurrency(tx.amountFiatBrl)}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
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
