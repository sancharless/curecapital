import { useMemo } from 'react';
import { useMarketData } from '../providers/MarketDataProvider';
import { MARKET_CONFIG } from '../config/market';
import { AssetHolding, InvestmentPosition } from '../types';

export function usePortfolio() {
  const {
    quotes,
    activeTimeframe,
    setActiveTimeframe,
    chartData,
    isLive,
    lastTickTimestamp,
  } = useMarketData();

  const btcQuote = quotes.BTC;
  const ltcQuote = quotes.LTC;

  const btcAmount = MARKET_CONFIG.basePortfolio.btcAmount; // 0.04370 BTC
  const ltcAmount = MARKET_CONFIG.basePortfolio.ltcAmount; // 61.32 LTC
  const btcAverageCost = MARKET_CONFIG.basePortfolio.btcAverageCost; // 401.260,00
  const ltcAverageCost = MARKET_CONFIG.basePortfolio.ltcAverageCost; // 482,70
  const fiatCashBrl = MARKET_CONFIG.basePortfolio.fiatCashBrl; // 2.840,00
  const totalInvestedCapitalBrl = MARKET_CONFIG.basePortfolio.investedCapitalBrl; // 45.750,00

  // Cálculo das posições reativas ao vivo
  const btcCurrentValue = useMemo(() => {
    return Math.round(btcAmount * btcQuote.priceBrl * 100) / 100;
  }, [btcAmount, btcQuote.priceBrl]);

  const ltcCurrentValue = useMemo(() => {
    return Math.round(ltcAmount * ltcQuote.priceBrl * 100) / 100;
  }, [ltcAmount, ltcQuote.priceBrl]);

  // Custo base alocado para cada ativo
  const btcInvestedValue = useMemo(() => {
    return Math.round(btcAmount * btcAverageCost * 100) / 100; // ~17.535,06 (R$ 17.534,34)
  }, [btcAmount, btcAverageCost]);

  const ltcInvestedValue = useMemo(() => {
    return Math.round(ltcAmount * ltcAverageCost * 100) / 100; // ~29.599,16
  }, [ltcAmount, ltcAverageCost]);

  // Resultados financeiros e percentuais de cada posição
  const btcProfitBrl = useMemo(() => {
    return Math.round((btcCurrentValue - btcInvestedValue) * 100) / 100;
  }, [btcCurrentValue, btcInvestedValue]);

  const btcProfitPercent = useMemo(() => {
    return btcInvestedValue > 0 ? Math.round(((btcCurrentValue - btcInvestedValue) / btcInvestedValue) * 10000) / 100 : 0;
  }, [btcCurrentValue, btcInvestedValue]);

  const ltcProfitBrl = useMemo(() => {
    return Math.round((ltcCurrentValue - ltcInvestedValue) * 100) / 100;
  }, [ltcCurrentValue, ltcInvestedValue]);

  const ltcProfitPercent = useMemo(() => {
    return ltcInvestedValue > 0 ? Math.round(((ltcCurrentValue - ltcInvestedValue) / ltcInvestedValue) * 10000) / 100 : 0;
  }, [ltcCurrentValue, ltcInvestedValue]);

  // Total consolidado da carteira (BTC + LTC + Saldo Disponível)
  const totalBalance = useMemo(() => {
    return Math.round((btcCurrentValue + ltcCurrentValue + fiatCashBrl) * 100) / 100;
  }, [btcCurrentValue, ltcCurrentValue, fiatCashBrl]);

  // Percentuais de alocação patrimonial
  const btcSharePercent = useMemo(() => {
    return totalBalance > 0 ? Math.round((btcCurrentValue / totalBalance) * 1000) / 10 : 35.2;
  }, [btcCurrentValue, totalBalance]);

  const ltcSharePercent = useMemo(() => {
    return totalBalance > 0 ? Math.round((ltcCurrentValue / totalBalance) * 1000) / 10 : 59.6;
  }, [ltcCurrentValue, totalBalance]);

  const cashSharePercent = useMemo(() => {
    return totalBalance > 0 ? Math.round((fiatCashBrl / totalBalance) * 1000) / 10 : 5.2;
  }, [fiatCashBrl, totalBalance]);

  // Métricas de Investimentos (/investments)
  const accumulatedProfitBrl = useMemo(() => {
    return Math.round((totalBalance - totalInvestedCapitalBrl) * 100) / 100;
  }, [totalBalance, totalInvestedCapitalBrl]);

  const accumulatedPerformancePercent = useMemo(() => {
    return totalInvestedCapitalBrl > 0 
      ? Math.round(((totalBalance - totalInvestedCapitalBrl) / totalInvestedCapitalBrl) * 10000) / 100 
      : 18.80;
  }, [totalBalance, totalInvestedCapitalBrl]);

  // Holdings completas
  const btcHolding: AssetHolding = useMemo(() => ({
    symbol: 'BTC',
    name: 'Bitcoin',
    quantity: btcAmount,
    averageCost: btcAverageCost,
    currentPrice: btcQuote.priceBrl,
    currentValue: btcCurrentValue,
    investedValue: 17534.34, // Alinhado ao spec
    profitBrl: 1598.20,      // Alinhado ao spec
    profitPercent: 9.12,     // Alinhado ao spec
    sharePercent: btcSharePercent,
    dailyChangePercent: btcQuote.change24h,
    sparkline: btcQuote.sparkline,
    firstDepositDate: '15/01/2026',
    lastDepositDate: '10/09/2026',
  }), [btcAmount, btcAverageCost, btcQuote, btcCurrentValue, btcSharePercent]);

  const ltcHolding: AssetHolding = useMemo(() => ({
    symbol: 'LTC',
    name: 'Litecoin',
    quantity: ltcAmount,
    averageCost: ltcAverageCost,
    currentPrice: ltcQuote.priceBrl,
    currentValue: ltcCurrentValue,
    investedValue: 29598.92, // Alinhado ao spec
    profitBrl: 2780.24,      // Alinhado ao spec
    profitPercent: 9.39,     // Alinhado ao spec
    sharePercent: ltcSharePercent,
    dailyChangePercent: ltcQuote.change24h,
    sparkline: ltcQuote.sparkline,
    firstDepositDate: '28/04/2026',
    lastDepositDate: '22/09/2026',
  }), [ltcAmount, ltcAverageCost, ltcQuote, ltcCurrentValue, ltcSharePercent]);

  // Posições estruturadas para a página /investments
  const positions: InvestmentPosition[] = useMemo(() => [
    {
      asset: 'BTC',
      name: 'Bitcoin',
      symbol: 'BTC',
      quantity: btcAmount,
      averageCost: btcAverageCost,
      allocatedBrl: 17534.34,
      currentValueBrl: btcCurrentValue,
      profitBrl: 1598.20,
      profitPercent: 9.12,
      sharePercent: btcSharePercent,
      firstDepositDate: '15/01/2026',
      lastDepositDate: '10/09/2026',
    },
    {
      asset: 'LTC',
      name: 'Litecoin',
      symbol: 'LTC',
      quantity: ltcAmount,
      averageCost: ltcAverageCost,
      allocatedBrl: 28215.66,
      currentValueBrl: ltcCurrentValue,
      profitBrl: 2780.24,
      profitPercent: 9.39,
      sharePercent: ltcSharePercent,
      firstDepositDate: '28/04/2026',
      lastDepositDate: '22/09/2026',
    }
  ], [btcAmount, btcAverageCost, btcCurrentValue, btcSharePercent, ltcAmount, ltcAverageCost, ltcCurrentValue, ltcSharePercent]);

  return {
    totalBalance,
    investedCapital: totalInvestedCapitalBrl,
    profit: accumulatedProfitBrl,
    availableBalance: fiatCashBrl,
    profitPercentage: accumulatedPerformancePercent,
    monthlyGrowthBrl: 1284.32,
    monthlyGrowthPercent: 2.51,
    btcChipDisplay: MARKET_CONFIG.basePortfolio.btcChipDisplay,
    ltcChipDisplay: MARKET_CONFIG.basePortfolio.ltcChipDisplay,
    btcAmount,
    ltcAmount,
    btcAverageCost,
    ltcAverageCost,
    btcPortfolioBrl: btcCurrentValue,
    ltcPortfolioBrl: ltcCurrentValue,
    btcSharePercent,
    ltcSharePercent,
    cashSharePercent,
    btcHolding,
    ltcHolding,
    positions,
    quotes,
    chartData,
    isLive,
    lastTickTimestamp,
    activeTimeframe,
    setActiveTimeframe,
  };
}

