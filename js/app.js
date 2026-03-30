// ── ASTRAL GYM APPLICATION LOGIC ──

// ── DATA MODEL ──
const appState = {
  members: [
    { id:'#0241', name:'Maria Santos', plan:'Basic', status:'Active', phone:'0917-111-2222', joined:'Mar 2024', expiry:'Jan 31, 2026', att:85, avatar:'MS', color:'linear-gradient(135deg,#e8ff47,#b8cc00)' },
    { id:'#0238', name:'Carlo Reyes', plan:'Premium', status:'Active', phone:'0918-222-3333', joined:'Jun 2024', expiry:'Feb 14, 2026', att:70, avatar:'CR', color:'linear-gradient(135deg,#47c4ff,#0080aa)' },
    { id:'#0235', name:'Ana Lim', plan:'Premium', status:'Expiring', phone:'0919-333-4444', joined:'Jan 2024', expiry:'Jan 03, 2026', att:30, avatar:'AL', color:'linear-gradient(135deg,#ff9999,#cc4444)' },
    { id:'#0248', name:'Derek Cruz', plan:'VIP', status:'Active', phone:'0920-444-5555', joined:'Dec 2025', expiry:'Dec 28, 2026', att:60, avatar:'DC', color:'linear-gradient(135deg,#47ff9b,#00aa55)' },
    { id:'#0219', name:'Romel Bautista', plan:'Basic', status:'Expiring', phone:'0921-555-6666', joined:'Feb 2024', expiry:'Jan 01, 2026', att:20, avatar:'RB', color:'linear-gradient(135deg,#cc99ff,#7755aa)' },
    { id:'#0207', name:'Lena Pascual', plan:'Premium', status:'Active', phone:'0922-666-7777', joined:'Jul 2024', expiry:'Jan 05, 2026', att:78, avatar:'LP', color:'linear-gradient(135deg,#ff9999,#aa4444)' },
    { id:'#0187', name:'Gina Torres', plan:'Basic', status:'Expired', phone:'0923-777-8888', joined:'Apr 2023', expiry:'Dec 25, 2025', att:45, avatar:'GT', color:'linear-gradient(135deg,#aaaaaa,#555555)' },
    { id:'#0198', name:'Jun Mendiola', plan:'VIP', status:'Active', phone:'0924-888-9999', joined:'Aug 2024', expiry:'Aug 30, 2026', att:50, avatar:'JM', color:'linear-gradient(135deg,#ffcc47,#cc9900)' },
    { id:'#0230', name:'Ben Marasigan', plan:'Premium', status:'Active', phone:'0925-999-0000', joined:'Oct 2024', expiry:'Oct 15, 2026', att:65, avatar:'BM', color:'linear-gradient(135deg,#ffcc47,#cc9900)' },
  ],
  transactions: [
    { id:'#TXN-2248', member:'Derek Cruz', type:'VIP Membership', amount:5000, method:'GCash', date:'Dec 28, 2025', status:'Paid' },
    { id:'#TXN-2247', member:'Carlo Reyes', type:'Renewal', amount:2500, method:'Maya', date:'Dec 27, 2025', status:'Paid' },
    { id:'#TXN-2246', member:'Rina Dela Cruz', type:'Walk-in', amount:150, method:'Cash', date:'Dec 27, 2025', status:'Paid' },
    { id:'#TXN-2245', member:'Ben Marasigan', type:'Premium', amount:2000, method:'GCash', date:'Dec 26, 2025', status:'Pending' },
  ],
  attendance: [],
  currentPage: 'dashboard',
};

// ── NAVIGATION ──
function navigate(page, el) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  
  const pageEl = document.getElementById('page-' + page);
  if (pageEl) {
    pageEl.classList.add('active');
    appState.currentPage = page;
  }
  
  if (el) el.classList.add('active');
  
  const titles = {
    dashboard: 'DASHBOARD',
    members: 'MEMBERS',
    sales: 'SALES & PAYMENTS',
    reminders: 'AI REMINDERS',
    attendance: 'ATTENDANCE',
    reports: 'REPORTS'
  };
  
  const titleEl = document.getElementById('topbar-title');
  if (titleEl) titleEl.textContent = titles[page] || page.toUpperCase();
  
  // Render page content
  if (page === 'members') renderMembersTable(appState.members);
}

