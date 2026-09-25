import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';
import { InvestmentPosition } from '../../types';
import { usePrivacyStore } from '../../store/privacyStore';
import { formatBRL } from '../../utils/formatters';

interface PositionCardProps {
  position: InvestmentPosition;
}

export const PositionCard: React.FC<PositionCardProps> = ({ position }) => {
  const hideValues = usePrivacyStore((s) => s.hideValues);

  const isBtc = position.asset === 'BTC';
  const themeColor = isBtc ? '#F5A623' : '#38BDF8';
  const isPositive = position.profitBrl >= 0;

  return (
    <Card
      variant="interactive"
      radius="lg"
      className="p-5 sm:p-6 space-y-4 bg-[#091527] border-white/10 relative overflow-hidden"
    >
      {/* Top Header da Posição */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base border border-white/10 shrink-0"
            style={{ backgroundColor: `${themeColor}20`, color: themeColor }}
          >
            {isBtc ? '₿' : 'Ł'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-text-primary tracking-tight">
                {position.name}
              </h3>
              <span
                className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
                style={{ backgroundColor: `${themeColor}20`, color: themeColor }}
              >
                {position.symbol}
              </span>
            </div>
            <span className="text-xs font-mono text-text-tertiary">
              Participação: <strong className="text-text-secondary">{position.sharePercent}% da carteira</strong>
            </span>
          </div>
        </div>

        <Link
          to={`/wallet/${position.asset.toLowerCase()}`}
          className="flex items-center gap-1 text-xs font-semibold text-brand-cyan hover:underline"
        >
          <span>Gerenciar</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid de 4 Métricas Financeiras */}
      <div className="grid grid-cols-2 gap-3.5 p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs">
        <div>
          <span className="text-[11px] font-mono text-text-tertiary uppercase block">
            Capital Alocado
          </span>
          <span className="text-sm sm:text-base font-bold font-mono text-text-primary tabular-numbers block mt-0.5">
            {hideValues ? 'R$ •••••' : formatBRL(position.allocatedBrl)}
          </span>
          <span className="text-[10px] font-mono text-text-tertiary">
            Custo base
          </span>
        </div>

        <div>
          <span className="text-[11px] font-mono text-text-tertiary uppercase block">
            Valor Atual
          </span>
          <span className="text-sm sm:text-base font-bold font-mono text-text-primary tabular-numbers block mt-0.5">
            {hideValues ? 'R$ •••••' : formatBRL(position.currentValueBrl)}
          </span>
          <span className="text-[10px] font-mono text-brand-cyan">
            {hideValues ? '••••' : `${position.quantity} ${position.symbol}`}
          </span>
        </div>

        <div className="pt-2 border-t border-white/5">
          <span className="text-[11px] font-mono text-text-tertiary uppercase block">
            Preço Médio
          </span>
          <span className="text-xs sm:text-sm font-semibold font-mono text-text-secondary tabular-numbers block mt-0.5">
            {formatBRL(position.averageCost)}
          </span>
        </div>

        <div className="pt-2 border-t border-white/5">
          <span className="text-[11px] font-mono text-text-tertiary uppercase block">
            Resultado da Posição
          </span>
          <div className={`text-xs sm:text-sm font-bold font-mono tabular-numbers mt-0.5 flex items-center gap-1 ${
            isPositive ? 'text-positive' : 'text-negative'
          }`}>
            {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            <span>{hideValues ? '+••••' : `+ ${formatBRL(position.profitBrl)}`}</span>
          </div>
          <span className={`text-[10px] font-mono font-bold ${isPositive ? 'text-positive' : 'text-negative'}`}>
            {hideValues ? '+••••' : `+${position.profitPercent}%`}
          </span>
        </div>
      </div>

      {/* Datas de Aporte */}
      <div className="flex items-center justify-between text-[11px] text-text-tertiary pt-1 px-1">
        <span>Início: <strong>{position.firstDepositDate}</strong></span>
        <span>Último aporte: <strong>{position.lastDepositDate}</strong></span>
      </div>
    </Card>
  );
};
