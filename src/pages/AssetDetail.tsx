import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { ArrowLeft, PlusCircle, ArrowDownLeft, TrendingUp, TrendingDown, ShieldCheck, History, Calendar, DollarSign, Wallet } from 'lucide-react';
import { usePortfolio } from '../hooks/usePortfolio';
import { usePrivacyStore } from '../store/privacyStore';
import { formatBRL } from '../utils/formatters';
import { MOCK_ASSET_CHARTS, MOCK_TRANSACTIONS } from '../data/mockData';
import { TimeframeFilter } from '../types';
import { ContributionModal } from '../components/finance/ContributionModal';
import { WithdrawalModal } from '../components/finance/WithdrawalModal';
import { TransactionDetailDrawer } from '../components/wallet/TransactionDetailDrawer';

export const AssetDetail: React.FC = () => {
  const { symbol } = useParams<{ symbol: string }>();
  const navigate = useNavigate();

  const assetSymbol = (symbol?.toUpperCase() === 'LTC' ? 'LTC' : 'BTC') as 'BTC' | 'LTC';
  const isBtc = assetSymbol === 'BTC';

  const { btcHolding, ltcHolding, quotes } = usePortfolio();
  const hideValues = usePrivacyStore((s) => s.hideValues);

  const holding = isBtc ? btcHolding : ltcHolding;
  const quote = isBtc ? quotes.BTC : quotes.LTC;

  const [activeTimeframe, setActiveTimeframe] = useState<TimeframeFilter>('30D');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState<any | null>(null);

  const themeColor = isBtc ? '#F5A623' : '#38BDF8';
  const assetName = isBtc ? 'Bitcoin' : 'Litecoin';
  const iconChar = isBtc ? '₿' : 'Ł';

  // Obter pontos de gráfico histórico do mockData
  const timeframeKey = activeTimeframe === '6M' ? '3M' : activeTimeframe;
  const historyPoints = MOCK_ASSET_CHARTS[assetSymbol][timeframeKey] || MOCK_ASSET_CHARTS[assetSymbol]['30D'];

  const timeframes: TimeframeFilter[] = ['24H', '7D', '30D', '3M', '1A', 'ALL'];

  // Dimensionamento do Gráfico SVG
  const width = 800;
  const height = 260;
  const padding = { top: 20, right: 20, bottom: 35, left: 20 };

  const prices = historyPoints.map((p) => p.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const range = maxPrice - minPrice || 1;

  const coordinates = historyPoints.map((pt, index) => {
    const x = padding.left + (index / (historyPoints.length - 1)) * (width - padding.left - padding.right);
    const y = height - padding.bottom - ((pt.price - minPrice) / range) * (height - padding.top - padding.bottom);
    return { x, y, pt };
  });

  const pathD = coordinates.reduce((acc, curr, index) => {
    return index === 0 ? `M ${curr.x},${curr.y}` : `${acc} L ${curr.x},${curr.y}`;
  }, '');

  const areaD = coordinates.length > 0
    ? `${pathD} L ${coordinates[coordinates.length - 1].x},${height - padding.bottom} L ${coordinates[0].x},${height - padding.bottom} Z`
    : '';

  const activePoint = hoveredIdx !== null ? coordinates[hoveredIdx] : coordinates[coordinates.length - 1];

  // Histórico específico do ativo
  const assetTransactions = MOCK_TRANSACTIONS.filter((t) => t.asset === assetSymbol);

  const isPositive = holding.profitBrl >= 0;

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* 1. BREADCRUMB & BACK BUTTON */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs">
          <Link
            to="/wallet"
            className="flex items-center gap-1.5 text-text-tertiary hover:text-text-primary transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Carteira</span>
          </Link>
          <span className="text-text-tertiary">/</span>
          <span className="font-semibold text-text-primary">{assetName}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="primary"
            size="sm"
            leftIcon={<PlusCircle className="w-3.5 h-3.5" />}
            onClick={() => setIsDepositOpen(true)}
          >
            Aportar {assetSymbol}
          </Button>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<ArrowDownLeft className="w-3.5 h-3.5" />}
            onClick={() => setIsWithdrawOpen(true)}
            className="bg-white/5 border-white/10"
          >
            Simular Saque
          </Button>
        </div>

      </div>

      {/* 2. HEADER DO ATIVO (Preço, Variação, Posição e Resultado) */}
      <Card
        variant="interactive"
        radius="lg"
        className="p-5 sm:p-7 relative overflow-hidden bg-gradient-to-br from-[#0c1c36] via-[#091527] to-[#050D1A] border-white/10"
      >
        <div
          className="absolute -top-10 -right-10 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: themeColor }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-2xl border border-white/10 shrink-0 shadow-lg"
              style={{ backgroundColor: `${themeColor}20`, color: themeColor }}
            >
              {iconChar}
            </div>

            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
                  {assetName}
                </h1>
                <span
                  className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                  style={{ backgroundColor: `${themeColor}25`, color: themeColor }}
                >
                  {assetSymbol}
                </span>
                <Badge variant="cyan" size="sm">
                  Custódia Segregada
                </Badge>
              </div>

              <div className="flex flex-wrap items-baseline gap-3 mt-1.5">
                <span className="text-2xl sm:text-3xl font-bold font-mono text-text-primary tabular-numbers">
                  {formatBRL(quote.priceBrl)}
                </span>
                <span
                  className={`text-xs font-mono font-bold flex items-center gap-1 ${
                    quote.change24h >= 0 ? 'text-positive' : 'text-negative'
                  }`}
                >
                  {quote.change24h >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {quote.change24h >= 0 ? `+${quote.change24h}%` : `${quote.change24h}%`} (24h)
                </span>
              </div>
            </div>
          </div>

          {/* Sua Posição & Resultado */}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 sm:gap-8 bg-white/[0.03] p-4 rounded-xl border border-white/5">
            <div>
              <span className="text-[11px] font-mono text-text-tertiary uppercase block">
                Sua Posição
              </span>
              <div className="text-base sm:text-lg font-bold font-mono text-text-primary mt-0.5 tabular-numbers">
                {hideValues ? '••••••' : `${holding.quantity} ${assetSymbol}`}
              </div>
              <div className="text-xs font-mono text-text-secondary mt-0.5 tabular-numbers">
                {hideValues ? 'R$ •••••' : formatBRL(holding.currentValue)}
              </div>
            </div>

            <div className="text-right sm:text-left border-l border-white/5 pl-4 sm:pl-8">
              <span className="text-[11px] font-mono text-text-tertiary uppercase block">
                Resultado da Posição
              </span>
              <div
                className={`text-base sm:text-lg font-bold font-mono mt-0.5 tabular-numbers ${
                  isPositive ? 'text-positive' : 'text-negative'
                }`}
              >
                {hideValues ? '+••••' : `+ ${formatBRL(holding.profitBrl)}`}
              </div>
              <div
                className={`text-xs font-mono font-semibold mt-0.5 tabular-numbers ${
                  isPositive ? 'text-positive' : 'text-negative'
                }`}
              >
                {hideValues ? '+••••' : `+${holding.profitPercent}%`}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 3. GRÁFICO INTERATIVO DO ATIVO */}
      <Card variant="glass" radius="lg" className="p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider block">
              Cotação de Mercado ({assetSymbol}/BRL)
            </span>
            <div className="text-xl sm:text-2xl font-bold font-mono text-text-primary tabular-numbers mt-0.5">
              {activePoint ? formatBRL(activePoint.pt.price) : formatBRL(quote.priceBrl)}
            </div>
            <span className="text-xs font-mono text-text-secondary">
              {activePoint ? activePoint.pt.displayDate : 'Período atual'}
            </span>
          </div>

          {/* Timeframes */}
          <div className="flex items-center gap-1 bg-[#091527] p-1 rounded-xl border border-white/5 self-start sm:self-auto">
            {timeframes.map((tf) => (
              <button
                key={tf}
                type="button"
                onClick={() => setActiveTimeframe(tf)}
                className={`px-3 py-1.5 text-xs font-mono font-medium rounded-lg transition-colors cursor-pointer ${
                  activeTimeframe === tf
                    ? 'bg-white/10 text-white font-bold'
                    : 'text-text-tertiary hover:text-text-secondary'
                }`}
              >
                {tf === 'ALL' ? 'Tudo' : tf}
              </button>
            ))}
          </div>
        </div>

        {/* Gráfico SVG com cor suave do ativo */}
        <div className="relative w-full h-[240px] sm:h-[260px] pt-2">
          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-full overflow-visible"
            preserveAspectRatio="none"
            aria-label={`Gráfico de cotação do ativo ${assetName}`}
          >
            <defs>
              <linearGradient id={`assetGrad-${assetSymbol}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={themeColor} stopOpacity="0.28" />
                <stop offset="100%" stopColor={themeColor} stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Linhas de Grade */}
            <line x1={padding.left} y1={padding.top} x2={width - padding.right} y2={padding.top} stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
            <line x1={padding.left} y1={height / 2} x2={width - padding.right} y2={height / 2} stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
            <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} stroke="rgba(255,255,255,0.08)" />

            <path d={areaD} fill={`url(#assetGrad-${assetSymbol})`} />
            <path
              d={pathD}
              fill="none"
              stroke={themeColor}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Ponto interativo */}
            {activePoint && (
              <g>
                <line
                  x1={activePoint.x}
                  y1={padding.top}
                  x2={activePoint.x}
                  y2={height - padding.bottom}
                  stroke="rgba(255,255,255,0.2)"
                  strokeDasharray="3 3"
                />
                <circle
                  cx={activePoint.x}
                  cy={activePoint.y}
                  r="5"
                  fill={themeColor}
                  stroke="#081325"
                  strokeWidth="2.5"
                  className="filter drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
                />
              </g>
            )}

            {/* Zonas de hover */}
            {coordinates.map((coord, idx) => (
              <rect
                key={idx}
                x={coord.x - (width / coordinates.length) / 2}
                y={0}
                width={width / coordinates.length}
                height={height}
                fill="transparent"
                className="cursor-crosshair"
                onMouseEnter={() => setHoveredIdx(idx)}
                onTouchStart={() => setHoveredIdx(idx)}
              />
            ))}
          </svg>
        </div>

        <div className="pt-2 border-t border-white/5 text-[11px] text-text-tertiary">
          Resultados anteriores não representam garantia de desempenho futuro. Dados providos sob arquitetura de custódia institucional.
        </div>
      </Card>

      {/* 4. DADOS ESTRUTURADOS DO ATIVO (Item 15) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card variant="glass" radius="md" className="p-4 space-y-1">
          <span className="text-[11px] font-mono text-text-tertiary uppercase block">
            Preço Médio de Aquisição
          </span>
          <div className="text-lg font-bold font-mono text-text-primary tabular-numbers">
            {formatBRL(holding.averageCost)}
          </div>
          <span className="text-[11px] text-text-secondary">
            Custo médio ponderado
          </span>
        </Card>

        <Card variant="glass" radius="md" className="p-4 space-y-1">
          <span className="text-[11px] font-mono text-text-tertiary uppercase block">
            Valor Total Investido
          </span>
          <div className="text-lg font-bold font-mono text-text-primary tabular-numbers">
            {hideValues ? 'R$ •••••' : formatBRL(holding.investedValue)}
          </div>
          <span className="text-[11px] text-text-secondary">
            Capital alocado na posição
          </span>
        </Card>

        <Card variant="glass" radius="md" className="p-4 space-y-1">
          <span className="text-[11px] font-mono text-text-tertiary uppercase block">
            Resultado Financeiro (R$)
          </span>
          <div className={`text-lg font-bold font-mono tabular-numbers ${isPositive ? 'text-positive' : 'text-negative'}`}>
            {hideValues ? '+••••' : `+ ${formatBRL(holding.profitBrl)}`}
          </div>
          <span className={`text-[11px] font-mono font-semibold ${isPositive ? 'text-positive' : 'text-negative'}`}>
            {hideValues ? '+••••' : `+${holding.profitPercent}% da posição`}
          </span>
        </Card>

        <Card variant="glass" radius="md" className="p-4 space-y-1">
          <span className="text-[11px] font-mono text-text-tertiary uppercase block">
            Ciclo de Aportes
          </span>
          <div className="text-xs font-mono text-text-primary space-y-0.5 pt-0.5">
            <div>Primeiro: <strong>{holding.firstDepositDate}</strong></div>
            <div>Último: <strong>{holding.lastDepositDate}</strong></div>
          </div>
          <span className="text-[11px] text-text-tertiary">
            Custódia ativa há 8 meses
          </span>
        </Card>
      </div>

      {/* 5. HISTÓRICO ESPECÍFICO DO ATIVO (Item 16) */}
      <Card variant="glass" radius="lg" className="p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-text-primary tracking-tight">
              Histórico de Movimentações em {assetName}
            </h3>
            <p className="text-xs text-text-secondary mt-0.5">
              Aportes, conversões e liquidações vinculadas a este ativo.
            </p>
          </div>
          <Badge variant="neutral" size="sm">
            {assetTransactions.length} registros
          </Badge>

        </div>

        {assetTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-text-tertiary font-mono uppercase text-[11px]">
                  <th className="py-3 px-3">Data</th>
                  <th className="py-3 px-3">Operação</th>
                  <th className="py-3 px-3">Referência</th>
                  <th className="py-3 px-3">Quantidade</th>
                  <th className="py-3 px-3 text-right">Valor BRL</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {assetTransactions.map((tx) => (
                  <tr
                    key={tx.id}
                    onClick={() => setSelectedTx(tx)}
                    className="hover:bg-white/[0.03] transition-colors cursor-pointer group"
                  >
                    <td className="py-3.5 px-3 font-mono text-text-secondary">
                      {tx.createdAt}
                    </td>
                    <td className="py-3.5 px-3 font-semibold text-text-primary group-hover:text-brand-cyan transition-colors">
                      {tx.description}
                    </td>
                    <td className="py-3.5 px-3 font-mono text-text-tertiary select-all">
                      {tx.reference}
                    </td>
                    <td className="py-3.5 px-3 font-mono font-bold text-brand-cyan">
                      {tx.amount > 0 ? `+${tx.amount}` : tx.amount} {tx.asset}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-text-primary tabular-numbers">
                      {hideValues ? '••••••' : formatBRL(tx.amountFiatBrl)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-text-tertiary">
            Nenhuma movimentação recente registrada para este ativo.
          </div>
        )}
      </Card>

      {/* Modais de Fluxo */}
      <ContributionModal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        defaultAsset={assetSymbol}
      />

      <WithdrawalModal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
      />

      <TransactionDetailDrawer
        transaction={selectedTx}
        isOpen={Boolean(selectedTx)}
        onClose={() => setSelectedTx(null)}
      />
    </div>
  );
};

export default AssetDetail;