// ── MEMBER TABLE RENDERING ──
function renderMembersTable(data) {
  const tbody = document.getElementById('members-tbody');
  if (!tbody) return;
  
  if (!data || data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center;padding:40px 16px;color:var(--muted)">No members found. Try adjusting filters or add a new member.</td></tr>`;
    return;
  }
  
  tbody.innerHTML = data.map(m => {
    const statusClass = m.status === 'Active' ? 'badge-active' : m.status === 'Expiring' ? 'badge-expiring' : 'badge-expired';
    const planClass = m.plan === 'Basic' ? 'badge-basic' : m.plan === 'Premium' ? 'badge-premium' : 'badge-vip';
    const barColor = m.att >= 60 ? '' : m.att >= 40 ? 'blue' : 'red';
    
    return `<tr>
      <td><div class="member-cell"><div class="member-avatar" style="background:${m.color}" title="${m.name}">${m.avatar}</div><div><div style="font-weight:600">${m.name}</div><div style="font-size:11px;color:var(--muted)">${m.id}</div></div></div></td>
      <td><span class="badge ${planClass}">${m.plan}</span></td>
      <td><span class="badge ${statusClass}">${m.status}</span></td>
      <td style="font-family:'Space Mono',monospace;font-size:11px;color:var(--muted)">${m.phone}</td>
      <td style="font-size:11px;color:var(--muted)">${m.joined}</td>
      <td style="font-family:'Space Mono',monospace;font-size:11px;${m.status==='Expiring'?'color:var(--accent2)':''}">${m.expiry}</td>
      <td><div style="display:flex;align-items:center;gap:8px"><div class="progress-bar" style="width:70px;flex:none"><div class="progress-fill ${barColor}" style="width:${m.att}%"></div></div><span style="font-size:11px;color:var(--muted)">${m.att}%</span></div></td>
      <td style="display:flex;gap:4px;padding:8px 16px">
        <button class="btn btn-ghost btn-sm" onclick="viewMember('${m.name}')">View</button>
        <button class="btn btn-danger btn-sm" onclick="editMember('${m.name}')">Edit</button>
      </td>
    </tr>`;
  }).join('');
}

// ── MEMBER FILTERING ──
function filterMembers(plan) {
  const filtered = plan ? appState.members.filter(m => m.plan === plan) : appState.members;
  renderMembersTable(filtered);
}

// ── SEARCH ──
function handleSearch(val) {
  const normalized = val.toLowerCase().trim();
  
  if (!normalized) {
    if (appState.currentPage === 'members') {
      renderMembersTable(appState.members);
    }
    return;
  }
  
  const filtered = appState.members.filter(m => 
    m.name.toLowerCase().includes(normalized) || 
    m.id.includes(val) ||
    m.phone.includes(val)
  );
  
  if (appState.currentPage === 'members') {
    renderMembersTable(filtered);
  }
}

// ── MODAL MANAGEMENT ──
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('open');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('open');
}

// Close modal when clicking overlay
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', function(e) {
      if(e.target === this) this.classList.remove('open');
    });
  });
});

// ── MEMBER OPERATIONS ──
function viewMember(name) {
  const m = appState.members.find(x => x.name === name);
  if (!m) return;
  
  document.getElementById('view-modal-name').textContent = name;
  const statusClass = m.status === 'Active' ? 'badge-active' : m.status === 'Expiring' ? 'badge-expiring' : 'badge-expired';
  const planClass = m.plan === 'Basic' ? 'badge-basic' : m.plan === 'Premium' ? 'badge-premium' : 'badge-vip';
  
  document.getElementById('view-modal-body').innerHTML = `
    <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;padding:16px;background:var(--surface2);border-radius:10px;border:1px solid var(--border)">
      <div class="member-avatar" style="width:54px;height:54px;font-size:18px;background:${m.color}">${m.avatar}</div>
      <div style="flex:1">
        <div style="font-family:'Bebas Neue',sans-serif;font-size:22px;letter-spacing:1px">${m.name}</div>
        <div style="font-family:'Space Mono',monospace;font-size:11px;color:var(--muted)">${m.id} · Joined ${m.joined}</div>
      </div>
      <span class="badge ${statusClass}">${m.status}</span>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px;">
      <div style="background:var(--surface2);border-radius:8px;padding:12px;border:1px solid var(--border)">
        <div style="font-family:'Space Mono',monospace;font-size:9px;color:var(--muted);margin-bottom:4px">PLAN</div>
        <div><span class="badge ${planClass}">${m.plan}</span></div>
      </div>
      <div style="background:var(--surface2);border-radius:8px;padding:12px;border:1px solid var(--border)">
        <div style="font-family:'Space Mono',monospace;font-size:9px;color:var(--muted);margin-bottom:4px">EXPIRY</div>
        <div style="font-size:13px;font-weight:600;${m.status==='Expiring'?'color:var(--accent2)':''}">${m.expiry}</div>
      </div>
      <div style="background:var(--surface2);border-radius:8px;padding:12px;border:1px solid var(--border)">
        <div style="font-family:'Space Mono',monospace;font-size:9px;color:var(--muted);margin-bottom:4px">PHONE</div>
        <div style="font-size:13px">${m.phone}</div>
      </div>
      <div style="background:var(--surface2);border-radius:8px;padding:12px;border:1px solid var(--border)">
        <div style="font-family:'Space Mono',monospace;font-size:9px;color:var(--muted);margin-bottom:4px">ATTENDANCE</div>
        <div style="display:flex;align-items:center;gap:8px"><div class="progress-bar" style="flex:1"><div class="progress-fill ${m.att>=60?'green':m.att>=40?'':'red'}" style="width:${m.att}%"></div></div><span style="font-size:12px">${m.att}%</span></div>
      </div>
    </div>
    <div style="background:var(--surface2);border-radius:8px;padding:12px;border:1px solid var(--border)">
      <div style="font-family:'Space Mono',monospace;font-size:9px;color:var(--muted);margin-bottom:8px">RECENT PAYMENTS</div>
      <div style="font-size:12.5px;color:var(--muted);text-align:center;padding:8px 0">Payment history will display here</div>
    </div>`;
  
  openModal('view-member-modal');
}

