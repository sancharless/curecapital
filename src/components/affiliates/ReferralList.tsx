import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Search, ChevronRight, UserCheck, ShieldCheck, ArrowUpDown, Filter } from 'lucide-react';
import { Referral, ReferralStatus } from '../../data/affiliateMock';
import { usePrivacyStore } from '../../store/privacyStore';
import { formatBRL } from '../../utils/formatters';

interface ReferralListProps {
  referrals: Referral[];
  totalCount: number;
  hasMore: boolean;
  onLoadMore: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  statusFilter: 'all' | ReferralStatus;
  onStatusFilterChange: (s: 'all' | ReferralStatus) => void;
  sortBy: 'recent' | 'volume' | 'commission';
  onSortChange: (s: 'recent' | 'volume' | 'commission') => void;
  onSelectReferral: (ref: Referral) => void;
}

export const ReferralList: React.FC<ReferralListProps> = ({
  referrals,
  totalCount,
  hasMore,
  onLoadMore,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortChange,
  onSelectReferral,
}) => {
  const hideValues = usePrivacyStore((s) => s.hideValues);

  const filterOptions: { label: string; value: 'all' | ReferralStatus }[] = [
    { label: 'Todos', value: 'all' },
    { label: 'Cadastrados', value: 'registered' },
    { label: 'Verificados', value: 'verified' },
    { label: 'Ativos', value: 'active' },
    { label: 'Pendentes', value: 'pending' },
  ];

  const getStatusBadge = (status: ReferralStatus) => {
    switch (status) {
      case 'active':
        return <Badge variant="positive" size="sm">Ativo</Badge>;
      case 'verified':
        return <Badge variant="cyan" size="sm">Verificado</Badge>;
      case 'registered':
        return <Badge variant="info" size="sm">Cadastrado</Badge>;
      case 'pending':
        return <Badge variant="neutral" size="sm">Pendente</Badge>;
      case 'inactive':
        return <Badge variant="neutral" size="sm">Inativo</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{status}</Badge>;
    }
  };

  return (
    <Card variant="glass" radius="lg" className="p-5 sm:p-6 space-y-4">
      {/* Header com Título e Totalizador */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-text-primary tracking-tight">
            Indicados
          </h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Acompanhe cada investidor vinculado e seu status de custódia.
          </p>
        </div>

        <Badge variant="cyan" size="sm">
          {totalCount} indicados encontrados
        </Badge>
      </div>

      {/* Barra de Busca e Filtros */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-1">
        {/* Campo de Busca (Item 56) */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-text-tertiary absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar indicado..."
            className="w-full pl-9 pr-4 py-2 bg-[#050D1A] border border-white/10 rounded-xl text-xs text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-brand-blue/60"
            style={{ fontSize: '16px' }}
          />
        </div>

        {/* Controles de Ordenação e Filtros de Status (Itens 57 & 59) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {/* Status Tabs */}
          <div className="flex items-center gap-1 bg-[#050D1A] p-1 rounded-xl border border-white/5">
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => onStatusFilterChange(opt.value)}
                className={`px-2.5 py-1 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  statusFilter === opt.value
                    ? 'bg-brand-blue text-white font-semibold shadow-sm'
                    : 'text-text-tertiary hover:text-text-primary'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Seletor de Ordenação */}
          <div className="flex items-center gap-1.5 bg-[#050D1A] px-2.5 py-1.5 rounded-xl border border-white/5 text-xs text-text-tertiary shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-brand-cyan" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as any)}
              className="bg-transparent text-text-primary focus:outline-none cursor-pointer text-xs"
            >
              <option value="recent" className="bg-[#081325]">Mais recentes</option>
              <option value="volume" className="bg-[#081325]">Maior volume</option>
              <option value="commission" className="bg-[#081325]">Maior comissão</option>
            </select>
          </div>
        </div>
      </div>

      {/* Visualização Desktop (Tabela Elegante) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-white/5 text-text-tertiary font-mono uppercase text-[11px]">
              <th className="py-3 px-3">Usuário</th>
              <th className="py-3 px-3">Data de Cadastro</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3">Verificação</th>
              <th className="py-3 px-3 text-right">Volume Relacionado</th>
              <th className="py-3 px-3 text-right">Comissão Gerada</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {referrals.map((ref) => (
              <tr
                key={ref.id}
                onClick={() => onSelectReferral(ref)}
                className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
              >
                <td className="py-3.5 px-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-brand-blue/20 text-brand-cyan font-bold text-xs flex items-center justify-center shrink-0">
                      {ref.displayName.charAt(0)}
                    </div>
                    <span className="font-semibold text-text-primary group-hover:text-brand-cyan transition-colors">
                      {ref.displayName}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-3 font-mono text-text-secondary">
                  {ref.joinedAt}
                </td>
                <td className="py-3.5 px-3">
                  {getStatusBadge(ref.status)}
                </td>
                <td className="py-3.5 px-3">
                  {ref.verifiedAt ? (
                    <span className="text-brand-cyan font-medium flex items-center gap-1 text-[11px]">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      Concluída
                    </span>
                  ) : (
                    <span className="text-text-tertiary text-[11px]">Pendente</span>
                  )}
                </td>
                <td className="py-3.5 px-3 text-right font-mono font-bold text-text-primary tabular-numbers">
                  {hideValues ? '••••••' : formatBRL(ref.eligibleVolume)}
                </td>
                <td className="py-3.5 px-3 text-right font-mono font-bold text-positive tabular-numbers">
                  {hideValues ? '+••••' : `+ ${formatBRL(ref.generatedCommission)}`}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Visualização Mobile (Cards - Item 52) */}
      <div className="md:hidden space-y-2.5">
        {referrals.map((ref) => (
          <div
            key={ref.id}
            onClick={() => onSelectReferral(ref)}
            className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 active:bg-white/[0.05] transition-colors cursor-pointer space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-full bg-brand-blue/20 text-brand-cyan font-bold text-xs flex items-center justify-center">
                  {ref.displayName.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-semibold text-text-primary">
                    {ref.displayName}
                  </div>
                  <div className="text-[10px] font-mono text-text-tertiary">
                    Cadastro: {ref.joinedAt}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {getStatusBadge(ref.status)}
                <ChevronRight className="w-4 h-4 text-text-tertiary" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1.5 border-t border-white/5">
              <div>
                <span className="text-[10px] font-mono text-text-tertiary block">Volume:</span>
                <span className="font-mono font-bold text-text-primary tabular-numbers">
                  {hideValues ? '••••••' : formatBRL(ref.eligibleVolume)}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-text-tertiary block">Comissão:</span>
                <span className="font-mono font-bold text-positive tabular-numbers">
                  {hideValues ? '+••••' : `+ ${formatBRL(ref.generatedCommission)}`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Paginação / Carregar Mais (Item 60) */}
      {hasMore && (
        <div className="pt-2 text-center">
          <Button
            variant="outline"
            size="sm"
            onClick={onLoadMore}
            className="bg-white/5 border-white/10 hover:bg-white/10"
          >
            Carregar mais indicados
          </Button>
        </div>
      )}
    </Card>
  );
};
