import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Moon, Sun, Check, ExternalLink } from 'lucide-react';
import { APP_CONFIG } from '../../config/app';
import { Avatar } from '../ui/Avatar';
import { Badge } from '../ui/Badge';
import { useNotificationStore } from '../../store/notificationStore';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const notifRef = useRef<HTMLDivElement>(null);

  const notifications = useNotificationStore(s => s.notifications);
  const unreadCount = useNotificationStore(s => s.unreadCount());
  const markAllAsRead = useNotificationStore(s => s.markAllAsRead);

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
    <header className="sticky top-0 z-20 w-full bg-[#07111F]/85 backdrop-blur-xl border-b border-white/[0.06] px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
      {/* Esquerda: Saudação e Subtexto */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="lg:hidden">
          <Avatar 
            name={APP_CONFIG.defaultUser.name} 
            src={APP_CONFIG.defaultUser.avatar}
            size="sm"
            status="online"
            className="cursor-pointer"
          />
        </div>
        <div className="truncate">
          <div className="flex items-center gap-2">
            <h1 className="text-sm sm:text-base font-semibold text-text-primary tracking-tight truncate">
              {APP_CONFIG.defaultUser.greeting}
            </h1>
            <span className="hidden sm:inline-flex">
              <Badge variant="cyan" size="sm">
                {APP_CONFIG.defaultUser.tier}
              </Badge>
            </span>
          </div>
          <p className="text-[11px] sm:text-xs text-text-tertiary truncate">
            Acompanhe seu patrimônio digital.
          </p>
        </div>
      </div>

      {/* Direita: Ações, Status do Sistema, Notificações e Perfil */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Status Operacional com indicador verde pulsante discreto */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-xs text-text-secondary">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-positive opacity-60"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-positive"></span>
          </span>
          <span className="font-mono text-[11px] text-text-secondary">
            {APP_CONFIG.systemStatus.label}
          </span>
        </div>

        {/* Botão de Pesquisa */}
        <div className="relative">
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            aria-label="Pesquisar ativos e transações"
            className="p-2 text-text-secondary hover:text-text-primary rounded-xl hover:bg-white/[0.05] transition-colors cursor-pointer"
          >
            <Search className="w-4 h-4" />
          </button>

          {isSearchOpen && (
            <div className="absolute right-0 top-12 w-72 sm:w-80 p-2 bg-card-elevated border border-white/10 rounded-xl shadow-financial-elevated z-30">
              <input
                type="text"
                placeholder="Buscar ativo, hash, ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full bg-[#081322] border border-white/10 rounded-lg px-3 py-2 text-xs text-text-primary placeholder:text-text-tertiary outline-none focus:border-brand-blue"
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

        {/* Dropdown de Notificações */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            aria-label="Notificações do sistema"
            className="relative p-2 text-text-secondary hover:text-text-primary rounded-xl hover:bg-white/[0.05] transition-colors cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-cyan" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 top-12 w-80 sm:w-96 bg-card-elevated border border-white/10 rounded-card-md shadow-financial-elevated overflow-hidden z-30">
              <div className="p-3.5 border-b border-white/[0.06] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-text-primary">Notificações</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] bg-brand-blue/30 text-brand-cyan px-1.5 py-0.2 rounded-full font-mono">
                      {unreadCount} novas
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[11px] text-brand-cyan hover:underline cursor-pointer"
                  >
                    Marcar todas lidas
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

              <div className="p-2 border-t border-white/[0.06] bg-black/20 text-center">
                <button
                  onClick={() => {
                    setIsNotifOpen(false);
                    navigate('/notifications');
                  }}
                  className="text-xs text-brand-cyan hover:text-brand-blue-hover font-medium flex items-center justify-center gap-1.5 w-full py-1 cursor-pointer"
                >
                  <span>Ver central de notificações</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Alternância Dark Mode (placeholder com indicador visual sofisticado) */}
        <button
          title="Modo escuro ativo (Dark Mode padrão)"
          className="hidden sm:flex p-2 text-text-secondary hover:text-text-primary rounded-xl hover:bg-white/[0.05] transition-colors cursor-pointer"
        >
          <Moon className="w-4 h-4 text-brand-cyan" />
        </button>

        {/* Perfil no Desktop */}
        <div 
          onClick={() => navigate('/profile')}
          className="hidden lg:flex items-center gap-2.5 pl-2 border-l border-white/[0.08] cursor-pointer"
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
