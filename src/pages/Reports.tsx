import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FileText, Download, Calendar } from 'lucide-react';

export const Reports: React.FC = () => {
  const reportsList = [
    { title: 'Informe de Rendimentos e Custódia Anual (2025)', size: '1.4 MB', date: 'Janeiro 2026' },
    { title: 'Extrato Consolidado Trimestral Q2/2026', size: '820 KB', date: 'Julho 2026' },
    { title: 'Relatório Mensal de Ledger — Agosto/2026', size: '450 KB', date: 'Setembro 2026' },
    { title: 'Declaração de Segregação Patrimonial & Auditoria', size: '2.1 MB', date: 'Agosto 2026' },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
          Relatórios & Extratos Oficiais
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          Documentos fiscais, demonstrativos de performance e comprovações de custódia.
        </p>
      </div>

      <div className="space-y-3">
        {reportsList.map((doc) => (
          <Card key={doc.title} variant="glass" radius="md" className="p-4 sm:p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 rounded-xl bg-brand-blue/10 border border-brand-blue/20 text-brand-cyan shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="truncate">
                <div className="text-xs sm:text-sm font-semibold text-text-primary truncate">{doc.title}</div>
                <div className="text-[11px] text-text-tertiary font-mono">{doc.date} • {doc.size} • PDF Assinado</div>
              </div>
            </div>

            <Button
              variant="secondary"
              size="sm"
              leftIcon={<Download className="w-4 h-4" />}
              onClick={() => alert(`Iniciando download seguro: ${doc.title}`)}
            >
              Baixar
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
