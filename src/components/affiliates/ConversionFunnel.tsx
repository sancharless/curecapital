import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Filter, Info } from 'lucide-react';

interface ConversionFunnelProps {
  clicks: number;
  registrations: number;
  verified: number;
  active: number;
}

export const ConversionFunnel: React.FC<ConversionFunnelProps> = ({
  clicks,
  registrations,
  verified,
  active,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Cálculos dinâmicos
  const regPercent = clicks > 0 ? ((registrations / clicks) * 100).toFixed(1) : '0';
  const verPercent = registrations > 0 ? ((verified / registrations) * 100).toFixed(1) : '0';
  const actPercent = verified > 0 ? ((active / verified) * 100).toFixed(1) : '0';

  const stages = [
    {
      name: 'Cliques',
      count: clicks,
      percentLabel: '100% da audiência',
      tooltip: `${clicks} cliques únicos no seu link de indicação`,
      color: '#2563EB',
      width: '100%',
    },
    {
      name: 'Cadastros',
      count: registrations,
      percentLabel: `${regPercent}% dos cliques`,
      tooltip: `${registrations} cadastros efetuados (${regPercent}% de conversão)`,
      color: '#3B82F6',
      width: `${Math.max(20, (registrations / clicks) * 100)}%`,
    },
    {
      name: 'Verificados',
      count: verified,
      percentLabel: `${verPercent}% dos cadastros`,
      tooltip: `${verified} identidades verificadas com conformidade institucional`,
      color: '#36C5F0',
      width: `${Math.max(16, (verified / clicks) * 100)}%`,
    },
    {
      name: 'Ativos',
      count: active,
      percentLabel: `${actPercent}% dos verificados`,
      tooltip: `${active} investidores com alocação patrimonial ativa (${actPercent}% de ativação)`,
      color: '#19C37D', // Verde apenas no estágio final ativo (Item 17)
      width: `${Math.max(12, (active / clicks) * 100)}%`,
    },
  ];

  return (
    <Card variant="glass" radius="lg" className="p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-brand-cyan" />
            <h3 className="text-base font-bold text-text-primary tracking-tight">
              Funil de Conversão
            </h3>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            Eficiência da esteira desde o clique inicial até a alocação de capital.
          </p>
        </div>
        <span className="text-xs font-mono text-positive bg-positive/10 px-2.5 py-1 rounded-full border border-positive/20">
          Taxa Global: 3,5%
        </span>
      </div>

      {/* Barras Horizontais Proporcionais (Item 16 e 17) */}
      <div className="space-y-3.5 pt-2">
        {stages.map((stage, idx) => {
          const isHovered = hoveredIndex === idx;
          return (
            <div
              key={stage.name}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="space-y-1.5 cursor-pointer group"
            >
              {/* Header da Etapa */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: stage.color }}
                  />
                  <span className="font-semibold text-text-primary group-hover:text-brand-cyan transition-colors">
                    {stage.name}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono text-text-tertiary">
                    {stage.percentLabel}
                  </span>
                  <span className="font-mono font-bold text-text-primary text-sm tabular-numbers">
                    {stage.count}
                  </span>
                </div>
              </div>

              {/* Barra Segmentada */}
              <div className="h-6 w-full bg-[#050D1A] rounded-xl p-1 border border-white/5 relative overflow-hidden flex items-center">
                <div
                  style={{
                    width: stage.width,
                    backgroundColor: stage.color,
                  }}
                  className="h-full rounded-lg transition-all duration-700 opacity-90 group-hover:opacity-100 shadow-sm flex items-center px-2.5"
                >
                  <span className="text-[10px] font-mono font-bold text-white tracking-wide">
                    {stage.count}
                  </span>
                </div>
              </div>

              {/* Tooltip Dinâmico ao passar mouse ou toque (Item 18) */}
              {isHovered && (
                <div className="p-2 rounded-lg bg-white/[0.04] border border-white/10 text-[11px] font-mono text-text-secondary animate-fade-in flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-brand-cyan shrink-0" />
                  <span>{stage.tooltip}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};
