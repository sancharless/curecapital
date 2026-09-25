import React, { useState, useMemo } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Tabs } from '../components/ui/Tabs';
import { Search, Download, Calendar, Filter, ArrowUpRight, ArrowDownLeft, ArrowLeftRight } from 'lucide-react';
import { MOCK_TRANSACTIONS } from '../data/mockData';
import { usePrivacyStore } from '../store/privacyStore';
import { TransactionType } from '../types';

export const Transactions: React.FC = () => {
  const formatCurrency = usePrivacyStore(s => s.formatCurrency);
  const [selectedTab, setSelectedTab] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [periodFilter, setPeriodFilter] = useState<'all' | '30d' | '90d'>('all');
  const [isExporting, setIsExporting] = useState(false);

  const tabs = [
    { id: 'all', label: 'Todas' },
    { id: 'deposit', label: 'Aportes' },
    { id: 'withdrawal', label: 'Saques' },
    { id: 'yield', label: 'Rendimentos' },
    { id: 'commission', label: 'Comissões' },
  ];

  // Filtros combinados
  const filteredTransactions = useMemo(() => {
    return MOCK_TRANSACTIONS.filter((tx) => {
      // Filtro de Aba
      if (selectedTab !== 'all' && tx.type !== selectedTab) {
        return false;
      }
      // Filtro de Busca
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesRef = tx.reference.toLowerCase().includes(query);
        const matchesDesc = tx.description.toLowerCase().includes(query);
        const matchesAsset = tx.asset.toLowerCase().includes(query);
        if (!matchesRef && !matchesDesc && !matchesAsset) return false;
      }
      return true;
    });
  }, [selectedTab, searchQuery]);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Relatório de Ledger / Extrato exportado com sucesso no formato CSV.');
    }, 1000);
  };

  const getTypeIcon = (type: TransactionType) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="w-3.5 h-3.5 text-positive" />;
      case 'withdrawal':
        return <ArrowUpRight className="w-3.5 h-3.5 text-negative" />;
      case 'yield':
        return <ArrowLeftRight className="w-3.5 h-3.5 text-brand-cyan" />;
      case 'commission':
        return <ArrowDownLeft className="w-3.5 h-3.5 text-brand-blue" />;
      default:
        return <ArrowLeftRight className="w-3.5 h-3.5 text-text-tertiary" />;
    }
  };

  const getTypeLabel = (type: TransactionType) => {
    switch (type) {
      case 'deposit': return 'Aporte';
      case 'withdrawal': return 'Saque';
      case 'yield': return 'Rendimento';
      case 'commission': return 'Comissão';
      case 'conversion': return 'Conversão';
      default: return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header com Ações */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
            Transações & Ledger
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Registro contábil imutável de todas as movimentações de custódia e rendimentos.
          </p>
        </div>

        <Button
          variant="secondary"
          size="md"
          leftIcon={<Download className="w-4 h-4 text-brand-cyan" />}
          onClick={handleExport}
          isLoading={isExporting}
        >
          Exportar Extrato
        </Button>
      </div>

      {/* Barra de Filtros, Pesquisa e Período */}
      <Card variant="glass" radius="lg" className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Abas de Categorias */}
          <Tabs
            items={tabs}
            activeId={selectedTab}
            onChange={setSelectedTab}
            size="sm"
          />

          {/* Busca e Período */}
          <div className="flex items-center gap-3">
            <div className="w-full sm:w-64">
              <Input
                placeholder="Buscar por código ou descrição..."
                leftIcon={<Search className="w-4 h-4" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="py-1.5 min-h-[38px] text-xs"
              />
            </div>

            <div className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-text-secondary">
              <Calendar className="w-3.5 h-3.5 text-text-tertiary" />
              <span>Setembro 2026</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabela de Transações */}
      <Card variant="glass" radius="lg" className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/[0.06] bg-white/[0.01] text-[11px] text-text-tertiary font-mono uppercase tracking-wider">
                <th className="py-3 px-4 sm:px-6">Data / Hora</th>
                <th className="py-3 px-4">Tipo</th>
                <th className="py-3 px-4">Referência / Descrição</th>
                <th className="py-3 px-4">Ativo</th>
                <th className="py-3 px-4 text-right">Valor em Moeda</th>
                <th className="py-3 px-4 sm:px-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-text-tertiary text-xs">
                    Nenhuma movimentação encontrada para os filtros selecionados.
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => {
                  const isPositive = tx.amountFiatBrl > 0 && tx.type !== 'deposit';
                  const isNegative = tx.amountFiatBrl < 0;

                  return (
                    <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
                      <td className="py-4 px-4 sm:px-6 font-mono text-text-secondary whitespace-nowrap">
                        {tx.createdAt}
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5 font-medium text-text-primary">
                          {getTypeIcon(tx.type)}
                          <span>{getTypeLabel(tx.type)}</span>
                        </div>
                      </td>

                      <td className="py-4 px-4 max-w-xs">
                        <div className="font-mono text-[11px] text-brand-cyan">{tx.reference}</div>
                        <div className="text-text-tertiary truncate text-[11px]">{tx.description}</div>
                      </td>

                      <td className="py-4 px-4 whitespace-nowrap font-mono font-medium">
                        <span className={tx.asset === 'BTC' ? 'text-crypto-bitcoin' : tx.asset === 'LTC' ? 'text-crypto-litecoin' : 'text-text-primary'}>
                          {tx.amount > 0 ? tx.amount : Math.abs(tx.amount)} {tx.asset}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right font-mono font-medium whitespace-nowrap tabular-numbers">
                        <span className={isPositive ? 'text-positive' : isNegative ? 'text-negative' : 'text-text-primary'}>
                          {isPositive ? '+ ' : ''}
                          {formatCurrency(tx.amountFiatBrl)}
                        </span>
                      </td>

                      <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                        <Badge 
                          variant={tx.status === 'completed' ? 'positive' : tx.status === 'processing' ? 'cyan' : 'neutral'} 
                          size="sm"
                        >
                          {tx.status === 'completed' ? 'Concluído' : tx.status === 'processing' ? 'Processado' : 'Pendente'}
                        </Badge>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
