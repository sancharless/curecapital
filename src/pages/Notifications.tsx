import React from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Bell, CheckCheck, Trash2, ArrowDownLeft, ArrowUpRight, ShieldCheck, Share2, Percent } from 'lucide-react';
import { useNotificationStore, AppNotification } from '../store/notificationStore';

export const Notifications: React.FC = () => {
  const notifications = useNotificationStore(s => s.notifications);
  const markAsRead = useNotificationStore(s => s.markAsRead);
  const markAllAsRead = useNotificationStore(s => s.markAllAsRead);
  const clearNotification = useNotificationStore(s => s.clearNotification);

  const getNotificationIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'yield': return <Percent className="w-4 h-4 text-positive" />;
      case 'deposit': return <ArrowDownLeft className="w-4 h-4 text-brand-cyan" />;
      case 'withdrawal': return <ArrowUpRight className="w-4 h-4 text-text-tertiary" />;
      case 'commission': return <Share2 className="w-4 h-4 text-brand-blue" />;
      case 'security': return <ShieldCheck className="w-4 h-4 text-alert" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-text-primary tracking-tight">
            Central de Notificações
          </h2>
          <p className="text-xs sm:text-sm text-text-secondary mt-1">
            Histórico de avisos operacionais, rendimentos creditados e alertas de segurança.
          </p>
        </div>

        <Button
          variant="secondary"
          size="sm"
          leftIcon={<CheckCheck className="w-4 h-4 text-brand-cyan" />}
          onClick={markAllAsRead}
        >
          Marcar todas como lidas
        </Button>
      </div>

      <div className="space-y-3">
        {notifications.map((notif) => (
          <Card 
            key={notif.id} 
            variant="glass" 
            radius="md" 
            className={`p-4 sm:p-5 flex items-start justify-between gap-4 transition-colors ${!notif.read ? 'border-brand-blue/30 bg-brand-blue/[0.03]' : ''}`}
          >
            <div className="flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 shrink-0 mt-0.5">
                {getNotificationIcon(notif.type)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-semibold text-text-primary">
                    {notif.title}
                  </h3>
                  {!notif.read && (
                    <span className="w-2 h-2 rounded-full bg-brand-cyan inline-block" />
                  )}
                </div>
                <p className="text-xs text-text-secondary">
                  {notif.description}
                </p>
                <div className="text-[10px] font-mono text-text-tertiary pt-1">
                  {notif.timestamp}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {!notif.read && (
                <button
                  onClick={() => markAsRead(notif.id)}
                  title="Marcar como lida"
                  className="p-1.5 text-text-tertiary hover:text-brand-cyan transition-colors cursor-pointer"
                >
                  <CheckCheck className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => clearNotification(notif.id)}
                title="Remover"
                className="p-1.5 text-text-tertiary hover:text-negative transition-colors cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
