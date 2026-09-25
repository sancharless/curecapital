import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ShieldCheck, Smartphone, Mail, Phone, Laptop, Clock, Check, AlertCircle } from 'lucide-react';
import { APP_CONFIG } from '../config/app';

export const Settings: React.FC = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
          Configurações & Segurança da Conta
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary mt-1">
          Gerencie autenticação de dois fatores, chaves, dispositivos autorizados e credenciais.
        </p>
      </div>

      {/* Item 41: SEGURANÇA VISUAL */}
      <Card variant="glass" radius="lg" glow="cyan" className="space-y-5">
        <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-cyan" />
            <h3 className="text-sm font-semibold text-text-primary">
              Segurança da Conta & Proteção Multifator
            </h3>
          </div>
          <Badge variant="positive" size="sm">
            Nível Máximo
          </Badge>
        </div>

        <div className="divide-y divide-white/[0.06] text-xs">
          {/* 2FA */}
          <div className="py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-positive/10 border border-positive/20 text-positive">
                <Check className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-text-primary">Autenticação em Dois Fatores (2FA)</div>
                <div className="text-text-tertiary">Protegido via aplicativo autenticador TOTP</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-positive font-mono font-medium flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-positive inline-block" />
                Ativada
              </span>
              <Button variant="secondary" size="sm">Reconfigurar</Button>
            </div>
          </div>

          {/* E-mail */}
          <div className="py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/[0.04] text-text-secondary">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-text-primary">E-mail Cadastrado</div>
                <div className="text-text-tertiary font-mono">{APP_CONFIG.defaultUser.email}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="positive" size="sm">Verificado</Badge>
              <Button variant="ghost" size="sm">Alterar</Button>
            </div>
          </div>

          {/* Telefone */}
          <div className="py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/[0.04] text-text-secondary">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-text-primary">Telefone / SMS de Recuperação</div>
                <div className="text-text-tertiary font-mono">{APP_CONFIG.defaultUser.phone}</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="positive" size="sm">Validado</Badge>
              <Button variant="ghost" size="sm">Editar</Button>
            </div>
          </div>

          {/* Último Acesso */}
          <div className="py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white/[0.04] text-text-secondary">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-text-primary">Último Acesso Registrado</div>
                <div className="text-text-tertiary">{APP_CONFIG.defaultUser.lastAccess}</div>
              </div>
            </div>
            <span className="font-mono text-text-secondary text-[11px]">IP: 187.112.44.19</span>
          </div>
        </div>
      </Card>

      {/* Dispositivos Conectados */}
      <Card variant="glass" radius="lg" className="space-y-4">
        <h3 className="text-sm font-semibold text-text-primary">Dispositivos Autorizados</h3>

        <div className="space-y-3 text-xs">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-brand-cyan" />
              <div>
                <div className="font-medium text-text-primary flex items-center gap-2">
                  <span>Apple iPhone 16 Pro (PWA Safari)</span>
                  <Badge variant="cyan" size="sm">Este Dispositivo</Badge>
                </div>
                <div className="text-text-tertiary">São Paulo, Brasil • Ativo agora</div>
              </div>
            </div>
            <span className="text-[11px] font-mono text-positive">Sessão Atual</span>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Laptop className="w-5 h-5 text-text-tertiary" />
              <div>
                <div className="font-medium text-text-primary">MacBook Pro 16" (macOS Sequoia)</div>
                <div className="text-text-tertiary">São Paulo, Brasil • Há 3 dias</div>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-negative">Encerrar</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
