export const MARKET_CONFIG = {
  initialPrices: {
    BTC: 437820.42,
    LTC: 528.04,
  },
  basePortfolio: {
    btcAmount: 0.04370,
    ltcAmount: 61.32,
    btcAverageCost: 401260.00,
    ltcAverageCost: 482.70,
    fiatCashBrl: 2840.00,
    investedCapitalBrl: 45750.00,
    accumulatedProfitBrl: 8601.85,
    targetDisplayBalance: 54351.85,
    btcChipDisplay: '0.12128 BTC',
    ltcChipDisplay: '99.33 LTC',
    firstDepositDate: '15/01/2026',
    lastDepositDate: '22/09/2026',
  },
  refreshIntervalMs: 3500, // 3.5 segundos para oscilação realista
  volatilityPercentage: 0.0006, // Micro-variação suave para estabilidade visual
} as const;

