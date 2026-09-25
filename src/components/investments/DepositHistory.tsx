import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { ArrowDownLeft, PlusCircle, CheckCircle2, ChevronRight } from 'lucide-react';
import { MOCK_CONTRIBUTIONS } from '../../data/mockData';
import { usePrivacyStore } from '../../store/privacyStore';
import { formatBRL } from '../../utils/formatters';
import { ContributionModal } from '../finance/ContributionModal';

export const DepositHistory: React.FC = () => {
  const hideValues = usePrivacyStore((s) => s.hideValues);
  const [isDepositOpen, setIsDepositOpen] = useState(false);

  return (
    <>
      <Card variant="glass" radius="lg" className="p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-text-primary tracking-tight">
              Histórico de Aportes
            </h3>
            <p className="text-xs text-text-secondary mt-0.5">
              Registros e liquidações de aportes de capital sob gestão.
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            leftIcon={<PlusCircle className="w-3.5 h-3.5" />}
            onClick={() => setIsDepositOpen(true)}
          >
            Novo aporte
          </Button>

        </div>

        {/* Tabela Desktop */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/5 text-text-tertiary font-mono uppercase text-[11px]">
                <th className="py-3 px-3">Data</th>
                <th className="py-3 px-3">Ativo</th>
                <th className="py-3 px-3">Identificador</th>
                <th className="py-3 px-3">Quantidade</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Valor Aportado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MOCK_CONTRIBUTIONS.map((dep) => (
                <tr key={dep.id} className="hover:bg-white/[0.03] transition-colors">
                  <td className="py-3.5 px-3 font-mono text-text-secondary">
                    {dep.date}
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: dep.asset === 'BTC' ? '#F5A623' : '#38BDF8' }}
                      />
                      <span className="font-bold text-text-primary">
                        {dep.asset === 'BTC' ? 'Bitcoin' : 'Litecoin'} ({dep.asset})
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-text-tertiary select-all">
                    {dep.reference}
                  </td>
                  <td className="py-3.5 px-3 font-mono font-bold text-brand-cyan">
                    {dep.amountCrypto} {dep.asset}
                  </td>
                  <td className="py-3.5 px-3">
                    <Badge variant="positive" size="sm" icon={<CheckCircle2 className="w-3 h-3" />}>
                      Concluído
                    </Badge>
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono font-bold text-sm text-text-primary tabular-numbers">
                    {hideValues ? '••••••' : formatBRL(dep.amountFiat)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Cards Mobile */}
        <div className="md:hidden space-y-2.5">
          {MOCK_CONTRIBUTIONS.map((dep) => (
            <div
              key={dep.id}
              className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: dep.asset === 'BTC' ? '#F5A623' : '#38BDF8' }}
                  />
                  <span className="text-xs font-bold text-text-primary">
                    {dep.asset === 'BTC' ? 'Bitcoin' : 'Litecoin'}
                  </span>
                  <span className="text-[10px] font-mono text-text-tertiary">
                    {dep.date}
                  </span>
                </div>
                <Badge variant="positive" size="sm">Concluído</Badge>
              </div>

              <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5">
                <div>
                  <span className="text-[10px] font-mono text-text-tertiary block">Quantidade:</span>
                  <span className="font-mono font-bold text-brand-cyan">
                    {dep.amountCrypto} {dep.asset}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-text-tertiary block">Valor Aportado:</span>
                  <span className="font-mono font-bold text-sm text-text-primary tabular-numbers">
                    {hideValues ? '••••••' : formatBRL(dep.amountFiat)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <ContributionModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
      />
    </>
  );
};
