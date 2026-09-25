import React, { useState } from 'react';
import { X, CheckCircle2, ArrowRight, ShieldCheck, AlertCircle, ArrowLeftRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { AssetSelector } from './AssetSelector';
import { usePortfolio } from '../../hooks/usePortfolio';
import { toast } from '../../store/toastStore';

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TransferModal: React.FC<TransferModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { btcHolding, ltcHolding } = usePortfolio();

  const [selectedAsset, setSelectedAsset] = useState<'BTC' | 'LTC'>('BTC');
  const [address, setAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('0.01');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentHolding = selectedAsset === 'BTC' ? btcHolding : ltcHolding;

  const handleTransfer = () => {
    if (!address || address.length < 15) {
      setError('Informe um endereço de destino válido.');
      return;
    }
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0 || num > currentHolding.quantity) {
      setError(`Quantidade inválida. Saldo em custódia: ${currentHolding.quantity} ${selectedAsset}`);
      return;
    }

    setError(null);
    setIsSuccess(true);
    toast.info(
      'Transferência Simulada Enviada',
      `Ordem de transferência demonstrativa de ${amount} ${selectedAsset} registrada.`
    );
  };


  const handleClose = () => {
    setIsSuccess(false);
    setError(null);
    setAddress('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-navy-deep/80 backdrop-blur-md animate-fade-in">
      <div className="w-full sm:max-w-lg bg-[#081325] border-t sm:border border-white/10 rounded-t-[28px] sm:rounded-2xl shadow-2xl overflow-hidden max-h-[92dvh] flex flex-col pb-safe animate-slide-up">
        <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowLeftRight className="w-4 h-4 text-brand-cyan" />
            <h3 className="text-base sm:text-lg font-bold text-text-primary tracking-tight">
              Transferência de Ativos
            </h3>
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30">
              DEMO
            </span>
          </div>

          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {!isSuccess ? (
            <>
              <p className="text-xs text-text-secondary">
                Simule a transferência de custódia para um endereço externo em rede nativa ou cofre frio.
              </p>

              <AssetSelector
                selectedAsset={selectedAsset}
                onSelect={setSelectedAsset}
                label="Selecione o Ativo para Transferir"
              />

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-text-secondary uppercase">
                  Endereço do Destinatário
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder={selectedAsset === 'BTC' ? 'bc1q...' : 'ltc1q...'}
                  className="w-full px-4 py-3 bg-[#091527] border border-white/10 rounded-xl text-xs font-mono text-text-primary focus:outline-none focus:border-brand-blue/70"
                  style={{ fontSize: '16px' }}
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <label className="font-semibold text-text-secondary uppercase">Quantidade</label>
                  <span className="text-text-tertiary font-mono">Disponível: {currentHolding.quantity} {selectedAsset}</span>
                </div>
                <input
                  type="text"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 bg-[#091527] border border-white/10 rounded-xl text-base font-mono font-bold text-text-primary focus:outline-none focus:border-brand-blue/70"
                  style={{ fontSize: '16px' }}
                />
              </div>

              {error && (
                <p className="text-xs text-negative font-medium">{error}</p>
              )}

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-2 text-xs text-amber-200/90">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  Ambiente demonstrativo da Fase 3. Nenhuma transação blockchain real será transmitida à mempool.
                </span>
              </div>
            </>
          ) : (
            <div className="py-6 text-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-positive/10 border border-positive/30 text-positive flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-text-primary">Transferência Simulada</h4>
              <p className="text-xs text-text-secondary">
                A solicitação de {amount} {selectedAsset} para {address.slice(0, 10)}... foi registrada no livro demonstrativo.
              </p>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-5 border-t border-white/5 bg-[#050D1A] flex items-center justify-end gap-3">
          {!isSuccess ? (
            <>
              <Button variant="ghost" size="md" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" size="md" onClick={handleTransfer}>
                Confirmar Transferência
              </Button>
            </>
          ) : (
            <Button variant="primary" size="md" className="w-full" onClick={handleClose}>
              Fechar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
