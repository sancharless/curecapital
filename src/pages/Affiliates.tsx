import React from 'react';
import { Button } from '../components/ui/Button';
import { Share2, Copy, Link2 } from 'lucide-react';
import { AffiliateHero } from '../components/affiliates/AffiliateHero';
import { ReferralLinkCard } from '../components/affiliates/ReferralLinkCard';
import { AffiliateMetrics } from '../components/affiliates/AffiliateMetrics';
import { ConversionFunnel } from '../components/affiliates/ConversionFunnel';
import { ReferralChart } from '../components/affiliates/ReferralChart';
import { ReferralList } from '../components/affiliates/ReferralList';
import { CommissionSummary } from '../components/affiliates/CommissionSummary';
import { CommissionChart } from '../components/affiliates/CommissionChart';
import { CommissionHistory } from '../components/affiliates/CommissionHistory';
import { ShareInviteCard } from '../components/affiliates/ShareInviteCard';
import { AffiliateRules } from '../components/affiliates/AffiliateRules';
import { QRCodeSheet } from '../components/affiliates/QRCodeSheet';
import { ReferralDetailDrawer } from '../components/affiliates/ReferralDetailDrawer';
import { CommissionDetailDrawer } from '../components/affiliates/CommissionDetailDrawer';
import { useAffiliates } from '../hooks/useAffiliates';

export const Affiliates: React.FC = () => {
  const {
    referralCode,
    referralLink,
    metrics,
    rates,
    referrals,
    totalReferralsCount,
    hasMore,
    loadMore,
    commissions,
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    copyLink,
    copyCode,
    shareInvite,
    openWhatsApp,
    isQrOpen,
    setIsQrOpen,
    selectedReferral,
    setSelectedReferral,
    selectedCommission,
    setSelectedCommission,
  } = useAffiliates();

  return (
    <div className="space-y-6 pb-12 animate-fade-in">
      {/* 1. HEADER (Item 4) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
            Afiliados
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary mt-0.5">
            Acompanhe suas indicações e comissões em um único lugar.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={copyLink}
            leftIcon={<Copy className="w-3.5 h-3.5" />}
            className="bg-white/5 border-white/10 hover:bg-white/10 text-xs"
          >
            Copiar link
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={shareInvite}
            leftIcon={<Share2 className="w-3.5 h-3.5" />}
            className="text-xs shadow-md shadow-brand-blue/20"
          >
            Compartilhar convite
          </Button>
        </div>
      </div>

      {/* 2. AFFILIATE HERO (Item 5 & 6) */}
      <AffiliateHero
        totalReferrals={metrics.verified} // 41 indicados
        activeReferrals={metrics.active}   // 12 ativos
        accumulatedCommissions={metrics.accumulatedCommissions} // R$ 2.140,80
      />

      {/* 3. LINK DE INDICAÇÃO & QR CODE (Item 7 a 11) */}
      <ReferralLinkCard
        referralLink={referralLink}
        referralCode={referralCode}
        onCopyLink={copyLink}
        onCopyCode={copyCode}
        onShare={shareInvite}
        onOpenQr={() => setIsQrOpen(true)}
      />

      {/* 4. MÉTRICAS PRINCIPAIS & TAXAS (Item 12, 13, 14) */}
      <AffiliateMetrics
        clicks={metrics.clicks}
        registrations={metrics.registrations}
        verified={metrics.verified}
        active={metrics.active}
        registrationRate={rates.registrationRate}
        verificationRate={rates.verificationRate}
        activationRate={rates.activationRate}
        accumulatedCommissions={metrics.accumulatedCommissions}
      />

      {/* 5. FUNIL DE CONVERSÃO & EVOLUÇÃO DAS INDICAÇÕES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-6">
          <ConversionFunnel
            clicks={metrics.clicks}
            registrations={metrics.registrations}
            verified={metrics.verified}
            active={metrics.active}
          />
        </div>
        <div className="lg:col-span-6">
          <ReferralChart />
        </div>
      </div>

      {/* 6. USUÁRIOS INDICADOS (Item 22 a 27) */}
      <ReferralList
        referrals={referrals}
        totalCount={totalReferralsCount}
        hasMore={hasMore}
        onLoadMore={loadMore}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusFilterChange={setStatusFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onSelectReferral={setSelectedReferral}
      />

      {/* 7. COMISSÕES (Item 30 & 31) */}
      <CommissionSummary
        accumulated={metrics.accumulatedCommissions}
        available={metrics.availableCommissions}
        pending={metrics.pendingCommissions}
        paid={metrics.paidCommissions}
      />

      {/* 8. GRÁFICO DE COMISSÕES (Item 32) */}
      <CommissionChart />

      {/* 9. EXTRATO DE COMISSÕES (Item 33 a 36) */}
      <CommissionHistory
        commissions={commissions}
        onSelectCommission={setSelectedCommission}
      />

      {/* 10. COMPARTILHAMENTO RÁPIDO WHATSAPP (Item 45 & 46) */}
      <ShareInviteCard
        onWhatsApp={openWhatsApp}
        onCopyLink={copyLink}
        onShare={shareInvite}
        onOpenQr={() => setIsQrOpen(true)}
      />

      {/* 11. REGRAS DO PROGRAMA (Item 40 a 42) */}
      <AffiliateRules />

      {/* Modais & Drawers */}
      <QRCodeSheet
        isOpen={isQrOpen}
        onClose={() => setIsQrOpen(false)}
        referralLink={referralLink}
        referralCode={referralCode}
      />

      <ReferralDetailDrawer
        referral={selectedReferral}
        isOpen={Boolean(selectedReferral)}
        onClose={() => setSelectedReferral(null)}
      />

      <CommissionDetailDrawer
        commission={selectedCommission}
        isOpen={Boolean(selectedCommission)}
        onClose={() => setSelectedCommission(null)}
      />
    </div>
  );
};

export default Affiliates;
