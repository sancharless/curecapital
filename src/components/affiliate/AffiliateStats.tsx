import React from 'react';
import { Card } from '../ui/Card';
import { Users, UserCheck, DollarSign, Share2 } from 'lucide-react';
import { MOCK_AFFILIATE_STATS } from '../../data/mockData';
import { usePrivacyStore } from '../../store/privacyStore';

export const AffiliateStats: React.FC = () => {
  const formatCurrency = usePrivacyStore(s => s.formatCurrency);

  const stats = [
    {
      label: 'Total Indicado',
      value: formatCurrency(MOCK_AFFILIATE_STATS.totalReferredAmountBrl),
      sub: 'Volume alocado pela sua rede',
      icon: <DollarSign className="w-4 h-4 text-brand-cyan" />,
      color: 'text-text-primary',
    },
    {
      label: 'Afiliados Registrados',
      value: MOCK_AFFILIATE_STATS.totalAffiliatesCount.toString(),
      sub: 'Cadastros com seu código',
      icon: <Users className="w-4 h-4 text-text-secondary" />,
      color: 'text-text-primary',
    },
    {
      label: 'Afiliados Ativos',
      value: MOCK_AFFILIATE_STATS.activeAffiliatesCount.toString(),
      sub: 'Com alocação ativa',
      icon: <UserCheck className="w-4 h-4 text-positive" />,
      color: 'text-positive',
    },
    {
      label: 'Comissões Recebidas',
      value: formatCurrency(MOCK_AFFILIATE_STATS.totalCommissionsBrl),
      sub: 'Total creditado em conta',
      icon: <Share2 className="w-4 h-4 text-brand-blue" />,
      color: 'text-brand-cyan',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
      {stats.map((s) => (
        <Card key={s.label} variant="glass" radius="md" className="p-4 sm:p-5 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-text-secondary">{s.label}</span>
            <div className="p-1.5 rounded-lg bg-white/[0.04]">
              {s.icon}
            </div>
          </div>
          <div>
            <div className={`text-lg sm:text-xl font-bold font-mono tabular-numbers ${s.color}`}>
              {s.value}
            </div>
            <div className="text-[10px] text-text-tertiary mt-0.5">
              {s.sub}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
