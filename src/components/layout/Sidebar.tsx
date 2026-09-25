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

  // Ícones padronizados em 16-17px com stroke-width 1.8 (Item 28)
  const navItems: NavItem[] = [
    { label: 'Visão Geral', path: '/dashboard', icon: <LayoutDashboard className="w-[17px] h-[17px] stroke-[1.8]" /> },
    { label: 'Carteira', path: '/wallet', icon: <Wallet className="w-[17px] h-[17px] stroke-[1.8]" /> },
    { label: 'Investimentos', path: '/investments', icon: <TrendingUp className="w-[17px] h-[17px] stroke-[1.8]" /> },
    { label: 'Mercado', path: '/market', icon: <BarChart3 className="w-[17px] h-[17px] stroke-[1.8]" /> },
    { label: 'Transações', path: '/transactions', icon: <ArrowLeftRight className="w-[17px] h-[17px] stroke-[1.8]" /> },
    { label: 'Rendimentos', path: '/earnings', icon: <Percent className="w-[17px] h-[17px] stroke-[1.8]" /> },
    { label: 'Afiliados', path: '/affiliates', icon: <Users className="w-[17px] h-[17px] stroke-[1.8]" /> },
    { label: 'Relatórios', path: '/reports', icon: <FileText className="w-[17px] h-[17px] stroke-[1.8]" /> },
    { 
      label: 'Notificações', 
      path: '/notifications', 
      icon: <Bell className="w-[17px] h-[17px] stroke-[1.8]" />,
      badge: unreadCount > 0 ? unreadCount : undefined
    },
    { label: 'Suporte', path: '/support', icon: <HelpCircle className="w-[17px] h-[17px] stroke-[1.8]" /> },
    { label: 'Configurações', path: '/settings', icon: <Settings className="w-[17px] h-[17px] stroke-[1.8]" /> },
  ];

  return (
    // Largura 220px (Item 26)
    <aside className="hidden lg:flex flex-col w-[220px] h-screen sticky top-0 bg-[#081322]/95 backdrop-blur-2xl border-r border-white/[0.055] z-30 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-white/[0.05]">
        <Logo size="sm" showTagline={true} />
      </div>

      {/* Navegação Principal */}
      <div className="flex-1 overflow-y-auto px-3 py-3.5 space-y-0.5">
        <div className="text-[10px] font-mono font-medium tracking-wider text-text-tertiary uppercase px-2.5 mb-1.5">
          Menu Principal
        </div>

        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-all duration-150 group relative
              ${isActive 
                ? 'bg-brand-blue/[0.10] text-[#DCEBFF] font-semibold before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:bg-brand-blue before:rounded-r' 
                : 'text-[#7F90A9] hover:text-[#F5F7FB] hover:bg-white/[0.025]'}
            `}
          >
            <div className="flex items-center gap-2.5">
              <span className="transition-colors group-hover:text-text-primary">
                {item.icon}
              </span>
              <span>{item.label}</span>
            </div>
            {item.badge !== undefined && (
              <span className="text-[10px] font-mono font-semibold px-1.5 py-0.2 rounded-full bg-brand-blue text-white">
                {item.badge}
              </span>
            )}
          </NavLink>
        ))}

        {/* Separador Institucional com mais spacing acima (Item 29) */}
        <div className="pt-4 mt-4 border-t border-white/[0.05]">
          <div className="text-[10px] font-mono font-medium tracking-wider text-text-tertiary uppercase px-2.5 mb-1.5">
            Institucional
          </div>
          {/* Painel Admin Institucional e Discreto (Item 30) */}
          <NavLink
            to="/admin"
            className={({ isActive }) => `
              flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-all duration-150 group relative
              ${isActive 
                ? 'bg-brand-blue/[0.10] text-[#DCEBFF] font-semibold before:absolute before:left-0 before:top-2 before:bottom-2 before:w-[2px] before:bg-brand-blue before:rounded-r' 
                : 'text-[#7F90A9] hover:text-[#F5F7FB] hover:bg-white/[0.025]'}
            `}
          >
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-[17px] h-[17px] stroke-[1.8] text-crypto-bitcoin/90" />
              <span>Painel Admin</span>
            </div>
            <span className="text-[10px] bg-white/[0.06] px-1.5 py-0.2 rounded font-mono text-text-tertiary">
              AuM
            </span>
          </NavLink>
        </div>
      </div>

      {/* Conta do Usuário no Rodapé com Indicador Cyan (Item 31) */}
      <div className="p-3 border-t border-white/[0.05] bg-[#07111F]/70">
        <div className="flex items-center justify-between p-1.5 rounded-xl hover:bg-white/[0.03] transition-colors">
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
              <div className="text-xs font-semibold text-[#F5F7FB] truncate">
                {APP_CONFIG.defaultUser.name}
              </div>
              {/* Nível de conta Private Wealth com indicador cyan (Item 31) */}
              <div className="text-[10px] font-mono text-brand-cyan truncate flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan inline-block" />
                <span>Private Wealth</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/login')}
            title="Encerrar sessão"
            className="p-1 text-text-tertiary hover:text-negative hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 stroke-[1.8]" />
          </button>
        </div>
      </div>
    </aside>
  );
};
