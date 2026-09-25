import React from 'react';
import { formatBRL } from '../../utils/formatters';

interface TransactionSummaryProps {
  amountBrl: number;
  asset: 'BTC' | 'LTC';
  assetName: string;
  quotePriceBrl: number;
  estimatedCryptoAmount: number;
  feesBrl?: number;
  className?: string;
}

export const TransactionSummary: React.FC<TransactionSummaryProps> = ({
  amountBrl,
  asset,
  assetName,
  quotePriceBrl,
  estimatedCryptoAmount,
  feesBrl = 0,
  className = '',
}) => {
  const assetColor = asset === 'BTC' ? '#F5A623' : '#B8C2CC';

  return (
    <div className={`p-4 rounded-xl bg-[#081325]/80 border border-white/10 space-y-3 ${className}`}>
      <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
        <span className="text-xs font-semibold text-text-tertiary uppercase tracking-wider">
          Resumo da Operação
        </span>
        <span
          className="text-xs font-mono font-bold px-2 py-0.5 rounded-full"
          style={{ backgroundColor: `${assetColor}20`, color: assetColor }}
        >
          {asset} • {assetName}
        </span>
      </div>

      <div className="space-y-2 text-xs">
        <div className="flex justify-between items-center">
          <span className="text-text-secondary">Valor alocado</span>
          <span className="font-mono font-bold text-text-primary tabular-numbers">
            {formatBRL(amountBrl)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-text-secondary">Cotação de referência</span>
          <span className="font-mono text-text-secondary tabular-numbers">
            {formatBRL(quotePriceBrl)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-text-secondary">Quantidade estimada</span>
          <span className="font-mono font-bold text-brand-cyan tabular-numbers">
            ≈ {estimatedCryptoAmount.toFixed(asset === 'BTC' ? 6 : 4)} {asset}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-text-secondary">Taxa de custódia / processamento</span>
          <span className="font-mono text-positive font-medium">
            {feesBrl === 0 ? 'Isento (Incluso)' : formatBRL(feesBrl)}
          </span>
        </div>
      </div>

      <div className="border-t border-white/10 pt-2.5 flex justify-between items-center">
        <span className="text-xs font-semibold text-text-primary">Total líquido estimado</span>
        <div className="text-right">
          <div className="text-sm font-bold font-mono text-text-primary tabular-numbers">
            {formatBRL(amountBrl)}
          </div>
          <div className="text-[11px] font-mono text-brand-cyan">
            ≈ {estimatedCryptoAmount.toFixed(asset === 'BTC' ? 6 : 4)} {asset}
          </div>
        </div>
      </div>
    </div>
  );
};
