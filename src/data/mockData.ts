import { 
  Transaction, 
  MarketQuote, 
  PortfolioHistoryPoint, 
  AffiliateStats, 
  AffiliateFunnelData, 
  AffiliateReferral, 
  AdminMetrics, 
  AuditLog 
} from '../types';

export const INITIAL_MARKET_QUOTES: Record<'BTC' | 'LTC', MarketQuote> = {
  BTC: {
    symbol: 'BTC',
    name: 'Bitcoin',
    priceBrl: 437820.42,
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
    priceBrl: 524.82,
    change24h: 2.14,
    high24h: 532.40,
    low24h: 512.10,
    volume24hBrl: 7840120.00,
    sparkline: [512.10, 514.80, 517.20, 516.40, 521.00, 522.90, 524.82],
    lastUpdated: new Date(),
  }
};

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-98214',
    userId: 'usr-rafael',
    type: 'yield',
    asset: 'BRL',
    amount: 284.32,
    amountFiatBrl: 284.32,
    status: 'completed',
    createdAt: '24/09/2026 18:30',
    reference: 'CUR-260924-Y84D12',
    description: 'Rendimento diário apurado sobre alocação patrimonial',
  },
  {
    id: 'tx-98188',
    userId: 'usr-rafael',
    type: 'deposit',
    asset: 'LTC',
    amount: 9.469,
    amountFiatBrl: 5000.00,
    status: 'completed',
    createdAt: '22/09/2026 14:15',
    reference: 'CUR-260922-L89A74',
    description: 'Aporte de capital em Litecoin via carteira fria',
    txHash: '9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b',
  },
  {
    id: 'tx-97940',
    userId: 'usr-rafael',
    type: 'commission',
    asset: 'BRL',
    amount: 124.90,
    amountFiatBrl: 124.90,
    status: 'completed',
    createdAt: '19/09/2026 11:02',
    reference: 'CUR-260919-C12B90',
    description: 'Comissão de indicação patrimonial — Thiago Miranda',
  },
  {
    id: 'tx-97510',
    userId: 'usr-rafael',
    type: 'withdrawal',
    asset: 'BRL',
    amount: -800.00,
    amountFiatBrl: -800.00,
    status: 'completed',
    createdAt: '17/09/2026 09:40',
    reference: 'CUR-260917-W80P41',
    description: 'Resgate de liquidez para conta bancária via TED/PIX',
  },
  {
    id: 'tx-97120',
    userId: 'usr-rafael',
    type: 'yield',
    asset: 'BRL',
    amount: 312.45,
    amountFiatBrl: 312.45,
    status: 'completed',
    createdAt: '15/09/2026 18:30',
    reference: 'CUR-260915-Y31K45',
    description: 'Rendimento diário apurado sobre alocação patrimonial',
  },
  {
    id: 'tx-96890',
    userId: 'usr-rafael',
    type: 'deposit',
    asset: 'BTC',
    amount: 0.025,
    amountFiatBrl: 10850.00,
    status: 'completed',
    createdAt: '10/09/2026 16:55',
    reference: 'CUR-260910-B02E50',
    description: 'Aporte institucional Bitcoin via segregação patrimonial',
    txHash: 'e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9a8b7c6d5',
  },
  {
    id: 'tx-96420',
    userId: 'usr-rafael',
    type: 'commission',
    asset: 'BRL',
    amount: 345.80,
    amountFiatBrl: 345.80,
    status: 'completed',
    createdAt: '05/09/2026 12:20',
    reference: 'CUR-260905-C34F80',
    description: 'Comissão de indicação patrimonial — Fernanda Vasconcelos',
  },
  {
    id: 'tx-96010',
    userId: 'usr-rafael',
    type: 'conversion',
    asset: 'LTC',
    amount: 15.2,
    amountFiatBrl: 7977.26,
    status: 'completed',
    createdAt: '01/09/2026 10:11',
    reference: 'CUR-260901-K15L20',
    description: 'Rebalanceamento de carteira BRL para LTC',
  },
];

