import React from 'react';
import { AffiliateStats } from '../components/affiliate/AffiliateStats';
import { AffiliateLink } from '../components/affiliate/AffiliateLink';
import { AffiliateFunnel } from '../components/affiliate/AffiliateFunnel';
import { AffiliateTable } from '../components/affiliate/AffiliateTable';

export const Affiliates: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header da Página de Afiliados */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
          Programa de Afiliados
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          Compartilhe sua indicação e acompanhe sua rede.
        </p>
      </div>

      {/* Cards de Métricas */}
      <AffiliateStats />

      {/* Card do Link de Indicação e QR Code */}
      <AffiliateLink />

      {/* Grid: Funil de Afiliados & Informações da Rede */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-12">
          <AffiliateFunnel />
        </div>
      </div>

      {/* Tabela de Comissões */}
      <AffiliateTable />
    </div>
  );
};
