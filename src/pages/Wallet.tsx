import React from 'react';
import { WalletHero } from '../components/wallet/WalletHero';
import { AllocationDonut } from '../components/wallet/AllocationDonut';
import { AllocationBar } from '../components/wallet/AllocationBar';
import { AssetCard } from '../components/wallet/AssetCard';
import { AvailableBalanceCard } from '../components/wallet/AvailableBalanceCard';
import { WalletEvolutionChart } from '../components/wallet/WalletEvolutionChart';
import { WalletHistory } from '../components/wallet/WalletHistory';
import { usePortfolio } from '../hooks/usePortfolio';

export const Wallet: React.FC = () => {
  const { btcHolding, ltcHolding } = usePortfolio();

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* 1. HEADER + RESUMO DA CARTEIRA */}
      <WalletHero />

      {/* 2. COMPOSIÇÃO PATRIMONIAL & ALOCAÇÃO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8">
          <AllocationDonut />
        </div>
        <div className="lg:col-span-4 flex flex-col justify-between gap-4">
          <div className="p-5 rounded-2xl bg-[#081325]/80 border border-white/5 space-y-4">
            <AllocationBar />
          </div>
          <AvailableBalanceCard />
        </div>
      </div>

      {/* 3. CARDS DOS ATIVOS (BITCOIN E LITECOIN) */}
      <div>
        <div className="mb-3">
          <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
            Ativos em Custódia
          </h2>
          <p className="text-xs text-text-tertiary">
            Posições estruturadas sob gestão patrimonial
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <AssetCard holding={btcHolding} />
          <AssetCard holding={ltcHolding} />
        </div>
      </div>

      {/* 4. EVOLUÇÃO DA CARTEIRA (Gráfico Consolidado & Comparativo) */}
      <WalletEvolutionChart />

      {/* 5. HISTÓRICO DE MOVIMENTAÇÕES */}
      <WalletHistory />
    </div>
  );
};

export default Wallet;
