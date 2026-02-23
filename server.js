import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3000;

// Users loaded from env var: USERS={"alice":"pass1","bob":"pass2"}
const USERS = JSON.parse(process.env.USERS || '{}');
const SESSION_SECRET = process.env.SESSION_SECRET || 'change-me-in-production';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
}));

// Login page
const loginPage = (error = '') => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OpenClaw OS — Login</title>
  <link href="https://fonts.googleapis.com/css2?family=Lexend:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #1E3A5F 0%, #2E86AB 50%, #A23B72 100%);
      font-family: 'Lexend', sans-serif;
    }
    .card {
      background: white;
      border-radius: 16px;
      padding: 40px;
      width: 100%;
      max-width: 380px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    }
    .logo { font-size: 32px; text-align: center; margin-bottom: 8px; }
    h1 { text-align: center; color: #1E3A5F; font-size: 20px; font-weight: 700; margin-bottom: 4px; }
    .subtitle { text-align: center; color: #6B7280; font-size: 13px; margin-bottom: 28px; }
    label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; }
    input {
      width: 100%; padding: 10px 14px; border: 1.5px solid #E5E7EB;
      border-radius: 8px; font-size: 14px; font-family: inherit;
      transition: border-color 0.2s; outline: none; margin-bottom: 16px;
    }
    input:focus { border-color: #2E86AB; }
    button {
      width: 100%; padding: 12px; background: linear-gradient(135deg, #1E3A5F, #2E86AB);
      color: white; border: none; border-radius: 8px; font-size: 15px;
      font-weight: 600; font-family: inherit; cursor: pointer; transition: opacity 0.2s;
    }
    button:hover { opacity: 0.9; }
    .error {
      background: #FEF2F2; border: 1px solid #FECACA; color: #DC2626;
      padding: 10px 14px; border-radius: 8px; font-size: 13px; margin-bottom: 16px;
    }
    .footer { text-align: center; color: #9CA3AF; font-size: 12px; margin-top: 20px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">🖥️</div>
    <h1>OpenClaw OS v1</h1>
    <p class="subtitle">Ecosystem Architecture — Restricted Access</p>
    ${error ? `<div class="error">${error}</div>` : ''}
    <form method="POST" action="/login">
      <label for="username">Username</label>
      <input type="text" id="username" name="username" required autocomplete="username" placeholder="your name">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" required autocomplete="current-password" placeholder="••••••••">
      <button type="submit">Sign In</button>
    </form>
    <p class="footer">Access granted by invitation only</p>
  </div>
</body>
</html>`;

// Auth middleware
function requireAuth(req, res, next) {
  if (req.session?.authenticated) return next();
  res.redirect('/login');
}

// Routes
app.get('/login', (req, res) => {
  if (req.session?.authenticated) return res.redirect('/');
  res.send(loginPage());
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const stored = USERS[username?.toLowerCase()];
  if (stored && stored === password) {
    req.session.authenticated = true;
    req.session.username = username;
    res.redirect('/');
  } else {
    res.send(loginPage('Invalid username or password.'));
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

// Serve static files (gated)
app.use(requireAuth, express.static(path.join(__dirname, 'dist')));

// SPA fallback
app.get('*', requireAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`OpenClaw OS UI running on port ${PORT}`);
});
