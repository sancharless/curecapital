import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { ShieldAlert } from 'lucide-react';
import { MOCK_AUDIT_LOGS } from '../../data/mockData';

export const AuditLogTable: React.FC = () => {
  return (
    <Card variant="glass" radius="lg" className="p-0 overflow-hidden">
      <div className="p-4 sm:p-5 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-crypto-bitcoin" />
          <div>
            <h3 className="text-sm font-semibold text-text-primary tracking-tight">
              Trilha de Auditoria Imutável (AuditLog)
            </h3>
            <p className="text-xs text-text-tertiary">
              Registro criptograficamente assinado de ações e parâmetros operacionais
            </p>
          </div>
        </div>
        <Badge variant="cyan" size="sm">
          SOC-2 Compliant
        </Badge>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.01] text-[11px] text-text-tertiary font-mono uppercase tracking-wider">
              <th className="py-3 px-4 sm:px-6">Event ID</th>
              <th className="py-3 px-4">Admin ID</th>
              <th className="py-3 px-4">Timestamp</th>
              <th className="py-3 px-4">Ação</th>
              <th className="py-3 px-4">Valor Anterior / Novo</th>
              <th className="py-3 px-4 sm:px-6 text-right">Origem (IP / Dispositivo)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {MOCK_AUDIT_LOGS.map((log) => (
              <tr key={log.event_id} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-4 sm:px-6 font-mono text-brand-cyan whitespace-nowrap">
                  {log.event_id}
                </td>
                <td className="py-3.5 px-4 font-mono text-text-secondary whitespace-nowrap">
                  {log.admin_id}
                </td>
                <td className="py-3.5 px-4 font-mono text-text-tertiary whitespace-nowrap">
                  {log.timestamp}
                </td>
                <td className="py-3.5 px-4 font-medium text-text-primary whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded bg-white/[0.04] border border-white/10 font-mono text-[11px]">
                    {log.action}
                  </span>
                </td>
                <td className="py-3.5 px-4 max-w-xs text-[11px]">
                  <span className="text-text-tertiary line-through mr-1.5">{log.old_value}</span>
                  <span className="text-positive font-medium">{log.new_value}</span>
                </td>
                <td className="py-3.5 px-4 sm:px-6 text-right font-mono text-[11px] text-text-tertiary whitespace-nowrap">
                  <div>{log.ip}</div>
                  <div className="text-[10px] text-text-tertiary/70 truncate max-w-[180px] ml-auto">{log.device}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
