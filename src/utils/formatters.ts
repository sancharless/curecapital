/**
 * Formatadores financeiros profissionais e padronizados para a Cure Capital
 */

export function formatBRL(value: number, hideValues = false): string {
  if (hideValues) return 'R$ ••••••';
  return `R$ ${value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatBTC(value: number, hideValues = false): string {
  if (hideValues) return '•••• BTC';
  return `${value.toLocaleString('pt-BR', {
    minimumFractionDigits: 5,
    maximumFractionDigits: 5,
  })} BTC`;
}

export function formatLTC(value: number, hideValues = false): string {
  if (hideValues) return '•••• LTC';
  return `${value.toLocaleString('pt-BR', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  })} LTC`;
}

export function formatPercentage(value: number, includeSign = true): string {
  const sign = includeSign && value > 0 ? '+' : '';
  return `${sign}${value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}%`;
}

export function formatCompactCurrency(value: number, hideValues = false): string {
  if (hideValues) return 'R$ •••••';
  if (value >= 1_000_000) {
    return `R$ ${(value / 1_000_000).toLocaleString('pt-BR', { maximumFractionDigits: 2 })}M`;
  }
  if (value >= 1_000) {
    return `R$ ${(value / 1_000).toLocaleString('pt-BR', { maximumFractionDigits: 1 })}k`;
  }
  return formatBRL(value);
}
