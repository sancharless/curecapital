import React from 'react';
import { AdminMetrics } from '../components/admin/AdminMetrics';
import { PerformanceManager } from '../components/admin/PerformanceManager';
import { AuditLogTable } from '../components/admin/AuditLogTable';

export const Admin: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Institucional */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
            Painel Institucional & Gestão Administrativa
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Supervisão de liquidez, parâmetros contábeis e distribuição patrimonial.
          </p>
        </div>
      </div>

      {/* 1. Métricas de AuM, Aportes, Saques e Volumes */}
      <AdminMetrics />

      {/* 2. Gestão de Rentabilidade e Performance com Simulação */}
      <PerformanceManager />

      {/* 3. Trilha de Auditoria AuditLog */}
      <AuditLogTable />
    </div>
  );
};
