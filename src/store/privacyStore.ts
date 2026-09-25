import { create } from 'zustand';

interface PrivacyState {
  hideValues: boolean;
  toggleHideValues: () => void;
  setHideValues: (hide: boolean) => void;
  formatCurrency: (value: number, prefix?: string) => string;
  formatCrypto: (value: number, symbol: 'BTC' | 'LTC') => string;
}

const STORAGE_KEY = 'cure_capital_privacy_hide_values';

export const usePrivacyStore = create<PrivacyState>((set, get) => {
  // Inicialização lendo do localStorage se no browser
  const initialHide = typeof window !== 'undefined' 
    ? localStorage.getItem(STORAGE_KEY) === 'true' 
    : false;

  return {
    hideValues: initialHide,
    toggleHideValues: () => {
      const next = !get().hideValues;
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, String(next));
      }
      set({ hideValues: next });
    },
    setHideValues: (hide: boolean) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, String(hide));
      }
      set({ hideValues: hide });
    },
    formatCurrency: (value: number, prefix = 'R$ ') => {
      if (get().hideValues) {
        return `${prefix}••••••`;
      }
      return `${prefix}${value.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })}`;
    },
    formatCrypto: (value: number, symbol: 'BTC' | 'LTC') => {
      if (get().hideValues) {
        return `•••• ${symbol}`;
      }
      const decimals = symbol === 'BTC' ? 5 : 3;
      return `${value.toLocaleString('pt-BR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })} ${symbol}`;
    }
  };
});
