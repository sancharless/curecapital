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
    <div className="space-y-5 sm:space-y-6 md:space-y-7 max-w-[1600px] mx-auto w-full">
      {/* NÍVEL 1: Patrimônio Total em Destaque (PortfolioHero) */}
      <section aria-label="Visão Geral do Patrimônio">
        <PortfolioHero />
      </section>

      {/* NÍVEL 2: Gráfico Principal de Evolução Patrimonial (PortfolioChart) */}
      <section aria-label="Gráfico de Evolução Patrimonial">
        <PortfolioChart />
      </section>

      {/* NÍVEL 3: Métricas Financeiras Consolidadas (FinancialSummary) */}
      <section aria-label="Métricas e Indicadores Financeiros">
        <FinancialSummary />
      </section>

      {/* NÍVEL 4: Carteira (7 colunas Desktop) + Mercado (5 colunas Desktop) */}
      <section aria-label="Carteira e Mercado" className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        <div className="lg:col-span-7">
          <WalletCard />
        </div>
        <div className="lg:col-span-5">
          <MarketCard />
        </div>
      </section>

      {/* NÍVEL 5: Performance e Comparativo (5 colunas) + Status de Segurança (7 colunas) */}
      <section aria-label="Performance e Segurança" className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
        <div className="lg:col-span-5">
          <PerformanceCard />
        </div>
        <div className="lg:col-span-7">
          <SecurityStatusCard />
        </div>
      </section>

      {/* NÍVEL 6: Movimentações Recentes (RecentTransactions com visual adaptativo) */}
      <section aria-label="Últimas Movimentações">
        <RecentTransactions />
      </section>
    </div>
  );
};
