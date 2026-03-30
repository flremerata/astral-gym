// Utility functions

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  }).format(amount);
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-PH', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

export const calculateExpiry = (startDate, months) => {
  const date = new Date(startDate);
  date.setMonth(date.getMonth() + months);
  return date.toISOString().split('T')[0];
};
