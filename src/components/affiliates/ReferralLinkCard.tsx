import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Copy, Share2, QrCode, Link2, Check } from 'lucide-react';

interface ReferralLinkCardProps {
  referralLink: string;
  referralCode: string;
  onCopyLink: () => void;
  onCopyCode: () => void;
  onShare: () => void;
  onOpenQr: () => void;
}

export const ReferralLinkCard: React.FC<ReferralLinkCardProps> = ({
  referralLink,
  referralCode,
  onCopyLink,
  onCopyCode,
  onShare,
  onOpenQr,
}) => {
  return (
    <Card
      variant="glass"
      radius="lg"
      className="p-5 sm:p-6 space-y-4 bg-gradient-to-r from-[#091527] via-[#0B1A30] to-[#091527] border-white/10"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Link2 className="w-4 h-4 text-brand-cyan" />
            <h3 className="text-base font-bold text-text-primary tracking-tight">
              Seu Link de Indicação
            </h3>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            Convide investidores com seu código exclusivo e acompanhe a conversão em tempo real.
          </p>
        </div>

        {/* Código do Afiliado em Geist Mono (Item 11) */}
        <div className="flex items-center gap-2 bg-[#050D1A] px-3 py-1.5 rounded-xl border border-white/10 self-start sm:self-auto">
          <span className="text-[10px] font-mono text-text-tertiary uppercase">Código:</span>
          <span className="font-mono font-bold text-sm text-brand-cyan tracking-wider select-all">
            {referralCode}
          </span>
          <button
            type="button"
            onClick={onCopyCode}
            aria-label="Copiar código de indicação"
            className="text-text-tertiary hover:text-text-primary p-1 transition-colors cursor-pointer"
            title="Copiar código"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Caixa do Link + Botões de Ação */}
      <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-1">
        {/* Link Input com visual clean */}
        <div className="w-full bg-[#050D1A] border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between text-xs font-mono text-text-primary overflow-hidden">
          <span className="text-text-secondary truncate select-all">
            {referralLink}
          </span>
          <span className="text-[10px] font-mono text-brand-cyan shrink-0 ml-2 hidden sm:inline">
            1,50% por alocação
          </span>
        </div>

        {/* Ações (Copiar, Compartilhar, QR Code) */}
        <div className="grid grid-cols-3 sm:flex items-center gap-2 w-full sm:w-auto shrink-0">
          <Button
            variant="primary"
            size="md"
            onClick={onCopyLink}
            leftIcon={<Copy className="w-4 h-4" />}
            className="justify-center"
          >
            Copiar
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={onShare}
            leftIcon={<Share2 className="w-4 h-4 text-text-secondary" />}
            className="justify-center bg-white/5 border-white/10 hover:bg-white/10"
          >
            Compartilhar
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={onOpenQr}
            leftIcon={<QrCode className="w-4 h-4 text-brand-cyan" />}
            className="justify-center bg-white/5 border-white/10 hover:bg-white/10"
          >
            QR Code
          </Button>
        </div>
      </div>
    </Card>
  );
};
