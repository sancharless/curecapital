import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Badge } from '../ui/Badge';
import { Calculator, CheckCircle2, AlertTriangle } from 'lucide-react';
import { YieldDistributionSimulation } from '../../types';

export const PerformanceManager: React.FC = () => {
  const [period, setPeriod] = useState('Setembro/2026');
  const [startDate, setStartDate] = useState('01/09/2026');
  const [endDate, setEndDate] = useState('25/09/2026');
  const [percentage, setPercentage] = useState('1.70');
  const [description, setDescription] = useState('Apuração mensal de performance de custódia e rendimentos');

  const [simulation, setSimulation] = useState<YieldDistributionSimulation | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSimulate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSimulating(true);
    setTimeout(() => {
      const pct = parseFloat(percentage) || 1.70;
      const capital = 3840210.00;
      const estimated = (capital * pct) / 100;

      setSimulation({
        periodLabel: period,
        startDate,
        endDate,
        percentage: pct,
        description,
        eligibleUsersCount: 483,
        eligibleCapitalBrl: capital,
        estimatedDistributionBrl: estimated,
      });
      setIsSimulating(false);
      setIsSuccess(false);
    }, 600);
  };

  const handleConfirmProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setSimulation(null);
    }, 1200);
  };

  return (
    <Card variant="glass" radius="lg" glow="blue" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.06] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-brand-blue" />
            <h3 className="text-base font-semibold text-text-primary tracking-tight">
              Gestão de Performance & Distribuição
            </h3>
          </div>
          <p className="text-xs text-text-secondary mt-0.5">
            Módulo institucional de apuração e creditamento proporcional em ledger
          </p>
        </div>
        <Badge variant="cyan" size="sm">
          Simulador Seguro
        </Badge>
      </div>

      {isSuccess && (
        <div className="p-4 rounded-xl bg-positive/10 border border-positive/30 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-positive shrink-0 mt-0.5" />
          <div>
            <div className="text-sm font-semibold text-text-primary">
              Lote de Distribuição Processado com Sucesso!
            </div>
            <p className="text-xs text-text-secondary mt-0.5">
              483 transações de rendimento foram geradas e vinculadas ao Ledger contábil.
            </p>
          </div>
        </div>
      )}

      {/* Formulário de Configuração */}
      <form onSubmit={handleSimulate} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Input
            label="Período de Referência"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            required
          />
          <Input
            label="Data Inicial"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
          <Input
            label="Data Final"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
          <Input
            label="Percentual do Período (%)"
            value={percentage}
            onChange={(e) => setPercentage(e.target.value)}
            hint="Ex: 1.70"
            required
          />
        </div>

        <Input
          label="Descrição Contábil do Lote"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-xs text-text-tertiary">
            <AlertTriangle className="w-4 h-4 text-alert" />
            <span>Nenhuma movimentação real externa é realizada nesta etapa.</span>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSimulating}
          >
            Simular Distribuição
          </Button>
        </div>
      </form>

      {/* Painel de Simulação com Confirmação em 2 Etapas */}
      {simulation && (
        <div className="pt-4 border-t border-white/[0.08] space-y-4">
          <div className="p-5 rounded-xl bg-card-elevated border border-brand-blue/30 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-semibold text-text-primary flex items-center gap-2">
                <span>Resultado da Simulação Preliminar</span>
                <Badge variant="info" size="sm">{simulation.periodLabel}</Badge>
              </h4>
              <span className="text-xs font-mono text-positive font-semibold">
                +{simulation.percentage.toFixed(2)}%
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-text-tertiary block">Período:</span>
                <span className="font-semibold text-text-primary font-mono">
                  {simulation.startDate} a {simulation.endDate}
                </span>
              </div>
              <div>
                <span className="text-text-tertiary block">Usuários Elegíveis:</span>
                <span className="font-semibold text-text-primary font-mono">
                  {simulation.eligibleUsersCount} clientes
                </span>
              </div>
              <div>
                <span className="text-text-tertiary block">Capital Considerado:</span>
                <span className="font-semibold text-text-primary font-mono">
                  R$ {simulation.eligibleCapitalBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div>
                <span className="text-text-tertiary block">Resultado Estimado:</span>
                <span className="font-bold text-positive font-mono text-sm">
                  R$ {simulation.estimatedDistributionBrl.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSimulation(null)}
              >
                Descartar Simulação
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleConfirmProcess}
                isLoading={isProcessing}
                className="shadow-glow-blue"
              >
                Confirmar Processamento
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
