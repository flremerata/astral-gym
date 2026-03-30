// Application configuration
export const CONFIG = {
  appName: 'Astral Gym',
  version: '2.0.0',
  environment: typeof window !== 'undefined' ? 'browser' : 'node',
  apiBaseUrl: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3000'
};

// Demo credentials
export const DEMO_USER = {
  username: 'admin',
  password: 'password'
};

// Member plans
export const PLANS = {
  BASIC: { name: 'Basic', price: 800, duration: 'monthly' },
  PREMIUM: { name: 'Premium', price: 1500, duration: 'monthly' },
  VIP: { name: 'VIP', price: 2500, duration: 'monthly' }
};

// Payment methods
export const PAYMENT_METHODS = ['GCash', 'Maya', 'Cash', 'Card'];