function editMember(name) {
  const m = appState.members.find(x => x.name === name);
  if (!m) return;
  showToast(`✏️ Editing ${name} (coming soon)`, 'success');
}

function addMember() {
  const form = document.querySelector('.modal-body');
  const firstName = form.querySelector('[placeholder="Juan"]').value.trim();
  const lastName = form.querySelector('[placeholder="Dela Cruz"]').value.trim();
  const phone = form.querySelector('[placeholder="09XX-XXX-XXXX"]').value.trim();
  const email = form.querySelector('[placeholder="juan@email.com"]').value.trim();
  
  if (!firstName || !lastName) {
    showToast('❌ Please enter first and last name', 'error');
    return;
  }
  
  if (!phone || phone.length < 10) {
    showToast('❌ Please enter valid phone number', 'error');
    return;
  }
  
  if (email && !email.includes('@')) {
    showToast('❌ Please enter valid email', 'error');
    return;
  }
  
  closeModal('add-member-modal');
  showToast('✅ New member registered: ' + firstName + ' ' + lastName, 'success');
  
  // Reset form
  document.querySelector('#add-member-modal .modal-body').querySelectorAll('input, select, textarea').forEach(el => {
    el.value = '';
  });
}

function recordPayment() {
  const modal = document.querySelector('#add-payment-modal');
  const memberSelect = modal.querySelector('select');
  const amount = modal.querySelector('[placeholder="0.00"]').value;
  
  if (!memberSelect.value || memberSelect.value.includes('Search')) {
    showToast('❌ Please select a member', 'error');
    return;
  }
  
  if (!amount || parseFloat(amount) <= 0) {
    showToast('❌ Please enter valid amount', 'error');
    return;
  }
  
  closeModal('add-payment-modal');
  showToast('✅ Payment recorded — ₱' + formatCurrency(parseFloat(amount)), 'success');
}

function scheduleReminder() {
  const schedTime = document.querySelector('#schedule-modal [type="datetime-local"]').value;
  
  if (!schedTime) {
    showToast('❌ Please select scheduled time', 'error');
    return;
  }
  
  closeModal('schedule-modal');
  showToast('✅ Reminder scheduled successfully', 'success');
}

function checkIn() {
  const input = document.querySelector('#checkin-modal input').value.trim();
  
  if (!input) {
    showToast('❌ Please enter member ID or name', 'error');
    return;
  }
  
  const member = appState.members.find(m => 
    m.name.toLowerCase().includes(input.toLowerCase()) || 
    m.id.includes(input)
  );
  
  if (!member) {
    showToast('❌ Member not found', 'error');
    return;
  }
  
  closeModal('checkin-modal');
  showToast('✅ ' + member.name + ' checked in successfully', 'success');
}

// ── TOAST NOTIFICATIONS ──
function showToast(msg, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  
  const icon = type === 'success' ? '✅' : '❌';
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'toastIn 0.25s ease reverse';
    setTimeout(() => toast.remove(), 250);
  }, 3000);
}

