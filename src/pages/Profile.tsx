import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Avatar } from '../components/ui/Avatar';
import { APP_CONFIG } from '../config/app';
import { ShieldCheck, UserCheck, Award, Key } from 'lucide-react';

export const Profile: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
          Perfil do Investidor
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          Identificação cadastral, classificação de suitability e limites operacionais.
        </p>
      </div>

      <Card variant="glass" radius="lg" className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 border-b border-white/[0.06] pb-6">
          <Avatar
            name={APP_CONFIG.defaultUser.name}
            src={APP_CONFIG.defaultUser.avatar}
            size="lg"
            status="online"
            className="w-20 h-20"
          />

          <div className="space-y-2 text-center sm:text-left flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h3 className="text-xl font-bold text-text-primary">
                {APP_CONFIG.defaultUser.name}
              </h3>
              <Badge variant="cyan" size="sm" icon={<Award className="w-3.5 h-3.5" />}>
                {APP_CONFIG.defaultUser.accountLevel}
              </Badge>
            </div>
            <p className="text-xs text-text-secondary font-mono">
              {APP_CONFIG.defaultUser.email} • {APP_CONFIG.defaultUser.phone}
            </p>
            <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
              <Badge variant="positive" size="sm" icon={<UserCheck className="w-3.5 h-3.5" />}>
                KYC Nível 3 Aprovado
              </Badge>
              <Badge variant="neutral" size="sm">
                Conta Institucional
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-text-tertiary">Limite Operacional Diário:</span>
            <div className="text-base font-bold font-mono text-text-primary">Ilimitado (Private VIP)</div>
          </div>
          <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
            <span className="text-text-tertiary">Gerente Private Responsável:</span>
            <div className="text-base font-bold text-text-primary">Eduardo Mendonça (Wealth Advisory)</div>
          </div>
        </div>
      </Card>
    </div>
  );
};
