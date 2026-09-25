import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../ui/Card';
import { ShieldCheck, Check, ChevronRight, Lock } from 'lucide-react';
import { APP_CONFIG } from '../../config/app';

export const SecurityStatusCard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card variant="glass" radius="lg" className="p-4 sm:p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between border-b border-white/[0.06] pb-3 mb-3">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-brand-cyan" />
          <h3 className="text-xs sm:text-sm font-semibold text-text-primary tracking-tight">
            Segurança da Conta
          </h3>
        </div>
        <span className="text-[10px] font-mono text-positive bg-positive/10 px-2 py-0.5 rounded-full border border-positive/20 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-positive inline-block" />
          Protegida
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs py-1">
        <div className="space-y-1">
          <span className="text-[10px] text-text-tertiary block font-mono">2FA TOTP</span>
          <div className="font-semibold text-text-primary flex items-center gap-1 text-[11px]">
            <Check className="w-3 h-3 text-positive" />
            <span>Ativado</span>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] text-text-tertiary block font-mono">E-mail</span>
          <div className="font-semibold text-text-primary flex items-center gap-1 text-[11px]">
            <Check className="w-3 h-3 text-positive" />
            <span>Verificado</span>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] text-text-tertiary block font-mono">Telefone</span>
          <div className="font-semibold text-text-primary flex items-center gap-1 text-[11px]">
            <Check className="w-3 h-3 text-positive" />
            <span>Verificado</span>
          </div>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] text-text-tertiary block font-mono">Último Acesso</span>
          <div className="text-[11px] text-text-secondary truncate">
            Hoje, 13:42
          </div>
        </div>
      </div>

      <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-[10px] text-text-tertiary">Cold Storage 3-de-5 Multi-Sig</span>
        <button
          onClick={() => navigate('/settings')}
          className="text-xs text-brand-cyan hover:text-brand-blue-hover flex items-center gap-1 font-medium transition-colors cursor-pointer"
        >
          <span>Gerenciar segurança</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </Card>
  );
};
