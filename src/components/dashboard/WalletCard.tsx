import React from 'react';
import { Card } from '../ui/Card';
import { Wallet as WalletIcon } from 'lucide-react';
import { useMarketData } from '../../providers/MarketDataProvider';
import { usePrivacyStore } from '../../store/privacyStore';
import { MARKET_CONFIG } from '../../config/market';

export const WalletCard: React.FC = () => {
  const { quotes, btcPortfolioBrl, ltcPortfolioBrl, portfolioTotalBrl } = useMarketData();
  const formatCurrency = usePrivacyStore(s => s.formatCurrency);
  const hideValues = usePrivacyStore(s => s.hideValues);

  const btcAmount = MARKET_CONFIG.basePortfolio.btcAmount;
  const ltcAmount = MARKET_CONFIG.basePortfolio.ltcAmount;

  // Porcentagens dinâmicas
  const total = portfolioTotalBrl || 1;
  const btcPercentage = Math.round((btcPortfolioBrl / total) * 1000) / 10;
  const ltcPercentage = Math.round((ltcPortfolioBrl / total) * 1000) / 10;

  // SVG Donut Chart Minimalista
  // Raio 38, circunferência = 2 * PI * 38 = 238.76
  const circumference = 238.76;
  const ltcStroke = (ltcPercentage / 100) * circumference;
  const btcStroke = (btcPercentage / 100) * circumference;

  return (
    <Card variant="glass" radius="lg" className="flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-3">
        <div className="flex items-center gap-2">
          <WalletIcon className="w-4 h-4 text-brand-cyan" />
          <h3 className="text-sm font-semibold text-text-primary tracking-tight">Minha Carteira</h3>
        </div>
        <span className="text-[10px] font-mono text-text-tertiary">2 Ativos Custodiados</span>
      </div>

      <div className="flex items-center gap-4 py-1">
        {/* Donut Minimalista SVG */}
        <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="transparent"
              stroke="rgba(255, 255, 255, 0.05)"
              strokeWidth="8"
            />
            {/* Litecoin Ring (Prata / Cyan) */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="transparent"
              stroke="#B8C2CC"
              strokeWidth="8"
              strokeDasharray={`${ltcStroke} ${circumference}`}
              strokeDashoffset="0"
              strokeLinecap="round"
              className="transition-all duration-700"
            />
            {/* Bitcoin Ring (Dourado) */}
            <circle
              cx="50"
              cy="50"
              r="38"
              fill="transparent"
              stroke="#F5A623"
              strokeWidth="8"
              strokeDasharray={`${btcStroke} ${circumference}`}
              strokeDashoffset={`-${ltcStroke}`}
              strokeLinecap="round"
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-[10px] text-text-tertiary">Total</span>
            <span className="text-[11px] font-mono font-bold text-text-primary">100%</span>
          </div>
        </div>

        {/* Detalhamento dos Ativos */}
        <div className="flex-1 space-y-3 min-w-0">
          {/* Litecoin LTC (64.8%) */}
          <div className="space-y-0.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-crypto-litecoin" />
                <span className="font-semibold text-text-primary">LTC</span>
                <span className="text-[11px] font-mono text-text-tertiary">
                  {hideValues ? '••••' : `${ltcAmount.toFixed(3)} LTC`}
                </span>
              </div>
              <span className="font-mono text-xs text-crypto-litecoin font-medium">{ltcPercentage}%</span>
            </div>
            <div className="text-[11px] font-mono text-text-secondary pl-3.5">
              {formatCurrency(ltcPortfolioBrl)}
            </div>
          </div>

          {/* Bitcoin BTC (35.2%) */}
          <div className="space-y-0.5">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-crypto-bitcoin" />
                <span className="font-semibold text-text-primary">BTC</span>
                <span className="text-[11px] font-mono text-text-tertiary">
                  {hideValues ? '••••' : `${btcAmount.toFixed(5)} BTC`}
                </span>
              </div>
              <span className="font-mono text-xs text-crypto-bitcoin font-medium">{btcPercentage}%</span>
            </div>
            <div className="text-[11px] font-mono text-text-secondary pl-3.5">
              {formatCurrency(btcPortfolioBrl)}
            </div>
          </div>
        </div>
      </div>

      <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-text-tertiary">
        <span>Custódia Segregada</span>
        <span className="text-positive font-mono">100% On-chain</span>
      </div>
    </Card>
  );
};