// ── CONFIRM DIALOG ──
function confirm(title, message, onConfirm) {
  const id = 'confirm-' + Date.now();
  const html = `<div class="modal-overlay open" id="${id}">
    <div class="modal" style="width:420px">
      <div class="modal-header">
        <div class="modal-title">${title}</div>
      </div>
      <div class="modal-body">
        <p style="font-size:13.5px;line-height:1.5;color:var(--text)">${message}</p>
      </div>
      <div class="modal-footer">
        <button class="btn btn-ghost" onclick="document.getElementById('${id}').remove()">Cancel</button>
        <button class="btn btn-accent" onclick="document.getElementById('${id}').remove();(${onConfirm.toString()})()">Confirm</button>
      </div>
    </div>
  </div>`;
  
  document.body.insertAdjacentHTML('beforeend', html);
  const confirmEl = document.getElementById(id);
  confirmEl.addEventListener('click', function(e) {
    if(e.target === this) this.remove();
  });
}

// ── LOGOUT ──
function logout() {
  confirm('Sign Out', 'Are you sure you want to sign out?', function() {
    localStorage.removeItem('astral_session');
    showToast('✅ Signed out successfully', 'success');
    setTimeout(() => {
      location.reload();
    }, 500);
  });
}

// ── AUTHENTICATION ──
function login(e) {
  if (e) e.preventDefault();
  
  const username = document.getElementById('login-username')?.value || '';
  const password = document.getElementById('login-password')?.value || '';
  
  if (username === 'admin' && password === 'password') {
    localStorage.setItem('astral_session', JSON.stringify({ username, timestamp: Date.now() }));
    const loginPage = document.getElementById('login-page');
    const appPage = document.getElementById('app-page');
    
    if (loginPage) loginPage.style.display = 'none';
    if (appPage) appPage.style.display = 'block';
    
    showToast('✅ Welcome back, ' + username + '!', 'success');
  } else {
    showToast('❌ Invalid credentials. Use: admin / password', 'error');
  }
}

function checkAuth() {
  const session = localStorage.getItem('astral_session');
  const loginPage = document.getElementById('login-page');
  const appPage = document.getElementById('app-page');
  
  if (session && loginPage && appPage) {
    loginPage.style.display = 'none';
    appPage.style.display = 'block';
  } else if (loginPage && appPage) {
    loginPage.style.display = 'flex';
    appPage.style.display = 'none';
  }
}

// ── THEME MANAGEMENT ──
function toggleTheme() {
  const isDark = document.body.classList.toggle('light-mode');
  localStorage.setItem('astral_theme', isDark ? 'light' : 'dark');
  const btn = document.querySelector('.theme-toggle');
  if (btn) btn.textContent = isDark ? '🌞' : '🌙';
}

function initTheme() {
  const theme = localStorage.getItem('astral_theme') || 'dark';
  if (theme === 'light') {
    document.body.classList.add('light-mode');
    const btn = document.querySelector('.theme-toggle');
    if (btn) btn.textContent = '🌞';
  }
}

// ── EXPORT FUNCTIONS ──
function exportMembers() {
  const headers = ['ID', 'Name', 'Plan', 'Status', 'Phone', 'Joined', 'Expiry', 'Attendance'];
  const rows = appState.members.map(m => [m.id, m.name, m.plan, m.status, m.phone, m.joined, m.expiry, m.att + '%']);
  
  let csv = headers.join(',') + '\n';
  rows.forEach(row => {
    csv += row.map(cell => `"${cell}"`).join(',') + '\n';
  });
  
  downloadFile(csv, 'members_' + Date.now() + '.csv', 'text/csv');
  showToast('✅ Members exported successfully', 'success');
}

function exportTransactions() {
  const headers = ['Transaction ID', 'Member', 'Type', 'Amount', 'Method', 'Date', 'Status'];
  const rows = appState.transactions.map(t => [t.id, t.member, t.type, '₱' + t.amount, t.method, t.date, t.status]);
  
  let csv = headers.join(',') + '\n';
  rows.forEach(row => {
    csv += row.map(cell => `"${cell}"`).join(',') + '\n';
  });
  
  downloadFile(csv, 'transactions_' + Date.now() + '.csv', 'text/csv');
  showToast('✅ Transactions exported successfully', 'success');
}

function exportAttendance() {
  const headers = ['Member', 'Plan', 'Check-in Time', 'Status'];
  const rows = [
    ['Maria Santos', 'Basic', '6:02 AM', 'In'],
    ['Carlo Reyes', 'Premium', '6:45 AM', 'In'],
    ['Derek Cruz', 'VIP', '7:10 AM', 'In'],
    ['Lena Pascual', 'Premium', '8:30 AM', 'Out'],
    ['Rosa Buendia', 'Basic', '9:15 AM', 'In'],
    ['Ben Marasigan', 'Premium', '11:00 AM', 'In'],
  ];
  
  let csv = headers.join(',') + '\n';
  rows.forEach(row => {
    csv += row.map(cell => `"${cell}"`).join(',') + '\n';
  });
  
  downloadFile(csv, 'attendance_' + Date.now() + '.csv', 'text/csv');
  showToast('✅ Attendance exported successfully', 'success');
}

