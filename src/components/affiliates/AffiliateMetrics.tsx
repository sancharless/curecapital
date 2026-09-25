import React from 'react';
import { Card } from '../ui/Card';
import { MousePointerClick, UserPlus, ShieldCheck, UserCheck, Percent, TrendingUp, DollarSign } from 'lucide-react';
import { usePrivacyStore } from '../../store/privacyStore';
import { formatBRL } from '../../utils/formatters';

interface AffiliateMetricsProps {
  clicks: number;
  registrations: number;
  verified: number;
  active: number;
  registrationRate: number;
  verificationRate: number;
  activationRate: number;
  accumulatedCommissions: number;
}

export const AffiliateMetrics: React.FC<AffiliateMetricsProps> = ({
  clicks,
  registrations,
  verified,
  active,
  registrationRate,
  verificationRate,
  activationRate,
  accumulatedCommissions,
}) => {
  const hideValues = usePrivacyStore((s) => s.hideValues);

  return (
    <div className="space-y-4">
      {/* 1. Primeira Linha: Volume do Funil (Cliques, Cadastros, Verificados, Ativos) */}
      <div>
        <span className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider block mb-2">
          Métricas de Engajamento
        </span>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Cliques */}
          <Card variant="glass" radius="md" className="p-4 space-y-2 bg-[#091527]/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-text-secondary">Cliques</span>
              <div className="p-1.5 rounded-lg bg-brand-blue/10 text-brand-blue-hover">
                <MousePointerClick className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-text-primary tabular-numbers">
              {clicks}
            </div>
            <span className="text-[10px] text-text-tertiary block">
              Acessos ao seu link
            </span>
          </Card>

          {/* Cadastros */}
          <Card variant="glass" radius="md" className="p-4 space-y-2 bg-[#091527]/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-text-secondary">Cadastros</span>
              <div className="p-1.5 rounded-lg bg-brand-cyan/10 text-brand-cyan">
                <UserPlus className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-text-primary tabular-numbers">
              {registrations}
            </div>
            <span className="text-[10px] text-text-tertiary block">
              Contas criadas
            </span>
          </Card>

          {/* Verificados */}
          <Card variant="glass" radius="md" className="p-4 space-y-2 bg-[#091527]/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-text-secondary">Verificados</span>
              <div className="p-1.5 rounded-lg bg-brand-cyan/15 text-brand-cyan">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-brand-cyan tabular-numbers">
              {verified}
            </div>
            <span className="text-[10px] text-text-tertiary block">
              Identidade validada
            </span>
          </Card>

          {/* Ativos */}
          <Card variant="glass" radius="md" className="p-4 space-y-2 bg-[#091527]/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-text-secondary">Ativos</span>
              <div className="p-1.5 rounded-lg bg-positive/10 text-positive">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-bold font-mono text-positive tabular-numbers">
              {active}
            </div>
            <span className="text-[10px] text-positive/80 block">
              Com posição em custódia
            </span>
          </Card>
        </div>
      </div>

      {/* 2. Segunda Linha: Taxas de Conversão & Comissões (Item 13) */}
      <div>
        <span className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider block mb-2">
          Taxas de Conversão e Resultado
        </span>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Taxa de cadastro */}
          <Card variant="glass" radius="md" className="p-4 space-y-1 bg-[#091527]/80">
            <span className="text-[11px] font-mono text-text-tertiary uppercase block">
              Taxa de cadastro
            </span>
            <div className="text-lg sm:text-xl font-bold font-mono text-text-primary tabular-numbers">
              {registrationRate}%
            </div>
            <span className="text-[10px] text-text-tertiary block">
              Cadastros sobre cliques
            </span>
          </Card>

          {/* Taxa de verificação */}
          <Card variant="glass" radius="md" className="p-4 space-y-1 bg-[#091527]/80">
            <span className="text-[11px] font-mono text-text-tertiary uppercase block">
              Taxa de verificação
            </span>
            <div className="text-lg sm:text-xl font-bold font-mono text-brand-cyan tabular-numbers">
              {verificationRate}%
            </div>
            <span className="text-[10px] text-text-tertiary block">
              Validados sobre cadastros
            </span>
          </Card>

          {/* Taxa de ativação */}
          <Card variant="glass" radius="md" className="p-4 space-y-1 bg-[#091527]/80">
            <span className="text-[11px] font-mono text-text-tertiary uppercase block">
              Taxa de ativação
            </span>
            <div className="text-lg sm:text-xl font-bold font-mono text-positive tabular-numbers">
              {activationRate}%
            </div>
            <span className="text-[10px] text-positive/80 block">
              Ativos sobre verificados
            </span>
          </Card>

          {/* Comissões acumuladas */}
          <Card variant="glass" radius="md" className="p-4 space-y-1 bg-[#091527]/80 border-brand-blue/20">
            <span className="text-[11px] font-mono text-text-tertiary uppercase block">
              Comissões acumuladas
            </span>
            <div className="text-lg sm:text-xl font-bold font-mono text-positive tabular-numbers">
              {hideValues ? 'R$ •••••' : formatBRL(accumulatedCommissions)}
            </div>
            <span className="text-[10px] text-brand-cyan block">
              Apurado no programa
            </span>
          </Card>
        </div>
      </div>
    </div>
  );
};
