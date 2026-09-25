import React, { useState } from 'react';
import { Eye, EyeOff, PlusCircle, ArrowDownLeft, ArrowUpRight } from 'lucide-react';
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
    btcChipDisplay,
    ltcChipDisplay,
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
      toast.success('Aporte simulado', 'Recursos alocados com sucesso no ledger');
    }, 800);
  };

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsWithdrawOpen(false);
      setWithdrawAmount('');
      toast.success('Solicitação de saque enviada', 'Transferência em processamento para sua conta');
    }, 800);
  };

  return (
    <>
      {/* 
        Card Principal:
        - Altura reduzida em 15-20% (Item 3)
        - Radius 22px (Item 12)
        - Background linear-gradient(145deg, rgba(15,31,55,.96), rgba(11,25,45,.96)) (Item 13)
        - Iluminação azul extremamente sutil no canto superior direito blur 100px (Item 14)
        - Border 1px solid rgba(255,255,255,0.055)
      */}
      <div className="relative rounded-[22px] px-5 py-4 sm:px-6 sm:py-5 md:px-7 md:py-5.5 bg-gradient-to-br from-[#0F1F37]/95 to-[#0B192D]/95 border border-white/[0.055] shadow-financial-glass overflow-hidden">
        {/* Iluminação azul quase imperceptível (Item 14) */}
        <div className="absolute -top-16 -right-16 w-80 h-80 bg-brand-blue/[0.08] rounded-full filter blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-between gap-3.5 sm:gap-4.5">
          {/* Linha Superior: Rótulo e Privacy Button (Ghost action - Item 11) */}
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-medium uppercase tracking-wider text-text-tertiary">
              Patrimônio Total
            </span>

            {/* Privacy Button: ghost action discreta com border suave (Item 11) */}
            <button
              onClick={handleTogglePrivacy}
              aria-label={hideValues ? 'Exibir valores' : 'Ocultar valores'}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium text-text-secondary hover:text-text-primary bg-transparent hover:bg-white/[0.03] transition-colors cursor-pointer border border-white/[0.06]"
            >
              {hideValues ? <EyeOff className="w-3.5 h-3.5 text-brand-cyan" /> : <Eye className="w-3.5 h-3.5 text-text-secondary" />}
              <span className="hidden xs:inline">{hideValues ? 'Exibir valores' : 'Ocultar valores'}</span>
            </button>
          </div>

          {/* Linha Central: Valor em Destaque + Variação do Mês + Equivalências BTC/LTC */}
          <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-3 lg:gap-6 flex-wrap">
            <div className="flex items-baseline gap-3 flex-wrap">
              {/* Valor do Patrimônio: font-weight 600-650, letter-spacing -0.03em (Item 4) */}
              <h1 
                className="font-semibold tracking-[-0.03em] text-[#F5F7FB] tabular-nums whitespace-nowrap leading-none select-all"
                style={{ fontSize: 'clamp(30px, 4.2vw, 48px)', fontWeight: 620 }}
              >
                <AnimatedNumber
                  value={totalBalance}
                  startFrom={51920.00}
                  duration={850}
                  privacyMode={hideValues}
                />
              </h1>

              {/* Variação do Mês Refinada: ↗ + R$ 1.284,32 +2,51% este mês (Item 5 e 6) */}
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(25,195,125,.08)] border border-[rgba(25,195,125,.18)] text-positive text-xs font-medium">
                <span className="text-positive font-bold">↗</span>
                <span className="font-mono tabular-nums font-semibold">
                  + {hideValues ? '••••' : formatBRL(monthlyGrowthBrl).replace('R$ ', 'R$ ')}
                </span>
                <span className="font-mono tabular-nums font-semibold">
                  +{monthlyGrowthPercent.toFixed(2)}%
                </span>
                <span className="text-[11px] text-text-tertiary font-normal">
                  este mês
                </span>
              </div>
            </div>

            {/* Asset Chips: BTC e LTC com Label "Equivalência estimada" (Item 7 e 8) */}
            <div className="flex items-center gap-2 pt-0.5 text-xs flex-wrap">
              <span className="text-[11px] text-text-tertiary mr-1 hidden sm:inline">
                Equivalência estimada:
              </span>

              {/* BTC Chip */}
              <FinancialTooltip content="Equivalência estimada em Bitcoin na cotação média de mercado">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[rgba(245,166,35,.07)] border border-[rgba(245,166,35,.15)] cursor-help">
                  <span className="w-3.5 h-3.5 rounded-full bg-crypto-bitcoin/20 text-crypto-bitcoin text-[10px] font-bold flex items-center justify-center">
                    ₿
                  </span>
                  <span className="font-mono text-text-primary text-[11px] font-medium">
                    {hideValues ? '•••• BTC' : btcChipDisplay}
                  </span>
                </div>
              </FinancialTooltip>

              {/* LTC Chip */}
              <FinancialTooltip content="Equivalência estimada em Litecoin na cotação média de mercado">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[rgba(184,194,204,.07)] border border-[rgba(184,194,204,.15)] cursor-help">
                  <span className="w-3.5 h-3.5 rounded-full bg-crypto-litecoin/20 text-crypto-litecoin text-[10px] font-bold flex items-center justify-center">
                    Ł
                  </span>
                  <span className="font-mono text-text-primary text-[11px] font-medium">
                    {hideValues ? '•••• LTC' : ltcChipDisplay}
                  </span>
                </div>
              </FinancialTooltip>
            </div>
          </div>

          {/* Linha Inferior: Ações Aportar e Solicitar Saque (Item 9, 10, 37) */}
          <div className="pt-2 sm:pt-2.5 border-t border-white/[0.05] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {/* Botão Aportar: linear-gradient 135deg #2563EB → #2D6CF6 com shadow sutil (Item 9) */}
              <button
                onClick={() => setIsDepositOpen(true)}
                className="h-10 sm:h-10.5 px-5 sm:px-6 rounded-btn text-xs sm:text-sm font-semibold text-white
                  bg-gradient-to-br from-[#2563EB] to-[#2D6CF6] hover:brightness-110 active:scale-[0.98]
                  shadow-[0_8px_24px_rgba(37,99,235,0.18)] border border-blue-400/20
                  inline-flex items-center justify-center gap-2 transition-all cursor-pointer flex-1 sm:flex-initial min-h-[44px]"
              >
                <PlusCircle className="w-4 h-4 stroke-[2.2]" />
                <span>Aportar</span>
              </button>

              {/* Botão Solicitar Saque: background rgba(255,255,255,.015), border rgba(255,255,255,.10) (Item 10) */}
              <button
                onClick={() => setIsWithdrawOpen(true)}
                className="h-10 sm:h-10.5 px-5 sm:px-6 rounded-btn text-xs sm:text-sm font-medium text-text-secondary hover:text-text-primary
                  bg-white/[0.015] hover:bg-white/[0.04] active:scale-[0.98]
                  border border-white/10 hover:border-white/20
                  inline-flex items-center justify-center gap-2 transition-all cursor-pointer flex-1 sm:flex-initial min-h-[44px]"
              >
                <ArrowDownLeft className="w-4 h-4 text-text-tertiary" />
                <span>Solicitar saque</span>
              </button>
            </div>

            <div className="hidden lg:flex items-center gap-2 text-[11px] text-text-tertiary font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-positive inline-block" />
              <span>Custódia Segregada Ativa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Aporte */}
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
