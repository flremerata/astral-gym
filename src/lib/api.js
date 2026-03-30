// API handler utilities
import { CONFIG } from './config.js';

export const API = {
  request: async (endpoint, options = {}) => {
    const url = `${CONFIG.apiBaseUrl}${endpoint}`;
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('API Request Error:', error);
      throw error;
    }
  },

  getMembers: async () => {
    // Mock data for now
    return Promise.resolve([
      { id: '#0241', name: 'Maria Santos', plan: 'Basic', status: 'Active', phone: '0917-111-2222' },
      { id: '#0238', name: 'Carlo Reyes', plan: 'Premium', status: 'Active', phone: '0918-222-3333' }
    ]);
  },

  addMember: async (memberData) => {
    return API.request('/api/members', { method: 'POST', body: JSON.stringify(memberData) });
  },

  recordPayment: async (paymentData) => {
    return API.request('/api/payments', { method: 'POST', body: JSON.stringify(paymentData) });
  }
};
