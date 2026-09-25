import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Card } from '../ui/Card';
import { TimeframeFilter } from '../../types';
import { usePortfolio } from '../../hooks/usePortfolio';
import { usePrivacyStore } from '../../store/privacyStore';
import { formatBRL } from '../../utils/formatters';

export const PortfolioChart: React.FC = () => {
  const {
    chartData,
    activeTimeframe,
    setActiveTimeframe,
    totalBalance,
    profitPercentage,
    isLive,
    quotes,
  } = usePortfolio();

  const hideValues = usePrivacyStore((s) => s.hideValues);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 320 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLineDrawn, setIsLineDrawn] = useState(false);

  // Controle de gesture touch inteligente (horizontal x vertical)
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);
  const isHorizontalGesture = useRef<boolean | null>(null);

  const filters: { id: TimeframeFilter; label: string }[] = [
    { id: '24H', label: '24H' },
    { id: '7D', label: '7D' },
    { id: '30D', label: '30D' },
    { id: '3M', label: '3M' },
    { id: '6M', label: '6M' },
    { id: '1A', label: '1A' },
    { id: 'ALL', label: 'Tudo' },
  ];

  // Responsividade de altura: Desktop 320px, Tablet 280px, Mobile 230px (Item 45)
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        let height = 320;
        if (width < 380) {
          height = 210; // iPhone SE
        } else if (width < 640) {
          height = 230; // iPhone 14/15/16 (Item 45)
        } else if (width < 1024) {
          height = 280; // Tablet
        }
        setDimensions({ width, height });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Animação de desenho da linha (900ms) ao trocar de período (Item 14)
  useEffect(() => {
    setIsLineDrawn(false);
    const timer = setTimeout(() => {
      setIsLineDrawn(true);
    }, 40);
    return () => clearTimeout(timer);
  }, [activeTimeframe]);

  const data = chartData && chartData.length > 0 ? chartData : [];
  // Reduz espaço vazio superior para curva começar mais próxima das informações (Item 15)
  const padding = { top: 14, right: 14, bottom: 24, left: 14 };
  const graphWidth = Math.max(dimensions.width - padding.left - padding.right, 100);
  const graphHeight = Math.max(dimensions.height - padding.top - padding.bottom, 80);

  const values = data.map((d) => d.totalBalanceBrl);
  const minValue = values.length > 0 ? Math.min(...values) * 0.997 : 52000;
  const maxValue = values.length > 0 ? Math.max(...values) * 1.003 : 55000;
  const valueRange = Math.max(maxValue - minValue, 1);

  // Mapeamento dos pontos
  const points = useMemo(() => {
    if (data.length === 0) return [];
    return data.map((d, index) => {
      const x = padding.left + (index / (data.length - 1)) * graphWidth;
      const normalizedY = (d.totalBalanceBrl - minValue) / valueRange;
      const y = padding.top + graphHeight - normalizedY * graphHeight;
      return { x, y, data: d };
    });
  }, [data, minValue, valueRange, graphWidth, graphHeight, padding.left, padding.top]);

  // Curva suave Catmull-Rom sem distorção irreal
  const linePath = useMemo(() => {
    if (points.length === 0) return '';
    if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

    let path = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? 0 : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    return path;
  }, [points]);

  // Área com gradiente suave (top: rgba(32,214,146,.20), bottom: 0 - Item 20)
  const areaPath = useMemo(() => {
    if (points.length === 0) return '';
    const bottomY = padding.top + graphHeight;
    const firstX = points[0].x;
    const lastX = points[points.length - 1].x;
    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [linePath, points, padding.top, graphHeight]);

  const strokeColor = '#20D692'; // Cor verde refinada (Item 20)

  // Ponto ativo atual
  const currentPoint = activeIndex !== null && points[activeIndex] 
    ? points[activeIndex] 
    : points[points.length - 1];

  const lastPoint = points.length > 0 ? points[points.length - 1] : null;

  // Interação inteligente de ponteiro / touch
  const handlePointerInteraction = (clientX: number) => {
    if (!svgRef.current || points.length === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;

    let closestIndex = 0;
    let minDistance = Infinity;

    points.forEach((p, idx) => {
      const distance = Math.abs(p.x - relativeX);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
    setIsHovered(true);
  };

  const handleTouchStart = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length > 0) {
      touchStartPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      isHorizontalGesture.current = null;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (!touchStartPos.current || e.touches.length === 0) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const diffX = Math.abs(currentX - touchStartPos.current.x);
    const diffY = Math.abs(currentY - touchStartPos.current.y);

    if (isHorizontalGesture.current === null && (diffX > 6 || diffY > 6)) {
      isHorizontalGesture.current = diffX > diffY;
    }

    if (isHorizontalGesture.current === true) {
      handlePointerInteraction(currentX);
    }
  };

  const handleTouchEnd = () => {
    touchStartPos.current = null;
    isHorizontalGesture.current = null;
    setIsHovered(false);
    setActiveIndex(null);
  };

  return (
    <Card variant="glass" radius="lg" className="flex flex-col gap-3 sm:gap-4 relative overflow-hidden p-4 sm:p-5.5">
      {/* 
        Header do Chart Organizado (Item 16):
        Evolução do patrimônio  ● AO VIVO (ponto verde 5px, pulse suave - Item 17)
        Histórico da sua posição consolidada.
        Na direita: 24H 7D 30D 3M 6M 1A Tudo
      */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.045] pb-3.5">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm sm:text-base font-semibold text-text-primary tracking-tight">
              Evolução do patrimônio
            </h3>

            {/* Live Indicator: ponto verde 5px, pulse suave, texto discreto (Item 17) */}
            {isLive && (
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.02] border border-white/[0.06] text-[10px] font-mono tracking-tight text-text-secondary select-none">
                <span className="relative flex items-center justify-center w-2.5 h-2.5">
                  <span className="absolute inline-flex w-2.5 h-2.5 rounded-full opacity-60 animate-ping bg-positive/40" />
                  <span className="relative inline-flex rounded-full w-1.5 h-1.5 bg-positive" />
                </span>
                <span>AO VIVO</span>
              </span>
            )}
          </div>

          <p className="text-[11px] sm:text-xs text-text-tertiary mt-0.5">
            Histórico da sua posição consolidada.
          </p>
        </div>

        {/* 
          Filtros de Período Refinados (Item 24):
          Não selecionado: color #7C8CA5
          Selecionado: background rgba(54,197,240,.10), border rgba(54,197,240,.25), color #F7F9FC
        */}
        <div className="flex items-center gap-1 overflow-x-auto py-0.5 scrollbar-none">
          {filters.map((f) => {
            const isActive = f.id === activeTimeframe;
            return (
              <button
                key={f.id}
                onClick={() => setActiveTimeframe(f.id)}
                className={`
                  px-2.5 py-1 text-xs font-mono font-medium rounded-lg transition-all duration-150 shrink-0 cursor-pointer select-none
                  ${isActive 
                    ? 'bg-[rgba(54,197,240,0.10)] border border-[rgba(54,197,240,0.25)] text-[#F7F9FC] font-semibold' 
                    : 'text-[#7C8CA5] hover:text-text-primary hover:bg-white/[0.03] border border-transparent'}
                `}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 
        Snapshot do Valor do Gráfico com Contexto Claro (Item 18 e 19):
        R$ 54.351,85 | Rentabilidade acumulada +18,72% | Atualizado 25 set 2026, 11:42
      */}
      <div className="flex items-baseline justify-between px-0.5 flex-wrap gap-2">
        <div className="flex items-baseline gap-2.5 sm:gap-3 flex-wrap">
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#F5F7FB] tabular-nums font-mono">
            {formatBRL(currentPoint ? currentPoint.data.totalBalanceBrl : totalBalance, hideValues)}
          </span>

          {/* Contexto absolutamente claro: Rentabilidade acumulada +18,72% (Item 5 e 18) */}
          <div className="inline-flex items-center gap-1.5 text-xs">
            <span className="text-text-tertiary">Rentabilidade acumulada:</span>
            <span className="font-mono font-semibold text-positive">
              +{profitPercentage.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Data com contraste reduzido: Atualizado 25 set 2026, 11:42 (Item 19) */}
        <div className="text-[11px] font-mono text-text-tertiary">
          Atualizado 25 set 2026, 11:42
        </div>
      </div>

      {/* Container SVG do Gráfico (Item 15, 20, 21, 22) */}
      <div
        ref={containerRef}
        className="w-full relative select-none mt-1"
        style={{ height: `${dimensions.height}px`, touchAction: 'pan-y' }}
      >
        <svg
          ref={svgRef}
          width={dimensions.width}
          height={dimensions.height}
          className="w-full h-full overflow-visible cursor-crosshair"
          onMouseMove={(e) => handlePointerInteraction(e.clientX)}
          onMouseLeave={() => { setIsHovered(false); setActiveIndex(null); }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <defs>
            {/* Subtle gradient fill: top rgba(32,214,146,.20), bottom 0 (Item 20) */}
            <linearGradient id="fase21-green-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#20D692" stopOpacity="0.20" />
              <stop offset="70%" stopColor="#20D692" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#20D692" stopOpacity="0.00" />
            </linearGradient>
          </defs>

          {/* Grid horizontal muito discreto rgba(255,255,255,.025) e vertical invisível (Item 22) */}
          {[0.25, 0.5, 0.75].map((pct, i) => {
            const yPos = padding.top + graphHeight * pct;
            return (
              <line
                key={i}
                x1={padding.left}
                y1={yPos}
                x2={dimensions.width - padding.right}
                y2={yPos}
                stroke="rgba(255, 255, 255, 0.025)"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Área preenchida */}
          {areaPath && (
            <path
              d={areaPath}
              fill="url(#fase21-green-grad)"
              className="transition-opacity duration-300"
            />
          )}

          {/* Linha de 2px na cor #20D692 com animação de 900ms (Item 20) */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke={strokeColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: isLineDrawn ? 'none' : '2200',
                strokeDashoffset: isLineDrawn ? '0' : '2200',
                transition: isLineDrawn ? 'none' : 'stroke-dashoffset 900ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          )}

          {/* Último Ponto: center 4px, outer glow 10px, pulse extremamente discreto (Item 21) */}
          {lastPoint && !isHovered && (
            <g transform={`translate(${lastPoint.x}, ${lastPoint.y})`}>
              {/* Outer Glow 10px */}
              <circle
                r="5"
                className="animate-ping fill-positive/25"
              />
              {/* Center 4px */}
              <circle
                r="3"
                className="fill-positive"
              />
              <circle
                r="1.5"
                className="fill-white"
              />
            </g>
          )}

          {/* Crosshair e Ponto Ativo ao passar o mouse ou tocar */}
          {isHovered && currentPoint && (
            <>
              <line
                x1={currentPoint.x}
                y1={padding.top}
                x2={currentPoint.x}
                y2={padding.top + graphHeight}
                stroke="rgba(255, 255, 255, 0.18)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <circle
                cx={currentPoint.x}
                cy={currentPoint.y}
                r="4.5"
                fill="#0B172A"
                stroke={strokeColor}
                strokeWidth="2"
              />
              <circle
                cx={currentPoint.x}
                cy={currentPoint.y}
                r="2"
                fill="#FFFFFF"
              />
            </>
          )}
        </svg>

        {/* 
          Tooltip Premium (Item 23):
          Background #101E33, border rgba(255,255,255,.08), blur 16px, radius 12px
          Exibe: Data/Hora, Patrimônio, Variação acumulada +18,72%, BTC, LTC
        */}
        {isHovered && currentPoint && (
          <div
            className="absolute z-20 pointer-events-none bg-[#101E33]/95 backdrop-blur-[16px] border border-white/[0.08] rounded-xl p-3 shadow-financial-elevated w-52 sm:w-56"
            style={{
              left: `${Math.min(Math.max(currentPoint.x - 110, 10), dimensions.width - 230)}px`,
              top: `${Math.max(currentPoint.y - 145, 10)}px`,
            }}
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-text-tertiary border-b border-white/[0.05] pb-1.5 mb-2">
              <span>{currentPoint.data.displayDate}</span>
              <span>{currentPoint.data.displayTime}</span>
            </div>

            <div className="space-y-1 mb-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Patrimônio:</span>
                <span className="font-bold text-[#F5F7FB] tabular-nums font-mono">
                  {formatBRL(currentPoint.data.totalBalanceBrl, hideValues)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Variação acumulada:</span>
                <span className="font-mono font-semibold text-positive">
                  +{profitPercentage.toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="pt-1.5 border-t border-white/[0.05] grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div>
                <span className="text-crypto-bitcoin text-[10px] block">BTC</span>
                <span className="text-text-primary">
                  {hideValues ? '••••' : `R$ ${Math.round(currentPoint.data.btcPrice).toLocaleString('pt-BR')}`}
                </span>
              </div>
              <div>
                <span className="text-crypto-litecoin text-[10px] block">LTC</span>
                <span className="text-text-primary">
                  {hideValues ? '••••' : `R$ ${currentPoint.data.ltcPrice.toFixed(2).replace('.', ',')}`}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
