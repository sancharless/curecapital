import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, AlertCircle, Building2, QrCode } from 'lucide-react';
import { Button } from '../ui/Button';
import { CurrencyInput } from './CurrencyInput';
import { usePortfolio } from '../../hooks/usePortfolio';
import { toast } from '../../store/toastStore';
import { formatBRL } from '../../utils/formatters';

interface WithdrawalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WithdrawalModal: React.FC<WithdrawalModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { availableBalance } = usePortfolio(); // R$ 2.840,00

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [amountBrl, setAmountBrl] = useState<number>(1000);
  const [destinationType, setDestinationType] = useState<'pix' | 'bank'>('pix');
  const [pixKey, setPixKey] = useState<string>('084.***.***-91 (CPF)');
  const [error, setError] = useState<string | null>(null);
  const [generatedRef, setGeneratedRef] = useState<string>('');

  if (!isOpen) return null;

  const handleNext = () => {
    if (amountBrl <= 0) {
      setError('Informe um valor válido para resgate.');
      return;
    }
    if (amountBrl > availableBalance) {
      setError(`Valor acima do disponível em caixa (${formatBRL(availableBalance)}).`);
      return;
    }
    if (amountBrl < 50) {
      setError('O valor mínimo de resgate é R$ 50,00.');
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleConfirmWithdrawal = () => {
    const randomHex = Math.random().toString(16).substring(2, 8).toUpperCase();
    const refId = `CUR-260925-W${randomHex}`;
    setGeneratedRef(refId);

    toast.info(
      'Solicitação de Saque Registrada',
      `Simulação de resgate de ${formatBRL(amountBrl)} enviada para liquidação demonstrativa.`
    );

    setStep(3);
  };


  const handleResetAndClose = () => {
    setStep(1);
    setAmountBrl(1000);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-navy-deep/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full sm:max-w-lg bg-[#081325] border-t sm:border border-white/10 rounded-t-[28px] sm:rounded-2xl shadow-2xl overflow-hidden max-h-[92dvh] flex flex-col pb-safe transition-transform animate-slide-up"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse" />
            <h3 className="text-base sm:text-lg font-bold text-text-primary tracking-tight">
              Solicitar Saque
            </h3>
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30">
              DEMO
            </span>
          </div>

          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              {/* Badge Disponível para saque (Item 39) */}
              <div className="p-3.5 rounded-xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider block">
                    Disponível para saque
                  </span>
                  <span className="text-lg font-bold font-mono text-brand-cyan tabular-numbers">
                    {formatBRL(availableBalance)}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setAmountBrl(availableBalance)}
                  className="text-xs font-mono font-bold text-brand-cyan hover:underline cursor-pointer bg-white/5 px-2.5 py-1 rounded-lg border border-white/10"
                >
                  Usar máximo
                </button>
              </div>

              {/* Input de Valor */}
              <CurrencyInput
                label="Valor a Sacar"
                value={amountBrl}
                onChange={(val) => {
                  setAmountBrl(val);
                  if (val <= availableBalance && val >= 50) setError(null);
                }}
                error={error}
                helperText={`Limite disponível em caixa: ${formatBRL(availableBalance)}.`}
              />

              {/* Destino */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-text-secondary tracking-wide uppercase">
                  Destino dos Recursos
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDestinationType('pix')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      destinationType === 'pix'
                        ? 'bg-brand-blue/15 border-brand-blue/60 text-text-primary ring-1 ring-brand-blue/40'
                        : 'bg-[#091527] border-white/5 text-text-secondary hover:border-white/15'
                    }`}
                  >
                    <QrCode className="w-4 h-4 text-brand-cyan shrink-0" />
                    <div>
                      <div className="text-xs font-bold">Chave PIX</div>
                      <div className="text-[10px] text-text-tertiary">Liquidação D+0</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDestinationType('bank')}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                      destinationType === 'bank'
                        ? 'bg-brand-blue/15 border-brand-blue/60 text-text-primary ring-1 ring-brand-blue/40'
                        : 'bg-[#091527] border-white/5 text-text-secondary hover:border-white/15'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-brand-cyan shrink-0" />
                    <div>
                      <div className="text-xs font-bold">Conta TED</div>
                      <div className="text-[10px] text-text-tertiary">Mesma titularidade</div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-text-tertiary flex items-center justify-between">
                <span>Chave cadastrada:</span>
                <span className="font-mono text-text-primary font-medium">{pixKey}</span>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <p className="text-xs text-text-secondary">
                Revise os parâmetros do resgate antes de emitir a ordem demonstrativa.
              </p>

              <div className="p-4 rounded-xl bg-[#081325]/90 border border-white/10 space-y-3 text-xs">
                <div className="flex justify-between items-center text-text-secondary">
                  <span>Valor solicitado</span>
                  <span className="font-mono font-bold text-text-primary tabular-numbers">
                    {formatBRL(amountBrl)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-text-secondary">
                  <span>Modalidade</span>
                  <span className="font-semibold text-text-primary">
                    {destinationType === 'pix' ? 'PIX Instantâneo' : 'TED Bancária'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-text-secondary">
                  <span>Favorecido</span>
                  <span className="font-mono text-text-primary">{pixKey}</span>
                </div>
                <div className="flex justify-between items-center text-text-secondary">
                  <span>Tarifa de resgate</span>
                  <span className="font-mono text-positive font-bold">R$ 0,00 (Gratuito)</span>
                </div>
                <div className="border-t border-white/10 pt-2 flex justify-between items-center">
                  <span className="font-semibold text-text-primary">Saldo restante em caixa</span>
                  <span className="font-mono font-bold text-brand-cyan tabular-numbers">
                    {formatBRL(availableBalance - amountBrl)}
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5 text-xs text-amber-200/90 leading-relaxed">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Ambiente demonstrativo. Nenhuma transferência bancária ou liquidação fiduciária real será executada.
                </span>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="py-4 space-y-4 text-center animate-fade-in">
              <div className="w-14 h-14 rounded-full bg-positive/10 border border-positive/30 text-positive flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(16,185,129,0.2)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-lg font-bold text-text-primary">
                  Solicitação de Saque Criada
                </h4>
                <p className="text-xs text-text-secondary mt-1">
                  Ordem simulada enviada para o livro de liquidação.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#091527] border border-white/5 space-y-2 text-xs text-left">
                <div className="flex justify-between items-center text-text-tertiary">
                  <span>Identificador</span>
                  <span className="font-mono text-text-primary font-bold">{generatedRef}</span>
                </div>
                <div className="flex justify-between items-center text-text-tertiary">
                  <span>Valor Solicitado</span>
                  <span className="font-mono text-text-primary font-bold">{formatBRL(amountBrl)}</span>
                </div>
                <div className="flex justify-between items-center text-text-tertiary">
                  <span>Destino</span>
                  <span className="font-mono text-text-secondary">{destinationType === 'pix' ? 'PIX' : 'TED'}</span>
                </div>
                <div className="flex justify-between items-center text-text-tertiary pt-1 border-t border-white/5">
                  <span>Status</span>
                  <span className="text-[11px] font-mono text-amber-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block animate-ping" />
                    Processando Simulação
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-white/5 bg-[#050D1A] flex items-center justify-end gap-3">
          {step === 1 && (
            <>
              <Button variant="ghost" size="md" onClick={handleResetAndClose}>
                Cancelar
              </Button>
              <Button variant="primary" size="md" onClick={handleNext}>
                Continuar
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </>
          )}

          {step === 2 && (
            <>
              <Button variant="ghost" size="md" onClick={() => setStep(1)}>
                Voltar
              </Button>
              <Button variant="primary" size="md" onClick={handleConfirmWithdrawal}>
                Confirmar solicitação
              </Button>
            </>
          )}

          {step === 3 && (
            <Button variant="primary" size="md" className="w-full" onClick={handleResetAndClose}>
              Concluir e voltar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
