export function capitalizeWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function formatCurrency(amt) {
  return Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amt);
}