function exportDashboard() {
  const timestamp = new Date().toLocaleString('en-PH');
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5;">
      <h1>ASTRAL GYM - DASHBOARD REPORT</h1>
      <p>Generated: ${timestamp}</p>
      <hr>
      <h2>Key Metrics</h2>
      <table border="1" cellpadding="10" style="width:100%; border-collapse: collapse;">
        <tr style="background: #ddd;"><th>Metric</th><th>Value</th></tr>
        <tr><td>Total Members</td><td>${appState.members.length}</td></tr>
        <tr><td>Active Plans</td><td>${appState.members.filter(m => m.status === 'Active').length}</td></tr>
        <tr><td>Expiring Soon</td><td>${appState.members.filter(m => m.status === 'Expiring').length}</td></tr>
        <tr><td>Total Revenue</td><td>₱${appState.transactions.reduce((sum, t) => sum + t.amount, 0)}</td></tr>
      </table>
    </div>
  `;
  
  const opt = {
    margin: 10,
    filename: 'dashboard_' + Date.now() + '.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
  };
  
  if (window.html2pdf) {
    window.html2pdf().set(opt).from(html).save();
    showToast('✅ Dashboard exported as PDF', 'success');
  } else {
    showToast('❌ PDF export library not loaded', 'error');
  }
}

// ── HELPER FUNCTIONS ──
function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  window.URL.revokeObjectURL(url);
}

// ── DATA PERSISTENCE ──
function saveData() {
  localStorage.setItem('astral_members', JSON.stringify(appState.members));
  localStorage.setItem('astral_transactions', JSON.stringify(appState.transactions));
}

function loadData() {
  const stored = localStorage.getItem('astral_members');
  if (stored) {
    try {
      appState.members = JSON.parse(stored);
    } catch (e) {
      Logger.error('Failed to load members:', e);
    }
  }
  
  const storedTx = localStorage.getItem('astral_transactions');
  if (storedTx) {
    try {
      appState.transactions = JSON.parse(storedTx);
    } catch (e) {
      Logger.error('Failed to load transactions:', e);
    }
  }
}

// Auto-save on beforeunload
window.addEventListener('beforeunload', saveData);

// ── BACKUP & RESTORE ──
function backupData() {
  const backup = {
    members: appState.members,
    transactions: appState.transactions,
    timestamp: new Date().toISOString(),
    version: '2.0'
  };
  
  downloadFile(JSON.stringify(backup, null, 2), 'astral_backup_' + Date.now() + '.json', 'application/json');
  showToast('✅ Backup created successfully', 'success');
}

function restoreData(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const backup = JSON.parse(e.target.result);
      confirm('Restore Backup', 'Restore data from backup? This will replace current data.', () => {
        appState.members = backup.members || appState.members;
        appState.transactions = backup.transactions || appState.transactions;
        saveData();
        renderMembersTable(appState.members);
        showToast('✅ Data restored successfully', 'success');
      });
    } catch (err) {
      showToast('❌ Invalid backup file', 'error');
    }
  };
  reader.readAsText(file);
}

// ── KEYBOARD SHORTCUTS ──
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey) {
    if (e.key === 's') {
      e.preventDefault();
      saveData();
      showToast('✅ Data saved', 'success');
    }
    if (e.key === 'e') {
      e.preventDefault();
      exportMembers();
    }
    if (e.key === 'p') {
      e.preventDefault();
      printReport('Astral Gym Report');
    }
    if (e.key === '/') {
      e.preventDefault();
      const searchEl = document.getElementById('global-search');
      if (searchEl) searchEl.focus();
    }
  }
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
  }
});

// ── INITIALIZATION ──
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  checkAuth();
  initTheme();
  renderMembersTable(appState.members);
  
  // Set current date
  const dateEl = document.getElementById('topbar-date');
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString('en-PH', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
});

// ── SESSION MANAGEMENT (from config.js) ──
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

// Track user activity
['click', 'keypress', 'mousemove', 'scroll'].forEach(event => {
  document.addEventListener(event, resetSessionTimeout, true);
});

// Handle page visibility
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (sessionTimeout) clearTimeout(sessionTimeout);
  } else {
    resetSessionTimeout();
  }
});

// Initial session setup
resetSessionTimeout();
