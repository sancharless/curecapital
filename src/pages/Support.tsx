import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { HelpCircle, MessageSquare, PhoneCall, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Support: React.FC = () => {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketMessage, setTicketMessage] = useState('');
  const [ticketSent, setTicketSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSent(true);
    setTimeout(() => {
      setTicketSent(false);
      setTicketSubject('');
      setTicketMessage('');
      alert('Chamado prioritário registrado no sistema. Seu gerente entrará em contato em instantes.');
    }, 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
          Suporte Institucional & Wealth Advisory
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          Canal dedicado de atendimento com analistas seniores de custódia e operações.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card variant="glass" radius="md" className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-brand-blue/15 border border-brand-blue/30 text-brand-cyan">
            <MessageSquare className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-semibold text-text-primary">Chat Exclusivo VIP</div>
            <p className="text-xs text-text-tertiary">Tempo de resposta médio: 3 minutos</p>
            <span className="text-[11px] text-positive font-mono mt-1 inline-block">Online agora</span>
          </div>
        </Card>

        <Card variant="glass" radius="md" className="p-5 flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-brand-cyan/15 border border-brand-cyan/30 text-brand-cyan">
            <PhoneCall className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-semibold text-text-primary">Linha Telefônica Direta</div>
            <p className="text-xs text-text-tertiary">+55 0800 782 9900 (Mesa Private)</p>
            <span className="text-[11px] text-text-secondary font-mono mt-1 inline-block">Segunda a Sexta, 8h às 20h</span>
          </div>
        </Card>
      </div>

      <Card variant="glass" radius="lg" className="space-y-4">
        <h3 className="text-sm font-semibold text-text-primary">Abrir Chamado Prioritário</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Assunto da Solicitação"
            placeholder="Ex: Aporte institucional de grande porte / Dúvida fiscal"
            value={ticketSubject}
            onChange={(e) => setTicketSubject(e.target.value)}
            required
          />

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-text-secondary tracking-wide">
              Detalhamento
            </label>
            <textarea
              rows={4}
              value={ticketMessage}
              onChange={(e) => setTicketMessage(e.target.value)}
              placeholder="Descreva sua solicitação ou operação desejada..."
              className="w-full bg-[#081322] border border-white/10 rounded-input p-3 text-text-primary placeholder:text-text-tertiary/60 outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue/30 text-xs"
              style={{ fontSize: '16px' }}
              required
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="md"
              isLoading={ticketSent}
            >
              Enviar Solicitação Prioritária
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};
