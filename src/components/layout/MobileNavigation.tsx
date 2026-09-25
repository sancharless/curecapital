import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Wallet, PlusCircle, Users, User, ArrowUpRight } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

export const MobileNavigation: React.FC = () => {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [depositAsset, setDepositAsset] = useState<'BTC' | 'LTC' | 'BRL'>('LTC');
  const [depositAmount, setDepositAmount] = useState('');
  const [depositSuccess, setDepositSuccess] = useState(false);

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDepositSuccess(true);
    setTimeout(() => {
      setDepositSuccess(false);
      setIsDepositModalOpen(false);
      setDepositAmount('');
    }, 1800);
  };

  return (
    <>
      <nav 
        aria-label="Navegação mobile"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#081322]/95 backdrop-blur-2xl border-t border-white/[0.08] shadow-[0_-8px_30px_rgba(0,0,0,0.5)]"
        style={{
          paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
        }}
      >
        <div className="max-w-md mx-auto px-4 h-16 flex items-center justify-around relative">
          {/* 1. Início */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `
              flex flex-col items-center justify-center gap-1 w-14 py-1 transition-all duration-150
              ${isActive ? 'text-brand-cyan scale-105 font-medium' : 'text-text-secondary hover:text-text-primary'}
            `}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Início</span>
          </NavLink>

          {/* 2. Carteira */}
          <NavLink
            to="/wallet"
            className={({ isActive }) => `
              flex flex-col items-center justify-center gap-1 w-14 py-1 transition-all duration-150
              ${isActive ? 'text-brand-cyan scale-105 font-medium' : 'text-text-secondary hover:text-text-primary'}
            `}
          >
            <Wallet className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Carteira</span>
          </NavLink>

          {/* 3. Botão Central: Investir (Destaque Premium) */}
          <div className="relative -top-4 flex items-center justify-center">
            <button
              onClick={() => setIsDepositModalOpen(true)}
              aria-label="Novo Aporte ou Investimento"
              className="w-13 h-13 rounded-full bg-gradient-to-tr from-brand-blue to-brand-cyan text-white flex items-center justify-center shadow-[0_8px_25px_rgba(37,99,235,0.45)] border-2 border-bg-primary active:scale-95 transition-transform cursor-pointer"
            >
              <PlusCircle className="w-6 h-6 stroke-[2.2]" />
            </button>
          </div>

          {/* 4. Afiliados */}
          <NavLink
            to="/affiliates"
            className={({ isActive }) => `
              flex flex-col items-center justify-center gap-1 w-14 py-1 transition-all duration-150
              ${isActive ? 'text-brand-cyan scale-105 font-medium' : 'text-text-secondary hover:text-text-primary'}
            `}
          >
            <Users className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Afiliados</span>
          </NavLink>

          {/* 5. Perfil */}
          <NavLink
            to="/profile"
            className={({ isActive }) => `
              flex flex-col items-center justify-center gap-1 w-14 py-1 transition-all duration-150
              ${isActive ? 'text-brand-cyan scale-105 font-medium' : 'text-text-secondary hover:text-text-primary'}
            `}
          >
            <User className="w-5 h-5" />
            <span className="text-[10px] tracking-tight">Perfil</span>
          </NavLink>
        </div>
      </nav>

      {/* Modal de Aporte / Investimento Rápido */}
      <Modal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        title="Aporte de Capital & Custódia"
        description="Selecione o ativo digital para aporte institucional ou alocação patrimonial."
      >
        {depositSuccess ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-positive/10 border border-positive/30 text-positive flex items-center justify-center mx-auto">
              ✓
            </div>
            <div className="text-base font-semibold text-text-primary">
              Ordem de Aporte Simulada!
            </div>
            <p className="text-xs text-text-secondary">
              A movimentação foi registrada na camada de ledger simulado com sucesso.
            </p>
          </div>
        ) : (
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

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
              <div className="flex justify-between text-xs text-text-secondary">
                <span>Taxa de rede / custódia:</span>
                <span className="text-positive font-mono font-medium">0.00% Isento</span>
              </div>
              <div className="flex justify-between text-xs text-text-secondary">
                <span>Liquidação estimada:</span>
                <span className="text-text-primary font-mono">1 confirmação de bloco</span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                fullWidth
                onClick={() => setIsDepositModalOpen(false)}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                rightIcon={<ArrowUpRight className="w-4 h-4" />}
              >
                Confirmar Aporte
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </>
  );
};
