import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MessageCircle, Copy, Share2, QrCode } from 'lucide-react';

interface ShareInviteCardProps {
  onWhatsApp: () => void;
  onCopyLink: () => void;
  onShare: () => void;
  onOpenQr: () => void;
}

export const ShareInviteCard: React.FC<ShareInviteCardProps> = ({
  onWhatsApp,
  onCopyLink,
  onShare,
  onOpenQr,
}) => {
  return (
    <Card variant="glass" radius="lg" className="p-5 sm:p-6 space-y-3 bg-[#091527]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-base font-bold text-text-primary tracking-tight">
            Compartilhe seu Convite
          </h3>
          <p className="text-xs text-text-secondary mt-0.5">
            Apresente a Cure Capital por canais diretos de comunicação.
          </p>
        </div>

        {/* 4 Ações Rápidas */}
        <div className="grid grid-cols-2 sm:flex items-center gap-2">
          {/* Botão WhatsApp Conforme Item 46 */}
          <Button
            variant="outline"
            size="sm"
            onClick={onWhatsApp}
            leftIcon={<MessageCircle className="w-4 h-4 text-[#25D366]" />}
            className="justify-center bg-white/5 border-white/10 hover:bg-white/10 text-xs"
          >
            WhatsApp
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onCopyLink}
            leftIcon={<Copy className="w-4 h-4 text-text-secondary" />}
            className="justify-center bg-white/5 border-white/10 hover:bg-white/10 text-xs"
          >
            Copiar Link
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onOpenQr}
            leftIcon={<QrCode className="w-4 h-4 text-brand-cyan" />}
            className="justify-center bg-white/5 border-white/10 hover:bg-white/10 text-xs"
          >
            QR Code
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onShare}
            leftIcon={<Share2 className="w-4 h-4" />}
            className="justify-center text-xs"
          >
            Compartilhar
          </Button>
        </div>
      </div>
    </Card>
  );
};
