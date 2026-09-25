import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MarketDataProvider } from './providers/MarketDataProvider';
import { AppLayout } from './components/layout/AppLayout';

// Páginas
import { Dashboard } from './pages/Dashboard';
import { Wallet } from './pages/Wallet';
import { AssetDetail } from './pages/AssetDetail';
import { Investments } from './pages/Investments';
import { Market } from './pages/Market';
import { Transactions } from './pages/Transactions';
import { Earnings } from './pages/Earnings';
import { Affiliates } from './pages/Affiliates';
import { AffiliateTerms } from './pages/AffiliateTerms';
import { Reports } from './pages/Reports';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';
import { Profile } from './pages/Profile';
import { Support } from './pages/Support';
import { Admin } from './pages/Admin';
import { Login } from './pages/Login';

export const App: React.FC = () => {
  return (
    <MarketDataProvider>
      <BrowserRouter>
        <Routes>
          {/* Rota de Acesso & Autenticação */}
          <Route path="/login" element={<Login />} />

          {/* Rotas Protegidas dentro do AppLayout */}
          <Route element={<AppLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/wallet/:symbol" element={<AssetDetail />} />
            <Route path="/investments" element={<Investments />} />
            <Route path="/market" element={<Market />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/earnings" element={<Earnings />} />
            <Route path="/affiliates" element={<Affiliates />} />
            <Route path="/affiliates/terms" element={<AffiliateTerms />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/support" element={<Support />} />
            <Route path="/admin" element={<Admin />} />
          </Route>

          {/* Redirecionamento Padrão para Dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </MarketDataProvider>
  );
};

export default App;
