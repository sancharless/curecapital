import React from 'react';
import { PortfolioHero } from '../components/dashboard/PortfolioHero';
import { FinancialSummary } from '../components/dashboard/FinancialSummary';
import { PortfolioChart } from '../components/dashboard/PortfolioChart';
import { PerformanceCard } from '../components/dashboard/PerformanceCard';
import { WalletCard } from '../components/dashboard/WalletCard';
import { MarketCard } from '../components/dashboard/MarketCard';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 1. Hero Financeiro: Patrimônio Total, Ocultar Saldo, Equivalência BTC/LTC */}
      <PortfolioHero />

      {/* 2. Resumo Financeiro (Capital aportado, Resultado acumulado, Patrimônio, Disponível) */}
      <FinancialSummary />

      {/* 3. Seção Central: Gráfico Principal de Patrimônio + Carteira & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
        {/* Gráfico de Evolução do Patrimônio (8 colunas no Desktop) */}
        <div className="lg:col-span-8">
          <PortfolioChart />
        </div>

        {/* Coluna Lateral: Carteira (Donut) e Performance (4 colunas no Desktop) */}
        <div className="lg:col-span-4 space-y-4 sm:space-y-6">
          <WalletCard />
          <PerformanceCard />
        </div>
      </div>

      {/* 4. Mercado (Cards em tempo real para Bitcoin e Litecoin) */}
      <div>
        <div className="text-xs font-mono font-medium text-text-tertiary uppercase tracking-wider mb-2.5 px-1">
          Monitoramento de Liquidez em Tempo Real
        </div>
        <MarketCard />
      </div>

      {/* 5. Movimentações Recentes */}
      <RecentTransactions />
    </div>
  );
};
