export const APP_CONFIG = {
  name: 'Cure Capital',
  tagline: 'Gestão de Ativos Digitais & Private Banking',
  currency: 'BRL',
  locale: 'pt-BR',
  version: '2.4.0',
  defaultUser: {
    name: 'Rafael Alencar',
    greeting: 'Bom dia, Rafael',
    accountLevel: 'Private Wealth',
    tier: 'Tier 3 VIP',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    email: 'rafael.alencar@curecapital.io',
    phone: '+55 (11) 98721-4490',
    twoFactorEnabled: true,
    lastAccess: 'Hoje às 11:42 (São Paulo, BR)',
  },
  affiliate: {
    referralCode: 'RAFAEL82',
    referralBaseUrl: 'plataforma.com/r/',
    commissionRate: '15%',
  },
  systemStatus: {
    operational: true,
    label: 'Sistema operacional',
    latencyMs: 38,
  }
} as const;
