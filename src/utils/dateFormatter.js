export const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatFullDate = (dateString) => {
  if (!dateString) return '';
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const formatCurrency = (amount, currencyCode = 'PKR') => {
  const currencies = {
    PKR: { symbol: 'Rs.', pos: 'before' },
    USD: { symbol: '$', pos: 'before' },
    EUR: { symbol: '€', pos: 'before' },
    GBP: { symbol: '£', pos: 'before' },
  };

  const config = currencies[currencyCode] || currencies.PKR;
  const formatted = Math.abs(amount).toLocaleString();
  
  return config.pos === 'before' 
    ? `${config.symbol} ${formatted}`
    : `${formatted} ${config.symbol}`;
};

export const getMonthName = (date = new Date()) => {
  return date.toLocaleString('default', { month: 'long' });
};
