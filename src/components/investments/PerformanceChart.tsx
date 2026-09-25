import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { TimeframeFilter } from '../../types';
import { MOCK_INVESTMENT_PERFORMANCE } from '../../data/mockData';
import { usePrivacyStore } from '../../store/privacyStore';
import { formatBRL } from '../../utils/formatters';

export const PerformanceChart: React.FC = () => {
  const hideValues = usePrivacyStore((s) => s.hideValues);

  const [activeTf, setActiveTf] = useState<TimeframeFilter>('30D');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const timeframes: TimeframeFilter[] = ['30D', '3M', '6M', '1A', 'ALL'];

  const points = MOCK_INVESTMENT_PERFORMANCE[activeTf] || MOCK_INVESTMENT_PERFORMANCE['30D'];

  const width = 800;
  const height = 280;
  const padding = { top: 25, right: 25, bottom: 40, left: 25 };

  // Escalas
  const allValues = points.flatMap((p) => [p.investedCapital, p.portfolioValue]);
  const minVal = Math.min(...allValues) * 0.95;
  const maxVal = Math.max(...allValues) * 1.05;
  const range = maxVal - minVal || 1;

  const getCoordinates = (accessor: (p: typeof points[0]) => number) => {
    return points.map((p, index) => {
      const val = accessor(p);
      const x = padding.left + (index / (points.length - 1)) * (width - padding.left - padding.right);
      const y = height - padding.bottom - ((val - minVal) / range) * (height - padding.top - padding.bottom);
      return { x, y, val, p };
    });
  };

  const investedCoords = getCoordinates((p) => p.investedCapital);
  const portfolioCoords = getCoordinates((p) => p.portfolioValue);

  const makePath = (coords: typeof investedCoords) => {
    return coords.reduce((acc, curr, index) => {
      return index === 0 ? `M ${curr.x},${curr.y}` : `${acc} L ${curr.x},${curr.y}`;
    }, '');
  };

  const investedPath = makePath(investedCoords);
  const portfolioPath = makePath(portfolioCoords);

  const activeIndex = hoveredIdx !== null ? hoveredIdx : points.length - 1;
  const activeData = points[activeIndex];
  const activeInvested = investedCoords[activeIndex];
  const activePortfolio = portfolioCoords[activeIndex];

  return (
    <Card variant="glass" radius="lg" className="p-5 sm:p-6 space-y-4">
      {/* Header com Legenda e Filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-text-primary tracking-tight">
              Performance dos Investimentos
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-positive/10 text-positive border border-positive/20">
              Patrimônio vs Capital
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            Evolução comparativa entre o capital aportado e a valorização patrimonial total.
          </p>
        </div>

        {/* Timeframe buttons */}
        <div className="flex items-center gap-1 bg-[#091527] p-1 rounded-xl border border-white/5 self-start sm:self-auto">
          {timeframes.map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => {
                setActiveTf(tf);
                setHoveredIdx(null);
              }}
              className={`px-3 py-1 text-xs font-mono font-medium rounded-lg transition-colors cursor-pointer ${
                activeTf === tf
                  ? 'bg-white/10 text-white font-bold'
                  : 'text-text-tertiary hover:text-text-secondary'
              }`}
            >
              {tf === 'ALL' ? 'Tudo' : tf}
            </button>
          ))}
        </div>
      </div>

      {/* Legenda das 2 Linhas conforme Item 29 */}
      <div className="flex flex-wrap items-center gap-5 text-xs pt-1 border-t border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 rounded bg-[#64748B]" />
          <span className="text-text-secondary">Capital aportado</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 rounded bg-[#10B981]" />
          <span className="text-text-secondary font-semibold">Patrimônio atual</span>
        </div>
      </div>

      {/* Tooltip Dinâmico conforme Item 30 */}
      {activeData && (
        <div className="p-3.5 rounded-xl bg-[#050D1A] border border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-text-tertiary block text-[11px] font-mono uppercase">Data</span>
            <span className="font-mono font-bold text-text-primary text-sm mt-0.5 block">
              {activeData.displayDate}
            </span>
          </div>

          <div>
            <span className="text-text-tertiary block text-[11px] font-mono uppercase">Capital Aportado</span>
            <span className="font-mono font-semibold text-[#94A3B8] text-sm mt-0.5 block tabular-numbers">
              {hideValues ? 'R$ •••••' : formatBRL(activeData.investedCapital)}
            </span>
          </div>

          <div>
            <span className="text-text-tertiary block text-[11px] font-mono uppercase">Patrimônio</span>
            <span className="font-mono font-bold text-text-primary text-sm mt-0.5 block tabular-numbers">
              {hideValues ? 'R$ •••••' : formatBRL(activeData.portfolioValue)}
            </span>
          </div>

          <div>
            <span className="text-text-tertiary block text-[11px] font-mono uppercase">Resultado Acumulado</span>
            <span className="font-mono font-bold text-positive text-sm mt-0.5 block tabular-numbers">
              {hideValues ? '+••••' : `+ ${formatBRL(activeData.profitBrl)}`}
              <span className="text-[11px] text-positive/80 ml-1 font-normal">
                ({hideValues ? '+••••' : `+${activeData.profitPercentage}%`})
              </span>
            </span>
          </div>
        </div>
      )}

      {/* Gráfico SVG de 2 Linhas */}
      <div className="relative w-full h-[260px] sm:h-[280px] pt-1">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
          aria-label="Gráfico de performance dos investimentos com duas linhas comparativas"
        >
          {/* Linhas de Grade Sutis */}
          <line x1={padding.left} y1={padding.top} x2={width - padding.right} y2={padding.top} stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
          <line x1={padding.left} y1={height / 2} x2={width - padding.right} y2={height / 2} stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
          <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} stroke="rgba(255,255,255,0.08)" />

          {/* Linha 1: Capital Aportado (Azul/Cinza discreta) */}
          <path
            d={investedPath}
            fill="none"
            stroke="#64748B"
            strokeWidth="2"
            strokeDasharray="4 4"
            strokeLinecap="round"
          />

          {/* Linha 2: Patrimônio Atual (Verde Institucional) */}
          <path
            d={portfolioPath}
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Marcadores do Ponto Ativo */}
          {activeInvested && activePortfolio && (
            <g>
              <line
                x1={activePortfolio.x}
                y1={padding.top}
                x2={activePortfolio.x}
                y2={height - padding.bottom}
                stroke="rgba(255,255,255,0.2)"
                strokeDasharray="2 2"
              />
              {/* Ponto Capital Aportado */}
              <circle
                cx={activeInvested.x}
                cy={activeInvested.y}
                r="4"
                fill="#64748B"
                stroke="#081325"
                strokeWidth="2"
              />
              {/* Ponto Patrimônio */}
              <circle
                cx={activePortfolio.x}
                cy={activePortfolio.y}
                r="6"
                fill="#10B981"
                stroke="#081325"
                strokeWidth="2"
                className="filter drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
              />
            </g>
          )}

          {/* Zonas de toque transparentes para hover suave */}
          {points.map((_, idx) => {
            const x = padding.left + (idx / (points.length - 1)) * (width - padding.left - padding.right);
            return (
              <rect
                key={idx}
                x={x - (width / points.length) / 2}
                y={0}
                width={width / points.length}
                height={height}
                fill="transparent"
                className="cursor-crosshair"
                onMouseEnter={() => setHoveredIdx(idx)}
                onTouchStart={() => setHoveredIdx(idx)}
              />
            );
          })}
        </svg>
      </div>

      <div className="pt-1 text-[11px] text-text-tertiary">
        Resultados anteriores não representam garantia de desempenho futuro.
      </div>
    </Card>
  );
};
