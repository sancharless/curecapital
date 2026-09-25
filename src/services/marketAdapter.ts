import { MarketQuote, PortfolioHistoryPoint, TimeframeFilter } from '../types';
import { INITIAL_MARKET_QUOTES, MOCK_CHART_TIMEFRAMES } from '../data/mockData';
import { MARKET_CONFIG } from '../config/market';

/**
 * =======================================================================
 * MARKET DATA ADAPTER ARCHITECTURE
 * =======================================================================
 * Interface padrão para desacoplar a UI do provedor de dados de cotações.
 * Na fase de produção, basta substituir `MockMarketDataAdapter` por 
 * `RealMarketDataAdapter` (ex: Binance WebSocket, CoinGecko Pro ou TradingView API)
 * sem precisar alterar nenhum componente visual ou hook da interface.
 */

export interface MarketDataAdapter {
  getBTCPrice(): Promise<number>;
  getLTCPrice(): Promise<number>;
  getQuote(symbol: 'BTC' | 'LTC'): Promise<MarketQuote>;
  getAllQuotes(): Promise<Record<'BTC' | 'LTC', MarketQuote>>;
  getHistoricalPrices(timeframe: TimeframeFilter): Promise<PortfolioHistoryPoint[]>;
  subscribeQuote(symbol: 'BTC' | 'LTC', callback: (quote: MarketQuote) => void): () => void;
  subscribeAll(callback: (quotes: Record<'BTC' | 'LTC', MarketQuote>) => void): () => void;
}

/**
 * =======================================================================
 * MOCK MARKET DATA ENGINE
 * =======================================================================
 * Simulador de oscilações realistas para ambiente de desenvolvimento e testes.
 * Simula micro-flutuações ordenadas a cada ciclo sem saltos absurdos de preço,
 * mantendo estabilidade e fidelidade à dinâmica de mercado financeiro.
 */
export class MockMarketDataAdapter implements MarketDataAdapter {
  private quotes: Record<'BTC' | 'LTC', MarketQuote>;
  private subscribers: Set<(quotes: Record<'BTC' | 'LTC', MarketQuote>) => void> = new Set();
  private timerId: any = null;

  constructor() {
    this.quotes = {
      BTC: { ...INITIAL_MARKET_QUOTES.BTC },
      LTC: { ...INITIAL_MARKET_QUOTES.LTC },
    };
    this.startMockTicker();
  }

  private startMockTicker() {
    if (typeof window === 'undefined') return;

    this.timerId = setInterval(() => {
      // Simula flutuação suave (+/- 0.05% a 0.12%)
      const btcDeltaPercent = (Math.random() - 0.49) * 0.0012;
      const ltcDeltaPercent = (Math.random() - 0.48) * 0.0016;

      const newBtcPrice = Math.round((this.quotes.BTC.priceBrl * (1 + btcDeltaPercent)) * 100) / 100;
      const newLtcPrice = Math.round((this.quotes.LTC.priceBrl * (1 + ltcDeltaPercent)) * 100) / 100;

      const btcSpark = [...this.quotes.BTC.sparkline.slice(1), newBtcPrice];
      const ltcSpark = [...this.quotes.LTC.sparkline.slice(1), newLtcPrice];

      this.quotes = {
        BTC: {
          ...this.quotes.BTC,
          priceBrl: newBtcPrice,
          change24h: Math.round((this.quotes.BTC.change24h + btcDeltaPercent * 10) * 100) / 100,
          sparkline: btcSpark,
          lastUpdated: new Date(),
        },
        LTC: {
          ...this.quotes.LTC,
          priceBrl: newLtcPrice,
          change24h: Math.round((this.quotes.LTC.change24h + ltcDeltaPercent * 10) * 100) / 100,
          sparkline: ltcSpark,
          lastUpdated: new Date(),
        },
      };

      // Notifica todos os subscribers
      this.subscribers.forEach(cb => cb(this.quotes));
    }, MARKET_CONFIG.refreshIntervalMs);
  }

  async getBTCPrice(): Promise<number> {
    return this.quotes.BTC.priceBrl;
  }

  async getLTCPrice(): Promise<number> {
    return this.quotes.LTC.priceBrl;
  }

  async getQuote(symbol: 'BTC' | 'LTC'): Promise<MarketQuote> {
    return this.quotes[symbol];
  }

  async getAllQuotes(): Promise<Record<'BTC' | 'LTC', MarketQuote>> {
    return this.quotes;
  }

  async getHistoricalPrices(timeframe: TimeframeFilter): Promise<PortfolioHistoryPoint[]> {
    const data = MOCK_CHART_TIMEFRAMES[timeframe] || MOCK_CHART_TIMEFRAMES['30D'];
    return [...data];
  }

  subscribeQuote(symbol: 'BTC' | 'LTC', callback: (quote: MarketQuote) => void): () => void {
    const wrappedCallback = (all: Record<'BTC' | 'LTC', MarketQuote>) => {
      callback(all[symbol]);
    };
    this.subscribers.add(wrappedCallback);
    // Chamada inicial imediata
    callback(this.quotes[symbol]);

    return () => {
      this.subscribers.delete(wrappedCallback);
    };
  }

  subscribeAll(callback: (quotes: Record<'BTC' | 'LTC', MarketQuote>) => void): () => void {
    this.subscribers.add(callback);
    // Chamada inicial imediata
    callback(this.quotes);

    return () => {
      this.subscribers.delete(callback);
    };
  }

  destroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.subscribers.clear();
  }
}

// Instância padrão do adapter (MOCK MARKET DATA para dev/preview)
export const marketAdapter: MarketDataAdapter = new MockMarketDataAdapter();
