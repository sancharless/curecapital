import React, { useState } from 'react';
import { InvestmentHero } from '../components/investments/InvestmentHero';
import { PositionCard } from '../components/investments/PositionCard';
import { PerformanceChart } from '../components/investments/PerformanceChart';
import { DepositHistory } from '../components/investments/DepositHistory';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { usePortfolio } from '../hooks/usePortfolio';
import { ShieldCheck, Calendar, Layers } from 'lucide-react';

type InvestmentTab = 'overview' | 'positions' | 'deposits' | 'performance';

export const Investments: React.FC = () => {
  const { positions } = usePortfolio();
  const [activeTab, setActiveTab] = useState<InvestmentTab>('overview');

  const tabs: { id: InvestmentTab; label: string }[] = [
    { id: 'overview', label: 'Visão geral' },
    { id: 'positions', label: 'Posições' },
    { id: 'deposits', label: 'Aportes' },
    { id: 'performance', label: 'Performance' },
  ];

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* 1. HEADER + INVESTMENT HERO */}
      <InvestmentHero />

      {/* 2. TABS COM HORIZONTAL SCROLL NO MOBILE (Itens 24 e 43) */}
      <div className="border-b border-white/5 pb-2">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-brand-blue text-white shadow-md shadow-brand-blue/20'
                  : 'bg-white/[0.03] text-text-tertiary hover:text-text-primary hover:bg-white/[0.06]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 3. CONTEÚDO DAS TABS */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fade-in">
          {/* Métricas da Visão Geral (Item 25) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card variant="glass" radius="md" className="p-4 space-y-1">
              <span className="text-[11px] font-mono text-text-tertiary uppercase block">
                Quantidade de Posições
              </span>
              <div className="text-xl font-bold font-mono text-text-primary">
                2 Ativos Estruturados
              </div>
              <span className="text-[11px] text-text-secondary">
                Bitcoin (BTC) & Litecoin (LTC)
              </span>
            </Card>

            <Card variant="glass" radius="md" className="p-4 space-y-1">
              <span className="text-[11px] font-mono text-text-tertiary uppercase block">
                Data do Primeiro Aporte
              </span>
              <div className="text-xl font-bold font-mono text-text-primary">
                15/01/2026
              </div>
              <span className="text-[11px] text-text-secondary">
                Início da custódia institucional
              </span>
            </Card>

            <Card variant="glass" radius="md" className="p-4 space-y-1">
              <span className="text-[11px] font-mono text-text-tertiary uppercase block">
                Último Aporte Realizado
              </span>
              <div className="text-xl font-bold font-mono text-text-primary">
                22/09/2026
              </div>
              <span className="text-[11px] text-text-secondary">
                Aporte recente em Litecoin
              </span>
            </Card>
          </div>

          {/* Posições Atuais em Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
                Posições sob Gestão
              </h2>
              <button
                type="button"
                onClick={() => setActiveTab('positions')}
                className="text-xs font-semibold text-brand-cyan hover:underline cursor-pointer"
              >
                Ver todas →
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {positions.map((pos) => (
                <PositionCard key={pos.asset} position={pos} />
              ))}
            </div>
          </div>

          {/* Gráfico de Performance */}
          <PerformanceChart />
        </div>
      )}

      {activeTab === 'positions' && (
        <div className="space-y-4 animate-fade-in">
          <div>
            <h2 className="text-sm font-semibold text-text-secondary uppercase tracking-wider">
              Todas as Posições Alocadas
            </h2>
            <p className="text-xs text-text-tertiary">
              Detalhamento de capital alocado, valor de mercado e resultado de cada posição.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {positions.map((pos) => (
              <PositionCard key={pos.asset} position={pos} />
            ))}
          </div>
        </div>
      )}

      {activeTab === 'deposits' && (
        <div className="animate-fade-in">
          <DepositHistory />
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="space-y-6 animate-fade-in">
          <PerformanceChart />
        </div>
      )}
    </div>
  );
};

export default Investments;
