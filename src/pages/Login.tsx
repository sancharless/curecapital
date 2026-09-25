import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Logo } from '../components/ui/Logo';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { ShieldCheck, Lock, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { APP_CONFIG } from '../config/app';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('rafael.alencar@curecapital.io');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);
  const [twoFactorPrompt, setTwoFactorPrompt] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      // Simula confirmação 2FA
      setTwoFactorPrompt(true);
    }, 600);
  };

  const handle2FASubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary flex relative overflow-hidden">
      {/* Luz ambiente discreta */}
      <div className="ambient-glow" />
      <div className="ambient-glow-secondary" />

      {/* LADO ESQUERDO: Desktop Branding & Institucional (Oculto em telas menores) */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 p-12 lg:p-16 border-r border-white/[0.07] bg-[#081322]/80 backdrop-blur-2xl relative z-10">
        <div>
          <Logo size="lg" showTagline={true} />
        </div>

        <div className="space-y-6 max-w-lg my-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-xs text-brand-cyan">
            <ShieldCheck className="w-4 h-4" />
            <span>Segregação Patrimonial & Private Banking</span>
          </div>

          <h1 className="text-4xl xl:text-5xl font-bold tracking-tight text-text-primary leading-tight">
            Seu patrimônio digital. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-blue">
              Sob seu controle.
            </span>
          </h1>

          <p className="text-base text-text-secondary leading-relaxed">
            Acompanhe seus ativos, performance e movimentações em uma experiência criada para oferecer clareza, transparência e controle patrimonial absoluto.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/[0.08]">
            <div className="space-y-1">
              <span className="text-xs font-mono text-text-tertiary">CRIPTOGRAFIA</span>
              <div className="text-sm font-semibold text-text-primary">Multi-Signature Cold Vaults</div>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono text-text-tertiary">CONFORMIDADE</span>
              <div className="text-sm font-semibold text-text-primary">Auditoria Imutável em Ledger</div>
            </div>
          </div>
        </div>

        <div className="text-xs text-text-tertiary flex items-center justify-between">
          <span>© {new Date().getFullYear()} Cure Capital Technologies.</span>
          <span className="font-mono">v{APP_CONFIG.version}</span>
        </div>
      </div>

      {/* LADO DIREITO (Mobile: Centralizado e Otimizado para iPhone) */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-16 relative z-10">
        {/* Mobile Header com Logo */}
        <div className="lg:hidden mb-8 text-center flex flex-col items-center">
          <Logo size="md" showTagline={false} />
          <h2 className="text-lg font-bold text-text-primary mt-4">
            Seu patrimônio sob controle.
          </h2>
          <p className="text-xs text-text-secondary mt-1">
            Entre na sua conta institucional
          </p>
        </div>

        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-1.5 hidden lg:block">
            <h2 className="text-2xl font-bold tracking-tight text-text-primary">
              Acesso à Plataforma
            </h2>
            <p className="text-xs text-text-secondary">
              Informe suas credenciais criptografadas para acessar o painel
            </p>
          </div>

          {!twoFactorPrompt ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="E-mail Institucional"
                type="email"
                placeholder="seu.nome@exemplo.com"
                leftIcon={<Mail className="w-4 h-4" />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <Input
                label="Senha de Acesso"
                type="password"
                placeholder="••••••••••••"
                leftIcon={<Lock className="w-4 h-4" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer text-text-secondary select-none">
                  <input type="checkbox" defaultChecked className="rounded border-white/20 bg-black/40 text-brand-blue" />
                  <span>Lembrar dispositivo</span>
                </label>

                <a href="#recuperar" onClick={(e) => { e.preventDefault(); alert('Instruções de recuperação foram enviadas para seu e-mail cadastrado.'); }} className="text-brand-cyan hover:underline">
                  Esqueci minha senha
                </a>
              </div>

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
                className="mt-2 shadow-glow-blue"
              >
                Entrar no Painel
              </Button>

              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[11px] text-text-tertiary text-center">
                Autenticação multifator (2FA) configurada para sua proteção.
              </div>
            </form>
          ) : (
            <form onSubmit={handle2FASubmit} className="space-y-4">
              <div className="p-4 rounded-xl bg-brand-blue/10 border border-brand-blue/30 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-brand-cyan mx-auto" />
                <h3 className="text-sm font-semibold text-text-primary">Autenticação em Dois Fatores</h3>
                <p className="text-xs text-text-secondary">
                  Insira o código de 6 dígitos gerado pelo seu app autenticador.
                </p>
              </div>

              <Input
                label="Código 2FA"
                placeholder="000 000"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
                autoFocus
                required
              />

              <Button
                type="submit"
                variant="primary"
                fullWidth
                size="lg"
                isLoading={isLoading}
              >
                Validar e Prosseguir
              </Button>

              <button
                type="button"
                onClick={() => setTwoFactorPrompt(false)}
                className="w-full text-center text-xs text-text-tertiary hover:text-text-primary cursor-pointer"
              >
                Voltar ao login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
