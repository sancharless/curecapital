import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { TimeframeFilter } from '../../types';
import { MOCK_AFFILIATE_DATA } from '../../data/affiliateMock';
import { usePrivacyStore } from '../../store/privacyStore';
import { formatBRL } from '../../utils/formatters';

export const CommissionChart: React.FC = () => {
  const hideValues = usePrivacyStore((s) => s.hideValues);

  const [activeTf, setActiveTf] = useState<TimeframeFilter>('30D');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const timeframes: TimeframeFilter[] = ['30D', '3M', '6M', '1A', 'ALL'];

  const tfKey = activeTf === 'ALL' ? 'ALL' : activeTf;
  const points = MOCK_AFFILIATE_DATA.commissionTimeSeries[tfKey] || MOCK_AFFILIATE_DATA.commissionTimeSeries['30D'];

  const width = 800;
  const height = 240;
  const padding = { top: 20, right: 25, bottom: 35, left: 25 };

  const maxVal = Math.max(...points.map((p) => p.accumulated), 1) * 1.15;

  const getCoordinates = (accessor: (p: typeof points[0]) => number) => {
    return points.map((p, index) => {
      const val = accessor(p);
      const x = padding.left + (index / (points.length - 1)) * (width - padding.left - padding.right);
      const y = height - padding.bottom - (val / maxVal) * (height - padding.top - padding.bottom);
      return { x, y, val, p };
    });
  };

  const accCoords = getCoordinates((p) => p.accumulated);

  const makePath = (coords: typeof accCoords) => {
    return coords.reduce((acc, curr, index) => {
      return index === 0 ? `M ${curr.x},${curr.y}` : `${acc} L ${curr.x},${curr.y}`;
    }, '');
  };

  const pathD = makePath(accCoords);
  const areaD = accCoords.length > 0
    ? `${pathD} L ${accCoords[accCoords.length - 1].x},${height - padding.bottom} L ${accCoords[0].x},${height - padding.bottom} Z`
    : '';

  const activeIndex = hoveredIdx !== null ? hoveredIdx : points.length - 1;
  const activeData = points[activeIndex];
  const activeAcc = accCoords[activeIndex];

  return (
    <Card variant="glass" radius="lg" className="p-5 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-text-primary tracking-tight">
            Evolução das Comissões
          </h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Progressão do montante acumulado e valores apurados no período.
          </p>
        </div>

        {/* Timeframes */}
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

      {/* Tooltip Dinâmico */}
      {activeData && (
        <div className="p-3 rounded-xl bg-[#050D1A] border border-white/10 flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] font-mono text-text-tertiary uppercase block">Data</span>
            <span className="font-mono font-bold text-text-primary">{activeData.displayDate}</span>
          </div>
          <div className="flex items-center gap-6">
            <div>
              <span className="text-[10px] font-mono text-text-tertiary uppercase block">Valor no Período</span>
              <span className="font-mono font-semibold text-brand-cyan text-sm">
                {hideValues ? 'R$ •••••' : `+ ${formatBRL(activeData.period)}`}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-text-tertiary uppercase block">Total Acumulado</span>
              <span className="font-mono font-bold text-positive text-sm">
                {hideValues ? 'R$ •••••' : formatBRL(activeData.accumulated)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Gráfico SVG */}
      <div className="relative w-full h-[220px] sm:h-[240px] pt-1">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
          aria-label="Gráfico de evolução das comissões acumuladas"
        >
          <defs>
            <linearGradient id="commEvolutionGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grade */}
          <line x1={padding.left} y1={padding.top} x2={width - padding.right} y2={padding.top} stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
          <line x1={padding.left} y1={height / 2} x2={width - padding.right} y2={height / 2} stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
          <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} stroke="rgba(255,255,255,0.08)" />

          {/* Área */}
          <path d={areaD} fill="url(#commEvolutionGrad)" />

          {/* Linha */}
          <path
            d={pathD}
            fill="none"
            stroke="#10B981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Ponto Ativo */}
          {activeAcc && (
            <g>
              <line
                x1={activeAcc.x}
                y1={padding.top}
                x2={activeAcc.x}
                y2={height - padding.bottom}
                stroke="rgba(255,255,255,0.2)"
                strokeDasharray="2 2"
              />
              <circle
                cx={activeAcc.x}
                cy={activeAcc.y}
                r="5"
                fill="#10B981"
                stroke="#081325"
                strokeWidth="2.5"
                className="filter drop-shadow-[0_0_8px_rgba(16,185,129,0.8)]"
              />
            </g>
          )}

          {/* Zonas de hover */}
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
    </Card>
  );
};
