export const MARKET_CONFIG = {
  initialPrices: {
    BTC: 437820.42,
    LTC: 524.82,
  },
  basePortfolio: {
    btcAmount: 0.04615,
    ltcAmount: 65.05,
    fiatCashBrl: 2840.00,
    investedCapitalBrl: 45750.00,
    targetDisplayBalance: 54351.85,
    btcChipDisplay: '0.12128 BTC',
    ltcChipDisplay: '99.33 LTC',
  },
  refreshIntervalMs: 3500, // 3.5 segundos para oscilação realista
  volatilityPercentage: 0.0008, // Micro-variação suave para estabilidade visual
} as const;
