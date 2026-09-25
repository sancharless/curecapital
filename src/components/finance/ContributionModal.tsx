import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { CurrencyInput } from './CurrencyInput';
import { AssetSelector } from './AssetSelector';
import { TransactionSummary } from './TransactionSummary';
import { usePortfolio } from '../../hooks/usePortfolio';
import { toast } from '../../store/toastStore';
import { formatBRL } from '../../utils/formatters';

interface ContributionModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultAsset?: 'BTC' | 'LTC';
}

export const ContributionModal: React.FC<ContributionModalProps> = ({
  isOpen,
  onClose,
  defaultAsset = 'BTC',
}) => {
  const { quotes } = usePortfolio();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedAsset, setSelectedAsset] = useState<'BTC' | 'LTC'>(defaultAsset);
  const [amountBrl, setAmountBrl] = useState<number>(5000);
  const [error, setError] = useState<string | null>(null);
  const [generatedRef, setGeneratedRef] = useState<string>('');

  if (!isOpen) return null;

  const currentPrice = selectedAsset === 'BTC' ? quotes.BTC.priceBrl : quotes.LTC.priceBrl;
  const estimatedCrypto = currentPrice > 0 ? amountBrl / currentPrice : 0;
  const assetName = selectedAsset === 'BTC' ? 'Bitcoin' : 'Litecoin';

  const handleNextStep = () => {
    if (amountBrl < 100) {
      setError('O valor mínimo de aporte é R$ 100,00.');
      return;
    }
    setError(null);
    setStep(2);
  };

  const handleConfirmSimulation = () => {
    // Generate institutional reference ID
    const randomHex = Math.random().toString(16).substring(2, 8).toUpperCase();
    const refId = `CUR-260925-${randomHex}`;
    setGeneratedRef(refId);

    // Feedback toast
    toast.success(
      'Simulação de Aporte Criada',
      `Aporte simulado de ${formatBRL(amountBrl)} em ${assetName} registrado com sucesso.`
    );

    setStep(3);
  };

  const handleResetAndClose = () => {
    setStep(1);
    setAmountBrl(5000);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-navy-deep/80 backdrop-blur-md animate-fade-in">
      {/* Container Responsivo: Bottom Sheet no Mobile, Modal Centralizado no Desktop */}
      <div 
        className="w-full sm:max-w-lg bg-[#081325] border-t sm:border border-white/10 rounded-t-[28px] sm:rounded-2xl shadow-2xl overflow-hidden max-h-[92dvh] flex flex-col pb-safe transition-transform animate-slide-up"
      >
        {/* Header do Modal / Sheet */}
        <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-pulse" />
            <h3 className="text-base sm:text-lg font-bold text-text-primary tracking-tight">
              {step === 3 ? 'Aporte Simulado' : 'Novo Aporte de Capital'}
            </h3>
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30">
              AMBIENTE DEMONSTRATIVO
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

        {/* Corpo do Fluxo com scroll interno se necessário */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {step === 1 && (
            <div className="space-y-5 animate-fade-in">
              <p className="text-xs text-text-secondary leading-relaxed">
                Selecione o ativo digital e defina o valor em reais que deseja alocar na sua carteira institucional.
              </p>

              {/* Seletor de Ativo */}
              <AssetSelector
                selectedAsset={selectedAsset}
                onSelect={(asset) => {
                  setSelectedAsset(asset);
                  setError(null);
                }}
                label="Selecione o Ativo Digital"
              />

              {/* Input Financeiro */}
              <CurrencyInput
                label="Valor do Aporte"
                value={amountBrl}
                onChange={(val) => {
                  setAmountBrl(val);
                  if (val >= 100) setError(null);
                }}
                error={error}
                helperText="Valor mínimo recomendado: R$ 100,00."
              />

              {/* Prévia de Quantidade */}
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
                <span className="text-text-tertiary">Estimativa de alocação:</span>
                <span className="font-mono font-bold text-text-primary">
                  ≈ {estimatedCrypto.toFixed(selectedAsset === 'BTC' ? 6 : 4)} {selectedAsset}
                </span>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-fade-in">
              <p className="text-xs text-text-secondary">
                Confira os detalhes da simulação antes de confirmar o registro demonstrativo.
              </p>

              <TransactionSummary
                amountBrl={amountBrl}
                asset={selectedAsset}
                assetName={assetName}
                quotePriceBrl={currentPrice}
                estimatedCryptoAmount={estimatedCrypto}
              />

              {/* Aviso Regulatório Conforme Item 35 */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2.5 text-xs text-amber-200/90 leading-relaxed">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Valores de ativos digitais podem variar entre a simulação e o processamento de liquidação no mercado.
                </span>
              </div>

              <div className="text-[11px] text-text-tertiary flex items-center gap-1.5 justify-center">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-cyan" />
                <span>Custódia Segregada e Governança Institucional</span>
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
                  Simulação Registrada
                </h4>
                <p className="text-xs text-text-secondary mt-1">
                  Sua intenção de aporte foi processada no ambiente demonstrativo da Cure Capital.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#091527] border border-white/5 space-y-2 text-xs text-left">
                <div className="flex justify-between items-center text-text-tertiary">
                  <span>ID de Referência</span>
                  <span className="font-mono text-text-primary font-bold">
                    {generatedRef}
                  </span>
                </div>
                <div className="flex justify-between items-center text-text-tertiary">
                  <span>Ativo</span>
                  <span className="font-mono text-text-primary font-bold">
                    {selectedAsset} ({assetName})
                  </span>
                </div>
                <div className="flex justify-between items-center text-text-tertiary">
                  <span>Valor Simulado</span>
                  <span className="font-mono text-positive font-bold">
                    {formatBRL(amountBrl)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-text-tertiary">
                  <span>Cripto Estimada</span>
                  <span className="font-mono text-brand-cyan font-bold">
                    ≈ {estimatedCrypto.toFixed(selectedAsset === 'BTC' ? 6 : 4)} {selectedAsset}
                  </span>
                </div>
                <div className="flex justify-between items-center text-text-tertiary pt-1 border-t border-white/5">
                  <span>Status</span>
                  <span className="text-[11px] font-mono text-positive font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-positive inline-block" />
                    Simulação Concluída
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Rodapé com Botões de Ação */}
        <div className="p-4 sm:p-5 border-t border-white/5 bg-[#050D1A] flex items-center justify-end gap-3">
          {step === 1 && (
            <>
              <Button variant="ghost" size="md" onClick={handleResetAndClose}>
                Cancelar
              </Button>
              <Button variant="primary" size="md" onClick={handleNextStep}>
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
              <Button variant="primary" size="md" onClick={handleConfirmSimulation}>
                Confirmar simulação
              </Button>
            </>
          )}

          {step === 3 && (
            <Button variant="primary" size="md" className="w-full" onClick={handleResetAndClose}>
              Voltar para carteira / investimentos
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
