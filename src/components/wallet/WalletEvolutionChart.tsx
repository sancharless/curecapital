import React, { useState, useMemo } from 'react';
import { Card } from '../ui/Card';
import { TimeframeFilter } from '../../types';
import { usePortfolio } from '../../hooks/usePortfolio';
import { usePrivacyStore } from '../../store/privacyStore';
import { formatBRL } from '../../utils/formatters';

type ComparisonMode = 'TOTAL' | 'BTC' | 'LTC';

export const WalletEvolutionChart: React.FC = () => {
  const { chartData, activeTimeframe, setActiveTimeframe } = usePortfolio();
  const hideValues = usePrivacyStore((s) => s.hideValues);

  const [compareMode, setCompareMode] = useState<ComparisonMode>('TOTAL');
  const [hoveredPointIndex, setHoveredPointIndex] = useState<number | null>(null);

  const timeframes: TimeframeFilter[] = ['7D', '30D', '3M', '6M', '1A', 'ALL'];

  // Dados filtrados de acordo com o modo
  const chartPoints = useMemo(() => {
    return chartData.map((pt) => {
      let val = pt.totalBalanceBrl;
      if (compareMode === 'BTC') {
        val = pt.btcPrice;
      } else if (compareMode === 'LTC') {
        val = pt.ltcPrice;
      }
      return {
        ...pt,
        displayValue: val,
      };
    });
  }, [chartData, compareMode]);

  // Dimensionamento SVG
  const width = 800;
  const height = 240;
  const padding = { top: 20, right: 20, bottom: 30, left: 20 };

  const values = chartPoints.map((p) => p.displayValue);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;

  // Gerador de coordenadas
  const coordinates = useMemo(() => {
    return chartPoints.map((pt, index) => {
      const x = padding.left + (index / (chartPoints.length - 1)) * (width - padding.left - padding.right);
      const y = height - padding.bottom - ((pt.displayValue - minVal) / range) * (height - padding.top - padding.bottom);
      return { x, y, pt };
    });
  }, [chartPoints, minVal, range]);

  const pathD = useMemo(() => {
    if (coordinates.length === 0) return '';
    return coordinates.reduce((acc, curr, index) => {
      return index === 0 ? `M ${curr.x},${curr.y}` : `${acc} L ${curr.x},${curr.y}`;
    }, '');
  }, [coordinates]);

  const areaD = useMemo(() => {
    if (coordinates.length === 0) return '';
    const first = coordinates[0];
    const last = coordinates[coordinates.length - 1];
    return `${pathD} L ${last.x},${height - padding.bottom} L ${first.x},${height - padding.bottom} Z`;
  }, [pathD, coordinates]);

  const activePoint = hoveredPointIndex !== null ? coordinates[hoveredPointIndex] : coordinates[coordinates.length - 1];

  // Cores dinâmicas para o modo
  const strokeColor = compareMode === 'BTC' ? '#F5A623' : compareMode === 'LTC' ? '#38BDF8' : '#2563EB';

  return (
    <Card variant="glass" radius="lg" className="p-5 sm:p-6 space-y-4">
      {/* Header com Título e Controles */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-text-primary tracking-tight">
              Evolução da Carteira
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-text-tertiary uppercase">
              Consolidado
            </span>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            Acompanhe o comportamento histórico do seu patrimônio digital.
          </p>
        </div>

        {/* Toggle Comparativo Conforme Item 19 */}
        <div className="flex items-center p-1 rounded-xl bg-[#081325] border border-white/5 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setCompareMode('TOTAL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              compareMode === 'TOTAL'
                ? 'bg-brand-blue text-white shadow-sm'
                : 'text-text-tertiary hover:text-text-primary'
            }`}
          >
            Carteira
          </button>
          <button
            type="button"
            onClick={() => setCompareMode('BTC')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              compareMode === 'BTC'
                ? 'bg-[#F5A623] text-black font-bold shadow-sm'
                : 'text-text-tertiary hover:text-text-primary'
            }`}
          >
            BTC
          </button>
          <button
            type="button"
            onClick={() => setCompareMode('LTC')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              compareMode === 'LTC'
                ? 'bg-[#38BDF8] text-black font-bold shadow-sm'
                : 'text-text-tertiary hover:text-text-primary'
            }`}
          >
            LTC
          </button>
        </div>
      </div>

      {/* Filtros de Período e Valor em Destaque */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div>
          <span className="text-[11px] font-mono text-text-tertiary block">
            {activePoint ? activePoint.pt.displayDate : 'Período selecionado'}
          </span>
          <div className="text-xl sm:text-2xl font-bold font-mono text-text-primary tabular-numbers">
            {hideValues ? '••••••' : activePoint ? formatBRL(activePoint.pt.displayValue) : '—'}
          </div>
        </div>

        {/* Botões de Timeframe */}
        <div className="flex items-center gap-1 bg-[#091527] p-1 rounded-xl border border-white/5">
          {timeframes.map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setActiveTimeframe(tf)}
              className={`px-2.5 py-1 text-xs font-mono font-medium rounded-lg transition-colors cursor-pointer ${
                activeTimeframe === tf
                  ? 'bg-white/10 text-white font-bold'
                  : 'text-text-tertiary hover:text-text-secondary'
              }`}
            >
              {tf === 'ALL' ? 'Tudo' : tf}
            </button>
          ))}
        </div>
      </div>

      {/* Área do Gráfico SVG Interativo */}
      <div className="relative w-full h-[220px] sm:h-[240px] pt-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
          aria-label="Gráfico de evolução histórica patrimonial"
        >
          <defs>
            <linearGradient id="walletEvolutionGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={strokeColor} stopOpacity="0.25" />
              <stop offset="100%" stopColor={strokeColor} stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Linhas de grade sutis */}
          <line
            x1={padding.left}
            y1={padding.top}
            x2={width - padding.right}
            y2={padding.top}
            stroke="rgba(255,255,255,0.04)"
            strokeDasharray="4 4"
          />
          <line
            x1={padding.left}
            y1={height / 2}
            x2={width - padding.right}
            y2={height / 2}
            stroke="rgba(255,255,255,0.04)"
            strokeDasharray="4 4"
          />
          <line
            x1={padding.left}
            y1={height - padding.bottom}
            x2={width - padding.right}
            y2={height - padding.bottom}
            stroke="rgba(255,255,255,0.08)"
          />

          {/* Área preenchida */}
          <path d={areaD} fill="url(#walletEvolutionGrad)" />

          {/* Linha principal com path draw */}
          <path
            d={pathD}
            fill="none"
            stroke={strokeColor}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Ponto interativo ativo */}
          {activePoint && (
            <g>
              <line
                x1={activePoint.x}
                y1={padding.top}
                x2={activePoint.x}
                y2={height - padding.bottom}
                stroke="rgba(255,255,255,0.2)"
                strokeDasharray="3 3"
              />
              <circle
                cx={activePoint.x}
                cy={activePoint.y}
                r="5"
                fill={strokeColor}
                stroke="#081325"
                strokeWidth="2.5"
                className="filter drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
              />
            </g>
          )}

          {/* Zonas de toque transparentes para hover suave */}
          {coordinates.map((coord, idx) => (
            <rect
              key={idx}
              x={coord.x - (width / coordinates.length) / 2}
              y={0}
              width={width / coordinates.length}
              height={height}
              fill="transparent"
              className="cursor-crosshair"
              onMouseEnter={() => setHoveredPointIndex(idx)}
              onTouchStart={() => setHoveredPointIndex(idx)}
            />
          ))}
        </svg>
      </div>

      {/* Disclaimer Regulatório Discreto (Item 74) */}
      <div className="pt-2 border-t border-white/5 text-[11px] text-text-tertiary text-center sm:text-left">
        Resultados anteriores não representam garantia de desempenho futuro.
      </div>
    </Card>
  );
};
