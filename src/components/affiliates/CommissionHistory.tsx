import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ChevronRight, ArrowDownLeft, ShieldCheck, DollarSign } from 'lucide-react';
import { Commission, CommissionStatus } from '../../data/affiliateMock';
import { usePrivacyStore } from '../../store/privacyStore';
import { formatBRL } from '../../utils/formatters';

interface CommissionHistoryProps {
  commissions: Commission[];
  onSelectCommission: (c: Commission) => void;
}

export const CommissionHistory: React.FC<CommissionHistoryProps> = ({
  commissions,
  onSelectCommission,
}) => {
  const hideValues = usePrivacyStore((s) => s.hideValues);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = commissions.filter((c) => {
    if (filterStatus === 'all') return true;
    return c.status === filterStatus;
  });

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
    <Card variant="glass" radius="lg" className="p-5 sm:p-6 space-y-4">
      {/* Header com Filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-text-primary tracking-tight">
            Extrato de Comissões
          </h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Histórico detalhado de créditos apurados a partir da sua rede de indicações.
          </p>
        </div>

        {/* Filtro de Status */}
        <div className="flex items-center gap-1 bg-[#050D1A] p-1 rounded-xl border border-white/5 self-start sm:self-auto">
          {['all', 'available', 'pending', 'paid'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg capitalize transition-colors cursor-pointer ${
                filterStatus === st
                  ? 'bg-brand-blue text-white font-semibold'
                  : 'text-text-tertiary hover:text-text-primary'
              }`}
            >
              {st === 'all' ? 'Todas' : st === 'available' ? 'Disponíveis' : st === 'pending' ? 'Pendentes' : 'Liquidadas'}
            </button>
          ))}
        </div>
      </div>

      {/* Visualização Desktop (Tabela) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/5 text-text-tertiary font-mono uppercase text-[11px]">
              <th className="py-3 px-3">Data</th>
              <th className="py-3 px-3">Origem</th>
              <th className="py-3 px-3">Evento</th>
              <th className="py-3 px-3">Identificador</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right">Comissão</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((item) => (
              <tr
                key={item.id}
                onClick={() => onSelectCommission(item)}
                className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
              >
                <td className="py-3.5 px-3 font-mono text-text-secondary whitespace-nowrap">
                  {item.createdAt.split(' ')[0]}
                </td>
                <td className="py-3.5 px-3 font-semibold text-text-primary group-hover:text-brand-cyan transition-colors whitespace-nowrap">
                  {item.referralName}
                </td>
                <td className="py-3.5 px-3 text-text-secondary whitespace-nowrap">
                  {item.eventLabel}
                </td>
                <td className="py-3.5 px-3 font-mono text-text-tertiary select-all">
                  {item.id}
                </td>
                <td className="py-3.5 px-3 whitespace-nowrap">
                  {getStatusBadge(item.status)}
                </td>
                <td className="py-3.5 px-3 text-right font-mono font-bold text-positive text-sm tabular-numbers whitespace-nowrap">
                  {hideValues ? '+••••' : `+ ${formatBRL(item.amount)}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Visualização Mobile (Cards - Item 53) */}
      <div className="md:hidden space-y-2.5">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectCommission(item)}
            className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 active:bg-white/[0.05] transition-colors cursor-pointer space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-text-primary">
                  {item.referralName}
                </span>
                <span className="text-[10px] font-mono text-text-tertiary">
                  {item.createdAt.split(' ')[0]}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {getStatusBadge(item.status)}
                <ChevronRight className="w-4 h-4 text-text-tertiary" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5">
              <span className="text-text-secondary">{item.eventLabel}</span>
              <span className="font-mono font-bold text-positive text-sm tabular-numbers">
                {hideValues ? '+••••' : `+ ${formatBRL(item.amount)}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
