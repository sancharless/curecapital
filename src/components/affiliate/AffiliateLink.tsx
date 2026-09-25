import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Copy, Check, Share2, QrCode } from 'lucide-react';
import { APP_CONFIG } from '../../config/app';
import { Modal } from '../ui/Modal';

export const AffiliateLink: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);

  const fullLink = `${APP_CONFIG.affiliate.referralBaseUrl}${APP_CONFIG.affiliate.referralCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Cure Capital — Gestão de Ativos Digitais',
        text: 'Acesse a plataforma de gestão de patrimônio digital através da minha indicação:',
        url: `https://${fullLink}`,
      }).catch(() => {});
    } else {
      handleCopy();
    }
  };

  return (
    <>
      <Card variant="glass" radius="lg" glow="cyan" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-text-primary">Seu Link de Indicação</h3>
            <p className="text-xs text-text-tertiary">
              Receba 15% das taxas apuradas das alocações da sua rede
            </p>
          </div>
          <span className="text-xs font-mono text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded-full border border-brand-cyan/20">
            Comissão 15%
          </span>
        </div>

        {/* Input visual com botão copiar integrado */}
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <div className="w-full bg-[#081322] border border-white/10 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs font-mono text-text-primary">
            <span className="text-text-secondary select-all">{fullLink}</span>
            <span className="text-[10px] text-text-tertiary uppercase ml-2">Código: {APP_CONFIG.affiliate.referralCode}</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
            <Button
              variant="primary"
              size="md"
              onClick={handleCopy}
              leftIcon={copied ? <Check className="w-4 h-4 text-positive" /> : <Copy className="w-4 h-4" />}
              className="flex-1 sm:flex-initial"
            >
              {copied ? 'Copiado!' : 'Copiar link'}
            </Button>

            <Button
              variant="outline"
              size="md"
              onClick={handleShare}
              leftIcon={<Share2 className="w-4 h-4 text-text-secondary" />}
              className="flex-1 sm:flex-initial"
            >
              Compartilhar
            </Button>

            <button
              onClick={() => setIsQrOpen(true)}
              aria-label="Exibir QR Code"
              className="p-2.5 bg-white/[0.05] hover:bg-white/[0.08] text-text-primary border border-white/10 rounded-xl transition-colors cursor-pointer"
            >
              <QrCode className="w-5 h-5 text-brand-cyan" />
            </button>
          </div>
        </div>
      </Card>

      {/* Modal QR Code */}
      <Modal
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        title="QR Code de Indicação"
        description="Aponte a câmera do smartphone para se cadastrar na rede."
      >
        <div className="p-6 flex flex-col items-center justify-center space-y-4">
          <div className="p-4 bg-white rounded-2xl shadow-xl">
            {/* SVG Simulação de QR Code estilizado */}
            <svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="#07111F" strokeWidth="1.5">
              <path d="M3 3h6v6H3V3z M15 3h6v6h-6V3z M3 15h6v6H3v-6z" />
              <rect x="5" y="5" width="2" height="2" fill="#07111F" />
              <rect x="17" y="5" width="2" height="2" fill="#07111F" />
              <rect x="5" y="17" width="2" height="2" fill="#07111F" />
              <path d="M14 15h3v3h-3z M18 18h3v3h-3z M11 7h2v2h-2z M7 11h2v2H7z M11 11h2v2h-2z M15 11h2v2h-2z M11 15h2v2h-2z" />
            </svg>
          </div>
          <div className="font-mono text-xs text-text-secondary">
            {fullLink}
          </div>
          <Button variant="secondary" fullWidth onClick={() => setIsQrOpen(false)}>
            Fechar
          </Button>
        </div>
      </Modal>
    </>
  );
};
