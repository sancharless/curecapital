import React from 'react';
import { Card } from '../ui/Card';
import { ShieldCheck, Users, ArrowDownLeft, ArrowUpRight, Percent, Coins, Share2 } from 'lucide-react';
import { MOCK_ADMIN_METRICS } from '../../data/mockData';
import { usePrivacyStore } from '../../store/privacyStore';

export const AdminMetrics: React.FC = () => {
  const formatCurrency = usePrivacyStore(s => s.formatCurrency);

  const kpis = [
    {
      label: 'Patrimônio sob Gestão (AuM)',
      value: formatCurrency(MOCK_ADMIN_METRICS.aumBrl),
      subtext: '+12.4% no último trimestre',
      icon: <ShieldCheck className="w-5 h-5 text-brand-cyan" />,
      highlight: true,
      color: 'text-brand-cyan',
    },
    {
      label: 'Usuários Ativos / Total',
      value: `${MOCK_ADMIN_METRICS.activeUsers} / ${MOCK_ADMIN_METRICS.totalUsers}`,
      subtext: '59,3% taxa de engajamento',
      icon: <Users className="w-5 h-5 text-brand-blue" />,
      color: 'text-text-primary',
    },
    {
      label: 'Aportes Totais (Inflow)',
      value: formatCurrency(MOCK_ADMIN_METRICS.totalDepositsBrl),
      subtext: 'Volume total aportado',
      icon: <ArrowDownLeft className="w-5 h-5 text-positive" />,
      color: 'text-positive',
    },
    {
      label: 'Saques Liquidados (Outflow)',
      value: formatCurrency(MOCK_ADMIN_METRICS.totalWithdrawalsBrl),
      subtext: 'Resgates autorizados',
      icon: <ArrowUpRight className="w-5 h-5 text-text-tertiary" />,
      color: 'text-text-secondary',
    },
    {
      label: 'Rendimentos Distribuídos',
      value: formatCurrency(MOCK_ADMIN_METRICS.distributedYieldsBrl),
      subtext: 'Lucro líquido aos clientes',
      icon: <Percent className="w-5 h-5 text-positive" />,
      color: 'text-positive',
    },
    {
      label: 'Volume BTC sob Custódia',
      value: `${MOCK_ADMIN_METRICS.btcVolume.toFixed(2)} BTC`,
      subtext: 'Segregação multifirmada',
      icon: <Coins className="w-5 h-5 text-crypto-bitcoin" />,
      color: 'text-crypto-bitcoin',
    },
    {
      label: 'Volume LTC sob Custódia',
      value: `${MOCK_ADMIN_METRICS.ltcVolume.toLocaleString('pt-BR')} LTC`,
      subtext: 'Liquidez instantânea',
      icon: <Coins className="w-5 h-5 text-crypto-litecoin" />,
      color: 'text-crypto-litecoin',
    },
    {
      label: 'Total de Comissões Pagas',
      value: formatCurrency(MOCK_ADMIN_METRICS.totalCommissionsBrl),
      subtext: 'Rede de afiliados',
      icon: <Share2 className="w-5 h-5 text-brand-blue" />,
      color: 'text-text-primary',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi) => (
        <Card 
          key={kpi.label} 
          variant={kpi.highlight ? 'elevated' : 'glass'} 
          radius="md"
          glow={kpi.highlight ? 'blue' : 'none'}
          className="p-5 flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-text-secondary truncate">{kpi.label}</span>
            <div className="p-2 rounded-xl bg-white/[0.04]">
              {kpi.icon}
            </div>
          </div>
          <div>
            <div className={`text-xl font-bold font-mono tabular-numbers ${kpi.color}`}>
              {kpi.value}
            </div>
            <div className="text-[11px] text-text-tertiary mt-1">
              {kpi.subtext}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
