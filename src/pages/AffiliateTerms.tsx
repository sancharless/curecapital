import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { ArrowLeft, ShieldCheck, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export const AffiliateTerms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-fade-in">
      {/* Breadcrumb & Voltar */}
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/affiliates"
          className="inline-flex items-center gap-2 text-xs text-text-tertiary hover:text-text-primary transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Afiliados</span>
        </Link>

        {/* Badge Demonstrativo (Item 95) */}
        <Badge variant="cyan" size="sm" icon={<ShieldCheck className="w-3.5 h-3.5" />}>
          Termos em Revisão • Conteúdo Demonstrativo
        </Badge>
      </div>

      {/* Header da Página */}
      <Card variant="glass" radius="lg" className="p-6 sm:p-8 space-y-3 bg-gradient-to-br from-[#0c1c36] to-[#081325]">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-brand-cyan" />
          <span className="text-[11px] font-mono text-brand-cyan uppercase tracking-wider font-semibold">
            Governança Institucional
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary tracking-tight">
          Regras do Programa de Indicação
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed max-w-2xl">
          Diretrizes regulatórias, critérios de elegibilidade e metodologia de apuração de comissões da plataforma Cure Capital.
        </p>
      </Card>

      {/* Seções Estruturadas (Item 94) */}
      <div className="space-y-4">
        {/* 1. Elegibilidade */}
        <Card variant="glass" radius="md" className="p-5 sm:p-6 space-y-2.5">
          <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
            <span className="text-brand-cyan font-mono text-sm">01.</span>
            Elegibilidade de Participação
          </h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            Podem participar do Programa de Indicação clientes titulares de contas individuais ou institucionais com verificação de identidade (KYC Tier 1 ou superior) concluída e em situação cadastral regular.
          </p>
        </Card>

        {/* 2. Critérios de Conversão */}
        <Card variant="glass" radius="md" className="p-5 sm:p-6 space-y-2.5">
          <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
            <span className="text-brand-cyan font-mono text-sm">02.</span>
            Critérios de Conversão
          </h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            O vínculo da indicação é estabelecido no momento em que o convidado conclui seu cadastro via link exclusivo com código de afiliado devidamente registrado. Cadastros retroativos ou sem rastreamento sistêmico não são passíveis de vinculação.
          </p>
        </Card>

        {/* 3. Base de Comissões */}
        <Card variant="glass" radius="md" className="p-5 sm:p-6 space-y-2.5">
          <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
            <span className="text-brand-cyan font-mono text-sm">03.</span>
            Apuração e Base de Comissões
          </h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            As comissões são calculadas sobre o volume elegível alocado em custódia segregada, aplicando-se a alíquota padrão vigente de <strong>1,50%</strong>. Não há comissão incidente sobre depósitos meramente transitórios ou posições canceladas antes da liquidação.
          </p>
        </Card>

        {/* 4. Prazos e Liquidação */}
        <Card variant="glass" radius="md" className="p-5 sm:p-6 space-y-2.5">
          <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
            <span className="text-brand-cyan font-mono text-sm">04.</span>
            Prazos e Liquidação
          </h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            Créditos gerados passam pelo ciclo de conciliação com liberação no status <em>Disponível</em> após o encerramento do período de verificação patrimonial. Recursos disponíveis podem ser resgatados conforme as regras operacionais da conta.
          </p>
        </Card>

        {/* 5. Reversões e Conformidade */}
        <Card variant="glass" radius="md" className="p-5 sm:p-6 space-y-2.5">
          <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
            <span className="text-brand-cyan font-mono text-sm">05.</span>
            Políticas de Reversão e Conformidade
          </h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            São vedadas práticas de spam, anúncios enganosos com promessa de ganhos garantidos ou autoindicação de contas relacionadas ao mesmo titular. A violação das diretrizes enseja a desqualificação das comissões apuradas.
          </p>
        </Card>

        {/* 6. Alterações do Programa */}
        <Card variant="glass" radius="md" className="p-5 sm:p-6 space-y-2.5">
          <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
            <span className="text-brand-cyan font-mono text-sm">06.</span>
            Alterações do Programa
          </h2>
          <p className="text-xs text-text-secondary leading-relaxed">
            A Cure Capital reserva-se o direito de atualizar percentuais, prazos e critérios de elegibilidade mediante comunicação institucional prévia através dos canais oficiais da plataforma.
          </p>
        </Card>
      </div>

      {/* Nota Final */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <span>
          Este documento possui caráter ilustrativo e informativo para o ambiente demonstrativo da Cure Capital. Regras jurídicas formais estarão disponíveis na documentação contratual de custódia.
        </span>
      </div>
    </div>
  );
};

export default AffiliateTerms;