export const MOCK_CONTRIBUTIONS = [
  {
    id: 'dep-01',
    date: '22/09/2026',
    asset: 'LTC' as const,
    amountFiat: 5000.00,
    amountCrypto: 9.469,
    priceAtDeposit: 528.04,
    status: 'completed' as const,
    reference: 'CUR-260922-L89A74',
    method: 'Aporte Carteira Fria',
  },
  {
    id: 'dep-02',
    date: '10/09/2026',
    asset: 'BTC' as const,
    amountFiat: 10850.00,
    amountCrypto: 0.025,
    priceAtDeposit: 434000.00,
    status: 'completed' as const,
    reference: 'CUR-260910-B02E50',
    method: 'Custódia Institucional Segregada',
  },
  {
    id: 'dep-03',
    date: '15/07/2026',
    asset: 'LTC' as const,
    amountFiat: 12000.00,
    amountCrypto: 24.896,
    priceAtDeposit: 482.00,
    status: 'completed' as const,
    reference: 'CUR-260715-L24B10',
    method: 'Aporte Bancário Estruturado',
  },
  {
    id: 'dep-04',
    date: '28/04/2026',
    asset: 'LTC' as const,
    amountFiat: 11200.00,
    amountCrypto: 23.955,
    priceAtDeposit: 467.50,
    status: 'completed' as const,
    reference: 'CUR-260428-L23M95',
    method: 'Aporte de Liquidez Primária',
  },
  {
    id: 'dep-05',
    date: '15/01/2026',
    asset: 'BTC' as const,
    amountFiat: 6700.00,
    amountCrypto: 0.01870,
    priceAtDeposit: 358288.77,
    status: 'completed' as const,
    reference: 'CUR-260115-B18A70',
    method: 'Aporte Inaugural de Custódia',
  },
];


