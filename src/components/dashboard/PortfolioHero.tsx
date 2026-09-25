import React, { useState } from 'react';
import { Eye, EyeOff, ArrowUpRight, ArrowDownLeft, Shield } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { usePrivacyStore } from '../../store/privacyStore';
import { useMarketData } from '../../providers/MarketDataProvider';
import { useAnimatedNumber } from '../../hooks/useAnimatedNumber';
import { MARKET_CONFIG } from '../../config/market';

export const PortfolioHero: React.FC = () => {
  const { 
    portfolioTotalBrl, 
    quotes, 
    monthlyGrowthBrl, 
    monthlyGrowthPercent 
  } = useMarketData();

  const hideValues = usePrivacyStore(s => s.hideValues);
  const toggleHideValues = usePrivacyStore(s => s.toggleHideValues);
  const formatCurrency = usePrivacyStore(s => s.formatCurrency);

  // Interpolação suave para animação quando as cotações oscilarem
  const animatedTotal = useAnimatedNumber(portfolioTotalBrl, 400);

  // Estados para modais de Investir e Sacar
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  // Equivalência calculada
  const btcAmount = MARKET_CONFIG.basePortfolio.btcAmount;
  const ltcAmount = MARKET_CONFIG.basePortfolio.ltcAmount;

  const handleWithdrawSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWithdrawSuccess(true);
    setTimeout(() => {
      setWithdrawSuccess(false);
      setIsWithdrawOpen(false);
      setWithdrawAmount('');
    }, 1800);
  };

  return (
    <>
      <Card variant="glass" radius="lg" glow="blue" className="relative overflow-hidden">
        {/* Glow sutil no canto do card */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-radial-gradient from-brand-blue/10 to-transparent pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          {/* Lado Esquerdo: Título, Patrimônio Principal e Equivalências */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-medium uppercase tracking-wider text-text-secondary">
                Patrimônio Total sob Gestão
              </span>
              
              {/* Botão Discreto: Ocultar Saldo */}
              <button
                onClick={toggleHideValues}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[11px] text-text-tertiary hover:text-text-primary bg-white/[0.04] hover:bg-white/[0.08] transition-colors cursor-pointer"
                title={hideValues ? 'Exibir valores' : 'Ocultar valores'}
              >
                {hideValues ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{hideValues ? 'Exibir saldo' : 'Ocultar saldo'}</span>
              </button>
            </div>

            {/* Valor Principal com clamp para evitar quebras em telas menores */}
            <div className="flex items-baseline gap-3 flex-wrap">
              <h2 
                className="font-bold tracking-tight text-text-primary tabular-numbers select-all"
                style={{ fontSize: 'clamp(28px, 6vw, 42px)', lineHeight: 1.1 }}
              >
                {formatCurrency(animatedTotal)}
              </h2>

              {/* Indicador de rentabilidade positiva (VERDE) */}
              <div className="flex items-center gap-2">
                <Badge variant="positive" size="sm">
                  + {hideValues ? '••••' : `R$ ${monthlyGrowthBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`} (+{monthlyGrowthPercent}%)
                </Badge>
                <span className="text-xs text-text-tertiary font-normal">este mês</span>
              </div>
            </div>

            {/* Equivalência de Cripto com ícones e diferenciação visual BTC (dourado) e LTC (prata) */}
            <div className="flex items-center gap-4 sm:gap-6 pt-1 text-xs text-text-secondary flex-wrap">
              {/* Bitcoin */}
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-crypto-bitcoin/15 border border-crypto-bitcoin/40 flex items-center justify-center text-crypto-bitcoin text-[11px] font-bold">
                  ₿
                </div>
                <span className="font-mono text-text-primary font-medium">
                  {hideValues ? '•••• BTC' : `≈ ${btcAmount.toFixed(5)} BTC`}
                </span>
                <span className="text-[11px] text-text-tertiary">
                  (@ {hideValues ? '••••' : `R$ ${quotes.BTC.priceBrl.toLocaleString('pt-BR')}`})
                </span>
              </div>

              <div className="h-3 w-px bg-white/10 hidden sm:block" />

              {/* Litecoin */}
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-crypto-litecoin/15 border border-crypto-litecoin/40 flex items-center justify-center text-crypto-litecoin text-[11px] font-bold">
                  Ł
                </div>
                <span className="font-mono text-text-primary font-medium">
                  {hideValues ? '•••• LTC' : `≈ ${ltcAmount.toFixed(3)} LTC`}
                </span>
                <span className="text-[11px] text-text-tertiary">
                  (@ {hideValues ? '••••' : `R$ ${quotes.LTC.priceBrl.toLocaleString('pt-BR')}`})
                </span>
              </div>
            </div>
          </div>

          {/* Lado Direito: Ações Principais (Investir = Azul, Saque = Transparente com borda) */}
          <div className="flex items-center gap-3 shrink-0 pt-2 lg:pt-0">
            <Button
              variant="outline"
              size="md"
              leftIcon={<ArrowDownLeft className="w-4 h-4 text-text-secondary" />}
              onClick={() => setIsWithdrawOpen(true)}
              className="flex-1 sm:flex-initial"
            >
              Solicitar Saque
            </Button>

            <Button
              variant="primary"
              size="md"
              leftIcon={<ArrowUpRight className="w-4 h-4 text-white" />}
              onClick={() => setIsDepositOpen(true)}
              className="flex-1 sm:flex-initial shadow-glow-blue"
            >
              Investir
            </Button>
          </div>
        </div>
      </Card>

      {/* Modal de Saque */}
      <Modal
        isOpen={isWithdrawOpen}
        onClose={() => setIsWithdrawOpen(false)}
        title="Solicitação de Resgate Institucional"
        description="Transferência de capital disponível para conta de mesma titularidade."
      >
        {withdrawSuccess ? (
          <div className="py-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-positive/10 border border-positive/30 text-positive flex items-center justify-center mx-auto">
              ✓
            </div>
            <div className="text-base font-semibold text-text-primary">
              Solicitação Enviada com Sucesso
            </div>
            <p className="text-xs text-text-secondary">
              O processamento em ledger foi registrado e aguarda confirmação bancária.
            </p>
          </div>
        ) : (
          <form onSubmit={handleWithdrawSubmit} className="space-y-4 pt-1">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
              <span className="text-xs text-text-secondary">Saldo Disponível:</span>
              <span className="text-sm font-semibold text-text-primary font-mono">
                {formatCurrency(2840.00)}
              </span>
            </div>

            <Input
              label="Valor a Resgatar (BRL)"
              placeholder="R$ 800,00"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              required
            />

            <Input
              label="Chave PIX / Conta Bancária"
              defaultValue="rafael.alencar@banco.com.br"
              hint="Mesma titularidade (CPF)"
              disabled
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
              >
                Confirmar Saque
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Modal de Investir (Aporte) */}
      <Modal
        isOpen={isDepositOpen}
        onClose={() => setIsDepositOpen(false)}
        title="Novo Aporte Institucional"
        description="Adicione liquidez ou aporte Bitcoin/Litecoin diretamente na sua carteira."
      >
        <div className="space-y-4 pt-1">
          <div className="p-4 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-start gap-3">
            <Shield className="w-5 h-5 text-brand-cyan shrink-0 mt-0.5" />
            <p className="text-xs text-text-secondary leading-relaxed">
              Os ativos alocados possuem segregação patrimonial e custódia multifirmada. Não há taxa para aportes via rede nativa.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-text-secondary">Endereço de Custódia para Depósito (Litecoin)</label>
            <div className="p-3 bg-black/40 border border-white/10 rounded-xl font-mono text-xs text-text-primary break-all flex items-center justify-between gap-2">
              <span>ltc1q84f93nd72kme910kdwl92jfpqwe0182jdkslw</span>
              <Button 
                variant="secondary" 
                size="sm"
                onClick={() => alert('Endereço copiado para a área de transferência')}
              >
                Copiar
              </Button>
            </div>
          </div>

          <Button
            variant="primary"
            fullWidth
            onClick={() => setIsDepositOpen(false)}
          >
            Concluir
          </Button>
        </div>
      </Modal>
    </>
  );
};
