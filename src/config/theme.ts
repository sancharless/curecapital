export const THEME_TOKENS = {
  colors: {
    bgPrimary: '#07111F',
    bgSecondary: '#091525',
    card: '#0B172A',
    cardElevated: '#101E33',
    cardGlass: 'rgba(11, 23, 42, 0.78)',
    borderSubtle: 'rgba(255, 255, 255, 0.07)',
    borderGlass: 'rgba(255, 255, 255, 0.06)',
    textPrimary: '#F7F9FC',
    textSecondary: '#94A3B8',
    textTertiary: '#64748B',
    brandBlue: '#2563EB',
    brandBlueHover: '#3B82F6',
    brandCyan: '#36C5F0',
    positive: '#19C37D',
    positiveSoft: '#34D399',
    negative: '#EF4444',
    bitcoin: '#F5A623',
    litecoin: '#B8C2CC',
    alert: '#F59E0B',
  },
  radius: {
    cardLarge: '20px',
    cardMedium: '16px',
    input: '12px',
    button: '12px',
    badge: '999px',
  },
  typography: {
    fontSans: 'Geist, Inter, SF Pro Display, sans-serif',
    fontMono: 'Geist Mono, SF Mono, monospace',
  },
  effects: {
    financialGlass: {
      background: 'rgba(11, 23, 42, 0.78)',
      backdropFilter: 'blur(18px)',
      border: '1px solid rgba(255, 255, 255, 0.06)',
      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.22)',
    }
  }
} as const;
