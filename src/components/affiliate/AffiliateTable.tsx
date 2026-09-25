import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { MOCK_AFFILIATE_REFERRALS } from '../../data/mockData';
import { usePrivacyStore } from '../../store/privacyStore';

export const AffiliateTable: React.FC = () => {
  const formatCurrency = usePrivacyStore(s => s.formatCurrency);

  return (
    <Card variant="glass" radius="lg" className="p-0 overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-white/[0.06] flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-text-primary tracking-tight">
            Histórico de Comissões de Afiliados
          </h3>
          <p className="text-xs text-text-tertiary">
            Eventos apurados sobre depósitos e custódia da sua rede de indicações
          </p>
        </div>
        <Badge variant="cyan" size="sm">
          {MOCK_AFFILIATE_REFERRALS.length} registros
        </Badge>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.01] text-[11px] text-text-tertiary font-mono uppercase tracking-wider">
              <th className="py-3 px-4 sm:px-6">Usuário Indicado</th>
              <th className="py-3 px-4">Data</th>
              <th className="py-3 px-4">Evento</th>
              <th className="py-3 px-4 text-right">Comissão</th>
              <th className="py-3 px-4 sm:px-6 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {MOCK_AFFILIATE_REFERRALS.map((ref) => (
              <tr key={ref.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-4 sm:px-6 whitespace-nowrap">
                  <div className="font-medium text-text-primary">{ref.userName}</div>
                  <div className="text-[11px] font-mono text-text-tertiary">{ref.userEmailMasked}</div>
                </td>
                <td className="py-3.5 px-4 font-mono text-text-secondary whitespace-nowrap">
                  {ref.joinedAt}
                </td>
                <td className="py-3.5 px-4 text-text-secondary whitespace-nowrap">
                  {ref.event}
                </td>
                <td className="py-3.5 px-4 text-right font-mono font-medium text-positive whitespace-nowrap tabular-numbers">
                  + {formatCurrency(ref.commissionBrl)}
                </td>
                <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                  <Badge variant={ref.status === 'completed' ? 'positive' : 'neutral'} size="sm">
                    {ref.status === 'completed' ? 'Concluído' : 'Pendente'}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
