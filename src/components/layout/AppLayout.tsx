import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNavigation } from './MobileNavigation';

export const AppLayout: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-bg-primary text-text-primary flex">
      {/* Efeitos sutis de iluminação indireta (ambient glow sem exageros) */}
      <div className="ambient-glow" />
      <div className="ambient-glow-secondary" />

      {/* Sidebar Desktop */}
      <Sidebar />

      {/* Área Central de Conteúdo */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        <Header />

        <main 
          className="flex-1 px-4 sm:px-6 lg:px-8 py-5 sm:py-6 pb-24 lg:pb-8 max-w-7xl w-full mx-auto"
          style={{
            // Compensação para bottom-nav no mobile
            paddingBottom: 'max(96px, calc(env(safe-area-inset-bottom) + 72px))'
          }}
        >
          <Outlet />
        </main>

        {/* Bottom Navigation Mobile */}
        <MobileNavigation />
      </div>
    </div>
  );
};
