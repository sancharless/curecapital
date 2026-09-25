# Cure Capital — Plataforma Premium de Gestão de Ativos Digitais

<p align="center">
  <strong>Private Banking + Fintech Premium + Gestão Patrimonial + Tecnologia Blockchain</strong>
</p>

---

## 📌 Visão Geral

A **Cure Capital** é uma plataforma web moderna concebida para a gestão e acompanhamento de patrimônio digital institucional, cotações de mercado, estratégias de custódia em **Bitcoin (BTC)** e **Litecoin (LTC)**, rendimentos contábeis proporcionais, programa de afiliados e painel administrativo institucional.

Construída sob a linguagem visual **Financial Glass** (Dark Mode sofisticado), a plataforma transmite segurança, credibilidade, transparência e controle patrimonial absoluto, sem apelos visuais de cassino ou promessas de ganhos fáceis.

---

## 🛠️ Stack Tecnológica

- **Frontend:** React 19, TypeScript, Tailwind CSS
- **Design System:** Financial Glass (`backdrop-blur-xl`, bordas sutis `1px`, profundidade em azul marinho profundo `#07111F`)
- **Ícones:** Lucide Icons
- **Animações & Microinterações:** Framer Motion e animação numérica interpolada
- **Gráficos:** Área Chart SVG de alta performance com crosshair dinâmico e tooltip interativo (touch-friendly para iOS)
- **Estado Global:** Zustand com persistência local (Privacidade / Ocultar Saldo)
- **Roteamento:** React Router DOM (v7)
- **PWA & Mobile:** Otimizado com `viewport-fit=cover`, `safe-area-inset` para iPhone e inputs com fonte mínima de 16px.

---

## 🚀 Arquitetura de Pastas

```
src/
├── config/             # Configurações de app, tema e mercado
├── types/              # Definições de tipos TypeScript (Ledger, Mercado, Auditoria, Afiliados)
├── services/           # MarketDataAdapter desacoplado (MockMarketDataAdapter para dev/testes)
├── store/              # Stores Zustand (Privacidade/Ocultar Saldo, Notificações)
├── providers/          # Provedor reativo de cotações em tempo real
├── hooks/              # useAnimatedNumber, useMarketData, etc.
├── components/
│   ├── ui/             # Componentes base: Button, Card, Badge, Input, Modal, Tabs, Avatar, Skeleton, Logo
│   ├── layout/         # AppLayout, Sidebar (Desktop), Header, MobileNavigation (iOS)
│   ├── dashboard/      # PortfolioHero, PortfolioChart, WalletCard, PerformanceCard, MarketCard, RecentTransactions, FinancialSummary
│   ├── affiliate/      # AffiliateStats, AffiliateLink, AffiliateFunnel, AffiliateTable
│   └── admin/          # AdminMetrics, PerformanceManager (Simulador em 2 etapas), AuditLogTable
└── pages/              # Telas da plataforma: Dashboard, Wallet, Investments, Market, Transactions, Earnings, Affiliates, Reports, Notifications, Settings, Profile, Support, Admin, Login
```

---

## ⚡ Como Rodar o Projeto Localmente

### Pré-requisitos
- Node.js (v18 ou superior)
- npm

### Passo a passo
1. Clone o repositório:
```bash
git clone https://github.com/sancharless/curecapital.git
cd curecapital
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador:
`http://localhost:5173/` (ou a porta indicada no terminal)

### Build de Produção
```bash
npm run build
npm run preview
```

---

## 📱 Destaques Mobile (iPhone / iOS)
- **Navegação Inferior (Bottom Navigation):** Sidebar oculta em dispositivos móveis, dando lugar a uma barra inferior com 5 itens e botão central de **Investir (+)** em destaque.
- **Safe Area Support:** Padding dinâmico com `env(safe-area-inset-bottom)` para Dynamic Island, notch e barra do Safari.
- **Sem Scroll Horizontal:** Layout 100% contido para viewports de 320px até 430px (iPhone SE até 16 Pro Max).
- **Gráfico Touch-Friendly:** Arraste horizontal com `touch-action: pan-y` sem conflitar com a rolagem vertical da página.

---

## 📄 Licença
Propriedade de Cure Capital Technologies. Todos os direitos reservados.
