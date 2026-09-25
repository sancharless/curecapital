import React, { useState } from 'react';
import { Eye, EyeOff, TrendingUp, PlusCircle, ArrowDownLeft, Shield, Info } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { AnimatedNumber } from '../ui/AnimatedNumber';
import { FinancialTooltip } from '../ui/FinancialTooltip';
import { usePrivacyStore } from '../../store/privacyStore';
import { usePortfolio } from '../../hooks/usePortfolio';
import { formatBRL } from '../../utils/formatters';
import { toast } from '../../store/toastStore';

export const PortfolioHero: React.FC = () => {
  const {
    totalBalance,
    monthlyGrowthBrl,
    monthlyGrowthPercent,
    btcEquivalent,
    ltcEquivalent,
    availableBalance,
  } = usePortfolio();

  const hideValues = usePrivacyStore((s) => s.hideValues);
  const toggleHideValues = usePrivacyStore((s) => s.toggleHideValues);

  // Modais de Aporte e Saque
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [depositAsset, setDepositAsset] = useState<'BTC' | 'LTC' | 'BRL'>('LTC');
  const [isLoading, setIsLoading] = useState(false);

  const handleTogglePrivacy = () => {
    toggleHideValues();
    toast.info(hideValues ? 'Valores visíveis' : 'Valores ocultados', 'Preferência salva no dispositivo');
  };

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsDepositOpen(false);
      setDepositAmount('');
      toast.success('Ordem de aporte simulada', 'Registro de custódia vinculado com sucesso');
    }, 900);
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsWithdrawOpen(false);
      setWithdrawAmount('');
      toast.success('Solicitação de saque enviada', 'Transferência em processamento para sua conta');
    }, 900);
  };

  return (
    <>
      {/* Card Principal: Degradê #0B172A → #0D1D34, Halo Azul discreto, Radius 24px */}
      <div className="relative rounded-[24px] p-5 sm:p-7 md:p-8 bg-gradient-to-br from-[#0B172A] via-[#0C1A2F] to-[#0D1D34] border border-white/[0.06] shadow-financial-elevated overflow-hidden group">
        {/* Halo azul discreto sem neon */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-blue/[0.07] rounded-full filter blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-brand-cyan/[0.04] rounded-full filter blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between gap-5 sm:gap-6">
          {/* Topo do Hero: Rótulo e Botão Ocultar Valores */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[11px] sm:text-xs font-mono font-medium uppercase tracking-wider text-text-secondary">
                Patrimônio Total
              </span>
              <FinancialTooltip content="Soma consolidada de ativos sob custódia e moeda fiat">
                <Info className="w-3.5 h-3.5 text-text-tertiary hover:text-text-secondary cursor-pointer" />
              </FinancialTooltip>
            </div>

            <button
              onClick={handleTogglePrivacy}
              aria-label={hideValues ? 'Exibir valores' : 'Ocultar valores'}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium text-text-secondary hover:text-text-primary bg-white/[0.04] hover:bg-white/[0.08] transition-colors cursor-pointer border border-white/[0.06]"
            >
              {hideValues ? <EyeOff className="w-3.5 h-3.5 text-brand-cyan" /> : <Eye className="w-3.5 h-3.5" />}
              <span className="hidden xs:inline">{hideValues ? 'Exibir valores' : 'Ocultar valores'}</span>
            </button>
          </div>

          {/* Valor Patrimonial com Contador Animado e Variação Positiva */}
          <div className="space-y-2.5">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 flex-wrap">
              {/* Valor Principal com font-size 48-58px desktop / 32-40px mobile e sem quebra */}
              <h1 
                className="font-bold tracking-tight text-text-primary tabular-nums whitespace-nowrap leading-none select-all"
                style={{ fontSize: 'clamp(32px, 5.2vw, 56px)' }}
              >
                <AnimatedNumber
                  value={totalBalance}
                  startFrom={51920.00} // Começa de R$ 51.920,00 simulando atualização contábil real
                  duration={900}
                  privacyMode={hideValues}
                />
              </h1>

              {/* Variação Positiva com TrendingUp e Verde #19C37D */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-positive/10 border border-positive/25 text-positive text-xs font-semibold self-start sm:self-auto">
                <TrendingUp className="w-3.5 h-3.5 shrink-0 stroke-[2.2]" />
                <span className="font-mono tabular-nums">
                  + {hideValues ? '••••' : formatBRL(monthlyGrowthBrl).replace('R$ ', 'R$ ')}
                </span>
                <span className="font-mono tabular-nums">
                  (+{monthlyGrowthPercent.toFixed(2)}%)
                </span>
                <span className="text-[10px] text-text-tertiary font-normal hidden sm:inline ml-0.5">
                  este mês
                </span>
              </div>
            </div>

            {/* Conversão BTC / LTC com Tooltip Explicativo (Item 9) */}
            <FinancialTooltip content="Valor estimado considerando cotação média de mercado em tempo real">
              <div className="inline-flex items-center gap-3 sm:gap-4 text-xs text-text-secondary cursor-help pt-1 flex-wrap">
                {/* Bitcoin Dourado */}
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-crypto-bitcoin/20 border border-crypto-bitcoin/40 flex items-center justify-center text-crypto-bitcoin text-[10px] font-bold">
                    ₿
                  </div>
                  <span className="font-mono text-text-primary font-medium">
                    {hideValues ? '•••• BTC' : `≈ ${btcEquivalent.toFixed(5)} BTC`}
                  </span>
                </div>

                <span className="text-white/20">•</span>

                {/* Litecoin Prata */}
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded-full bg-crypto-litecoin/20 border border-crypto-litecoin/40 flex items-center justify-center text-crypto-litecoin text-[10px] font-bold">
                    Ł
                  </div>
                  <span className="font-mono text-text-primary font-medium">
                    {hideValues ? '•••• LTC' : `≈ ${ltcEquivalent.toFixed(2)} LTC`}
                  </span>
                </div>
              </div>
            </FinancialTooltip>
          </div>

          {/* Botões de Ação: "Aportar" primário (#2563EB) e "Saque" secundário (Item 4 e 37) */}
          <div className="pt-2 sm:pt-3 border-t border-white/[0.06] flex items-center gap-3">
            {/* No mobile: 2 colunas com altura mínima de 48px */}
            <div className="grid grid-cols-2 gap-3 w-full sm:w-auto">
              <Button
                variant="primary"
                size="md"
                onClick={() => setIsDepositOpen(true)}
                leftIcon={<PlusCircle className="w-4 h-4" />}
                className="h-12 px-6 shadow-glow-blue text-sm font-semibold flex-1 sm:flex-initial"
              >
                Aportar
              </Button>

              <Button
                variant="outline"
                size="md"
                onClick={() => setIsWithdrawOpen(true)}
                leftIcon={<ArrowDownLeft className="w-4 h-4 text-text-secondary" />}
                className="h-12 px-6 text-sm font-medium flex-1 sm:flex-initial border-white/10 hover:border-white/20"
              >
                Solicitar saque
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Aporte / Investimento */}
      <Modal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        title="Aporte Institucional de Capital"
        description="Selecione o ativo digital para alocação patrimonial com custódia segregada."
      >
        <form onSubmit={handleDepositSubmit} className="space-y-4 pt-1">
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setDepositAsset('LTC')}
              className={`p-3 rounded-xl border text-center transition-colors cursor-pointer ${
                depositAsset === 'LTC' 
                  ? 'border-crypto-litecoin bg-crypto-litecoin/10 text-white font-semibold' 
                  : 'border-white/10 bg-white/5 text-text-secondary'
              }`}
            >
              <div className="text-xs font-mono">LTC</div>
              <div className="text-[11px] text-text-tertiary">Litecoin</div>
            </button>

            <button
              type="button"
              onClick={() => setDepositAsset('BTC')}
              className={`p-3 rounded-xl border text-center transition-colors cursor-pointer ${
                depositAsset === 'BTC' 
                  ? 'border-crypto-bitcoin bg-crypto-bitcoin/10 text-white font-semibold' 
                  : 'border-white/10 bg-white/5 text-text-secondary'
              }`}
            >
              <div className="text-xs font-mono">BTC</div>
              <div className="text-[11px] text-text-tertiary">Bitcoin</div>
            </button>

            <button
              type="button"
              onClick={() => setDepositAsset('BRL')}
              className={`p-3 rounded-xl border text-center transition-colors cursor-pointer ${
                depositAsset === 'BRL' 
                  ? 'border-brand-blue bg-brand-blue/10 text-white font-semibold' 
                  : 'border-white/10 bg-white/5 text-text-secondary'
              }`}
            >
              <div className="text-xs font-mono">BRL</div>
              <div className="text-[11px] text-text-tertiary">Moeda Fiat</div>
            </button>
          </div>

          <Input
            label="Valor do Aporte"
            placeholder={depositAsset === 'BRL' ? 'R$ 5.000,00' : '0.00'}
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            required
          />

          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1 text-xs">
            <div className="flex justify-between text-text-secondary">
              <span>Taxa de alocação:</span>
              <span className="text-positive font-mono font-medium">0.00% Isento</span>
            </div>
            <div className="flex justify-between text-text-secondary">
              <span>Governança:</span>
              <span className="text-text-primary font-mono">Cold Vaults 3-de-5</span>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={() => setIsDepositOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
            >
              Confirmar Aporte
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal de Saque */}
      <Modal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        title="Solicitar Saque de Recursos"
        description="Resgate de capital disponível para conta de mesma titularidade bancária."
      >
        <form onSubmit={handleWithdrawSubmit} className="space-y-4 pt-1">
          <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs">
            <span className="text-text-secondary">Disponível Imediato:</span>
            <span className="text-sm font-semibold text-text-primary font-mono tabular-nums">
              {formatBRL(availableBalance, hideValues)}
            </span>
          </div>

          <Input
            label="Valor do Resgate (BRL)"
            placeholder="R$ 800,00"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            required
          />

          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              fullWidth
              onClick={() => setIsWithdrawOpen(false)}
            >
              Voltar
            </Button>
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
            >
              Confirmar Resgate
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
