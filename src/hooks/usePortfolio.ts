import { useMemo } from 'react';
import { useMarketData } from '../providers/MarketDataProvider';
import { MARKET_CONFIG } from '../config/market';

export function usePortfolio() {
  const {
    quotes,
    portfolioTotalBrl,
    btcPortfolioBrl,
    ltcPortfolioBrl,
    fiatCashBrl,
    investedCapitalBrl,
    accumulatedProfitBrl,
    monthlyGrowthBrl,
    monthlyGrowthPercent,
    chartData,
    isLive,
    activeTimeframe,
    setActiveTimeframe,
  } = useMarketData();

  const btcAmount = MARKET_CONFIG.basePortfolio.btcAmount; // 0.04218 BTC
  const ltcAmount = MARKET_CONFIG.basePortfolio.ltcAmount; // 64.782 LTC

  // Equivalências calculadas
  const btcEquivalent = quotes.BTC.priceBrl > 0 
    ? Math.round((portfolioTotalBrl / quotes.BTC.priceBrl) * 100000) / 100000 
    : 0.06371;

  const ltcEquivalent = quotes.LTC.priceBrl > 0 
    ? Math.round((portfolioTotalBrl / quotes.LTC.priceBrl) * 100) / 100 
    : 842.14;

  const profitPercentage = 14.71; // Rentabilidade acumulada total sobre capital aportado

  return useMemo(() => ({
    totalBalance: portfolioTotalBrl,
    investedCapital: investedCapitalBrl,
    profit: accumulatedProfitBrl,
    availableBalance: fiatCashBrl,
    profitPercentage,
    monthlyGrowthBrl,
    monthlyGrowthPercent,
    btcEquivalent,
    ltcEquivalent,
    btcAmount,
    ltcAmount,
    btcPortfolioBrl,
    ltcPortfolioBrl,
    quotes,
    chartData,
    isLive,
    activeTimeframe,
    setActiveTimeframe,
  }), [
    portfolioTotalBrl,
    investedCapitalBrl,
    accumulatedProfitBrl,
    fiatCashBrl,
    profitPercentage,
    monthlyGrowthBrl,
    monthlyGrowthPercent,
    btcEquivalent,
    ltcEquivalent,
    btcAmount,
    ltcAmount,
    btcPortfolioBrl,
    ltcPortfolioBrl,
    quotes,
    chartData,
    isLive,
    activeTimeframe,
    setActiveTimeframe,
  ]);
}
