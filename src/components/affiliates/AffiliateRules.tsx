import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import { ShieldCheck, FileText, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AffiliateRules: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'Compartilhe seu link',
      desc: 'Envie seu convite exclusivo para investidores do seu relacionamento.',
    },
    {
      num: '02',
      title: 'Cadastro e Conformidade',
      desc: 'O convidado cria a conta institucional e valida sua identidade.',
    },
    {
      num: '03',
      title: 'Alocação Patrimonial',
      desc: 'Comissões são apuradas conforme os critérios elegíveis de custódia ativa.',
    },
    {
      num: '04',
      title: 'Gestão e Liquidação',
      desc: 'Monitore o funil em tempo real com extrato detalhado de comissões.',
    },
  ];

  return (
    <Card variant="glass" radius="lg" className="p-5 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-cyan" />
            <h3 className="text-base font-bold text-text-primary tracking-tight">
              Como Funciona o Programa
            </h3>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            Governança transparente e critérios objetivos de apuração.
          </p>
        </div>

        <Link
          to="/affiliates/terms"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-cyan hover:underline self-start sm:self-auto"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Ver regras completas</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* 4 Passos Estruturados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-1">
        {steps.map((st) => (
          <div
            key={st.num}
            className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1.5"
          >
            <span className="text-[11px] font-mono font-bold text-brand-cyan block">
              Passo {st.num}
            </span>
            <div className="text-xs font-bold text-text-primary">
              {st.title}
            </div>
            <p className="text-[11px] text-text-tertiary leading-relaxed">
              {st.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Disclaimer Regulatório Conforme Item 41 */}
      <div className="pt-2 border-t border-white/5 text-[11px] text-text-tertiary">
        Comissões são registradas conforme as regras vigentes do programa e após a devida conciliação de custódia institucional.
      </div>
    </Card>
  );
};
