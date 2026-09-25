import React from 'react';
import { usePortfolio } from '../../hooks/usePortfolio';
import { formatBRL } from '../../utils/formatters';

interface AssetSelectorProps {
  selectedAsset: 'BTC' | 'LTC';
  onSelect: (asset: 'BTC' | 'LTC') => void;
  className?: string;
  label?: string;
}

export const AssetSelector: React.FC<AssetSelectorProps> = ({
  selectedAsset,
  onSelect,
  className = '',
  label = 'Ativo de Destino',
}) => {
  const { quotes, btcHolding, ltcHolding } = usePortfolio();

  const assets = [
    {
      symbol: 'BTC' as const,
      name: 'Bitcoin',
      ticker: 'BTC',
      iconChar: '₿',
      color: '#F5A623',
      bgGlow: 'bg-[#F5A623]/10 border-[#F5A623]/40',
      price: quotes.BTC.priceBrl,
      holding: `${btcHolding.quantity} BTC`,
    },
    {
      symbol: 'LTC' as const,
      name: 'Litecoin',
      ticker: 'LTC',
      iconChar: 'Ł',
      color: '#B8C2CC',
      bgGlow: 'bg-[#B8C2CC]/10 border-[#B8C2CC]/40',
      price: quotes.LTC.priceBrl,
      holding: `${ltcHolding.quantity} LTC`,
    },
  ];

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-xs font-semibold text-text-secondary tracking-wide uppercase">
          {label}
        </label>
      )}

      <div className="grid grid-cols-2 gap-3">
        {assets.map((item) => {
          const isSelected = selectedAsset === item.symbol;
          return (
            <button
              key={item.symbol}
              type="button"
              onClick={() => onSelect(item.symbol)}
              className={`p-3.5 rounded-xl border transition-all text-left flex items-start gap-3 cursor-pointer ${
                isSelected
                  ? 'bg-brand-blue/10 border-brand-blue/60 shadow-[0_0_20px_rgba(37,99,235,0.15)] ring-1 ring-brand-blue/40'
                  : 'bg-[#091527]/60 border-white/5 hover:border-white/20 hover:bg-white/[0.03]'
              }`}
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 border border-white/10"
                style={{ backgroundColor: `${item.color}20`, color: item.color }}
              >
                {item.iconChar}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className="text-sm font-bold text-text-primary truncate">
                    {item.name}
                  </span>
                  <span
                    className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    {item.ticker}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-text-secondary mt-1 tabular-numbers">
                  {formatBRL(item.price)}
                </div>

                <div className="text-[10px] text-text-tertiary mt-0.5 font-mono truncate">
                  Posição: {item.holding}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
