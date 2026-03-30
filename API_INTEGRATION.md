# 🔌 API Integration Guide

## Backend Integration Setup

### Step 1: Update API Base URL
```javascript
// In astral_gym_system.html, around line 2187:
const api = new APIService('https://your-api-domain.com/api');
```

### Step 2: Implement Backend Endpoints

#### Authentication Endpoints

**POST /api/auth/login**
```json
Request:
{
  "username": "admin",
  "password": "password"
}

Response:
{
  "success": true,
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "username": "admin",
    "role": "manager"
  }
}
```

**POST /api/auth/logout**
```json
Response:
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

#### Member Endpoints

**GET /api/members**
```json
Response:
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Maria Santos",
      "plan": "Basic",
      "status": "Active",
      "phone": "0917-111-2222",
      "joined": "Mar 2024",
      "expiry": "Jan 31, 2026",
      "att": 85,
      "avatar": "MS"
    }
  ]
}
```

**GET /api/members/:id**
```json
Response:
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Maria Santos",
    "plan": "Basic",
    "status": "Active",
    "phone": "0917-111-2222",
    "email": "maria@email.com",
    "joined": "2024-03-15",
    "expiry": "2026-01-31",
    "attendance": 85,
    "payments": [
      {
        "id": 1,
        "amount": 800,
        "date": "2024-03-15",
        "method": "GCash"
      }
    ]
  }
}
```

**POST /api/members**
```json
Request:
{
  "firstName": "Juan",
  "lastName": "Dela Cruz",
  "phone": "09XX-XXX-XXXX",
  "email": "juan@email.com",
  "plan": "Premium",
  "startDate": "2026-03-30",
  "duration": "1_month",
  "paymentMethod": "GCash"
}

Response:
{
  "success": true,
  "data": {
    "id": 249,
    "name": "Juan Dela Cruz",
    "plan": "Premium"
  }
}
```

**PUT /api/members/:id**
```json
Request:
{
  "phone": "09XX-XXX-XXXX",
  "plan": "Premium",
  "status": "Active"
}

Response:
{
  "success": true,
  "data": { /* updated member */ }
}
```

**DELETE /api/members/:id**
```json
Response:
{
  "success": true,
  "message": "Member deleted successfully"
}
```

---

#### Payment Endpoints

**POST /api/payments**
```json
Request:
{
  "memberId": 1,
  "type": "Membership",
  "amount": 2500,
  "method": "GCash",
  "referenceNo": "GCash-12345",
  "date": "2026-03-30"
}

Response:
{
  "success": true,
  "data": {
    "id": 2248,
    "transactionId": "#TXN-2248",
    "member": "Derek Cruz",
    "amount": 5000,
    "status": "Paid"
  }
}
```

**GET /api/payments**
```json
Response:
{
  "success": true,
  "data": [
    {
      "id": 2248,
      "transactionId": "#TXN-2248",
      "memberId": 10,
      "member": "Derek Cruz",
      "type": "VIP Membership",
      "amount": 5000,
      "method": "GCash",
      "date": "2025-12-28",
      "status": "Paid"
    }
  ]
}
```

**GET /api/payments/:id**
```json
Response:
{
  "success": true,
  "data": { /* payment details */ }
}
```

---

#### Attendance Endpoints

**POST /api/attendance/checkin**
```json
Request:
{
  "memberId": 1,
  "timestamp": "2026-03-30T06:02:00Z"
}

Response:
{
  "success": true,
  "data": {
    "memberId": 1,
    "member": "Maria Santos",
    "checkinTime": "6:02 AM",
    "date": "2026-03-30",
    "status": "checked_in"
  }
}
```

**GET /api/attendance?date=2026-03-30**
```json
Response:
{
  "success": true,
  "date": "2026-03-30",
  "totalCheckins": 34,
  "data": [
    {
      "memberId": 1,
      "member": "Maria Santos",
      "plan": "Basic",
      "checkinTime": "6:02 AM",
      "status": "In"
    }
  ]
}
```

**GET /api/attendance/member/:memberId**
```json
Response:
{
  "success": true,
  "member": "Maria Santos",
  "totalCheckins": 85,
  "attendanceRate": "85%",
  "recentCheckins": [
    { "date": "2026-03-30", "time": "6:02 AM" }
  ]
}
```

---

#### Reminder Endpoints

**POST /api/reminders/send**
```json
Request:
{
  "type": "renewal",
  "targetGroup": "expiring_7days",
  "method": "sms",
  "customMessage": null
}

Response:
{
  "success": true,
  "data": {
    "sent": 23,
    "failed": 0,
    "timestamp": "2026-03-30T10:00:00Z"
  }
}
```

**POST /api/reminders/schedule**
```json
Request:
{
  "type": "renewal",
  "targetGroup": "expiring_7days",
  "method": "sms",
  "scheduledTime": "2026-03-31T08:00:00Z",
  "customMessage": "Hi {name}! Your membership expires in {days} days."
}

