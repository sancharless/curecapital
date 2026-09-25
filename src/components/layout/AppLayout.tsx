import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNavigation } from './MobileNavigation';
import { ToastContainer } from '../ui/Toast';
import { WifiOff } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const [isOnline, setIsOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div className="relative min-h-[100dvh] bg-[#07111F] text-text-primary flex">
      {/* Background discreto com radial gradient sutil no topo (Item 89) */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_40%_at_50%_-10%,rgba(37,99,235,0.08),transparent)]" />
      <div className="ambient-glow" />
      <div className="ambient-glow-secondary" />

      {/* Banner de Status Offline Discreto (Item 55) */}
      {!isOnline && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-alert/90 backdrop-blur-md text-bg-primary py-1.5 px-4 text-center text-xs font-semibold flex items-center justify-center gap-2">
          <WifiOff className="w-3.5 h-3.5" />
          <span>Você está offline. Exibindo os últimos dados em cache local.</span>
        </div>
      )}

      {/* Sidebar Desktop (260px) */}
      <Sidebar />

      {/* Área Central de Conteúdo */}
      <div className="flex-1 flex flex-col min-w-0 min-h-[100dvh]">
        <Header />

        <main 
          className="flex-1 px-4 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-8 w-full mx-auto"
          style={{
            // Compensação para bottom-nav no mobile com safe-area (Item 97)
            paddingBottom: 'max(96px, calc(env(safe-area-inset-bottom) + 80px))'
          }}
        >
          <Outlet />
        </main>

        {/* Bottom Navigation Mobile Fixa */}
        <MobileNavigation />
      </div>

      {/* Sistema Global de Notificações Toast */}
      <ToastContainer />
    </div>
  );
};
