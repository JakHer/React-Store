export const formatCurrency = (value: any): string => {
  const numberValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numberValue)) {
    return '$0.00';
  }

  return numberValue.toFixed(2);
};
