import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { TimeframeFilter, PortfolioHistoryPoint } from '../../types';
import { useMarketData } from '../../providers/MarketDataProvider';
import { usePrivacyStore } from '../../store/privacyStore';

export const PortfolioChart: React.FC = () => {
  const { 
    chartData, 
    activeTimeframe, 
    setActiveTimeframe, 
    portfolioTotalBrl, 
    monthlyGrowthPercent,
    isLive 
  } = useMarketData();

  const formatCurrency = usePrivacyStore(s => s.formatCurrency);
  const hideValues = usePrivacyStore(s => s.hideValues);

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 320 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPathAnimated, setIsPathAnimated] = useState(false);

  const filters: { id: TimeframeFilter; label: string }[] = [
    { id: '24H', label: '24H' },
    { id: '7D', label: '7D' },
    { id: '30D', label: '30D' },
    { id: '3M', label: '3M' },
    { id: '6M', label: '6M' },
    { id: '1A', label: '1A' },
    { id: 'ALL', label: 'Tudo' },
  ];

  // Responsividade dinâmica de altura e largura (Desktop 340px, Tablet 300px, Mobile 240px, iPhone pequeno 210px)
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const width = containerRef.current.clientWidth;
        let height = 340;
        if (width < 380) {
          height = 210; // iPhone pequeno / SE
        } else if (width < 640) {
          height = 240; // Mobile padrão (390-430px)
        } else if (width < 1024) {
          height = 300; // Tablet
        }
        setDimensions({ width, height });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Animação de desenho da linha (800ms a 1200ms) ao carregar ou trocar período
  useEffect(() => {
    setIsPathAnimated(false);
    const timer = setTimeout(() => {
      setIsPathAnimated(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [activeTimeframe]);

  // Cálculos matemáticos do gráfico
  const data = chartData && chartData.length > 0 ? chartData : [];
  const padding = { top: 20, right: 16, bottom: 30, left: 16 };
  const graphWidth = Math.max(dimensions.width - padding.left - padding.right, 100);
  const graphHeight = Math.max(dimensions.height - padding.top - padding.bottom, 80);

  const values = data.map(d => d.totalBalanceBrl);
  const minValue = values.length > 0 ? Math.min(...values) * 0.996 : 50000;
  const maxValue = values.length > 0 ? Math.max(...values) * 1.004 : 53000;
  const valueRange = Math.max(maxValue - minValue, 1);

  // Mapeamento de coordenadas (X, Y)
  const points = useMemo(() => {
    if (data.length === 0) return [];
    return data.map((d, index) => {
      const x = padding.left + (index / (data.length - 1)) * graphWidth;
      const normalizedY = (d.totalBalanceBrl - minValue) / valueRange;
      const y = padding.top + graphHeight - normalizedY * graphHeight;
      return { x, y, data: d };
    });
  }, [data, minValue, valueRange, graphWidth, graphHeight, padding.left, padding.top]);

  // Caminho da linha suave (Curva de Bézier ou Catmull-Rom simplificada)
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

  // Caminho da área sob a curva com gradiente
  const areaPath = useMemo(() => {
    if (points.length === 0) return '';
    const bottomY = padding.top + graphHeight;
    const firstX = points[0].x;
    const lastX = points[points.length - 1].x;
    return `${linePath} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [linePath, points, padding.top, graphHeight]);

  // Variação é positiva no período?
  const isPositiveGrowth = points.length >= 2 
    ? points[points.length - 1].data.totalBalanceBrl >= points[0].data.totalBalanceBrl 
    : true;

  const strokeColor = isPositiveGrowth ? '#19C37D' : '#EF4444';
  const gradientId = isPositiveGrowth ? 'portfolio-green-grad' : 'portfolio-red-grad';

  // Ponto atualmente inspecionado
  const currentPoint = activeIndex !== null && points[activeIndex] 
    ? points[activeIndex] 
    : points[points.length - 1];

  // Manipulação de toque sem travar o scroll vertical (Item 15)
  const handlePointerInteraction = (clientX: number) => {
    if (!svgRef.current || points.length === 0) return;
    const rect = svgRef.current.getBoundingClientRect();
    const relativeX = clientX - rect.left;

    // Acha o ponto mais próximo
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

  const onMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    handlePointerInteraction(e.clientX);
  };

  const onMouseLeave = () => {
    setIsHovered(false);
    setActiveIndex(null);
  };

  const onTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length > 0) {
      handlePointerInteraction(e.touches[0].clientX);
    }
  };

  const onTouchEnd = () => {
    setIsHovered(false);
    setActiveIndex(null);
  };

  return (
    <Card variant="glass" radius="lg" className="flex flex-col gap-4 relative">
      {/* Top Header do Gráfico: Título, Filtros e Indicador Ao Vivo */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h3 className="text-sm font-semibold text-text-primary tracking-tight">
              Evolução do Patrimônio
            </h3>
            {isLive && (
              <Badge variant="live" size="sm">
                AO VIVO
              </Badge>
            )}
          </div>
          <p className="text-xs text-text-tertiary mt-0.5">
            Rentabilidade calculada sobre alocação líquida em BTC, LTC e custódia BRL
          </p>
        </div>

        {/* Filtros de Período (24H, 7D, 30D, 3M, 6M, 1A, Tudo) */}
        <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
          {filters.map((f) => {
            const isActive = f.id === activeTimeframe;
            return (
              <button
                key={f.id}
                onClick={() => setActiveTimeframe(f.id)}
                className={`
                  px-2.5 py-1 text-xs font-mono font-medium rounded-lg transition-all duration-150 shrink-0 cursor-pointer select-none
                  ${isActive 
                    ? 'bg-brand-blue text-white shadow-glow-blue/50' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.05]'}
                `}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Snapshot do Ponto Selecionado / Atual */}
      <div className="flex items-baseline justify-between px-1">
        <div className="flex items-baseline gap-2">
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary tabular-numbers">
            {formatCurrency(currentPoint ? currentPoint.data.totalBalanceBrl : portfolioTotalBrl)}
          </span>
          <span className={`text-xs font-semibold ${isPositiveGrowth ? 'text-positive' : 'text-negative'}`}>
            {currentPoint && currentPoint.data.profitPercentage >= 0 ? '+' : ''}
            {currentPoint ? currentPoint.data.profitPercentage.toFixed(2) : monthlyGrowthPercent}%
          </span>
        </div>

        <div className="text-[11px] font-mono text-text-tertiary">
          {currentPoint ? `${currentPoint.data.displayDate} às ${currentPoint.data.displayTime}` : 'Tempo real'}
        </div>
      </div>

      {/* Container SVG do Gráfico Interativo com touch-action: pan-y (Item 15) */}
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
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <defs>
            {/* Gradiente Verde de Crescimento */}
            <linearGradient id="portfolio-green-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#19C37D" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#19C37D" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#19C37D" stopOpacity="0.00" />
            </linearGradient>

            {/* Gradiente Vermelho se negativo */}
            <linearGradient id="portfolio-red-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0.00" />
            </linearGradient>
          </defs>

          {/* Linhas de Grade Horizontais Discretas */}
          {[0.25, 0.5, 0.75].map((pct, i) => {
            const yPos = padding.top + graphHeight * pct;
            return (
              <line
                key={i}
                x1={padding.left}
                y1={yPos}
                x2={dimensions.width - padding.right}
                y2={yPos}
                stroke="rgba(255, 255, 255, 0.04)"
                strokeDasharray="4 4"
              />
            );
          })}

          {/* Área com Preenchimento Gradual */}
          {areaPath && (
            <path
              d={areaPath}
              fill={`url(#${gradientId})`}
              className="transition-opacity duration-300"
            />
          )}

          {/* Linha Principal com Animação Inicial Suave (800ms a 1200ms) */}
          {linePath && (
            <path
              d={linePath}
              fill="none"
              stroke={strokeColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{
                strokeDasharray: isPathAnimated ? 'none' : '2000',
                strokeDashoffset: isPathAnimated ? '0' : '2000',
                transition: isPathAnimated ? 'none' : 'stroke-dashoffset 1000ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          )}

          {/* Crosshair Vertical e Ponto Ativo ao passar o mouse ou tocar */}
          {isHovered && currentPoint && (
            <>
              {/* Linha Vertical Crosshair */}
              <line
                x1={currentPoint.x}
                y1={padding.top}
                x2={currentPoint.x}
                y2={padding.top + graphHeight}
                stroke="rgba(255, 255, 255, 0.25)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />

              {/* Ponto iluminado na curva */}
              <circle
                cx={currentPoint.x}
                cy={currentPoint.y}
                r="6"
                fill="#07111F"
                stroke={strokeColor}
                strokeWidth="2.5"
                className="drop-shadow-[0_0_8px_rgba(25,195,125,0.8)]"
              />
              <circle
                cx={currentPoint.x}
                cy={currentPoint.y}
                r="2.5"
                fill="#FFFFFF"
              />
            </>
          )}
        </svg>

        {/* Tooltip Dinâmico conforme Item 14 (Data, Hora, Patrimônio, Rentabilidade, BTC, LTC) */}
        {isHovered && currentPoint && (
          <div
            className="absolute z-20 pointer-events-none bg-[#0B172A]/95 backdrop-blur-xl border border-white/10 rounded-xl p-3 shadow-financial-elevated w-52 sm:w-56 transition-all duration-75"
            style={{
              left: `${Math.min(Math.max(currentPoint.x - 110, 10), dimensions.width - 230)}px`,
              top: `${Math.max(currentPoint.y - 145, 10)}px`,
            }}
          >
            {/* Data e Hora */}
            <div className="flex items-center justify-between text-[10px] font-mono text-text-tertiary border-b border-white/[0.06] pb-1.5 mb-2">
              <span>{currentPoint.data.displayDate}</span>
              <span>{currentPoint.data.displayTime}</span>
            </div>

            {/* Patrimônio e Rentabilidade */}
            <div className="space-y-1 mb-2">
              <div className="text-[11px] text-text-secondary">Patrimônio:</div>
              <div className="text-sm font-bold text-text-primary tabular-numbers flex items-center justify-between">
                <span>{formatCurrency(currentPoint.data.totalBalanceBrl)}</span>
                <span className={`text-[11px] font-mono ${currentPoint.data.profitPercentage >= 0 ? 'text-positive' : 'text-negative'}`}>
                  {currentPoint.data.profitPercentage >= 0 ? '+' : ''}{currentPoint.data.profitPercentage.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Detalhe BTC e LTC */}
            <div className="pt-1.5 border-t border-white/[0.06] grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div>
                <span className="text-crypto-bitcoin text-[10px] block">BTC Cotação</span>
                <span className="text-text-primary">
                  {hideValues ? '••••' : `R$ ${currentPoint.data.btcPrice.toLocaleString('pt-BR')}`}
                </span>
              </div>
              <div>
                <span className="text-crypto-litecoin text-[10px] block">LTC Cotação</span>
                <span className="text-text-primary">
                  {hideValues ? '••••' : `R$ ${currentPoint.data.ltcPrice.toLocaleString('pt-BR')}`}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
