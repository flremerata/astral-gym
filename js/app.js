// Main application logic for Astral Gym System

function login(event) {
  event.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  
  if (username === 'admin' && password === 'password') {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('app-page').style.display = 'block';
    updateTopbarDate();
  } else {
    alert('Invalid credentials');
  }
}

function logout() {
  document.getElementById('app-page').style.display = 'none';
  document.getElementById('login-page').style.display = 'block';
  document.getElementById('login-username').value = '';
  document.getElementById('login-password').value = '';
}

function navigate(page, element) {
  document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
  element.classList.add('active');
  document.getElementById('topbar-title').textContent = page.toUpperCase();
}

function toggleTheme() {
  document.body.classList.toggle('dark-theme');
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.style.display = 'block';
}

function handleSearch(value) {
  console.log('Searching for:', value);
}

function updateTopbarDate() {
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  document.getElementById('topbar-date').textContent = today;
}

document.addEventListener('DOMContentLoaded', updateTopbarDate);
