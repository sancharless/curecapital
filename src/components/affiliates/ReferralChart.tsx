import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { TimeframeFilter } from '../../types';
import { MOCK_AFFILIATE_DATA } from '../../data/affiliateMock';

export const ReferralChart: React.FC = () => {
  const [activeTf, setActiveTf] = useState<TimeframeFilter>('30D');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const timeframes: TimeframeFilter[] = ['7D', '30D', '3M', '6M', '1A', 'ALL'];

  const tfKey = activeTf === 'ALL' ? 'ALL' : activeTf;
  const points = MOCK_AFFILIATE_DATA.historyTimeSeries[tfKey] || MOCK_AFFILIATE_DATA.historyTimeSeries['30D'];

  const width = 800;
  const height = 240;
  const padding = { top: 20, right: 25, bottom: 35, left: 25 };

  const maxVal = Math.max(...points.flatMap((p) => [p.registrations, p.active]), 1) * 1.25;

  const getCoordinates = (accessor: (p: typeof points[0]) => number) => {
    return points.map((p, index) => {
      const val = accessor(p);
      const x = padding.left + (index / (points.length - 1)) * (width - padding.left - padding.right);
      const y = height - padding.bottom - (val / maxVal) * (height - padding.top - padding.bottom);
      return { x, y, val, p };
    });
  };

  const regCoords = getCoordinates((p) => p.registrations);
  const actCoords = getCoordinates((p) => p.active);

  const makePath = (coords: typeof regCoords) => {
    return coords.reduce((acc, curr, index) => {
      return index === 0 ? `M ${curr.x},${curr.y}` : `${acc} L ${curr.x},${curr.y}`;
    }, '');
  };

  const regPath = makePath(regCoords);
  const actPath = makePath(actCoords);

  const activeIndex = hoveredIdx !== null ? hoveredIdx : points.length - 1;
  const activeData = points[activeIndex];
  const activeReg = regCoords[activeIndex];
  const activeAct = actCoords[activeIndex];

  return (
    <Card variant="glass" radius="lg" className="p-5 sm:p-6 space-y-4">
      {/* Header com Filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-text-primary tracking-tight">
            Indicações ao Longo do Tempo
          </h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Crescimento temporal de novos cadastros e investidores ativos.
          </p>
        </div>

        {/* Timeframe Buttons */}
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

      {/* Legenda das 2 Séries (Item 20) */}
      <div className="flex items-center gap-6 text-xs pt-1 border-t border-white/5">
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 rounded bg-[#2563EB]" />
          <span className="text-text-secondary">Cadastros</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-1 rounded bg-[#10B981]" />
          <span className="text-text-secondary font-semibold">Ativos</span>
        </div>
      </div>

      {/* Tooltip Dinâmico (Item 21) */}
      {activeData && (
        <div className="p-3 rounded-xl bg-[#050D1A] border border-white/10 flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] font-mono text-text-tertiary uppercase block">Período</span>
            <span className="font-mono font-bold text-text-primary">{activeData.displayDate}</span>
          </div>
          <div className="flex items-center gap-6">
            <div>
              <span className="text-[10px] font-mono text-text-tertiary uppercase block">Cadastros</span>
              <span className="font-mono font-bold text-brand-blue-hover text-sm">{activeData.registrations}</span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-text-tertiary uppercase block">Ativos</span>
              <span className="font-mono font-bold text-positive text-sm">{activeData.active}</span>
            </div>
          </div>
        </div>
      )}

      {/* Gráfico SVG com 2 Linhas */}
      <div className="relative w-full h-[220px] sm:h-[240px] pt-1">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
          aria-label="Gráfico de evolução das indicações ao longo do tempo"
        >
          {/* Grade */}
          <line x1={padding.left} y1={padding.top} x2={width - padding.right} y2={padding.top} stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
          <line x1={padding.left} y1={height / 2} x2={width - padding.right} y2={height / 2} stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
          <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} stroke="rgba(255,255,255,0.08)" />

          {/* Linha 1: Cadastros (Azul) */}
          <path
            d={regPath}
            fill="none"
            stroke="#2563EB"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Linha 2: Ativos (Verde Suave) */}
          <path
            d={actPath}
            fill="none"
            stroke="#10B981"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Pontos Ativos */}
          {activeReg && activeAct && (
            <g>
              <line
                x1={activeReg.x}
                y1={padding.top}
                x2={activeReg.x}
                y2={height - padding.bottom}
                stroke="rgba(255,255,255,0.2)"
                strokeDasharray="2 2"
              />
              <circle
                cx={activeReg.x}
                cy={activeReg.y}
                r="4.5"
                fill="#2563EB"
                stroke="#081325"
                strokeWidth="2"
              />
              <circle
                cx={activeAct.x}
                cy={activeAct.y}
                r="5"
                fill="#10B981"
                stroke="#081325"
                strokeWidth="2"
              />
            </g>
          )}

          {/* Hover zones */}
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
