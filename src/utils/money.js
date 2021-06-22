export const centsToDollars = (total) => (+total / 100).toFixed(2);

export function usd(number) {
  if (!Number.isFinite(number)) return '';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(number / 100);
}
