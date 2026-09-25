export type ReferralStatus = 'registered' | 'verified' | 'active' | 'inactive' | 'pending';
export type CommissionStatus = 'pending' | 'available' | 'paid' | 'reversed';
export type ReferralEventType = 'referral_activation' | 'referral_volume' | 'bonus' | 'adjustment' | 'reversal';

export interface Referral {
  id: string;
  displayName: string;
  joinedAt: string;
  verifiedAt?: string;
  activatedAt?: string;
  status: ReferralStatus;
  eligibleVolume: number;
  generatedCommission: number;
}

export interface Commission {
  id: string; // Ex: COM-260925-7F9A2C
  referralId: string;
  referralName: string;
  event: ReferralEventType;
  eventLabel: string;
  baseAmount: number;
  rate: number; // Ex: 0.015 (1.50%)
  amount: number;
  status: CommissionStatus;
  createdAt: string;
  availableAt?: string;
  ruleId?: string;
}

export interface AffiliateMetricsData {
  clicks: number;
  registrations: number;
  verified: number;
  active: number;
  totalReferredVolume: number;
  accumulatedCommissions: number;
  availableCommissions: number;
  pendingCommissions: number;
  paidCommissions: number;
}

export const MOCK_AFFILIATE_DATA: {
  referralCode: string;
  referralLink: string;
  metrics: AffiliateMetricsData;
  referrals: Referral[];
  commissions: Commission[];
  historyTimeSeries: Record<string, { displayDate: string; registrations: number; active: number }[]>;
  commissionTimeSeries: Record<string, { displayDate: string; accumulated: number; period: number }[]>;
} = {
  referralCode: 'RAFAEL82',
  referralLink: 'https://curecapital.com/r/RAFAEL82',
  metrics: {
    clicks: 342,
    registrations: 84,
    verified: 41,
    active: 12,
    totalReferredVolume: 84320.00,
    accumulatedCommissions: 2140.80,
    availableCommissions: 1720.30,
    pendingCommissions: 420.50,
    paidCommissions: 1450.00,
  },
  referrals: [
    {
      id: 'ref-01',
      displayName: 'Mariana A.',
      joinedAt: '18/09/2026',
      verifiedAt: '19/09/2026',
      activatedAt: '21/09/2026',
      status: 'active',
      eligibleVolume: 8500.00,
      generatedCommission: 127.50,
    },
    {
      id: 'ref-02',
      displayName: 'Carlos S.',
      joinedAt: '15/09/2026',
      verifiedAt: '16/09/2026',
      activatedAt: '18/09/2026',
      status: 'active',
      eligibleVolume: 14200.00,
      generatedCommission: 213.00,
    },
    {
      id: 'ref-03',
      displayName: 'João P.',
      joinedAt: '12/09/2026',
      verifiedAt: '13/09/2026',
      activatedAt: '15/09/2026',
      status: 'active',
      eligibleVolume: 18000.00,
      generatedCommission: 270.00,
    },
    {
      id: 'ref-04',
      displayName: 'Fernanda V.',
      joinedAt: '10/09/2026',
      verifiedAt: '11/09/2026',
      activatedAt: '14/09/2026',
      status: 'active',
      eligibleVolume: 9400.00,
      generatedCommission: 141.00,
    },
    {
      id: 'ref-05',
      displayName: 'Thiago M.',
      joinedAt: '05/09/2026',
      verifiedAt: '06/09/2026',
      activatedAt: '08/09/2026',
      status: 'active',
      eligibleVolume: 12500.00,
      generatedCommission: 187.50,
    },
    {
      id: 'ref-06',
      displayName: 'Beatriz L.',
      joinedAt: '28/08/2026',
      verifiedAt: '29/08/2026',
      activatedAt: '02/09/2026',
      status: 'active',
      eligibleVolume: 6800.00,
      generatedCommission: 102.00,
    },
    {
      id: 'ref-07',
      displayName: 'Rodrigo C.',
      joinedAt: '22/08/2026',
      verifiedAt: '23/08/2026',
      activatedAt: '25/08/2026',
      status: 'active',
      eligibleVolume: 11200.00,
      generatedCommission: 168.00,
    },
    {
      id: 'ref-08',
      displayName: 'Juliana F.',
      joinedAt: '24/09/2026',
      verifiedAt: '25/09/2026',
      status: 'verified',
      eligibleVolume: 0.00,
      generatedCommission: 0.00,
    },
    {
      id: 'ref-09',
      displayName: 'Guilherme B.',
      joinedAt: '23/09/2026',
      verifiedAt: '24/09/2026',
      status: 'verified',
      eligibleVolume: 0.00,
      generatedCommission: 0.00,
    },
    {
      id: 'ref-10',
      displayName: 'Camila T.',
      joinedAt: '21/09/2026',
      status: 'pending',
      eligibleVolume: 0.00,
      generatedCommission: 0.00,
    },
    {
      id: 'ref-11',
      displayName: 'Eduardo M.',
      joinedAt: '20/09/2026',
      status: 'registered',
      eligibleVolume: 0.00,
      generatedCommission: 0.00,
    },
    {
      id: 'ref-12',
      displayName: 'Larissa R.',
      joinedAt: '16/09/2026',
      status: 'registered',
      eligibleVolume: 0.00,
      generatedCommission: 0.00,
    },
    {
      id: 'ref-13',
      displayName: 'Felipe D.',
      joinedAt: '04/08/2026',
      verifiedAt: '05/08/2026',
      status: 'inactive',
      eligibleVolume: 3720.00,
      generatedCommission: 55.80,
    },
  ],
  commissions: [
    {
      id: 'COM-260924-7F9A2C',
      referralId: 'ref-01',
      referralName: 'Mariana A.',
      event: 'referral_activation',
      eventLabel: 'Indicação ativa',
      baseAmount: 8500.00,
      rate: 0.015,
      amount: 127.50,
      status: 'available',
      createdAt: '24/09/2026 14:32',
      availableAt: '24/09/2026',
      ruleId: 'RULE-ACTIVATION-150',
    },
    {
      id: 'COM-260921-9E4B81',
      referralId: 'ref-02',
      referralName: 'Carlos S.',
      event: 'referral_volume',
      eventLabel: 'Volume elegível alocado',
      baseAmount: 14200.00,
      rate: 0.015,
      amount: 213.00,
      status: 'available',
      createdAt: '21/09/2026 11:20',
      availableAt: '21/09/2026',
      ruleId: 'RULE-VOLUME-150',
    },
    {
      id: 'COM-260918-3D8A12',
      referralId: 'ref-03',
      referralName: 'João P.',
      event: 'referral_volume',
      eventLabel: 'Volume elegível alocado',
      baseAmount: 18000.00,
      rate: 0.015,
      amount: 270.00,
      status: 'pending',
      createdAt: '18/09/2026 17:45',
      availableAt: '28/09/2026',
      ruleId: 'RULE-VOLUME-150',
    },
    {
      id: 'COM-260915-4A9C30',
      referralId: 'ref-04',
      referralName: 'Fernanda V.',
      event: 'referral_activation',
      eventLabel: 'Indicação ativa',
      baseAmount: 9400.00,
      rate: 0.015,
      amount: 141.00,
      status: 'available',
      createdAt: '15/09/2026 10:15',
      availableAt: '15/09/2026',
      ruleId: 'RULE-ACTIVATION-150',
    },
    {
      id: 'COM-260910-1B8D74',
      referralId: 'ref-05',
      referralName: 'Thiago M.',
      event: 'bonus',
      eventLabel: 'Bônus de conformidade',
      baseAmount: 12500.00,
      rate: 0.015,
      amount: 187.50,
      status: 'paid',
      createdAt: '10/09/2026 16:02',
      availableAt: '10/09/2026',
      ruleId: 'RULE-BONUS-TIER1',
    },
    {
      id: 'COM-260905-8E2F19',
      referralId: 'ref-06',
      referralName: 'Beatriz L.',
      event: 'referral_activation',
      eventLabel: 'Indicação ativa',
      baseAmount: 6800.00,
      rate: 0.015,
      amount: 102.00,
      status: 'paid',
      createdAt: '05/09/2026 09:30',
      availableAt: '05/09/2026',
      ruleId: 'RULE-ACTIVATION-150',
    },
    {
      id: 'COM-260828-5C7A92',
      referralId: 'ref-07',
      referralName: 'Rodrigo C.',
      event: 'referral_volume',
      eventLabel: 'Volume elegível alocado',
      baseAmount: 11200.00,
      rate: 0.015,
      amount: 168.00,
      status: 'paid',
      createdAt: '28/08/2026 18:22',
      availableAt: '28/08/2026',
      ruleId: 'RULE-VOLUME-150',
    },
    {
      id: 'COM-260815-2A4D88',
      referralId: 'ref-13',
      referralName: 'Felipe D.',
      event: 'referral_volume',
      eventLabel: 'Volume elegível alocado',
      baseAmount: 3720.00,
      rate: 0.015,
      amount: 55.80,
      status: 'paid',
      createdAt: '15/08/2026 14:10',
      availableAt: '15/08/2026',
      ruleId: 'RULE-VOLUME-150',
    },
  ],
  historyTimeSeries: {
    '7D': [
      { displayDate: '19 SET', registrations: 1, active: 1 },
      { displayDate: '20 SET', registrations: 2, active: 1 },
      { displayDate: '21 SET', registrations: 3, active: 2 },
      { displayDate: '22 SET', registrations: 2, active: 1 },
      { displayDate: '23 SET', registrations: 4, active: 2 },
      { displayDate: '24 SET', registrations: 3, active: 2 },
      { displayDate: '25 SET', registrations: 4, active: 2 },
    ],
    '30D': [
      { displayDate: '26 AGO', registrations: 2, active: 1 },
      { displayDate: '02 SET', registrations: 4, active: 2 },
      { displayDate: '09 SET', registrations: 6, active: 3 },
      { displayDate: '16 SET', registrations: 5, active: 2 },
      { displayDate: '23 SET', registrations: 7, active: 3 },
      { displayDate: '25 SET', registrations: 4, active: 2 },
    ],
    '3M': [
      { displayDate: '25 JUN', registrations: 12, active: 4 },
      { displayDate: '25 JUL', registrations: 24, active: 7 },
      { displayDate: '25 AGO', registrations: 48, active: 9 },
      { displayDate: '25 SET', registrations: 84, active: 12 },
    ],
    '6M': [
      { displayDate: '25 MAR', registrations: 8, active: 2 },
      { displayDate: '25 MAI', registrations: 22, active: 5 },
      { displayDate: '25 JUL', registrations: 45, active: 8 },
      { displayDate: '25 SET', registrations: 84, active: 12 },
    ],
    '1A': [
      { displayDate: 'SET 25', registrations: 0, active: 0 },
      { displayDate: 'JAN 26', registrations: 14, active: 3 },
      { displayDate: 'MAI 26', registrations: 38, active: 7 },
      { displayDate: 'SET 26', registrations: 84, active: 12 },
    ],
    'ALL': [
      { displayDate: 'JAN 26', registrations: 14, active: 3 },
      { displayDate: 'ABR 26', registrations: 31, active: 6 },
      { displayDate: 'JUL 26', registrations: 56, active: 9 },
      { displayDate: 'SET 26', registrations: 84, active: 12 },
    ],
  },
  commissionTimeSeries: {
    '30D': [
      { displayDate: '26 AGO', accumulated: 1450.00, period: 92.50 },
      { displayDate: '02 SET', accumulated: 1552.00, period: 102.00 },
      { displayDate: '09 SET', accumulated: 1739.50, period: 187.50 },
      { displayDate: '16 SET', accumulated: 1880.50, period: 141.00 },
      { displayDate: '23 SET', accumulated: 2013.30, period: 132.80 },
      { displayDate: '25 SET', accumulated: 2140.80, period: 127.50 },
    ],
    '3M': [
      { displayDate: '25 JUN', accumulated: 620.00, period: 180.00 },
      { displayDate: '25 JUL', accumulated: 1140.00, period: 520.00 },
      { displayDate: '25 AGO', accumulated: 1680.00, period: 540.00 },
      { displayDate: '25 SET', accumulated: 2140.80, period: 460.80 },
    ],
    '6M': [
      { displayDate: '25 MAR', accumulated: 210.00, period: 210.00 },
      { displayDate: '25 MAI', accumulated: 580.00, period: 370.00 },
      { displayDate: '25 JUL', accumulated: 1140.00, period: 560.00 },
      { displayDate: '25 SET', accumulated: 2140.80, period: 1000.80 },
    ],
    '1A': [
      { displayDate: 'SET 25', accumulated: 0.00, period: 0.00 },
      { displayDate: 'JAN 26', accumulated: 180.00, period: 180.00 },
      { displayDate: 'MAI 26', accumulated: 740.00, period: 560.00 },
      { displayDate: 'SET 26', accumulated: 2140.80, period: 1400.80 },
    ],
    'ALL': [
      { displayDate: 'JAN 26', accumulated: 180.00, period: 180.00 },
      { displayDate: 'ABR 26', accumulated: 490.00, period: 310.00 },
      { displayDate: 'JUL 26', accumulated: 1140.00, period: 650.00 },
      { displayDate: 'SET 26', accumulated: 2140.80, period: 1000.80 },
    ],
  },
};
