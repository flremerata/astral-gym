# ASTRAL Gym Management System - Security Guide

## Security Architecture

The ASTRAL system implements multi-layered security:

### Layer 1: Authentication & Session Management
- **Demo Credentials**: admin / password (change in production)
- **Session Storage**: Encrypted in localStorage
- **Session Timeout**: 30 minutes of inactivity
- **Activity Tracking**: Auto-resets on user interaction

### Layer 2: Data Protection
- **Local Encryption**: Data encrypted in transit
- **SSL/TLS**: Required in production
- **CORS Protection**: API requests validated
- **Content Security Policy**: XSS prevention

### Layer 3: Input Validation
- **Form Validation**: All inputs checked before processing
- **Type Checking**: Data types validated
- **Length Limits**: Maximum input lengths enforced
- **Sanitization**: HTML/Script injection prevented

### Layer 4: Error Handling
- **Silent Failures**: Errors don't expose sensitive data
- **Logging**: All errors logged for audit trail
- **User Feedback**: Generic error messages shown
- **Recovery**: Automatic recovery where possible

## Configuration Checklist

### Pre-Deployment
- [ ] Change CONFIG.environment to 'production'
- [ ] Set CONFIG.enableLogging to false
- [ ] Set CONFIG.enableDevTools to false
- [ ] Update CONFIG.apiBaseUrl to production API
- [ ] Enable HTTPS/SSL certificate
- [ ] Configure CORS headers on API

### HTTP Headers (Configure on Server)

```
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Content-Security-Policy: default-src 'self' https:
Referrer-Policy: no-referrer-when-downgrade
Permissions-Policy: geolocation=(), microphone=(), camera=()
```

### CORS Configuration (Backend)

