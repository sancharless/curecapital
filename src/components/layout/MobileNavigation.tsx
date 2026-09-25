import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Wallet, PlusCircle, Users, User, ArrowUpRight } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { toast } from '../../store/toastStore';

export const MobileNavigation: React.FC = () => {
  const [isDepositModalOpen, setIsDepositModalOpen] = useState(false);
  const [depositAsset, setDepositAsset] = useState<'BTC' | 'LTC' | 'BRL'>('LTC');
  const [depositAmount, setDepositAmount] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsDepositModalOpen(false);
      setDepositAmount('');
      toast.success('Aporte simulado', 'Recursos alocados com sucesso no ledger');
    }, 800);
  };

  return (
    <>
      {/* Bottom Navigation com blur 20px, rgba(7,17,31,.90) e safe-area-inset-bottom (Itens 41 e 42) */}
      <nav
        aria-label="Navegação mobile"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#07111F]/90 backdrop-blur-[20px] border-t border-white/[0.06] shadow-[0_-8px_30px_rgba(0,0,0,0.45)]"
        style={{
          paddingBottom: 'max(10px, env(safe-area-inset-bottom))',
        }}
      >
        <div className="max-w-md mx-auto px-3 h-16 flex items-center justify-between">
          {/* 1. Início */}
          <NavLink
            to="/dashboard"
            className={({ isActive }) => `
              flex flex-col items-center justify-center gap-1 w-14 py-1 transition-all duration-150
              ${isActive ? 'text-brand-cyan font-semibold' : 'text-text-secondary hover:text-text-primary'}
            `}
          >
            <LayoutDashboard className="w-4.5 h-4.5" />
            <span className="text-[10px] tracking-tight">Início</span>
          </NavLink>

          {/* 2. Carteira */}
          <NavLink
            to="/wallet"
            className={({ isActive }) => `
              flex flex-col items-center justify-center gap-1 w-14 py-1 transition-all duration-150
              ${isActive ? 'text-brand-cyan font-semibold' : 'text-text-secondary hover:text-text-primary'}
            `}
          >
            <Wallet className="w-4.5 h-4.5" />
            <span className="text-[10px] tracking-tight">Carteira</span>
          </NavLink>

          {/* 3. Item Central: Investir (Destaque sutil com ícone + label em background azul discreto - Item 42) */}
          <button
            onClick={() => setIsDepositModalOpen(true)}
            aria-label="Aporte e Investimento"
            className="flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-xl bg-brand-blue/15 hover:bg-brand-blue/25 border border-brand-blue/30 text-brand-cyan active:scale-95 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4.5 h-4.5" />
            <span className="text-[10px] font-semibold tracking-tight">Investir</span>
          </button>

          {/* 4. Afiliados */}
          <NavLink
            to="/affiliates"
            className={({ isActive }) => `
              flex flex-col items-center justify-center gap-1 w-14 py-1 transition-all duration-150
              ${isActive ? 'text-brand-cyan font-semibold' : 'text-text-secondary hover:text-text-primary'}
            `}
          >
            <Users className="w-4.5 h-4.5" />
            <span className="text-[10px] tracking-tight">Afiliados</span>
          </NavLink>

          {/* 5. Perfil */}
          <NavLink
            to="/profile"
            className={({ isActive }) => `
              flex flex-col items-center justify-center gap-1 w-14 py-1 transition-all duration-150
              ${isActive ? 'text-brand-cyan font-semibold' : 'text-text-secondary hover:text-text-primary'}
            `}
          >
            <User className="w-4.5 h-4.5" />
            <span className="text-[10px] tracking-tight">Perfil</span>
          </NavLink>
        </div>
      </nav>

      {/* Modal Rápido de Aporte Institucional */}
      <Modal
        isOpen={isDepositModalOpen}
        onClose={() => setIsDepositModalOpen(false)}
        title="Novo Aporte de Capital"
        description="Selecione o ativo digital para alocação patrimonial."
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
              isLoading={isSubmitting}
              rightIcon={<ArrowUpRight className="w-4 h-4" />}
            >
              Confirmar
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};
