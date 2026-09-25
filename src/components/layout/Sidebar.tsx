import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet, 
  TrendingUp, 
  BarChart3, 
  ArrowLeftRight, 
  Percent, 
  Users, 
  FileText, 
  Bell, 
  HelpCircle, 
  Settings, 
  ShieldCheck, 
  LogOut 
} from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Avatar } from '../ui/Avatar';
import { APP_CONFIG } from '../../config/app';
import { useNotificationStore } from '../../store/notificationStore';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  badge?: number | string;
}

export const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const unreadCount = useNotificationStore((s) => s.unreadCount());

  const navItems: NavItem[] = [
    { label: 'Visão Geral', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Carteira', path: '/wallet', icon: <Wallet className="w-4 h-4" /> },
    { label: 'Investimentos', path: '/investments', icon: <TrendingUp className="w-4 h-4" /> },
    { label: 'Mercado', path: '/market', icon: <BarChart3 className="w-4 h-4" /> },
    { label: 'Transações', path: '/transactions', icon: <ArrowLeftRight className="w-4 h-4" /> },
    { label: 'Rendimentos', path: '/earnings', icon: <Percent className="w-4 h-4" /> },
    { label: 'Afiliados', path: '/affiliates', icon: <Users className="w-4 h-4" /> },
    { label: 'Relatórios', path: '/reports', icon: <FileText className="w-4 h-4" /> },
    { 
      label: 'Notificações', 
      path: '/notifications', 
      icon: <Bell className="w-4 h-4" />,
      badge: unreadCount > 0 ? unreadCount : undefined
    },
    { label: 'Suporte', path: '/support', icon: <HelpCircle className="w-4 h-4" /> },
    { label: 'Configurações', path: '/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-[260px] h-screen sticky top-0 bg-[#081322]/95 backdrop-blur-2xl border-r border-white/[0.06] z-30 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-white/[0.06]">
        <Logo size="md" showTagline={true} />
      </div>

      {/* Navegação Principal */}
      <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1">
        <div className="text-[10px] font-mono font-medium tracking-wider text-text-tertiary uppercase px-3 mb-2">
          Menu Principal
        </div>

        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 group relative
              ${isActive 
                ? 'bg-brand-blue/[0.12] text-white border border-brand-blue/30 shadow-sm before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-brand-blue before:rounded-r' 
                : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.03]'}
            `}
          >
            <div className="flex items-center gap-3">
              <span className="transition-transform duration-200 group-hover:scale-110">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </div>
            {item.badge !== undefined && (
              <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-brand-blue text-white">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}

        {/* Separador Institucional */}
        <div className="pt-3 mt-3 border-t border-white/[0.06]">
          <div className="text-[10px] font-mono font-medium tracking-wider text-text-tertiary uppercase px-3 mb-2">
            Institucional
          </div>
          <NavLink
            to="/admin"
            className={({ isActive }) => `
              flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-150 group relative
              ${isActive 
                ? 'bg-brand-blue/[0.12] text-white border border-brand-blue/30 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-1 before:bg-brand-blue before:rounded-r' 
                : 'text-text-secondary hover:text-text-primary hover:bg-white/[0.03]'}
            `}
          >
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-crypto-bitcoin" />
              <span>Painel Admin</span>
            </div>
            <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded font-mono text-text-secondary">
              AuM
            </span>
          </NavLink>
        </div>
      </div>

      {/* Conta do Usuário no Rodapé */}
      <div className="p-3.5 border-t border-white/[0.06] bg-[#07111F]/70">
        <div className="flex items-center justify-between p-2 rounded-xl hover:bg-white/[0.03] transition-colors">
          <div 
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2.5 cursor-pointer min-w-0 flex-1"
          >
            <Avatar 
              name={APP_CONFIG.defaultUser.name} 
              src={APP_CONFIG.defaultUser.avatar}
              size="sm"
              status="online"
            />
            <div className="truncate">
              <div className="text-xs font-semibold text-text-primary truncate">
                {APP_CONFIG.defaultUser.name}
              </div>
              <div className="text-[10px] font-mono text-brand-cyan truncate">
                {APP_CONFIG.defaultUser.accountLevel}
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/login')}
            title="Encerrar sessão"
            className="p-1.5 text-text-tertiary hover:text-negative hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
