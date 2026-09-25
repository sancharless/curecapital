import { useState, useMemo, useCallback } from 'react';
import { MOCK_AFFILIATE_DATA, Referral, Commission, ReferralStatus } from '../data/affiliateMock';
import { toast } from '../store/toastStore';

export function useAffiliates() {
  const [data] = useState(MOCK_AFFILIATE_DATA);

  // Filtros e busca de indicados
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ReferralStatus>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'volume' | 'commission'>('recent');
  const [visibleCount, setVisibleCount] = useState(6);

  // Estados de modais e drawers
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState<Referral | null>(null);
  const [selectedCommission, setSelectedCommission] = useState<Commission | null>(null);

  // Cálculos de taxas em tempo real (Item 14)
  const rates = useMemo(() => {
    const { clicks, registrations, verified, active } = data.metrics;
    const registrationRate = clicks > 0 ? (registrations / clicks) * 100 : 0;
    const verificationRate = registrations > 0 ? (verified / registrations) * 100 : 0;
    const activationRate = verified > 0 ? (active / verified) * 100 : 0;

    return {
      registrationRate: Math.round(registrationRate * 10) / 10, // 24.6%
      verificationRate: Math.round(verificationRate * 10) / 10, // 48.8%
      activationRate: Math.round(activationRate * 10) / 10,     // 29.3%
    };
  }, [data.metrics]);

  // Lista filtrada e ordenada de indicados
  const filteredReferrals = useMemo(() => {
    return data.referrals
      .filter((ref) => {
        const matchesSearch = ref.displayName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || ref.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'volume') return b.eligibleVolume - a.eligibleVolume;
        if (sortBy === 'commission') return b.generatedCommission - a.generatedCommission;
        return 0; // Ordem cronológica original
      });
  }, [data.referrals, searchQuery, statusFilter, sortBy]);

  const visibleReferrals = useMemo(() => {
    return filteredReferrals.slice(0, visibleCount);
  }, [filteredReferrals, visibleCount]);

  const hasMore = visibleCount < filteredReferrals.length;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + 6);
  }, []);

  // Ações de compartilhamento e cópia
  const copyLink = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(data.referralLink);
      toast.success('Link copiado', 'Link de indicação copiado para a área de transferência.');
    } else {
      toast.info('Link para compartilhamento', data.referralLink);
    }
  }, [data.referralLink]);

  const copyCode = useCallback(() => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(data.referralCode);
      toast.success('Código copiado', `Código ${data.referralCode} pronto para uso.`);
    } else {
      toast.info('Código de afiliado', data.referralCode);
    }
  }, [data.referralCode]);

  const shareInvite = useCallback(() => {
    const text = 'Conheça a CURE CAPITAL através do meu convite de gestão patrimonial:';
    if (navigator.share) {
      navigator.share({
        title: 'Cure Capital — Private Digital Wealth',
        text,
        url: data.referralLink,
      }).catch(() => {});
    } else {
      copyLink();
    }
  }, [data.referralLink, copyLink]);

  const openWhatsApp = useCallback(() => {
    const message = encodeURIComponent(
      `Conheça a CURE CAPITAL através do meu convite: ${data.referralLink}`
    );
    window.open(`https://wa.me/?text=${message}`, '_blank');
  }, [data.referralLink]);

  return {
    referralCode: data.referralCode,
    referralLink: data.referralLink,
    metrics: data.metrics,
    rates,
    referrals: visibleReferrals,
    totalReferralsCount: filteredReferrals.length,
    hasMore,
    loadMore,
    commissions: data.commissions,
    historyTimeSeries: data.historyTimeSeries,
    commissionTimeSeries: data.commissionTimeSeries,
    // Filtros
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    // Ações
    copyLink,
    copyCode,
    shareInvite,
    openWhatsApp,
    // Modais & Drawers
    isQrOpen,
    setIsQrOpen,
    selectedReferral,
    setSelectedReferral,
    selectedCommission,
    setSelectedCommission,
  };
}
