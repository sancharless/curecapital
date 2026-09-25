import React from 'react';
import { Card } from '../ui/Card';
import { Users, UserCheck, DollarSign, Award, ArrowUpRight } from 'lucide-react';
import { usePrivacyStore } from '../../store/privacyStore';
import { formatBRL } from '../../utils/formatters';

interface AffiliateHeroProps {
  totalReferrals: number;
  activeReferrals: number;
  accumulatedCommissions: number;
}

export const AffiliateHero: React.FC<AffiliateHeroProps> = ({
  totalReferrals,
  activeReferrals,
  accumulatedCommissions,
}) => {
  const hideValues = usePrivacyStore((s) => s.hideValues);

  return (
    <Card
      variant="interactive"
      radius="lg"
      className="relative overflow-hidden bg-gradient-to-br from-[#0c1c36] via-[#091527] to-[#050D1A] border-white/10 p-5 sm:p-7 shadow-[0_8px_32px_rgba(0,0,0,0.36)]"
    >
      {/* Glow de fundo azul/cyan financeiro (sem verde excessivo) */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-brand-blue/15 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-brand-cyan/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Bloco de Título & Subtexto */}
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-brand-blue/20 text-brand-cyan border border-brand-blue/30">
              Programa de Indicação
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-text-primary tracking-tight">
            Programa de Indicação
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
            Compartilhe seu convite e acompanhe a evolução das suas indicações com transparência e liquidação estruturada.
          </p>
        </div>

        {/* Bloco de 3 Indicadores Chave (Item 5) */}
        <div className="grid grid-cols-3 gap-3 sm:gap-6 bg-white/[0.03] p-4 sm:p-5 rounded-2xl border border-white/5">
          {/* Total de Indicados */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-text-tertiary">
              <Users className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
              <span className="text-[11px] font-mono uppercase tracking-wider truncate">
                Total de indicados
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-text-primary tabular-numbers">
              {totalReferrals}
            </div>
            <span className="text-[10px] text-text-tertiary hidden sm:block">
              Cadastros vinculados
            </span>
          </div>

          {/* Ativos */}
          <div className="space-y-1 border-l border-white/10 pl-3 sm:pl-6">
            <div className="flex items-center gap-1.5 text-text-tertiary">
              <UserCheck className="w-3.5 h-3.5 text-positive shrink-0" />
              <span className="text-[11px] font-mono uppercase tracking-wider truncate">
                Ativos
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-positive tabular-numbers">
              {activeReferrals}
            </div>
            <span className="text-[10px] text-positive/80 hidden sm:block">
              Com custódia ativa
            </span>
          </div>

          {/* Comissões Acumuladas */}
          <div className="space-y-1 border-l border-white/10 pl-3 sm:pl-6">
            <div className="flex items-center gap-1.5 text-text-tertiary">
              <DollarSign className="w-3.5 h-3.5 text-brand-blue-hover shrink-0" />
              <span className="text-[11px] font-mono uppercase tracking-wider truncate">
                Comissões
              </span>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-text-primary tabular-numbers">
              {hideValues ? 'R$ •••••' : formatBRL(accumulatedCommissions)}
            </div>
            <span className="text-[10px] text-brand-cyan hidden sm:block">
              Total acumulado
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
