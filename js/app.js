// Main application logic for Astral Gym System

function login(event) {
  event.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  
  if (username === DEMO_USER.username && password === DEMO_USER.password) {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('app-page').style.display = 'block';
    loadAppContent();
    updateTopbarDate();
  } else {
    alert('Invalid credentials. Demo: admin / password');
  }
}

function loadAppContent() {
  // Load the full app HTML content
  const appContent = `
    <aside class="sidebar">
      <div class="logo-block">
        <div class="logo-top">ASTRAL</div>
        <div class="logo-sub">Gym Management · v2.0</div>
      </div>
      <nav class="nav">
        <div class="nav-label">Main</div>
        <div class="nav-item active" onclick="navigate('dashboard',this)">
          <span class="icon">⚡</span> Dashboard
        </div>
        <div class="nav-item" onclick="navigate('members',this)">
          <span class="icon">👥</span> Members
        </div>
        <div class="nav-item" onclick="navigate('sales',this)">
          <span class="icon">💳</span> Sales & Payments
        </div>
        <div class="nav-label">Tools</div>
        <div class="nav-item" onclick="navigate('reminders',this)">
          <span class="icon">🤖</span> AI Reminders
          <span class="nav-badge">5</span>
        </div>
        <div class="nav-item" onclick="navigate('attendance',this)">
          <span class="icon">📋</span> Attendance
        </div>
        <div class="nav-item" onclick="navigate('reports',this)">
          <span class="icon">📊</span> Reports
        </div>
      </nav>
      <div class="sidebar-footer">
        <div class="staff-card">
          <div class="staff-avatar">JR</div>
          <div>
            <div class="staff-name">James Reyes</div>
            <div class="staff-role">Manager · Admin</div>
          </div>
        </div>
      </div>
    </aside>
    <main class="main">
      <div class="topbar">
        <div>
          <span class="topbar-title" id="topbar-title">DASHBOARD</span>
          <span class="topbar-date" id="topbar-date"></span>
        </div>
        <div class="topbar-right">
          <input type="text" class="search-bar" placeholder="Search members, transactions…" oninput="handleSearch(this.value)">
          <button class="btn btn-accent" onclick="openModal('add-member-modal')">+ New Member</button>
        </div>
      </div>
      <div class="page active" id="page-dashboard" style="padding:32px">
        <div class="section-header">
          <div class="section-title">Dashboard</div>
        </div>
        <div style="text-align:center;padding:40px;color:var(--muted)">
          <p>Full Astral Gym Management System</p>
          <p style="font-size:12px;margin-top:8px">v2.0 · Ready for Vercel deployment</p>
        </div>
      </div>
    </main>
  `;
  document.getElementById('app-page').innerHTML = appContent;
}

function logout() {
  document.getElementById('app-page').style.display = 'none';
  document.getElementById('login-page').style.display = 'block';
  document.getElementById('login-username').value = '';
  document.getElementById('login-password').value = '';
}

function navigate(page, element) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  if (element) element.classList.add('active');
  document.getElementById('topbar-title').textContent = page.toUpperCase();
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = 'block';
}

function handleSearch(value) {
  console.log('Searching for:', value);
}

function updateTopbarDate() {
  const today = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const dateEl = document.getElementById('topbar-date');
  if (dateEl) dateEl.textContent = today;
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  console.log('Astral Gym System v' + CONFIG.version + ' loaded');
});
