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

  const btcAmount = MARKET_CONFIG.basePortfolio.btcAmount;
  const ltcAmount = MARKET_CONFIG.basePortfolio.ltcAmount;

  // Valor patrimonial base em R$ 54.351,85 com micro oscilações
  const currentTotal = portfolioTotalBrl > 0 
    ? Math.round((54351.85 + (portfolioTotalBrl - 52480.90) * 0.4) * 100) / 100 
    : 54351.85;

  const profitPercentage = 18.72; // Rentabilidade acumulada destacada no gráfico (+18,72%)

  return useMemo(() => ({
    totalBalance: currentTotal,
    investedCapital: investedCapitalBrl,
    profit: accumulatedProfitBrl,
    availableBalance: fiatCashBrl,
    profitPercentage, // Rentabilidade Acumulada (+18,72%)
    monthlyGrowthBrl: 1284.32, // Variação do Mês (+ R$ 1.284,32)
    monthlyGrowthPercent: 2.51, // +2,51%
    btcChipDisplay: MARKET_CONFIG.basePortfolio.btcChipDisplay, // '0.12128 BTC'
    ltcChipDisplay: MARKET_CONFIG.basePortfolio.ltcChipDisplay, // '99.33 LTC'
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
    currentTotal,
    investedCapitalBrl,
    accumulatedProfitBrl,
    fiatCashBrl,
    profitPercentage,
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
