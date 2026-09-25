import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { usePortfolio } from '../../hooks/usePortfolio';
import { usePrivacyStore } from '../../store/privacyStore';
import { formatBRL } from '../../utils/formatters';

interface AllocationItem {
  id: 'BTC' | 'LTC' | 'CASH';
  name: string;
  ticker: string;
  color: string;
  percent: number;
  valueBrl: number;
}

export const AllocationDonut: React.FC = () => {
  const { totalBalance, btcPortfolioBrl, ltcPortfolioBrl, availableBalance, btcSharePercent, ltcSharePercent, cashSharePercent } = usePortfolio();
  const hideValues = usePrivacyStore((s) => s.hideValues);

  const [hoveredItem, setHoveredItem] = useState<AllocationItem | null>(null);

  const data: AllocationItem[] = [
    {
      id: 'LTC',
      name: 'Litecoin',
      ticker: 'LTC',
      color: '#B8C2CC',
      percent: ltcSharePercent,
      valueBrl: ltcPortfolioBrl,
    },
    {
      id: 'BTC',
      name: 'Bitcoin',
      ticker: 'BTC',
      color: '#F5A623',
      percent: btcSharePercent,
      valueBrl: btcPortfolioBrl,
    },
    {
      id: 'CASH',
      name: 'Disponível',
      ticker: 'BRL',
      color: '#2563EB',
      percent: cashSharePercent,
      valueBrl: availableBalance,
    },
  ];

  // Configurações do Donut SVG
  const size = 160;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // Cálculo dos arcos para o SVG
  let accumulatedOffset = 0;
  const slices = data.map((item) => {
    const strokeDasharray = `${(item.percent / 100) * circumference} ${circumference}`;
    const strokeDashoffset = -accumulatedOffset;
    accumulatedOffset += (item.percent / 100) * circumference;
    return {
      ...item,
      strokeDasharray,
      strokeDashoffset,
    };
  });

  // Formatação compacta para o centro: "R$ 54,3 mil"
  const formattedCompact = (val: number) => {
    if (val >= 1000) {
      return `R$ ${(val / 1000).toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} mil`;
    }
    return formatBRL(val);
  };

  return (
    <Card variant="glass" radius="lg" className="p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-text-primary tracking-tight">
            Composição da Carteira
          </h3>
          <p className="text-xs text-text-tertiary mt-0.5">
            Distribuição proporcional dos ativos sob gestão
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-6 pt-2">
        {/* Gráfico Donut SVG Customizado */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg
            width={size}
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            className="transform -rotate-90 filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
            aria-label="Gráfico de pizza mostrando a composição da carteira: Bitcoin 35,2%, Litecoin 59,6%, Caixa Disponível 5,2%"
          >
            {/* Background ring */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="transparent"
              stroke="#0B192C"
              strokeWidth={strokeWidth}
            />

            {/* Slices com animação e efeito hover */}
            {slices.map((slice) => {
              const isHovered = hoveredItem?.id === slice.id;
              return (
                <circle
                  key={slice.id}
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  fill="transparent"
                  stroke={slice.color}
                  strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                  strokeDasharray={slice.strokeDasharray}
                  strokeDashoffset={slice.strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredItem(slice)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={() => setHoveredItem(hoveredItem?.id === slice.id ? null : slice)}
                />
              );
            })}
          </svg>

          {/* Centro do Donut conforme Item 6 */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-2">
            <span className="text-[10px] font-mono text-text-tertiary uppercase tracking-wider">
              {hoveredItem ? hoveredItem.name : 'Patrimônio'}
            </span>
            <span className="text-sm sm:text-base font-bold font-mono text-text-primary tabular-numbers">
              {hideValues
                ? 'R$ •••••'
                : hoveredItem
                ? formatBRL(hoveredItem.valueBrl)
                : formattedCompact(totalBalance)}
            </span>
            {hoveredItem && (
              <span className="text-[10px] font-mono font-bold" style={{ color: hoveredItem.color }}>
                {hoveredItem.percent}%
              </span>
            )}
          </div>
        </div>

        {/* Legenda Customizada conforme Item 5 & 6 */}
        <div className="flex-1 w-full space-y-2.5">
          {data.map((item) => {
            const isHovered = hoveredItem?.id === item.id;
            return (
              <div
                key={item.id}
                onMouseEnter={() => setHoveredItem(item)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  isHovered
                    ? 'bg-white/[0.06] border-white/20 ring-1 ring-white/10'
                    : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span
                    className="w-3 h-3 rounded-full shrink-0 shadow-sm"
                    style={{ backgroundColor: item.color }}
                  />
                  <div className="truncate">
                    <span className="text-xs font-semibold text-text-primary block truncate">
                      {item.name}
                    </span>
                    <span className="text-[10px] font-mono text-text-tertiary uppercase">
                      {item.ticker}
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs font-mono font-bold text-text-primary tabular-numbers">
                    {item.percent}%
                  </div>
                  <div className="text-[11px] font-mono text-text-tertiary tabular-numbers">
                    {hideValues ? '••••' : formatBRL(item.valueBrl)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