Response:
{
  "success": true,
  "data": {
    "id": 1,
    "status": "scheduled",
    "scheduledTime": "2026-03-31T08:00:00Z"
  }
}
```

---

### Step 3: Enable WebSocket (Optional)

```javascript
class WebSocketService {
  constructor(url = 'ws://localhost:8000') {
    this.url = url;
    this.ws = null;
    this.reconnectAttempts = 0;
  }
  
  connect() {
    this.ws = new WebSocket(this.url);
    
    this.ws.onopen = () => {
      console.log('WebSocket connected');
      this.reconnectAttempts = 0;
    };
    
    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      notificationService.notify(data);
    };
    
    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
    
    this.ws.onclose = () => {
      this.reconnect();
    };
  }
  
  reconnect() {
    if (this.reconnectAttempts < 5) {
      this.reconnectAttempts++;
      setTimeout(() => this.connect(), 3000 * this.reconnectAttempts);
    }
  }
  
  send(data) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    }
  }
}

const wsService = new WebSocketService('ws://your-domain.com:8000');
wsService.connect();
```

---

### Step 4: Add Error Handling

```javascript
// Wrap API calls with error handling
async function safeAPICall(fn) {
  try {
    return await fn();
  } catch (error) {
    console.error('API Error:', error);
    showToast('❌ ' + (error.message || 'Request failed'), 'error');
    return null;
  }
}

// Usage:
const members = await safeAPICall(() => api.getMembers());
```

---

### Step 5: Sync with LocalStorage

```javascript
// Implement offline-first strategy
async function syncData() {
  const pendingRequests = JSON.parse(localStorage.getItem('pending_requests') || '[]');
  
  for (const request of pendingRequests) {
    try {
      await api.request(request.endpoint, request.method, request.data);
      // Remove from pending on success
      const updated = pendingRequests.filter(r => r.id !== request.id);
      localStorage.setItem('pending_requests', JSON.stringify(updated));
    } catch (error) {
      console.error('Sync error:', error);
    }
  }
}

// Check sync on app load
if (navigator.onLine) {
  syncData();
}

window.addEventListener('online', syncData);
```

---

## Example: Complete Setup

### 1. Backend Requirement (Node.js + Express)
```javascript
const express = require('express');
const app = express();

app.use(express.json());

// Authentication
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  // Validate credentials
  if (username === 'admin' && password === 'password') {
    res.json({ success: true, token: 'fake-jwt-token' });
  } else {
    res.status(401).json({ success: false });
  }
});

// Members
app.get('/api/members', (req, res) => {
  // Return members from database
  res.json({ success: true, data: [] });
});

app.listen(3000, () => console.log('API running on port 3000'));
```

### 2. Update Frontend
```javascript
const api = new APIService('http://localhost:3000/api');

// Test connection
async function testAPI() {
  const result = await api.login('admin', 'password');
  if (result.success) {
    localStorage.setItem('astral_token', result.token);
    console.log('✅ API connected successfully');
  }
}
```

### 3. Use in Application
```javascript
// Replace hardcoded members with API call
async function loadMembers() {
  const result = await api.getMembers();
  if (result.success) {
    members.length = 0;
    members.push(...result.data);
    renderMembersTable(members);
  }
}
```

---

## Security Considerations

✅ **HTTPS Only** - Always use HTTPS in production
✅ **JWT Tokens** - Implement JWT for authentication
✅ **CORS** - Configure proper CORS headers
✅ **Input Validation** - Validate all inputs server-side
✅ **Rate Limiting** - Implement rate limiting
✅ **SQL Injection** - Use parameterized queries
✅ **Data Encryption** - Encrypt sensitive data
✅ **Session Management** - Implement proper session timeout

---

## Testing

```javascript
// Test endpoints in console
async function testEndpoints() {
  console.log('Testing API endpoints...');
  
  const login = await api.login('admin', 'password');
  console.log('Login:', login);
  
  const members = await api.getMembers();
  console.log('Members:', members);
  
  const payments = await api.getPayments();
  console.log('Payments:', payments);
}

testEndpoints();
```

---

## Deployment

### Heroku
```bash
git init
git add .
git commit -m "Initial commit"
heroku create astral-gym-api
git push heroku main
```

### Firebase
```bash
firebase init
firebase deploy
```

### AWS
```bash
aws s3 cp . s3://astral-gym --recursive
```

---

## Support

For API issues:
1. Check logs in browser console
2. Verify endpoint URLs
3. Test CORS headers
4. Check authentication token
5. Verify data format

---

**Version**: 2.0
**Updated**: March 30, 2026
**Status**: Ready for Integration ✅
