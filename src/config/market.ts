export const MARKET_CONFIG = {
  initialPrices: {
    BTC: 437820.42,
    LTC: 524.82,
  },
  basePortfolio: {
    btcAmount: 0.04218,
    ltcAmount: 64.782,
    fiatCashBrl: 2840.00,
    investedCapitalBrl: 45750.00,
  },
  refreshIntervalMs: 3500, // 3.5 segundos para oscilação realista
  volatilityPercentage: 0.0018, // Pequena variação para realismo visual financeiro
} as const;
