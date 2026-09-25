import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { MarketQuote, PortfolioHistoryPoint, TimeframeFilter } from '../types';
import { marketAdapter } from '../services/marketAdapter';
import { MARKET_CONFIG } from '../config/market';
import { MOCK_CHART_TIMEFRAMES } from '../data/mockData';

interface MarketContextValue {
  quotes: Record<'BTC' | 'LTC', MarketQuote>;
  portfolioTotalBrl: number;
  btcPortfolioBrl: number;
  ltcPortfolioBrl: number;
  fiatCashBrl: number;
  investedCapitalBrl: number;
  accumulatedProfitBrl: number;
  monthlyGrowthPercent: number;
  monthlyGrowthBrl: number;
  isLive: boolean;
  activeTimeframe: TimeframeFilter;
  setActiveTimeframe: (tf: TimeframeFilter) => void;
  chartData: PortfolioHistoryPoint[];
  lastTickTimestamp: Date;
}

const MarketContext = createContext<MarketContextValue | null>(null);

export const MarketDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [quotes, setQuotes] = useState<Record<'BTC' | 'LTC', MarketQuote>>(() => ({
    BTC: {
      symbol: 'BTC',
      name: 'Bitcoin',
      priceBrl: MARKET_CONFIG.initialPrices.BTC,
      change24h: 1.84,
      high24h: 442100.00,
      low24h: 431500.00,
      volume24hBrl: 48920150.00,
      sparkline: [431500, 432800, 434100, 433900, 435800, 436400, 437820.42],
      lastUpdated: new Date(),
    },
    LTC: {
      symbol: 'LTC',
      name: 'Litecoin',
      priceBrl: MARKET_CONFIG.initialPrices.LTC,
      change24h: 2.14,
      high24h: 532.40,
      low24h: 512.10,
      volume24hBrl: 7840120.00,
      sparkline: [512.10, 514.80, 517.20, 516.40, 521.00, 522.90, 524.82],
      lastUpdated: new Date(),
    }
  }));

  const [activeTimeframe, setActiveTimeframe] = useState<TimeframeFilter>('30D');
  const [chartData, setChartData] = useState<PortfolioHistoryPoint[]>(() => MOCK_CHART_TIMEFRAMES['30D']);
  const [lastTickTimestamp, setLastTickTimestamp] = useState<Date>(new Date());

  // Inscrição no MarketDataAdapter para cotações em tempo real
  useEffect(() => {
    const unsubscribe = marketAdapter.subscribeAll((newQuotes) => {
      setQuotes(newQuotes);
      setLastTickTimestamp(new Date());

      // Atualiza suavemente o último ponto do gráfico de patrimônio sem reconstruir todo o array
      const currentBtcVal = MARKET_CONFIG.basePortfolio.btcAmount * newQuotes.BTC.priceBrl;
      const currentLtcVal = MARKET_CONFIG.basePortfolio.ltcAmount * newQuotes.LTC.priceBrl;
      const currentTotal = Math.round((currentBtcVal + currentLtcVal) * 100) / 100;

      setChartData(prev => {
        if (!prev || prev.length === 0) return prev;
        const lastIndex = prev.length - 1;
        const lastPoint = prev[lastIndex];

        // Atualiza somente o último ponto com a cotação em tempo real
        const updatedLastPoint: PortfolioHistoryPoint = {
          ...lastPoint,
          totalBalanceBrl: currentTotal,
          btcPrice: newQuotes.BTC.priceBrl,
          ltcPrice: newQuotes.LTC.priceBrl,
        };

        const next = [...prev];
        next[lastIndex] = updatedLastPoint;
        return next;
      });
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // Troca de período histórico
  useEffect(() => {
    marketAdapter.getHistoricalPrices(activeTimeframe).then(data => {
      setChartData(data);
    });
  }, [activeTimeframe]);

  // Cálculos patrimoniais baseados nas cotações e saldos simulados
  const btcPortfolioBrl = useMemo(() => {
    return Math.round((MARKET_CONFIG.basePortfolio.btcAmount * quotes.BTC.priceBrl) * 100) / 100;
  }, [quotes.BTC.priceBrl]);

  const ltcPortfolioBrl = useMemo(() => {
    return Math.round((MARKET_CONFIG.basePortfolio.ltcAmount * quotes.LTC.priceBrl) * 100) / 100;
  }, [quotes.LTC.priceBrl]);

  const portfolioTotalBrl = useMemo(() => {
    return Math.round((btcPortfolioBrl + ltcPortfolioBrl) * 100) / 100;
  }, [btcPortfolioBrl, ltcPortfolioBrl]);

  const investedCapitalBrl = MARKET_CONFIG.basePortfolio.investedCapitalBrl;
  const fiatCashBrl = MARKET_CONFIG.basePortfolio.fiatCashBrl;
  
  const accumulatedProfitBrl = useMemo(() => {
    return Math.round((portfolioTotalBrl - investedCapitalBrl) * 100) / 100;
  }, [portfolioTotalBrl, investedCapitalBrl]);

  const monthlyGrowthBrl = 1284.32;
  const monthlyGrowthPercent = 2.51;

  const value = useMemo(() => ({
    quotes,
    portfolioTotalBrl,
    btcPortfolioBrl,
    ltcPortfolioBrl,
    fiatCashBrl,
    investedCapitalBrl,
    accumulatedProfitBrl,
    monthlyGrowthPercent,
    monthlyGrowthBrl,
    isLive: true,
    activeTimeframe,
    setActiveTimeframe,
    chartData,
    lastTickTimestamp,
  }), [
    quotes,
    portfolioTotalBrl,
    btcPortfolioBrl,
    ltcPortfolioBrl,
    fiatCashBrl,
    investedCapitalBrl,
    accumulatedProfitBrl,
    monthlyGrowthPercent,
    monthlyGrowthBrl,
    activeTimeframe,
    chartData,
    lastTickTimestamp,
  ]);

  return (
    <MarketContext.Provider value={value}>
      {children}
    </MarketContext.Provider>
  );
};

export const useMarketData = () => {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error('useMarketData deve ser utilizado dentro de um MarketDataProvider');
  }
  return context;
};
