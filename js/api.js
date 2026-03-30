// ── API SERVICE ──
class APIService {
  constructor(baseUrl = 'http://localhost:3000/api') {
    this.baseUrl = baseUrl;
    this.token = localStorage.getItem('astral_token');
  }
  
  async request(endpoint, method = 'GET', data = null) {
    try {
      // Rate limiting check
      if (!apiLimiter.isAllowed()) {
        Logger.warn('Rate limit exceeded');
        showToast('❌ Too many requests. Please wait.', 'error');
        return null;
      }
      
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
          'X-CSRF-Token': CONFIG.csrf.enabled ? CSRFToken.get() : '',
          'X-Requested-With': 'XMLHttpRequest'
        }
      };
      
      if (data) options.body = JSON.stringify(data);
      
      const response = await fetch(this.baseUrl + endpoint, options);
      if (response.status === 401) {
        localStorage.removeItem('astral_session');
        location.reload();
      }
      
      if (response.status === 429) {
        Logger.warn('Server rate limit exceeded');
        showToast('❌ Server busy. Please try again later.', 'error');
        return null;
      }
      
      return await response.json();
    } catch (error) {
      Logger.error('API Error', error);
      showToast('❌ Network error. Check your connection.', 'error');
      return null;
    }
  }
  
  // Auth endpoints
  async login(username, password) {
    return this.request('/auth/login', 'POST', { username, password });
  }
  
  async logout() {
    return this.request('/auth/logout', 'POST');
  }
  
  // Member endpoints
  async getMembers() {
    return this.request('/members');
  }
  
  async getMember(id) {
    return this.request(`/members/${id}`);
  }
  
  async createMember(data) {
    return this.request('/members', 'POST', data);
  }
  
  async updateMember(id, data) {
    return this.request(`/members/${id}`, 'PUT', data);
  }
  
  async deleteMember(id) {
    return this.request(`/members/${id}`, 'DELETE');
  }
  
  // Payment endpoints
  async recordPayment(data) {
    return this.request('/payments', 'POST', data);
  }
  
  async getPayments() {
    return this.request('/payments');
  }
  
  // Attendance endpoints
  async recordAttendance(data) {
    return this.request('/attendance/checkin', 'POST', data);
  }
  
  async getAttendance() {
    return this.request('/attendance');
  }
  
  // Analytics endpoints
  async getAnalytics() {
    return this.request('/analytics');
  }
  
  async getReports(type) {
    return this.request(`/reports/${type}`);
  }
}

// Initialize API service
const apiService = new APIService(CONFIG.apiBaseUrl);

// ── NOTIFICATION SERVICE ──
class NotificationService {
  static send(title, options = {}) {
    if (!('Notification' in window)) return;
    
    if (Notification.permission === 'granted') {
      new Notification(title, options);
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(title, options);
        }
      });
    }
  }
  
  static sendReminder(member, message) {
    this.send(`Reminder for ${member}`, {
      body: message,
      icon: '🔔',
      tag: 'gym-reminder'
    });
  }
}

// ── ANALYTICS SERVICE ──
class Analytics {
  static trackEvent(event, data = {}) {
    const eventData = {
      event,
      timestamp: new Date().toISOString(),
      ...data
    };
    
    // Send to analytics (or just log locally)
    Logger.info(`Event: ${event}`, data);
  }
  
  static trackPageView(page) {
    this.trackEvent('page_view', { page });
  }
  
  static trackAction(action, details = {}) {
    this.trackEvent('user_action', { action, ...details });
  }
}

// ── PERFORMANCE MONITORING ──
class Performance {
  static initMetrics() {
    if (window.performance) {
      window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        Logger.info('Page Load Complete', { loadTime: pageLoadTime + 'ms' });
      });
    }
  }
  
  static measure(label) {
    if (window.performance && window.performance.mark) {
      window.performance.mark(label);
    }
  }
}

// Initialize performance monitoring
Performance.initMetrics();

// Request notification permission on load
if ('Notification' in window && Notification.permission === 'default') {
  Notification.requestPermission();
}
