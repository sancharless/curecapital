export type AssetType = 'BTC' | 'LTC' | 'BRL';

export type TransactionType = 
  | 'deposit' 
  | 'withdrawal' 
  | 'yield' 
  | 'commission' 
  | 'adjustment' 
  | 'conversion';

export type TransactionStatus = 
  | 'completed' 
  | 'processing' 
  | 'pending' 
  | 'cancelled';

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  asset: AssetType;
  amount: number;
  amountFiatBrl: number;
  status: TransactionStatus;
  createdAt: string; // ISO ou DD/MM/YYYY
  reference: string;
  description: string;
  txHash?: string;
}

export interface MarketQuote {
  symbol: AssetType;
  name: string;
  priceBrl: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24hBrl: number;
  sparkline: number[];
  lastUpdated: Date;
}

export interface PortfolioHistoryPoint {
  timestamp: string; // Ex: '2026-09-25T10:42:00'
  displayDate: string; // Ex: '25 SET 2026'
  displayTime: string; // Ex: '10:42'
  totalBalanceBrl: number;
  profitPercentage: number;
  btcPrice: number;
  ltcPrice: number;
  btcAmount: number;
  ltcAmount: number;
}

export type TimeframeFilter = '24H' | '7D' | '30D' | '3M' | '6M' | '1A' | 'ALL';

export interface AffiliateStats {
  totalReferredAmountBrl: number;
  totalAffiliatesCount: number;
  activeAffiliatesCount: number;
  totalCommissionsBrl: number;
  conversionRate: number;
}

export interface AffiliateFunnelData {
  clicks: number;
  registrations: number;
  verified: number;
  investors: number;
  clicksToRegRate: number;
  regToVerifiedRate: number;
  verifiedToInvestRate: number;
}

export interface AffiliateReferral {
  id: string;
  userName: string;
  userEmailMasked: string;
  joinedAt: string;
  event: string;
  commissionBrl: number;
  status: 'completed' | 'pending';
}

export interface AuditLog {
  event_id: string;
  admin_id: string;
  timestamp: string;
  action: string;
  old_value: string;
  new_value: string;
  ip: string;
  device: string;
}

export interface AdminMetrics {
  aumBrl: number; // Patrimônio sob gestão
  totalUsers: number;
  activeUsers: number;
  totalDepositsBrl: number;
  totalWithdrawalsBrl: number;
  distributedYieldsBrl: number;
  btcVolume: number;
  ltcVolume: number;
  totalCommissionsBrl: number;
}

export interface YieldDistributionSimulation {
  periodLabel: string;
  startDate: string;
  endDate: string;
  percentage: number;
  description: string;
  eligibleUsersCount: number;
  eligibleCapitalBrl: number;
  estimatedDistributionBrl: number;
}
