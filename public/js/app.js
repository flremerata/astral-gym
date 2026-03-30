<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <meta name="description" content="Professional Gym Management System v2.0">
  <meta name="theme-color" content="#0a0a0f">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Astral Gym — Management System v2.0</title>
  <link rel="stylesheet" href="./css/styles.css">
</head>
<body>

<!-- LOGIN PAGE -->
<div id="login-page" class="login-container">
  <div class="login-box">
    <div class="logo-top">ASTRAL</div>
    <div class="logo-sub">Gym Management · v2.0</div>
    <form onsubmit="login(event)">
      <input type="text" placeholder="Username" id="login-username" required>
      <input type="password" placeholder="Password" id="login-password" required>
      <button type="submit" class="btn btn-accent">Sign In</button>
      <div style="margin-top:16px;font-size:11px;color:var(--muted)">
        Demo: admin / password
      </div>
    </form>
  </div>
</div>

<div id="app-page" style="display:none" class="app-container">
  <!-- Full app loads here from app.html -->
</div>

<!-- SCRIPTS -->
<script src="./js/config.js"></script>
<script src="./js/app.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

</body>
</html>