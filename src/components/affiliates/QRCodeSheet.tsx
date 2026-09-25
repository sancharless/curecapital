import React from 'react';
import { X, Download, Share2, Copy } from 'lucide-react';
import { Button } from '../ui/Button';
import { toast } from '../../store/toastStore';

interface QRCodeSheetProps {
  isOpen: boolean;
  onClose: () => void;
  referralLink: string;
  referralCode: string;
}

export const QRCodeSheet: React.FC<QRCodeSheetProps> = ({
  isOpen,
  onClose,
  referralLink,
  referralCode,
}) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    toast.success('Download do QR Code', 'Imagem demonstrativa do QR Code gerada para salvamento.');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Cure Capital — Convite Institucional',
        text: `Cadastre-se na Cure Capital com o código ${referralCode}:`,
        url: referralLink,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(referralLink);
      toast.success('Link copiado', 'Link copiado para compartilhamento.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-navy-deep/80 backdrop-blur-md animate-fade-in">
      <div className="w-full sm:max-w-md bg-[#081325] border-t sm:border border-white/10 rounded-t-[28px] sm:rounded-2xl shadow-2xl overflow-hidden max-h-[92dvh] flex flex-col pb-safe animate-slide-up">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/5 flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-text-primary tracking-tight">
              QR Code de Indicação
            </h3>
            <p className="text-xs text-text-tertiary">
              Apresente ou compartilhe seu código exclusivo.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Fechar"
            className="p-1.5 rounded-lg text-text-tertiary hover:text-text-primary hover:bg-white/5 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo com QR Code */}
        <div className="p-6 flex flex-col items-center justify-center space-y-5 flex-1 overflow-y-auto">
          {/* Card branco com contraste para leitura do QR Code */}
          <div className="p-5 bg-white rounded-2xl shadow-2xl flex flex-col items-center justify-center border border-white/20">
            <svg
              width="180"
              height="180"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#07111F"
              strokeWidth="1.5"
              className="w-40 h-40 sm:w-44 sm:h-44"
              aria-label={`QR Code para o convite ${referralLink}`}
            >
              <path d="M3 3h6v6H3V3z M15 3h6v6h-6V3z M3 15h6v6H3v-6z" />
              <rect x="5" y="5" width="2" height="2" fill="#07111F" />
              <rect x="17" y="5" width="2" height="2" fill="#07111F" />
              <rect x="5" y="17" width="2" height="2" fill="#07111F" />
              <path d="M14 15h3v3h-3z M18 18h3v3h-3z M11 7h2v2h-2z M7 11h2v2H7z M11 11h2v2h-2z M15 11h2v2h-2z M11 15h2v2h-2z" />
            </svg>
            <div className="text-[11px] font-mono font-bold text-[#07111F] mt-2 tracking-wider">
              CURE CAPITAL • {referralCode}
            </div>
          </div>

          {/* Link textual */}
          <div className="text-center space-y-1">
            <span className="text-[11px] font-mono text-text-tertiary uppercase block">
              Endereço do Link
            </span>
            <div className="text-xs font-mono text-text-primary px-3 py-1.5 rounded-lg bg-[#050D1A] border border-white/5 select-all">
              {referralLink}
            </div>
          </div>
        </div>

        {/* Botões de Ação na Safe Area */}
        <div className="p-4 sm:p-5 border-t border-white/5 bg-[#050D1A] grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={handleDownload}
            leftIcon={<Download className="w-4 h-4 text-text-secondary" />}
            className="justify-center bg-white/5 border-white/10 hover:bg-white/10"
          >
            Baixar QR
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={handleShare}
            leftIcon={<Share2 className="w-4 h-4" />}
            className="justify-center"
          >
            Compartilhar
          </Button>
        </div>
      </div>
    </div>
  );
};
