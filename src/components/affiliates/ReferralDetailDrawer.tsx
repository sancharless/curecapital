import React from 'react';
import { X, UserCheck, ShieldCheck, DollarSign, Calendar, Lock } from 'lucide-react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Referral, ReferralStatus } from '../../data/affiliateMock';
import { usePrivacyStore } from '../../store/privacyStore';
import { formatBRL } from '../../utils/formatters';

interface ReferralDetailDrawerProps {
  referral: Referral | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ReferralDetailDrawer: React.FC<ReferralDetailDrawerProps> = ({
  referral,
  isOpen,
  onClose,
}) => {
  const hideValues = usePrivacyStore((s) => s.hideValues);

  if (!isOpen || !referral) return null;

  const getStatusBadge = (status: ReferralStatus) => {
    switch (status) {
      case 'active':
        return <Badge variant="positive" size="sm">Ativo</Badge>;
      case 'verified':
        return <Badge variant="cyan" size="sm">Verificado</Badge>;
      case 'registered':
        return <Badge variant="info" size="sm">Cadastrado</Badge>;
      case 'pending':
        return <Badge variant="neutral" size="sm">Pendente</Badge>;
      case 'inactive':
        return <Badge variant="neutral" size="sm">Inativo</Badge>;
      default:
        return <Badge variant="neutral" size="sm">{status}</Badge>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-navy-deep/80 backdrop-blur-md animate-fade-in">
      <div className="w-full sm:max-w-md bg-[#081325] border-t sm:border border-white/10 rounded-t-[28px] sm:rounded-2xl shadow-2xl overflow-hidden max-h-[92dvh] flex flex-col pb-safe animate-slide-up">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan" />
            <h3 className="text-base font-bold text-text-primary tracking-tight">
              Detalhes da Indicação
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Avatar e Nome Abreviado (Item 25 & 28) */}
          <div className="text-center py-4 bg-[#050D1A] rounded-2xl border border-white/5 space-y-2">
            <div className="w-14 h-14 rounded-full bg-brand-blue/20 text-brand-cyan font-bold text-lg flex items-center justify-center mx-auto border border-brand-blue/30 shadow-lg">
              {referral.displayName.substring(0, 2).toUpperCase()}
            </div>
            <div>
              <h4 className="text-base font-bold text-text-primary">
                {referral.displayName}
              </h4>
              <span className="text-[11px] font-mono text-text-tertiary">
                ID: {referral.id}
              </span>
            </div>
            <div className="flex justify-center pt-1">
              {getStatusBadge(referral.status)}
            </div>
          </div>

          {/* Dados Estruturados Permitidos (Item 28) */}
          <div className="space-y-3 text-xs bg-white/[0.02] p-4 rounded-xl border border-white/5">
            <div className="flex justify-between items-center text-text-secondary">
              <span>Data de Cadastro</span>
              <span className="font-mono text-text-primary font-medium">
                {referral.joinedAt}
              </span>
            </div>

            {referral.verifiedAt && (
              <div className="flex justify-between items-center text-text-secondary">
                <span>Verificação de Identidade</span>
                <span className="font-mono text-brand-cyan font-medium">
                  {referral.verifiedAt}
                </span>
              </div>
            )}

            {referral.activatedAt && (
              <div className="flex justify-between items-center text-text-secondary">
                <span>Data de Ativação</span>
                <span className="font-mono text-positive font-medium">
                  {referral.activatedAt}
                </span>
              </div>
            )}

            <div className="flex justify-between items-center text-text-secondary pt-2 border-t border-white/5">
              <span>Volume Relacionado Elegível</span>
              <span className="font-mono font-bold text-text-primary tabular-numbers">
                {hideValues ? 'R$ •••••' : formatBRL(referral.eligibleVolume)}
              </span>
            </div>

            <div className="flex justify-between items-center text-text-secondary">
              <span>Comissões Geradas</span>
              <span className="font-mono font-bold text-positive tabular-numbers">
                {hideValues ? '+••••' : `+ ${formatBRL(referral.generatedCommission)}`}
              </span>
            </div>
          </div>

          {/* Aviso de Privacidade (Item 25 & 29) */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-2.5 text-[11px] text-text-tertiary leading-relaxed">
            <Lock className="w-4 h-4 text-text-secondary shrink-0 mt-0.5" />
            <span>
              Em conformidade com a LGPD e governança de Private Banking, dados cadastrais sensíveis e saldos individuais são estritamente restritos.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-white/5 bg-[#050D1A]">
          <Button variant="outline" size="md" className="w-full justify-center" onClick={onClose}>
            Fechar
          </Button>
        </div>
      </div>
    </div>
  );
};
