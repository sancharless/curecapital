import React from 'react';
import { PortfolioHero } from '../components/dashboard/PortfolioHero';
import { PortfolioChart } from '../components/dashboard/PortfolioChart';
import { FinancialSummary } from '../components/dashboard/FinancialSummary';
import { WalletCard } from '../components/dashboard/WalletCard';
import { MarketCard } from '../components/dashboard/MarketCard';
import { PerformanceCard } from '../components/dashboard/PerformanceCard';
import { SecurityStatusCard } from '../components/dashboard/SecurityStatusCard';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';

export const Dashboard: React.FC = () => {
  return (
    // Espaçamento rigoroso na escala 4, 8, 12, 16, 20, 24, 32 (Item 40)
    <div className="space-y-4 sm:space-y-5 max-w-[1600px] mx-auto w-full">
      {/* NÍVEL 1: Patrimônio Total em Destaque (Altura otimizada em 15-20% - Item 3 e 41) */}
      <section aria-label="Visão Geral do Patrimônio">
        <PortfolioHero />
      </section>

      {/* NÍVEL 2: Gráfico Principal de Evolução Patrimonial (Visível no primeiro viewport 1440x900 - Item 41) */}
      <section aria-label="Gráfico de Evolução Patrimonial">
        <PortfolioChart />
      </section>

      {/* NÍVEL 3: Métricas Financeiras Consolidadas (Item 21) */}
      <section aria-label="Métricas e Indicadores Financeiros">
        <FinancialSummary />
      </section>

      {/* NÍVEL 4: Carteira (7 colunas Desktop) + Mercado (5 colunas Desktop) */}
      <section aria-label="Carteira e Mercado" className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        <div className="lg:col-span-7">
          <WalletCard />
        </div>
        <div className="lg:col-span-5">
          <MarketCard />
        </div>
      </section>

      {/* NÍVEL 5: Performance e Comparativo (5 colunas) + Status de Segurança (7 colunas) */}
      <section aria-label="Performance e Segurança" className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
        <div className="lg:col-span-5">
          <PerformanceCard />
        </div>
        <div className="lg:col-span-7">
          <SecurityStatusCard />
        </div>
      </section>

      {/* NÍVEL 6: Movimentações Recentes (Tabela Desktop / Cards Mobile) */}
      <section aria-label="Últimas Movimentações">
        <RecentTransactions />
      </section>
    </div>
  );
};
