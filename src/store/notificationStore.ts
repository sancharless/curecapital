import { create } from 'zustand';

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  read: boolean;
  type: 'yield' | 'deposit' | 'security' | 'commission' | 'withdrawal';
}

interface NotificationState {
  notifications: AppNotification[];
  unreadCount: () => number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [
    {
      id: 'notif-1',
      title: 'Rendimento processado',
      description: 'Crédito diário de +R$ 284,32 liquidado com sucesso em sua conta.',
      timestamp: 'Hoje às 18:30',
      read: false,
      type: 'yield',
    },
    {
      id: 'notif-2',
      title: 'Depósito confirmado',
      description: 'Aporte de 9,527 LTC (R$ 5.000,00) registrado e alocado em custódia.',
      timestamp: '22 Set, 14:15',
      read: false,
      type: 'deposit',
    },
    {
      id: 'notif-3',
      title: 'Novo acesso detectado',
      description: 'Sessão autenticada via iPhone 16 Pro (São Paulo, Brasil). 2FA validado.',
      timestamp: '21 Set, 09:12',
      read: true,
      type: 'security',
    },
    {
      id: 'notif-4',
      title: 'Comissão recebida',
      description: '+R$ 124,90 referente à alocação de seu afiliado indicado.',
      timestamp: '19 Set, 11:02',
      read: true,
      type: 'commission',
    },
    {
      id: 'notif-5',
      title: 'Saque processado',
      description: 'Resgate de R$ 800,00 transferido para sua chave PIX cadastrada.',
      timestamp: '17 Set, 09:40',
      read: true,
      type: 'withdrawal',
    },
  ],
  unreadCount: () => get().notifications.filter(n => !n.read).length,
  markAsRead: (id: string) => {
    set({
      notifications: get().notifications.map(n => n.id === id ? { ...n, read: true } : n)
    });
  },
  markAllAsRead: () => {
    set({
      notifications: get().notifications.map(n => ({ ...n, read: true }))
    });
  },
  clearNotification: (id: string) => {
    set({
      notifications: get().notifications.filter(n => n.id !== id)
    });
  },
}));
