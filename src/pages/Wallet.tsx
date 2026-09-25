import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { WalletCard } from '../components/dashboard/WalletCard';
import { ArrowDownLeft, ArrowUpRight, Copy, Check, ShieldCheck, Key } from 'lucide-react';
import { useMarketData } from '../providers/MarketDataProvider';
import { usePrivacyStore } from '../store/privacyStore';
import { MARKET_CONFIG } from '../config/market';

export const Wallet: React.FC = () => {
  const { btcPortfolioBrl, ltcPortfolioBrl, fiatCashBrl, quotes } = useMarketData();
  const formatCurrency = usePrivacyStore(s => s.formatCurrency);
  const hideValues = usePrivacyStore(s => s.hideValues);

  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
            Minha Carteira & Custódia
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Gestão de endereços, segregação patrimonial e liquidez em Bitcoin e Litecoin.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="cyan" size="sm" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
            Custódia Segregada Ativa
          </Badge>
        </div>
      </div>

      {/* Grid Carteira Resumo + Gráfico Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-6">
          <WalletCard />
        </div>

        {/* Card Saldo em Caixa / Fiat */}
        <div className="lg:col-span-6 space-y-4">
          <Card variant="glass" radius="lg" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-text-tertiary uppercase">Disponível em Moeda Fiat</span>
                <div className="text-2xl font-bold font-mono text-text-primary tabular-numbers mt-1">
                  {formatCurrency(fiatCashBrl)}
                </div>
              </div>
              <Badge variant="positive" size="sm">Liquidez D+0</Badge>
            </div>
            <p className="text-xs text-text-secondary">
              Recursos prontamente utilizáveis para novas alocações ou resgate imediato via PIX/TED.
            </p>
          </Card>

          {/* Segurança da Carteira */}
          <Card variant="glass" radius="lg" className="p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-text-primary">
              <Key className="w-4 h-4 text-crypto-bitcoin" />
              <span>Arquitetura de Segurança de Chaves</span>
            </div>
            <p className="text-xs text-text-tertiary leading-relaxed">
              As reservas estão alocadas em cofres criptográficos isolados da internet (cold storage) com governança 3-de-5 signatários.
            </p>
          </Card>
        </div>
      </div>

      {/* Endereços Públicos de Depósito */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-text-primary">Endereços de Custódia Dedicados</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bitcoin */}
          <Card variant="glass" radius="md" className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-crypto-bitcoin/20 text-crypto-bitcoin text-xs font-bold flex items-center justify-center">
                  ₿
                </span>
                <span className="text-xs font-semibold text-text-primary">Bitcoin Native SegWit (bech32)</span>
              </div>
              <Badge variant="bitcoin" size="sm">BTC</Badge>
            </div>
            <div className="bg-[#081322] border border-white/10 rounded-xl p-3 flex items-center justify-between gap-2 font-mono text-xs text-text-secondary select-all">
              <span className="truncate">bc1q487n92kme029kdls02mwe01823ndkal299</span>
              <button
                onClick={() => copyToClipboard('bc1q487n92kme029kdls02mwe01823ndkal299', 'btc')}
                className="text-text-tertiary hover:text-text-primary p-1 cursor-pointer"
              >
                {copiedKey === 'btc' ? <Check className="w-4 h-4 text-positive" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="text-[11px] text-text-tertiary flex justify-between">
              <span>Saldo alocado: {hideValues ? '••••' : `${MARKET_CONFIG.basePortfolio.btcAmount} BTC`}</span>
              <span className="font-mono">{formatCurrency(btcPortfolioBrl)}</span>
            </div>
          </Card>

          {/* Litecoin */}
          <Card variant="glass" radius="md" className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-crypto-litecoin/20 text-crypto-litecoin text-xs font-bold flex items-center justify-center">
                  Ł
                </span>
                <span className="text-xs font-semibold text-text-primary">Litecoin Native SegWit (MWEB Ready)</span>
              </div>
              <Badge variant="litecoin" size="sm">LTC</Badge>
            </div>
            <div className="bg-[#081322] border border-white/10 rounded-xl p-3 flex items-center justify-between gap-2 font-mono text-xs text-text-secondary select-all">
              <span className="truncate">ltc1q84f93nd72kme910kdwl92jfpqwe0182jdkslw</span>
              <button
                onClick={() => copyToClipboard('ltc1q84f93nd72kme910kdwl92jfpqwe0182jdkslw', 'ltc')}
                className="text-text-tertiary hover:text-text-primary p-1 cursor-pointer"
              >
                {copiedKey === 'ltc' ? <Check className="w-4 h-4 text-positive" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <div className="text-[11px] text-text-tertiary flex justify-between">
              <span>Saldo alocado: {hideValues ? '••••' : `${MARKET_CONFIG.basePortfolio.ltcAmount} LTC`}</span>
              <span className="font-mono">{formatCurrency(ltcPortfolioBrl)}</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
