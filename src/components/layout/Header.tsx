import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, ExternalLink } from 'lucide-react';
import { APP_CONFIG } from '../../config/app';
import { Avatar } from '../ui/Avatar';
import { Logo } from '../ui/Logo';
import { useNotificationStore } from '../../store/notificationStore';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notifRef = useRef<HTMLDivElement>(null);

  const notifications = useNotificationStore((s) => s.notifications);
  const unreadCount = useNotificationStore((s) => s.unreadCount());
  const markAllAsRead = useNotificationStore((s) => s.markAllAsRead);

  // Fecha dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 w-full bg-[#07111F]/92 backdrop-blur-xl border-b border-white/[0.055] px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
      {/* Esquerda: No Mobile exibe Logo pequena + Saudação. No Desktop exibe Saudação + Subtexto */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="lg:hidden shrink-0">
          <Logo size="sm" showTagline={false} />
        </div>

        <div className="truncate">
          {/* Headline: 14-15px, weight 600 (Item 32) */}
          <h1 className="text-[14.5px] font-semibold text-[#F5F7FB] tracking-tight truncate leading-tight">
            {APP_CONFIG.defaultUser.greeting}
          </h1>
          {/* Subtext: 12px, color #64748B (Item 32) */}
          <p className="text-[12px] text-[#64748B] truncate leading-normal">
            Acompanhe sua evolução patrimonial em tempo real.
          </p>
        </div>
      </div>

      {/* Direita: Indicador de Sistema Operacional, Busca, Notificações e Perfil */}
      <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
        {/* Indicador muito discreto: Sistema operacional com ponto verde e background rgba(255,255,255,.02) (Item 33) */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.05] text-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-positive inline-block" />
          <span className="text-[11px] font-mono text-[#91A0B5]">
            Sistema operacional
          </span>
        </div>

        {/* Busca com Hit Area de no mínimo 40x40px (Item 34) */}
        <div className="relative">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Pesquisar ativos e transações"
            className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-text-primary rounded-xl hover:bg-white/[0.03] transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4 text-[#91A0B5]" />
          </button>

          {isSearchOpen && (
            <div className="absolute right-0 top-12 w-72 sm:w-80 p-2.5 bg-[#0C1A2E]/98 backdrop-blur-2xl border border-white/10 rounded-xl shadow-financial-elevated z-40">
              <input
                type="text"
                placeholder="Buscar ativo, comprovante, hash..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-[#07111F] border border-white/10 rounded-lg px-3 py-2 text-xs text-text-primary placeholder:text-text-tertiary outline-none focus:border-brand-blue"
              />
              <div className="mt-2 text-[10px] text-text-tertiary px-1 flex justify-between">
                <span>Atalhos: BTC, LTC, Rendimentos</span>
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="text-text-secondary hover:underline cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Notificações com Hit Area 40x40px e bolinha azul sutil (Item 34 e 35) */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            aria-label="Central de notificações"
            className="w-10 h-10 relative flex items-center justify-center text-text-secondary hover:text-text-primary rounded-xl hover:bg-white/[0.03] transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4 text-[#91A0B5]" />
            {/* Bolinha menor, menos saturada, posicionada precisamente (Item 35) */}
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-brand-cyan/80" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 top-12 w-80 sm:w-96 bg-[#0C1A2E]/98 backdrop-blur-2xl border border-white/10 rounded-xl shadow-financial-elevated overflow-hidden z-40">
              <div className="p-3.5 border-b border-white/[0.05] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-text-primary">Notificações</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] bg-brand-blue/20 text-brand-cyan px-2 py-0.2 rounded-full font-mono">
                      {unreadCount} novas
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[11px] text-brand-cyan hover:underline cursor-pointer"
                  >
                    Marcar lidas
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-white/[0.04]">
                {notifications.slice(0, 5).map((n) => (
                  <div
                    key={n.id}
                    className={`p-3 text-left hover:bg-white/[0.02] transition-colors ${!n.read ? 'bg-white/[0.02]' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-text-primary">{n.title}</span>
                      <span className="text-[10px] text-text-tertiary font-mono">{n.timestamp}</span>
                    </div>
                    <p className="text-[11px] text-text-secondary line-clamp-2">
                      {n.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-2 border-t border-white/[0.05] bg-black/20 text-center">
                <button
                  onClick={() => {
                    setIsNotifOpen(false);
                    navigate('/notifications');
                  }}
                  className="text-xs text-brand-cyan hover:text-brand-blue-hover font-medium flex items-center justify-center gap-1.5 w-full py-1 cursor-pointer"
                >
                  <span>Ver todas</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Avatar do Usuário com Hit Area 40x40px */}
        <div
          onClick={() => navigate('/profile')}
          className="w-10 h-10 flex items-center justify-center cursor-pointer"
        >
          <Avatar
            name={APP_CONFIG.defaultUser.name}
            src={APP_CONFIG.defaultUser.avatar}
            size="sm"
            status="online"
          />
        </div>
      </div>
    </header>
  );
};
