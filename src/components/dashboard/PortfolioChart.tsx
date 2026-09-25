import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Card } from '../ui/Card';
import { LiveIndicator } from '../ui/LiveIndicator';
import { TimeframeFilter, PortfolioHistoryPoint } from '../../types';
import { usePortfolio } from '../../hooks/usePortfolio';
import { usePrivacyStore } from '../../store/privacyStore';
import { formatBRL } from '../../utils/formatters';

export const PortfolioChart: React.FC = () => {
  const {
    chartData,
    activeTimeframe,
    setActiveTimeframe,
    totalBalance,
    monthlyGrowthPercent,
    isLive,
    quotes,
  } = usePortfolio();

  const hideValues = usePrivacyStore((s) => s.hideValues);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 340 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isLineDrawn, setIsLineDrawn] = useState(false);

  // Controle inteligente de gesture touch (horizontal vs vertical)
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

  // Responsividade dinâmica contínua (Desktop 340px, Tablet 300px, Mobile 240px, iPhone pequeno 210px)
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        let height = 340;
        if (width < 380) {
          height = 210; // iPhone SE
        } else if (width < 640) {
          height = 245; // iPhone 14/15/16 Pro
        } else if (width < 1024) {
          height = 290; // Tablet
        }
        setDimensions({ width, height });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Animação de desenho da linha (900ms da esquerda para a direita) ao trocar de período
  useEffect(() => {
    setIsLineDrawn(false);
    const timer = setTimeout(() => {
      setIsLineDrawn(true);
    }, 40);
    return () => clearTimeout(timer);
  }, [activeTimeframe]);

  const data = chartData && chartData.length > 0 ? chartData : [];
  const padding = { top: 24, right: 18, bottom: 28, left: 18 };
  const graphWidth = Math.max(dimensions.width - padding.left - padding.right, 100);
  const graphHeight = Math.max(dimensions.height - padding.top - padding.bottom, 80);

  const values = data.map((d) => d.totalBalanceBrl);
  const minValue = values.length > 0 ? Math.min(...values) * 0.996 : 50000;
  const maxValue = values.length > 0 ? Math.max(...values) * 1.004 : 53000;
  const valueRange = Math.max(maxValue - minValue, 1);

  // Mapeamento matemático preciso dos pontos (X, Y)
  const points = useMemo(() => {
    if (data.length === 0) return [];
    return data.map((d, index) => {
      const x = padding.left + (index / (data.length - 1)) * graphWidth;
      const normalizedY = (d.totalBalanceBrl - minValue) / valueRange;
      const y = padding.top + graphHeight - normalizedY * graphHeight;
      return { x, y, data: d };
    });
  }, [data, minValue, valueRange, graphWidth, graphHeight, padding.left, padding.top]);

  // Curva suave sem distorções financeiras irreais
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

  // Área preenchida com gradiente sob a linha
  const areaPath = useMemo(() => {
    if (points.length === 0) return '';
    const bottomY = padding.top + graphHeight;
    const firstX = points[0].x;
    const lastX = points[points.length - 1].x;
    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [linePath, points, padding.top, graphHeight]);

  const isPositiveGrowth = points.length >= 2 
    ? points[points.length - 1].data.totalBalanceBrl >= points[0].data.totalBalanceBrl 
    : true;

  const strokeColor = isPositiveGrowth ? '#19C37D' : '#EF4444';
  const gradientId = isPositiveGrowth ? 'fase2-green-grad' : 'fase2-red-grad';

  // Ponto atualmente selecionado pelo crosshair ou último ponto do gráfico
  const currentPoint = activeIndex !== null && points[activeIndex] 
    ? points[activeIndex] 
    : points[points.length - 1];

  // Último ponto para exibir o ponto ativo com pulse sutil
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

    // Se o gesto for horizontal, atualiza a inspeção do gráfico
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
    <Card variant="glass" radius="lg" className="flex flex-col gap-4 relative overflow-hidden">
      {/* Header do Gráfico */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-sm sm:text-base font-semibold text-text-primary tracking-tight">
              Evolução do patrimônio
            </h3>
            {isLive && (
              <LiveIndicator status="live" label="● AO VIVO" className="ml-1" />
            )}
          </div>
          <p className="text-xs text-text-tertiary mt-0.5">
            Histórico da sua posição consolidada.
          </p>
        </div>

        {/* Filtros de Período (Item 11 e 20) com background #162A46 quando ativo */}
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
                    ? 'bg-[#162A46] text-white border border-brand-cyan/20 shadow-sm font-semibold' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.04]'}
                `}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Snapshot do Valor em Foco */}
      <div className="flex items-baseline justify-between px-1">
        <div className="flex items-baseline gap-2.5">
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary tabular-nums">
            {formatBRL(currentPoint ? currentPoint.data.totalBalanceBrl : totalBalance, hideValues)}
          </span>
          <span className={`text-xs font-semibold font-mono ${isPositiveGrowth ? 'text-positive' : 'text-negative'}`}>
            {currentPoint && currentPoint.data.profitPercentage >= 0 ? '+' : ''}
            {currentPoint ? currentPoint.data.profitPercentage.toFixed(2) : monthlyGrowthPercent.toFixed(2)}%
          </span>
        </div>

        <div className="text-[11px] font-mono text-text-tertiary">
          {currentPoint ? `${currentPoint.data.displayDate} às ${currentPoint.data.displayTime}` : 'Tempo real'}
        </div>
      </div>

      {/* Container SVG com touch-action: pan-y (Item 16 e 96) */}
      <div
        ref={containerRef}
        className="w-full relative select-none"
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
            <linearGradient id="fase2-green-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#19C37D" stopOpacity="0.22" />
              <stop offset="65%" stopColor="#19C37D" stopOpacity="0.04" />
              <stop offset="100%" stopColor="#19C37D" stopOpacity="0.00" />
            </linearGradient>

            <linearGradient id="fase2-red-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.20" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.00" />
            </linearGradient>
          </defs>

          {/* Grid horizontal com opacidade mínima (Item 12) */}
          {[0.25, 0.5, 0.75].map((pct, i) => {
            const yPos = padding.top + graphHeight * pct;
            return (
              <line
                key={i}
                x1={padding.left}
                y1={yPos}
                x2={dimensions.width - padding.right}
                y2={yPos}
                stroke="rgba(255, 255, 255, 0.03)"
                strokeDasharray="3 3"
              />
            );
          })}

          {/* Área com gradiente suave */}
          {areaPath && (
            <path
              d={areaPath}
              fill={`url(#${gradientId})`}
              className="transition-opacity duration-300"
            />
          )}

          {/* Linha Principal de 2px com Animação de Entrada de 900ms (Item 12 e 14) */}
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

          {/* Ponto Ativo no Último Valor com Pulse Suave (5px com halo 12px - Item 17) */}
          {lastPoint && !isHovered && (
            <g transform={`translate(${lastPoint.x}, ${lastPoint.y})`}>
              <circle
                r="6"
                className="animate-ping fill-positive/30"
              />
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

          {/* Crosshair Vertical e Ponto Ativo em Hover / Touch (Item 15) */}
          {isHovered && currentPoint && (
            <>
              <line
                x1={currentPoint.x}
                y1={padding.top}
                x2={currentPoint.x}
                y2={padding.top + graphHeight}
                stroke="rgba(255, 255, 255, 0.22)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <circle
                cx={currentPoint.x}
                cy={currentPoint.y}
                r="5"
                fill="#07111F"
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

        {/* Tooltip Flutuante Conforme Item 15 */}
        {isHovered && currentPoint && (
          <div
            className="absolute z-20 pointer-events-none bg-[#0B172A]/95 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-financial-elevated w-52 sm:w-56"
            style={{
              left: `${Math.min(Math.max(currentPoint.x - 110, 10), dimensions.width - 230)}px`,
              top: `${Math.max(currentPoint.y - 145, 10)}px`,
            }}
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-text-tertiary border-b border-white/[0.06] pb-1.5 mb-2">
              <span>{currentPoint.data.displayDate}</span>
              <span>{currentPoint.data.displayTime}</span>
            </div>

            <div className="space-y-1 mb-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Patrimônio:</span>
                <span className="font-bold text-text-primary tabular-nums font-mono">
                  {formatBRL(currentPoint.data.totalBalanceBrl, hideValues)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-text-secondary">Variação:</span>
                <span className={`font-mono font-semibold ${currentPoint.data.profitPercentage >= 0 ? 'text-positive' : 'text-negative'}`}>
                  {currentPoint.data.profitPercentage >= 0 ? '+' : ''}{currentPoint.data.profitPercentage.toFixed(2)}%
                </span>
              </div>
            </div>

            <div className="pt-1.5 border-t border-white/[0.06] grid grid-cols-2 gap-2 text-[11px] font-mono">
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
