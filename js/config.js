// ── PRODUCTION CONFIGURATION ──
const CONFIG = {
  environment: 'production',
  apiBaseUrl: localStorage.getItem('ASTRAL_API_URL') || 'http://localhost:3000/api',
  enableLogging: false,
  enableDevTools: false,
  sessionTimeout: 30 * 60 * 1000, // 30 minutes
  version: '2.0',
  buildDate: new Date().toISOString(),
  appName: 'ASTRAL Gym Management System',
  rateLimit: {
    maxRequests: 100,
    windowMs: 60000, // 1 minute
  },
  csrf: {
    enabled: true,
    tokenRefreshMs: 3600000, // 1 hour
  },
};

// Security: Disable console in production
if (CONFIG.environment === 'production' && !CONFIG.enableDevTools) {
  console.log = () => {};
  console.warn = () => {};
  console.info = () => {};
}

// Security: Prevent XSS
Object.defineProperty(window, 'eval', {
  value: () => { throw new Error('eval() disabled for security'); }
});

// ── RATE LIMITING ──
class RateLimiter {
  constructor(maxRequests, windowMs) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
    this.requests = [];
  }
  
  isAllowed() {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    
    if (this.requests.length < this.maxRequests) {
      this.requests.push(now);
      return true;
    }
    return false;
  }
  
  getRemainingRequests() {
    return this.maxRequests - this.requests.length;
  }
}

const apiLimiter = new RateLimiter(CONFIG.rateLimit.maxRequests, CONFIG.rateLimit.windowMs);

// ── CSRF PROTECTION ──
class CSRFToken {
  static generate() {
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem('csrf_token', token);
    localStorage.setItem('csrf_token_time', Date.now());
    return token;
  }
  
  static get() {
    let token = localStorage.getItem('csrf_token');
    const tokenTime = parseInt(localStorage.getItem('csrf_token_time') || 0);
    const now = Date.now();
    
    // Refresh token if expired
    if (!token || (now - tokenTime > CONFIG.csrf.tokenRefreshMs)) {
      token = this.generate();
    }
    return token;
  }
  
  static verify(token) {
    return token === localStorage.getItem('csrf_token');
  }
}

// ── LOGGER CLASS ──
class Logger {
  static log(level, message, data = {}) {
    if (!CONFIG.enableLogging) return;
    
    const timestamp = new Date().toISOString();
    const logEntry = { timestamp, level, message, data };
    
    // Store in localStorage (max 10 entries)
    let logs = JSON.parse(localStorage.getItem('astral_logs') || '[]');
    logs.push(logEntry);
    if (logs.length > 10) logs.shift();
    localStorage.setItem('astral_logs', JSON.stringify(logs));
  }
  
  static error(message, error) {
    this.log('ERROR', message, { error: error?.message, stack: error?.stack });
  }
  
  static warn(message, data) {
    this.log('WARN', message, data);
  }
  
  static info(message, data) {
    this.log('INFO', message, data);
  }
}

// Global error handler
window.addEventListener('error', (event) => {
  Logger.error('Global Error', event.error);
  showToast('❌ An error occurred. Please refresh and try again.', 'error');
});

window.addEventListener('unhandledrejection', (event) => {
  Logger.error('Unhandled Promise Rejection', event.reason);
  showToast('❌ An error occurred. Please refresh and try again.', 'error');
});

// ── TOAST NOTIFICATIONS ──
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container') || document.createElement('div');
  container.id = 'toast-container';
  container.className = 'toast-container';
  document.body.appendChild(container);
  
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  
  setTimeout(() => toast.remove(), 3000);
}

// ── THEME MANAGEMENT ──
function toggleTheme() {
  const isDark = document.body.classList.toggle('light-mode');
  localStorage.setItem('astral_theme', isDark ? 'light' : 'dark');
  const btn = document.querySelector('.theme-toggle');
  btn.textContent = isDark ? '🌞' : '🌙';
}

function initTheme() {
  const theme = localStorage.getItem('astral_theme') || 'dark';
  if (theme === 'light') {
    document.body.classList.add('light-mode');
    document.querySelector('.theme-toggle').textContent = '🌞';
  }
}

// ── MODAL MANAGEMENT ──
function openModal(id) {
  document.getElementById(id).classList.add('open');
}

function closeModal(id) {
  document.getElementById(id).classList.remove('open');
}

// ── SESSION MANAGEMENT ──
let sessionTimeout;

function resetSessionTimeout() {
  if (sessionTimeout) clearTimeout(sessionTimeout);
  if (localStorage.getItem('astral_session')) {
    sessionTimeout = setTimeout(() => {
      logout();
      showToast('❌ Session expired for security', 'error');
    }, CONFIG.sessionTimeout);
  }
}

// Activity listeners
document.addEventListener('click', resetSessionTimeout);
document.addEventListener('keypress', resetSessionTimeout);
document.addEventListener('mousemove', resetSessionTimeout);
document.addEventListener('scroll', resetSessionTimeout);

// Page visibility
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    resetSessionTimeout();
  }
});

// ── CURRENCY FORMATTER ──
function formatCurrency(amount) {
  return '₱' + amount.toLocaleString('en-PH', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

// ── DATE FORMATTER ──
function formatDate(date) {
  return new Date(date).toLocaleDateString('en-PH', { year: 'numeric', month: 'short', day: 'numeric' });
}

// ── UTILITY FUNCTIONS ──
function getColorForPlan(plan) {
  switch(plan) {
    case 'Basic': return 'linear-gradient(135deg, #e8ff47, #b8cc00)';
    case 'Premium': return 'linear-gradient(135deg, #47c4ff, #0080aa)';
    case 'VIP': return 'linear-gradient(135deg, #ff9999, #cc4444)';
    default: return 'linear-gradient(135deg, #6b6b80, #555577)';
  }
}

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

// ── VALIDATION ──
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^\d{10}$|^\+\d{1,3}\d{7,14}$/.test(phone);
}

function validateName(name) {
  return name.length >= 2 && name.length <= 100;
}
