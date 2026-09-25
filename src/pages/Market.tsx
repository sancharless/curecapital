import React from 'react';
import { Card } from '../components/ui/Card';
import { MarketCard } from '../components/dashboard/MarketCard';
import { Badge } from '../components/ui/Badge';
import { useMarketData } from '../providers/MarketDataProvider';
import { BarChart3, Activity, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export const Market: React.FC = () => {
  const { quotes, lastTickTimestamp } = useMarketData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
            Mercado & Liquidez
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Monitoramento em tempo real de cotações globais e livro institucional.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="live" size="sm">Feed Ativo</Badge>
          <span className="text-xs font-mono text-text-tertiary">
            Tick: {lastTickTimestamp.toLocaleTimeString()}
          </span>
        </div>
      </div>

      {/* Cards de Cotação */}
      <MarketCard />

      {/* Tabela de Profundidade / Métricas Institucionais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Livro Bitcoin */}
        <Card variant="glass" radius="lg" className="space-y-3">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-crypto-bitcoin font-mono">BTC / BRL</span>
              <span className="text-xs text-text-tertiary">Profundidade Institucional</span>
            </div>
            <span className="text-xs font-mono text-text-primary">
              R$ {quotes.BTC.priceBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between text-text-tertiary text-[11px]">
              <span>Ordem / Nível</span>
              <span>Volume BTC</span>
              <span className="text-right">Cotação BRL</span>
            </div>
            <div className="flex justify-between text-positive py-1 border-b border-white/[0.02]">
              <span>BID 01 (Compra)</span>
              <span>1.450 BTC</span>
              <span>R$ {(quotes.BTC.priceBrl - 120).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-positive py-1 border-b border-white/[0.02]">
              <span>BID 02 (Compra)</span>
              <span>3.200 BTC</span>
              <span>R$ {(quotes.BTC.priceBrl - 280).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-negative py-1 border-b border-white/[0.02]">
              <span>ASK 01 (Venda)</span>
              <span>2.110 BTC</span>
              <span>R$ {(quotes.BTC.priceBrl + 150).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-negative py-1">
              <span>ASK 02 (Venda)</span>
              <span>5.800 BTC</span>
              <span>R$ {(quotes.BTC.priceBrl + 390).toFixed(2)}</span>
            </div>
          </div>
        </Card>

        {/* Livro Litecoin */}
        <Card variant="glass" radius="lg" className="space-y-3">
          <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-crypto-litecoin font-mono">LTC / BRL</span>
              <span className="text-xs text-text-tertiary">Profundidade Institucional</span>
            </div>
            <span className="text-xs font-mono text-text-primary">
              R$ {quotes.LTC.priceBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between text-text-tertiary text-[11px]">
              <span>Ordem / Nível</span>
              <span>Volume LTC</span>
              <span className="text-right">Cotação BRL</span>
            </div>
            <div className="flex justify-between text-positive py-1 border-b border-white/[0.02]">
              <span>BID 01 (Compra)</span>
              <span>420 LTC</span>
              <span>R$ {(quotes.LTC.priceBrl - 0.40).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-positive py-1 border-b border-white/[0.02]">
              <span>BID 02 (Compra)</span>
              <span>890 LTC</span>
              <span>R$ {(quotes.LTC.priceBrl - 0.95).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-negative py-1 border-b border-white/[0.02]">
              <span>ASK 01 (Venda)</span>
              <span>610 LTC</span>
              <span>R$ {(quotes.LTC.priceBrl + 0.35).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-negative py-1">
              <span>ASK 02 (Venda)</span>
              <span>1.250 LTC</span>
              <span>R$ {(quotes.LTC.priceBrl + 0.85).toFixed(2)}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