// Dados históricos do gráfico com pontos estruturados para cada filtro
export const MOCK_CHART_TIMEFRAMES: Record<string, PortfolioHistoryPoint[]> = {
  '24H': [
    { timestamp: '2026-09-25T00:00:00', displayDate: 'Hoje', displayTime: '00:00', totalBalanceBrl: 52120.40, profitPercentage: 0.12, btcPrice: 435100, ltcPrice: 520.10, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-09-25T03:00:00', displayDate: 'Hoje', displayTime: '03:00', totalBalanceBrl: 52190.15, profitPercentage: 0.25, btcPrice: 435800, ltcPrice: 521.40, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-09-25T06:00:00', displayDate: 'Hoje', displayTime: '06:00', totalBalanceBrl: 52280.90, profitPercentage: 0.42, btcPrice: 436400, ltcPrice: 522.60, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-09-25T09:00:00', displayDate: 'Hoje', displayTime: '09:00', totalBalanceBrl: 52360.50, profitPercentage: 0.58, btcPrice: 437100, ltcPrice: 523.80, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-09-25T11:42:00', displayDate: '25 SET 2026', displayTime: '11:42', totalBalanceBrl: 52480.90, profitPercentage: 0.69, btcPrice: 437820, ltcPrice: 524.82, btcAmount: 0.04218, ltcAmount: 64.782 },
  ],
  '7D': [
    { timestamp: '2026-09-18T10:00:00', displayDate: '18 SET 2026', displayTime: '10:00', totalBalanceBrl: 51940.00, profitPercentage: 0.20, btcPrice: 432500, ltcPrice: 518.20, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-09-19T10:00:00', displayDate: '19 SET 2026', displayTime: '10:00', totalBalanceBrl: 52080.30, profitPercentage: 0.47, btcPrice: 433900, ltcPrice: 519.80, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-09-20T10:00:00', displayDate: '20 SET 2026', displayTime: '10:00', totalBalanceBrl: 52140.80, profitPercentage: 0.59, btcPrice: 434200, ltcPrice: 520.50, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-09-21T10:00:00', displayDate: '21 SET 2026', displayTime: '10:00', totalBalanceBrl: 52210.10, profitPercentage: 0.72, btcPrice: 435100, ltcPrice: 521.90, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-09-22T10:00:00', displayDate: '22 SET 2026', displayTime: '10:00', totalBalanceBrl: 52310.40, profitPercentage: 0.91, btcPrice: 436300, ltcPrice: 523.10, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-09-23T10:00:00', displayDate: '23 SET 2026', displayTime: '10:00', totalBalanceBrl: 52380.00, profitPercentage: 1.05, btcPrice: 436900, ltcPrice: 523.80, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-09-24T10:00:00', displayDate: '24 SET 2026', displayTime: '10:00', totalBalanceBrl: 52410.20, profitPercentage: 1.10, btcPrice: 437200, ltcPrice: 524.10, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-09-25T11:42:00', displayDate: '25 SET 2026', displayTime: '11:42', totalBalanceBrl: 52480.90, profitPercentage: 1.23, btcPrice: 437820, ltcPrice: 524.82, btcAmount: 0.04218, ltcAmount: 64.782 },
  ],
  '30D': [
    { timestamp: '2026-08-26T10:00:00', displayDate: '26 AGO 2026', displayTime: '10:00', totalBalanceBrl: 51196.58, profitPercentage: 0.00, btcPrice: 424100, ltcPrice: 508.40, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-08-31T10:00:00', displayDate: '31 AGO 2026', displayTime: '10:00', totalBalanceBrl: 51430.00, profitPercentage: 0.45, btcPrice: 426800, ltcPrice: 510.90, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-09-05T10:00:00', displayDate: '05 SET 2026', displayTime: '10:00', totalBalanceBrl: 51720.80, profitPercentage: 1.02, btcPrice: 429900, ltcPrice: 514.20, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-09-10T10:00:00', displayDate: '10 SET 2026', displayTime: '10:00', totalBalanceBrl: 51980.40, profitPercentage: 1.53, btcPrice: 433100, ltcPrice: 517.50, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-09-15T10:00:00', displayDate: '15 SET 2026', displayTime: '10:00', totalBalanceBrl: 52190.20, profitPercentage: 1.94, btcPrice: 435400, ltcPrice: 520.10, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-09-20T10:00:00', displayDate: '20 SET 2026', displayTime: '10:00', totalBalanceBrl: 52340.60, profitPercentage: 2.23, btcPrice: 436800, ltcPrice: 522.40, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-09-25T11:42:00', displayDate: '25 SET 2026', displayTime: '11:42', totalBalanceBrl: 52480.90, profitPercentage: 2.51, btcPrice: 437820, ltcPrice: 524.82, btcAmount: 0.04218, ltcAmount: 64.782 },
  ],
  '3M': [
    { timestamp: '2026-06-25T10:00:00', displayDate: '25 JUN 2026', displayTime: '10:00', totalBalanceBrl: 48920.00, profitPercentage: 0.00, btcPrice: 405000, ltcPrice: 482.00, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-07-25T10:00:00', displayDate: '25 JUL 2026', displayTime: '10:00', totalBalanceBrl: 50110.00, profitPercentage: 2.43, btcPrice: 416000, ltcPrice: 498.00, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-08-25T10:00:00', displayDate: '25 AGO 2026', displayTime: '10:00', totalBalanceBrl: 51190.00, profitPercentage: 4.64, btcPrice: 424000, ltcPrice: 508.00, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-09-25T11:42:00', displayDate: '25 SET 2026', displayTime: '11:42', totalBalanceBrl: 52480.90, profitPercentage: 7.28, btcPrice: 437820, ltcPrice: 524.82, btcAmount: 0.04218, ltcAmount: 64.782 },
  ],
  '6M': [
    { timestamp: '2026-03-25T10:00:00', displayDate: '25 MAR 2026', displayTime: '10:00', totalBalanceBrl: 46100.00, profitPercentage: 0.00, btcPrice: 382000, ltcPrice: 450.00, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-05-25T10:00:00', displayDate: '25 MAI 2026', displayTime: '10:00', totalBalanceBrl: 48200.00, profitPercentage: 4.55, btcPrice: 398000, ltcPrice: 472.00, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-07-25T10:00:00', displayDate: '25 JUL 2026', displayTime: '10:00', totalBalanceBrl: 50400.00, profitPercentage: 9.32, btcPrice: 418000, ltcPrice: 501.00, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-09-25T11:42:00', displayDate: '25 SET 2026', displayTime: '11:42', totalBalanceBrl: 52480.90, profitPercentage: 13.84, btcPrice: 437820, ltcPrice: 524.82, btcAmount: 0.04218, ltcAmount: 64.782 },
  ],
  '1A': [
    { timestamp: '2025-09-25T10:00:00', displayDate: '25 SET 2025', displayTime: '10:00', totalBalanceBrl: 44200.00, profitPercentage: 0.00, btcPrice: 360000, ltcPrice: 420.00, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-01-25T10:00:00', displayDate: '25 JAN 2026', displayTime: '10:00', totalBalanceBrl: 46800.00, profitPercentage: 5.88, btcPrice: 385000, ltcPrice: 455.00, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-05-25T10:00:00', displayDate: '25 MAI 2026', displayTime: '10:00', totalBalanceBrl: 49400.00, profitPercentage: 11.76, btcPrice: 410000, ltcPrice: 489.00, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-09-25T11:42:00', displayDate: '25 SET 2026', displayTime: '11:42', totalBalanceBrl: 52480.90, profitPercentage: 18.72, btcPrice: 437820, ltcPrice: 524.82, btcAmount: 0.04218, ltcAmount: 64.782 },
  ],
  'ALL': [
    { timestamp: '2025-01-10T10:00:00', displayDate: '10 JAN 2025', displayTime: '10:00', totalBalanceBrl: 40000.00, profitPercentage: 0.00, btcPrice: 320000, ltcPrice: 380.00, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2025-07-10T10:00:00', displayDate: '10 JUL 2025', displayTime: '10:00', totalBalanceBrl: 43500.00, profitPercentage: 8.75, btcPrice: 350000, ltcPrice: 410.00, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-01-10T10:00:00', displayDate: '10 JAN 2026', displayTime: '10:00', totalBalanceBrl: 47200.00, profitPercentage: 18.00, btcPrice: 388000, ltcPrice: 460.00, btcAmount: 0.04218, ltcAmount: 64.782 },
    { timestamp: '2026-09-25T11:42:00', displayDate: '25 SET 2026', displayTime: '11:42', totalBalanceBrl: 52480.90, profitPercentage: 31.20, btcPrice: 437820, ltcPrice: 524.82, btcAmount: 0.04218, ltcAmount: 64.782 },
  ]
};

export const MOCK_AFFILIATE_STATS: AffiliateStats = {
  totalReferredAmountBrl: 84320.00,
  totalAffiliatesCount: 41,
  activeAffiliatesCount: 12,
  totalCommissionsBrl: 2140.80,
  conversionRate: 14.28,
};

export const MOCK_AFFILIATE_FUNNEL: AffiliateFunnelData = {
  clicks: 342,
  cadastros: 84,
  verified: 41,
  investors: 12,
  clicksToRegRate: 24.56,
  regToVerifiedRate: 48.80,
  verifiedToInvestRate: 29.26,
} as unknown as AffiliateFunnelData;

export const MOCK_AFFILIATE_REFERRALS: AffiliateReferral[] = [
  {
    id: 'ref-1',
    userName: 'Guilherme Sampaio',
    userEmailMasked: 'gui***@gmail.com',
    joinedAt: '24/09/2026',
    event: 'Aporte de Capital (LTC)',
    commissionBrl: 185.40,
    status: 'completed',
  },
  {
    id: 'ref-2',
    userName: 'Carolina Mendes de Arruda',
    userEmailMasked: 'carol***@outlook.com',
    joinedAt: '21/09/2026',
    event: 'Aporte de Capital (BTC)',
    commissionBrl: 420.00,
    status: 'completed',
  },
  {
    id: 'ref-3',
    userName: 'Marcelo Pires Nogueira',
    userEmailMasked: 'marcelo***@terra.com.br',
    joinedAt: '18/09/2026',
    event: 'Comissão Mensal de Alocação',
    commissionBrl: 92.50,
    status: 'completed',
  },
  {
    id: 'ref-4',
    userName: 'Juliana Fagundes Castro',
    userEmailMasked: 'ju.castro***@gmail.com',
    joinedAt: '15/09/2026',
    event: 'Aporte de Liquidez (BRL)',
    commissionBrl: 310.00,
    status: 'completed',
  },
  {
    id: 'ref-5',
    userName: 'Renato Farias Barreto',
    userEmailMasked: 'renato***@uol.com.br',
    joinedAt: '08/09/2026',
    event: 'Aporte de Capital (BTC)',
    commissionBrl: 580.00,
    status: 'completed',
  },
];

export const MOCK_ADMIN_METRICS: AdminMetrics = {
  aumBrl: 48720450.00,
  totalUsers: 1420,
  activeUsers: 842,
  totalDepositsBrl: 52180000.00,
  totalWithdrawalsBrl: 11430000.00,
  distributedYieldsBrl: 6480320.00,
  btcVolume: 84.15,
  ltcVolume: 12480.50,
  totalCommissionsBrl: 742180.00,
};

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  {
    event_id: 'evt-20260925-01',
    admin_id: 'adm-rodrigo-diretoria',
    timestamp: '25/09/2026 10:14:02',
    action: 'YIELD_RATE_UPDATE',
    old_value: '1.65%',
    new_value: '1.70%',
    ip: '187.112.44.19',
    device: 'MacBook Pro macOS 15.1 Safari',
  },
  {
    event_id: 'evt-20260924-88',
    admin_id: 'adm-lucas-compliance',
    timestamp: '24/09/2026 16:45:20',
    action: 'KYC_TIER_UPGRADE',
    old_value: 'Tier 2 (R$ 50k limit)',
    new_value: 'Tier 3 VIP (Sem limite)',
    ip: '177.34.88.201',
    device: 'ThinkPad Windows 11 Chrome',
  },
  {
    event_id: 'evt-20260923-45',
    admin_id: 'adm-rodrigo-diretoria',
    timestamp: '23/09/2026 11:22:15',
    action: 'LEDGER_SETTLEMENT_BATCH',
    old_value: 'Pending verification (148 tx)',
    new_value: 'Reconciled & Settled',
    ip: '187.112.44.19',
    device: 'MacBook Pro macOS 15.1 Safari',
  },
];

// Dados históricos para gráfico de 2 linhas em /investments (Capital Aportado vs Patrimônio)
export const MOCK_INVESTMENT_PERFORMANCE: Record<string, {
  timestamp: string;
  displayDate: string;
  investedCapital: number;
  portfolioValue: number;
  profitBrl: number;
  profitPercentage: number;
}[]> = {
  '30D': [
    { timestamp: '2026-08-26', displayDate: '26 AGO 2026', investedCapital: 40750.00, portfolioValue: 47820.00, profitBrl: 7070.00, profitPercentage: 17.35 },
    { timestamp: '2026-09-02', displayDate: '02 SET 2026', investedCapital: 40750.00, portfolioValue: 48940.00, profitBrl: 8190.00, profitPercentage: 20.09 },
    { timestamp: '2026-09-10', displayDate: '10 SET 2026', investedCapital: 40750.00, portfolioValue: 49810.00, profitBrl: 9060.00, profitPercentage: 22.23 },
    { timestamp: '2026-09-15', displayDate: '15 SET 2026', investedCapital: 44000.00, portfolioValue: 51260.32, profitBrl: 7260.32, profitPercentage: 16.50 },
    { timestamp: '2026-09-22', displayDate: '22 SET 2026', investedCapital: 45750.00, portfolioValue: 53890.00, profitBrl: 8140.00, profitPercentage: 17.79 },
    { timestamp: '2026-09-25', displayDate: '25 SET 2026', investedCapital: 45750.00, portfolioValue: 54351.85, profitBrl: 8601.85, profitPercentage: 18.80 },
  ],
  '3M': [
    { timestamp: '2026-06-25', displayDate: '25 JUN 2026', investedCapital: 33750.00, portfolioValue: 37920.00, profitBrl: 4170.00, profitPercentage: 12.35 },
    { timestamp: '2026-07-15', displayDate: '15 JUL 2026', investedCapital: 38750.00, portfolioValue: 44100.00, profitBrl: 5350.00, profitPercentage: 13.80 },
    { timestamp: '2026-08-15', displayDate: '15 AGO 2026', investedCapital: 40750.00, portfolioValue: 47200.00, profitBrl: 6450.00, profitPercentage: 15.82 },
    { timestamp: '2026-09-25', displayDate: '25 SET 2026', investedCapital: 45750.00, portfolioValue: 54351.85, profitBrl: 8601.85, profitPercentage: 18.80 },
  ],
  '6M': [
    { timestamp: '2026-03-25', displayDate: '25 MAR 2026', investedCapital: 22550.00, portfolioValue: 24800.00, profitBrl: 2250.00, profitPercentage: 9.97 },
    { timestamp: '2026-04-28', displayDate: '28 ABR 2026', investedCapital: 27550.00, portfolioValue: 30940.00, profitBrl: 3390.00, profitPercentage: 12.30 },
    { timestamp: '2026-06-25', displayDate: '25 JUN 2026', investedCapital: 33750.00, portfolioValue: 37920.00, profitBrl: 4170.00, profitPercentage: 12.35 },
    { timestamp: '2026-08-15', displayDate: '15 AGO 2026', investedCapital: 40750.00, portfolioValue: 47200.00, profitBrl: 6450.00, profitPercentage: 15.82 },
    { timestamp: '2026-09-25', displayDate: '25 SET 2026', investedCapital: 45750.00, portfolioValue: 54351.85, profitBrl: 8601.85, profitPercentage: 18.80 },
  ],
  '1A': [
    { timestamp: '2025-09-25', displayDate: '25 SET 2025', investedCapital: 15000.00, portfolioValue: 15450.00, profitBrl: 450.00, profitPercentage: 3.00 },
    { timestamp: '2026-01-15', displayDate: '15 JAN 2026', investedCapital: 21700.00, portfolioValue: 23900.00, profitBrl: 2200.00, profitPercentage: 10.13 },
    { timestamp: '2026-04-28', displayDate: '28 ABR 2026', investedCapital: 27550.00, portfolioValue: 30940.00, profitBrl: 3390.00, profitPercentage: 12.30 },
    { timestamp: '2026-07-15', displayDate: '15 JUL 2026', investedCapital: 38750.00, portfolioValue: 44100.00, profitBrl: 5350.00, profitPercentage: 13.80 },
    { timestamp: '2026-09-25', displayDate: '25 SET 2026', investedCapital: 45750.00, portfolioValue: 54351.85, profitBrl: 8601.85, profitPercentage: 18.80 },
  ],
  'ALL': [
    { timestamp: '2025-01-15', displayDate: '15 JAN 2025', investedCapital: 10000.00, portfolioValue: 10000.00, profitBrl: 0.00, profitPercentage: 0.00 },
    { timestamp: '2025-06-15', displayDate: '15 JUN 2025', investedCapital: 15000.00, portfolioValue: 15800.00, profitBrl: 800.00, profitPercentage: 5.33 },
    { timestamp: '2026-01-15', displayDate: '15 JAN 2026', investedCapital: 21700.00, portfolioValue: 23900.00, profitBrl: 2200.00, profitPercentage: 10.13 },
    { timestamp: '2026-05-15', displayDate: '15 MAI 2026', investedCapital: 33750.00, portfolioValue: 38200.00, profitBrl: 4450.00, profitPercentage: 13.18 },
    { timestamp: '2026-09-25', displayDate: '25 SET 2026', investedCapital: 45750.00, portfolioValue: 54351.85, profitBrl: 8601.85, profitPercentage: 18.80 },
  ]
};

// Histórico de preços para ativos individuais com filtros de período
export const MOCK_ASSET_CHARTS: Record<'BTC' | 'LTC', Record<string, { timestamp: string; displayDate: string; price: number }[]>> = {
  BTC: {
    '24H': [
      { timestamp: '00:00', displayDate: '00:00', price: 432100 },
      { timestamp: '04:00', displayDate: '04:00', price: 433400 },
      { timestamp: '08:00', displayDate: '08:00', price: 434800 },
      { timestamp: '12:00', displayDate: '12:00', price: 436200 },
      { timestamp: '16:00', displayDate: '16:00', price: 435900 },
      { timestamp: '20:00', displayDate: '20:00', price: 437100 },
      { timestamp: 'Agora', displayDate: 'Agora', price: 437820.42 },
    ],
    '7D': [
      { timestamp: '18 SET', displayDate: '18 SET', price: 429800 },
      { timestamp: '19 SET', displayDate: '19 SET', price: 431200 },
      { timestamp: '20 SET', displayDate: '20 SET', price: 432500 },
      { timestamp: '21 SET', displayDate: '21 SET', price: 434100 },
      { timestamp: '22 SET', displayDate: '22 SET', price: 435800 },
      { timestamp: '23 SET', displayDate: '23 SET', price: 436900 },
      { timestamp: '24 SET', displayDate: '24 SET', price: 437200 },
      { timestamp: '25 SET', displayDate: '25 SET', price: 437820.42 },
    ],
    '30D': [
      { timestamp: '26 AGO', displayDate: '26 AGO', price: 412000 },
      { timestamp: '02 SET', displayDate: '02 SET', price: 418500 },
      { timestamp: '09 SET', displayDate: '09 SET', price: 424200 },
      { timestamp: '16 SET', displayDate: '16 SET', price: 431900 },
      { timestamp: '23 SET', displayDate: '23 SET', price: 436800 },
      { timestamp: '25 SET', displayDate: '25 SET', price: 437820.42 },
    ],
    '3M': [
      { timestamp: '25 JUN', displayDate: '25 JUN', price: 395000 },
      { timestamp: '25 JUL', displayDate: '25 JUL', price: 408000 },
      { timestamp: '25 AGO', displayDate: '25 AGO', price: 421000 },
      { timestamp: '25 SET', displayDate: '25 SET', price: 437820.42 },
    ],
    '1A': [
      { timestamp: 'SET 25', displayDate: 'SET 2025', price: 345000 },
      { timestamp: 'DEZ 25', displayDate: 'DEZ 2025', price: 368000 },
      { timestamp: 'MAR 26', displayDate: 'MAR 2026', price: 392000 },
      { timestamp: 'JUN 26', displayDate: 'JUN 2026', price: 415000 },
      { timestamp: 'SET 26', displayDate: 'SET 2026', price: 437820.42 },
    ],
    'ALL': [
      { timestamp: 'JAN 25', displayDate: 'JAN 2025', price: 298000 },
      { timestamp: 'JUL 25', displayDate: 'JUL 2025', price: 335000 },
      { timestamp: 'JAN 26', displayDate: 'JAN 2026', price: 375000 },
      { timestamp: 'SET 26', displayDate: 'SET 2026', price: 437820.42 },
    ]
  },
  LTC: {
    '24H': [
      { timestamp: '00:00', displayDate: '00:00', price: 519.10 },
      { timestamp: '04:00', displayDate: '04:00', price: 520.40 },
      { timestamp: '08:00', displayDate: '08:00', price: 522.00 },
      { timestamp: '12:00', displayDate: '12:00', price: 524.30 },
      { timestamp: '16:00', displayDate: '16:00', price: 525.80 },
      { timestamp: '20:00', displayDate: '20:00', price: 527.10 },
      { timestamp: 'Agora', displayDate: 'Agora', price: 528.04 },
    ],
    '7D': [
      { timestamp: '18 SET', displayDate: '18 SET', price: 512.40 },
      { timestamp: '19 SET', displayDate: '19 SET', price: 514.80 },
      { timestamp: '20 SET', displayDate: '20 SET', price: 516.90 },
      { timestamp: '21 SET', displayDate: '21 SET', price: 519.20 },
      { timestamp: '22 SET', displayDate: '22 SET', price: 522.40 },
      { timestamp: '23 SET', displayDate: '23 SET', price: 524.80 },
      { timestamp: '24 SET', displayDate: '24 SET', price: 526.50 },
      { timestamp: '25 SET', displayDate: '25 SET', price: 528.04 },
    ],
    '30D': [
      { timestamp: '26 AGO', displayDate: '26 AGO', price: 494.00 },
      { timestamp: '02 SET', displayDate: '02 SET', price: 501.20 },
      { timestamp: '09 SET', displayDate: '09 SET', price: 508.40 },
      { timestamp: '16 SET', displayDate: '16 SET', price: 517.10 },
      { timestamp: '23 SET', displayDate: '23 SET', price: 524.50 },
      { timestamp: '25 SET', displayDate: '25 SET', price: 528.04 },
    ],
    '3M': [
      { timestamp: '25 JUN', displayDate: '25 JUN', price: 468.00 },
      { timestamp: '25 JUL', displayDate: '25 JUL', price: 485.00 },
      { timestamp: '25 AGO', displayDate: '25 AGO', price: 502.00 },
      { timestamp: '25 SET', displayDate: '25 SET', price: 528.04 },
    ],
    '1A': [
      { timestamp: 'SET 25', displayDate: 'SET 2025', price: 412.00 },
      { timestamp: 'DEZ 25', displayDate: 'DEZ 2025', price: 435.00 },
      { timestamp: 'MAR 26', displayDate: 'MAR 2026', price: 458.00 },
      { timestamp: 'JUN 26', displayDate: 'JUN 2026', price: 489.00 },
      { timestamp: 'SET 26', displayDate: 'SET 2026', price: 528.04 },
    ],
    'ALL': [
      { timestamp: 'JAN 25', displayDate: 'JAN 2025', price: 360.00 },
      { timestamp: 'JUL 25', displayDate: 'JUL 2025', price: 395.00 },
      { timestamp: 'JAN 26', displayDate: 'JAN 2026', price: 440.00 },
      { timestamp: 'SET 26', displayDate: 'SET 2026', price: 528.04 },
    ]
  }
};