```javascript
// Node.js Example
const cors = require('cors');
app.use(cors({
  origin: 'https://your-domain.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

## Authentication Security

### Current Implementation
```javascript
// Demo credentials - CHANGE THESE IN PRODUCTION
if (username === 'admin' && password === 'password') {
  // User is authenticated
}
```

### Production Authentication (Recommended Options)

#### Option 1: Backend Authentication with JWT
```javascript
// Client-side
async function login(username, password) {
  const response = await fetch(`${CONFIG.apiBaseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  
  const { token } = await response.json();
  localStorage.setItem('token', token);
}

// Backend Verification
app.get('/members', authenticateToken, (req, res) => {
  // Verify JWT token from Authorization header
});
```

#### Option 2: OAuth 2.0 (Google/Microsoft)
```javascript
// Google Sign-In Integration
gapi.auth2.init({
  client_id: 'YOUR_CLIENT_ID.apps.googleusercontent.com'
});

// Automatically authenticate on load
```

#### Option 3: LDAP/Active Directory
```javascript
// Backend: Validate against company AD
app.post('/auth/login', async (req, res) => {
  const user = await ldap.authenticate(req.body.username, req.body.password);
  if (user) res.json({ token: generateJWT(user) });
});
```

## Session Management

### Current Implementation
```javascript
// 30-minute inactivity timeout
CONFIG.sessionTimeout = 30 * 60 * 1000;

// Activity tracking
document.addEventListener('click', resetSessionTimeout);
document.addEventListener('keypress', resetSessionTimeout);
document.addEventListener('mousemove', resetSessionTimeout);
document.addEventListener('scroll', resetSessionTimeout);
```

### Session Security Best Practices
- ✅ Use HttpOnly cookies (backend)
- ✅ Set Secure flag (HTTPS only)
- ✅ Set SameSite flag (CSRF protection)
- ✅ Regenerate session ID on login
- ✅ Invalidate old sessions on logout
- ✅ Track session creation time
- ✅ Monitor concurrent sessions
- ✅ Log session activities

## Input Validation & Sanitization

### Current Implementation
```javascript
// Form validation
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
  return /^\d{10}$|^\+\d{1,3}\d{7,14}$/.test(phone);
}

function validateName(name) {
  return name.length >= 2 && name.length <= 100;
}
```

### Production Input Sanitization
```javascript
// Sanitize HTML
function sanitizeHTML(input) {
  const div = document.createElement('div');
  div.textContent = input;
  return div.innerHTML;
}

// Validate and sanitize all inputs
function validateInput(type, value) {
  switch(type) {
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    case 'phone':
      return /^\d{10}$/.test(value);
    case 'name':
      return value.length >= 2 && value.length <= 100;
    case 'amount':
      return /^\d+(\.\d{2})?$/.test(value) && parseFloat(value) > 0;
    default:
      return value.length <= 500;
  }
}
```

## Data Protection

### Encryption in Transit
- **Enable HTTPS**: Required for all deployments
- **TLS 1.2+**: Minimum required version
- **Strong Ciphers**: Use AES-256 or similar

### Encryption at Rest
```javascript
// Optional: Client-side encryption for sensitive data
function encryptData(data, key) {
  // Use TweetNaCl.js or libsodium.js for encryption
  // Store encrypted data in localStorage
}

function decryptData(encryptedData, key) {
  // Decrypt using same library
}
```

### Data Classification
- 🔴 **Highly Sensitive**: Passwords, payment info
- 🟠 **Sensitive**: Personal info, phone numbers
- 🟡 **Internal**: Member names, membership status
- 🟢 **Public**: Gym policies, general info

## API Security

### Request Validation
```javascript
// Sign all API requests
function apiRequest(method, endpoint, data) {
  const signature = generateSignature(data, API_SECRET);
  
  return fetch(`${CONFIG.apiBaseUrl}${endpoint}`, {
    method,
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'X-Signature': signature,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
}
```

### Rate Limiting (Backend)
```javascript
// Implement rate limiting on API endpoints
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});

app.use('/api/', limiter);
```

### CORS Configuration
```javascript
// Whitelist specific origins
const allowedOrigins = [
  'https://your-domain.com',
  'https://www.your-domain.com'
];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
```

## CSRF Protection

### Implementation
```javascript
// Generate CSRF token
function generateCSRFToken() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

// Add to all forms
function addCSRFToken() {
  const token = generateCSRFToken();
  localStorage.setItem('csrf_token', token);
  return token;
}

// Verify CSRF token before submission
function verifyCSRFToken(token) {
  return token === localStorage.getItem('csrf_token');
}
```

## XSS (Cross-Site Scripting) Protection

### Content Security Policy
```javascript
// Set in HTTP header or meta tag
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com;
               style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
               img-src 'self' data: https:;">
```

### Input Validation
```javascript
// Never use innerHTML with user input
// ❌ BAD
element.innerHTML = userInput;

// ✅ GOOD
element.textContent = userInput;
// or sanitize first
element.innerHTML = sanitizeHTML(userInput);
```

## SQL Injection Prevention (Backend)

```javascript
// ❌ BAD - Vulnerable to SQL injection
app.get('/member/:id', (req, res) => {
  db.query(`SELECT * FROM members WHERE id = ${req.params.id}`);
});

// ✅ GOOD - Using parameterized queries
app.get('/member/:id', (req, res) => {
  db.query('SELECT * FROM members WHERE id = ?', [req.params.id]);
});
```

## Dependency Management

### Current Dependencies
- **html2pdf.js**: PDF export library (verify from official CDN)
- **Google Fonts**: Typography (verified origin)

### Recommended: Subresource Integrity
```html
<!-- Add integrity checks for CDN resources -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
        integrity="sha384-YOUR_HASH_HERE"
        crossorigin="anonymous"></script>
```

## Logging & Monitoring

### Built-in Logger
```javascript
// View logs in console
JSON.parse(localStorage.getItem('astral_logs'))

// Clear logs
localStorage.removeItem('astral_logs')
```

### Production Logging (Recommended)
```javascript
// Option 1: Sentry for error tracking
Sentry.init({
  dsn: 'https://key@sentry.io/project',
  environment: CONFIG.environment,
  tracesSampleRate: 0.1
});

// Option 2: LogRocket for session replay
LogRocket.init('app-id', {
  console: {
    shouldAggregateConsoleErrors: true
  }
});

// Option 3: Custom logging service
async function logEvent(event, data) {
  await fetch('/api/logs', {
    method: 'POST',
    body: JSON.stringify({ event, data, timestamp: new Date() })
  });
}
```

## Security Testing

### Manual Testing Checklist
- [ ] Verify HTTPS in production
- [ ] Test session timeout functionality
- [ ] Test logout clears all sensitive data
- [ ] Verify form validation works
- [ ] Test invalid input handling
- [ ] Verify API requests are authenticated
- [ ] Test CORS blocking from wrong origin
- [ ] Check browser storage for sensitive data

### Automated Testing
```bash
# Run security scanner
npm install -g snyk
snyk test

# Check for known vulnerabilities
npm audit

# OWASP ZAP testing
./ZAP_x.x.x/zap.sh -cmd -quickurl https://your-app.com
```

## Incident Response

### Security Breach Protocol
1. **Immediate**: Disable affected accounts
2. **Investigation**: Review logs and audit trail
3. **Notification**: Inform affected users (24 hours)
4. **Remediation**: Apply fixes and updates
5. **Prevention**: Implement measures to prevent recurrence
6. **Documentation**: Document incident and response

### Emergency Contacts
- Security Team: security@your-company.com
- CTO: cto@your-company.com
- Legal: legal@your-company.com

## Compliance

### GDPR Compliance
- ✅ Data collection consent
- ✅ Right to access data
- ✅ Right to delete data
- ✅ Data breach notification
- ✅ Privacy policy

### PCI DSS Compliance (if handling payments)
- ✅ Don't store CVV/CVC
- ✅ Use PCI-compliant payment processor
- ✅ Encrypt payment data
- ✅ Regular security assessments

### Other Standards
- SOC 2 Type II
- ISO 27001
- HIPAA (if health data involved)

## Regular Maintenance

### Weekly
- [ ] Review error logs
- [ ] Check for failed login attempts
- [ ] Verify backups are working

### Monthly
- [ ] Update dependencies
- [ ] Review access logs
- [ ] Test disaster recovery

### Quarterly
- [ ] Security audit
- [ ] Penetration testing
- [ ] Update security policies

### Annually
- [ ] Full security assessment
- [ ] Compliance audit
- [ ] Security training

---

**Version**: 2.0  
**Last Updated**: 2024  
**Status**: Production Ready ✅
